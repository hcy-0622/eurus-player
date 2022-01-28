import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import './Slider.css'
import { SliderChange, SliderDirection, SliderProps } from './Slider.types'
import { generateClassName } from '@/utils'

const genClass = generateClassName('slider')

const getCurrentSliderValue = (
  el: HTMLDivElement,
  ev: MouseEvent | React.MouseEvent,
  direction: SliderDirection
) => {
  const rect = el.getBoundingClientRect()
  let offsetValue = 0
  let elSize = 0
  if (direction === 'horizon') {
    offsetValue = ev.pageX - rect.left - window.scrollX
    elSize = el.offsetWidth
  } else if (direction === 'vertical') {
    offsetValue = ev.pageY - rect.top - window.scrollY
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
  className,
  style,
  onChange,
}) => {
  const [currentValue, setCurrentValue] = useState<number>(defaultValue || 0)
  const [canDrag, setCanDrag] = useState(false)
  const trackEl = useRef<HTMLDivElement>(null)
  const isControlled = useRef(value !== undefined)
  const canDragRef = useRef(false)
  const directionRef = useRef(direction)
  const onChangeRef = useRef<SliderChange | undefined>(onChange)

  const trackClick = (ev: React.MouseEvent) => {
    if (!trackEl.current) return
    let value = getCurrentSliderValue(trackEl.current, ev, directionRef.current)
    if (directionRef.current === 'vertical') {
      value = 100 - value
    }
    if (!isControlled.current) {
      setCurrentValue(value)
    }
    onChangeRef.current && onChangeRef.current(value)
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
      if (!canDragRef.current || !trackEl.current) return
      let value = getCurrentSliderValue(
        trackEl.current,
        ev,
        directionRef.current
      )
      if (directionRef.current === 'vertical') {
        value = 100 - value
      }
      if (!isControlled.current) {
        setCurrentValue(value)
      }
      onChangeRef.current && onChangeRef.current(value)
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

  const classes = {
    'slider-horizon': direction === 'horizon',
    'slider-vertical': direction === 'vertical',
  }
  const fillWidth =
    direction === 'horizon'
      ? (isControlled.current && value ? value : currentValue) + '%'
      : '100%'
  const fillHeight =
    direction === 'vertical'
      ? 100 - (isControlled.current && value ? value : currentValue) + '%'
      : '100%'

  return (
    <div className={classNames(genClass(), classes)}>
      <div
        className={classNames(genClass('track'), className, classes)}
        style={style}
        ref={trackEl}
        onClick={trackClick}
        onMouseDown={() => {
          setCanDrag(true)
        }}
      >
        <div
          className={genClass('track-fill')}
          style={{ width: fillWidth, height: fillHeight }}
        >
          <div className={genClass('dot')}></div>
        </div>
      </div>
    </div>
  )
}

export default Slider
