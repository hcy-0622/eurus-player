import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'

import './Dropdown.css'
import { DropdownProps } from './Dropdown.types'
import { generateClassName } from '@/utils'

const genClass = generateClassName('dropdown')
const Dropdown: React.FC<DropdownProps> = ({
  overlay,
  className,
  style,
  overlayStyle,
  overlayClassName,
  defaultStyle = true,
  children,
}) => {
  const el = useRef<HTMLDivElement>(null)
  const overlayEl = useRef<HTMLDivElement>(null)
  const [isShowOverlay, setIsShowOverlay] = useState(false)
  const [offsetPos, setOffsetPos] = useState({ top: 0, left: 0 })
  const [posDirection, setPosDirection] = useState<'top' | 'bottom'>()

  useEffect(() => {
    const posHandler = () => {
      const pos = { top: 0, left: 0 }
      if (el.current && overlayEl.current) {
        const rect = el.current.getBoundingClientRect()
        const overlayWidth = overlayEl.current.clientWidth
        // 处理offset left
        if (overlayWidth < rect.left) {
          const diffWidth = overlayWidth - rect.width
          pos.left = rect.left
          if (diffWidth > 0) {
            pos.left = pos.left - Math.abs(diffWidth) / 2
          } else if (diffWidth < 0) {
            pos.left = pos.left + Math.abs(diffWidth) / 2
          }
        }
        // 处理offset top
        const offsetTop = rect.top + window.scrollY
        if (rect.top < overlayEl.current.offsetHeight) {
          pos.top = offsetTop + rect.height
          setPosDirection('bottom')
        } else {
          pos.top = offsetTop - overlayEl.current.offsetHeight
          setPosDirection('top')
        }
      }
      setOffsetPos(pos)
    }
    posHandler()

    // const mousemoveHandler = (ev: MouseEvent) => {
    //   console.log(ev)
    // }
    // document.addEventListener('mousemove', mousemoveHandler)

    // return () => {
    //   document.removeEventListener('mousemove', mousemoveHandler)
    // }
  }, [])

  return (
    <div
      className={classNames(genClass(), className)}
      style={style}
      onMouseLeave={() => {
        setIsShowOverlay(false)
      }}
    >
      <div
        className={genClass('content')}
        ref={el}
        onMouseEnter={() => {
          setIsShowOverlay(true)
        }}
      >
        {children}
      </div>
      {createPortal(
        <div
          ref={overlayEl}
          className={classNames(genClass('overlay'), overlayClassName, {
            'overlay-active': isShowOverlay,
            'overlay-top': posDirection === 'top' && !isShowOverlay,
            'overlay-bottom': posDirection === 'bottom' && !isShowOverlay,
            'default-style': defaultStyle,
          })}
          style={{ ...overlayStyle, top: offsetPos.top, left: offsetPos.left }}
        >
          {overlay}
        </div>,
        document.body
      )}
    </div>
  )
}

export default Dropdown
