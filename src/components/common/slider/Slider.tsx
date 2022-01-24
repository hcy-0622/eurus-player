import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'

import './Slider.css'
import { SliderChange, SliderDirection, SliderProps } from './Slider.types'

const getCurrentSliderValue = (
  el: HTMLDivElement,
  ev: MouseEvent | React.MouseEvent,
  direction: SliderDirection
) => {
  const rect = el.getBoundingClientRect()
  let offsetValue = 0
  let elSize = 0
  if (direction === 'horizon') {
    offsetValue = ev.pageX - rect.left
    elSize = el.offsetWidth
  } else if (direction === 'vertical') {
    offsetValue = ev.pageY - rect.top
    elSize = el.offsetHeight
  }

  let result: number
  if (offsetValue >= elSize) {
    result = 100
  } else if (offsetValue < 0) {
    result = 0
  } else {
    result = (offsetValue / elSize) * 100
  }
  return result
}
const Slider: React.FC<SliderProps> = ({
  direction = 'horizon',
  defaultValue,
  value,
  onChange,
}) => {
  const [currentValue, setCurrentValue] = useState<number>(defaultValue || 0)
  const [canDrag, setCanDrag] = useState(false)
  const barEl = useRef<HTMLDivElement>(null)
  const isControlled = useRef(value !== undefined)
  const canDragRef = useRef(false)
  const directionRef = useRef(direction)
  const onChangeRef = useRef<SliderChange>(onChange)

  const trackClick = (ev: React.MouseEvent) => {
    if (!barEl.current) return
    const value = getCurrentSliderValue(barEl.current, ev, directionRef.current)
    onChangeRef.current && onChangeRef.current(value)
    if (!isControlled.current) {
      setCurrentValue(value)
    }
  }

  useEffect(() => {
    canDragRef.current = canDrag
  }, [canDrag])
  useEffect(() => {
    directionRef.current = direction
  }, [direction])
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    const mousemoveHandler = (ev: MouseEvent) => {
      if (!canDragRef.current || !barEl.current) return
      const value = getCurrentSliderValue(
        barEl.current,
        ev,
        directionRef.current
      )
      onChangeRef.current && onChangeRef.current(value)
      if (!isControlled.current) {
        setCurrentValue(value)
      }
    }
    const mouseupHandler = () => {
      if (canDragRef.current) {
        canDragRef.current = false
        setCanDrag(false)
      }
    }
    document.addEventListener('mousemove', mousemoveHandler)
    document.addEventListener('mouseup', mouseupHandler)
    return () => {
      document.removeEventListener('mousemove', mousemoveHandler)
      document.removeEventListener('mouseup', mouseupHandler)
    }
  }, [])

  return (
    <div
      className={classNames('xg-slider xg-slider-track', {
        'xg-slider-horizon': direction === 'horizon',
        'xg-slider-vertical': direction === 'vertical',
      })}
      ref={barEl}
      onClick={trackClick}
      onMouseDown={() => {
        setCanDrag(true)
      }}
    >
      <div
        className="xg-slider-track-in"
        style={{
          width:
            direction === 'horizon'
              ? (isControlled.current ? value : currentValue) + '%'
              : '100%',
          height:
            direction === 'vertical'
              ? (isControlled.current ? value : currentValue) + '%'
              : '100%',
        }}
      >
        <div className="xg-slider-dot"></div>
      </div>
    </div>
  )
}

export default Slider
