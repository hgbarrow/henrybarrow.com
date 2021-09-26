import * as d3 from 'd3'

let fields = function() {
  var currentTime, hour, minute, second
  currentTime = new Date()
  second = currentTime.getSeconds()
  minute = currentTime.getMinutes() + second / 60
  hour = (currentTime.getHours() + minute / 60) % 12
  return (data = [
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
  ])
}

// This fractions are used to set the width and height relative to the browser window
var widthFraction = 0.9,
  heightFraction = 0.75

var width = window.innerWidth * widthFraction,
  height = window.innerHeight * heightFraction,
  margin = { top: 20, left: 0, right: 0, bottom: 0 },
  tickPadding = Math.min(width, height) * 0.015,
  arcPad = 0,
  radius = Math.min(width, height) / 2 - 2 * tickPadding,
  arcWidth = radius / 4
;(pi = Math.PI), (tickWidth = (0.5 * pi) / 180)
var titleText = ['Henry', 'Barrow'].map(function(a) {
  return a.toUpperCase()
})

var startTime = [
  { unit: 'seconds', numeric: 0 },
  { unit: 'minutes', numeric: 0 },
  { unit: 'hours', numeric: 0 },
]

var arcBody = d3.svg
  .arc()
  .startAngle(0)
  .endAngle(function(d) {
    return getScale(d.unit)(d.numeric)
  })
  .outerRadius(function(d) {
    return scaleOrdinal(d.unit) + arcWidth
  })
  .innerRadius(function(d) {
    return scaleOrdinal(d.unit) - arcWidth / 4
  })
  .cornerRadius(arcWidth / 4)

var ticks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
var arcTick = d3.svg
  .arc()
  .startAngle(function(d) {
    return scaleHours(d) - tickWidth / 2
  })
  .endAngle(function(d) {
    return scaleHours(d) + tickWidth / 2
  })
  .outerRadius(radius + tickPadding)
  .innerRadius(radius + tickPadding - arcWidth / 4)
  .cornerRadius(arcWidth / 3)

// Create scales for seconds, hours, minutes
var scaleSecs = d3.scale
  .linear()
  .domain([0, 59 + 999 / 1000])
  .range([0, 2 * pi])

var scaleMins = d3.scale
  .linear()
  .domain([0, 59 + 59 / 60])
  .range([0, 2 * pi])
var scaleHours = d3.scale
  .linear()
  .domain([0, 11 + 59 / 60])
  .range([0, 2 * pi])

var scaleOrdinal = d3.scale
  .ordinal()
  .rangeRoundBands([radius, arcWidth], arcPad)

// Create svg and clock group elements
export function createClock(node) {
  let vis = d3
    .select(node)
    .append('svg')
    .attr('class', 'clock')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
}
let vis = d3
  .select(node)
  .append('svg')
  .attr('class', 'clock')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var arcsGroup = vis
  .append('g')
  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

// Draw ticks and labels
var ticksGroup = vis
  .append('g')
  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
  .attr('class', 'ticks')
var tickPaths = ticksGroup
  .selectAll('path')
  .data(ticks)
  .enter()
  .append('path')
  .attr('class', 'tick')
  .attr('d', arcTick)
  .style('opacity', 1e-6)
  .transition()
  .duration(100)
  .delay(function(d, i) {
    return i * 80
  })
  .style('opacity', 1)

var tickLabels = ticksGroup
  .selectAll('text')
  .data(ticks)
  .enter()
  .append('text')
  .attr('class', 'label')
  .attr('x', function(d) {
    return (radius - tickPadding - arcWidth / 3) * Math.sin(scaleHours(d))
  })
  .attr('y', function(d) {
    return -(radius - tickPadding - arcWidth / 3) * Math.cos(scaleHours(d))
  })
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

var centerLabel = ticksGroup
  .selectAll('text.title')
  .data(titleText)
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

// Render function is called by setInterval once per second
var render = function(data) {
  // Update the Ordinal input domain
  scaleOrdinal.domain(
    data.map(function(d) {
      return d.unit
    })
  )

  // Draw Arcs
  var arcs = arcsGroup.selectAll('.main').data(data)

  arcs
    .enter()
    .append('path')
    .attr('class', function(d) {
      return 'main ' + d.unit
    })
    .attr('d', arcBody)
    .each(function(d) {
      this._current = d
    })

  arcs
    .transition()
    .duration(700)
    .ease('bounce')
    .attrTween('d', arcTween)
}

function arcTween(a) {
  var i = d3.interpolate(this._current, a)
  this._current = i(0)
  return function(t) {
    return arcBody(i(t))
  }
}

var getScale = function(unit) {
  if (unit == 'seconds') {
    return scaleSecs
  } else if (unit == 'minutes') {
    return scaleMins
  } else return scaleHours
}
