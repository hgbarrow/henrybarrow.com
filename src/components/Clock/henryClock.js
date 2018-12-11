import * as d3 from 'd3'

const ticks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const pi = Math.PI
const tickWidth = (0.5 * pi) / 180

// Create scales for seconds, hours, minutes
const scaleSecs = d3
  .scaleLinear()
  .domain([0, 59 + 999 / 1000])
  .range([0, 2 * pi])

const scaleMins = d3
  .scaleLinear()
  .domain([0, 59 + 59 / 60])
  .range([0, 2 * pi])

const scaleHours = d3
  .scaleLinear()
  .domain([0, 11 + 59 / 60])
  .range([0, 2 * pi])

const getScale = function(unit) {
  if (unit === 'seconds') {
    return scaleSecs
  } else if (unit === 'minutes') {
    return scaleMins
  } else return scaleHours
}

class Clock {
  titleText = ['Henry', 'Barrow'].map(function(a) {
    return a.toUpperCase()
  })
  constructor(node) {
    this.node = node
    this.width = Math.min(node.clientWidth, node.clientHeight)
    this.height = this.width
    this.svgHeight = this.height
    if (node.clientHeight > node.clientWidth) {
      this.svgHeight = this.svgHeight + 100
    }
    this.tickPadding = Math.min(this.width, this.height) * 0.015
    this.arcPad = 0
    this.radius = Math.min(this.width, this.height) / 2 - 2 * this.tickPadding
    this.arcWidth = this.radius / 4

    this.scaleOrdinal = d3
      .scaleBand()
      .rangeRound([this.radius, this.arcWidth])
      .padding(this.arcPad)

    this.transitionMovement = true
  }

  createClock() {
    this.vis = d3
      .select(this.node)
      .append('svg')
      .attr('class', 'clock')
      .attr('width', this.width)
      .attr('height', this.svgHeight)
      .append('g')

    this.arcsGroup = this.vis
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ', ' + this.height / 2 + ')'
      )
      .attr('class', 'ticks')

    this.ticksGroup = this.vis
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      )
      .attr('class', 'ticks')

    this.arcTick = d3
      .arc()
      .startAngle(function(d) {
        return scaleHours(d) - tickWidth / 2
      })
      .endAngle(function(d) {
        return scaleHours(d) + tickWidth / 2
      })
      .outerRadius(this.radius + this.tickPadding)
      .innerRadius(this.radius + this.tickPadding - this.arcWidth / 4)
      .cornerRadius(this.arcWidth / 3)

    this.tickPaths = this.ticksGroup
      .selectAll('path')
      .data(ticks)
      .enter()
      .append('path')
      .attr('class', 'tick')
      .attr('d', this.arcTick)
      .style('opacity', 1e-6)
      .transition()
      .duration(100)
      .delay(function(d, i) {
        return i * 80
      })
      .style('opacity', 1)

    this.tickLabels = this.ticksGroup
      .selectAll('text')
      .data(ticks)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr(
        'x',
        d =>
          (this.radius - this.tickPadding - this.arcWidth / 3) *
          Math.sin(scaleHours(d))
      )
      .attr(
        'y',
        d =>
          -(this.radius - this.tickPadding - this.arcWidth / 3) *
          Math.cos(scaleHours(d))
      )
      .text(function(d) {
        return d
      })
      .style('opacity', 1e-6)
      .transition()
      .duration(100)
      .delay(function(d, i) {
        return i * 80
      })
      .style('opacity', 1)

    this.centerLabel = this.ticksGroup
      .selectAll('text.title')
      .data(this.titleText)
      .enter()
      .append('text')
      .attr('class', 'title')
      .attr('x', 0)
      .attr('y', function(d, i) {
        return -16 + 32 * i
      })
      .text(function(d) {
        return d
      })
      .style('opacity', 1e-6)
      .transition()
      .delay(1000)
      .duration(1000)
      .style('opacity', 1)
      .attr('transform', 'skewX(-5)')

    this.arcBody = d3
      .arc()
      .startAngle(function(d) {
        let lead = getScale(d.unit)(d.numeric)
        if (lead > (23 * pi) / 12) {
          return 24 * getScale(d.unit)(d.numeric) - (24 * 23 * pi) / 12
        } else {
          return 0
        }
      })
      .endAngle(function(d) {
        return getScale(d.unit)(d.numeric)
      })
      .outerRadius(d => {
        return this.scaleOrdinal(d.unit) + this.arcWidth
      })
      .innerRadius(d => {
        return this.scaleOrdinal(d.unit) - this.arcWidth / 4
      })
      .cornerRadius(this.arcWidth / 4)

    this.render()
  }

  render(currentTime) {
    const data = fields(currentTime)
    this.scaleOrdinal.domain(data.map(d => d.unit))

    this.arcs = this.arcsGroup.selectAll('.main').data(data)

    if (this.transitionMovement) {
      let self = this
      this.arcs
        .transition()
        .duration(700)
        .attrTween('d', function(a) {
          var i = d3.interpolate(this._current, a)
          this._current = i(0)
          return function(t) {
            return self.arcBody(i(t))
          }
        })
    } else {
      this.arcs.attr('d', this.arcBody)
    }

    this.arcs
      .enter()
      .append('path')
      .attr('class', function(d) {
        return 'main ' + d.unit
      })
      .attr('d', this.arcBody)
      .each(function(d) {
        this._current = d
      })
  }

  delete() {
    d3.select(this.node).html('')
  }
}

const startTime = [
  { unit: 'seconds', numeric: 0 },
  { unit: 'minutes', numeric: 0 },
  { unit: 'hours', numeric: 0 },
]

const fields = function(currentTime) {
  if (typeof currentTime === 'undefined') {
    return startTime
  } else {
  }
  const second = currentTime.getSeconds() + currentTime.getMilliseconds() / 1000
  const minute = currentTime.getMinutes() + second / 60
  const hour = (currentTime.getHours() + minute / 60) % 12
  return [
    {
      unit: 'seconds',
      numeric: second,
    },
    {
      unit: 'minutes',
      numeric: minute,
    },
    {
      unit: 'hours',
      numeric: hour,
    },
  ]
}

export default Clock
