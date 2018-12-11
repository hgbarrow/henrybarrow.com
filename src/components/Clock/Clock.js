import React, { Component } from 'react'

import HenryClock from './henryClock'
import './henry_clock.css'

class Clock extends Component {
  componentDidMount() {
    this.canReset = false
    this.width = this.node.clientWidth
    this.height = this.node.clientHeight
    this.clock = new HenryClock(this.node)
    this.createClock()
  }
  componentWillUnmount() {
    clearTimeout(this.firstRenderTimeout)
    clearTimeout(this.secondRenderTimeout)
    clearTimeout(this.resetTimeout)
    cancelAnimationFrame(this.frame)
  }
  sizeChanged = () => {
    if (
      this.node.clientWidth !== this.width ||
      this.node.clientHeight !== this.height
    ) {
      this.height = this.node.clientHeight
      this.width = this.node.clientWidth
      return true
    }
    return false
  }
  createClock = () => {
    this.height = this.node.clientHeight
    this.width = this.node.clientWidth
    this.clock.createClock()
    this.firstRenderTimeout = setTimeout(() => {
      this.clock.render(new Date())
      this.clock.transitionMovement = false
      this.secondRenderTimeout = setTimeout(() => {
        this.height = this.node.clientHeight
        this.width = this.node.clientWidth
        this.canReset = true
        this.updateClock()
        // setTimeout(() => {
        //   this.canReset = true
        // }, 5000)
      }, 700)
    }, 1000)
  }
  updateClock = () => {
    this.frame = requestAnimationFrame(timestamp => {
      const sizeChanged = this.sizeChanged()
      if (sizeChanged) {
        this.needsReset = true
      }
      // Wait for the size change to stop
      if (this.needsReset && !sizeChanged && this.canReset) {
        this.needsReset = false
        this.resetClock()
      } else {
        this.clock.render(new Date())
        this.updateClock()
      }
    })
  }
  resetClock = () => {
    this.canReset = false
    cancelAnimationFrame(this.frame)
    this.clock.delete()
    this.resetTimeout = setTimeout(() => {
      this.clock = new HenryClock(this.node)
      this.createClock()
    }, 500)
  }

  render() {
    return (
      <div className="clock-container">
        <div
          ref={node => (this.node = node)}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        />
      </div>
    )
  }
}

export default Clock
