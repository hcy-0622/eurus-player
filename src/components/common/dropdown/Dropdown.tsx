import React, { useState } from 'react'
import classNames from 'classnames'

import { generateClassName } from '@/utils'
// import Portal from '../portal'

import { DropdownProps } from './Dropdown.types'
import './Dropdown.css'

const genClass = generateClassName('dropdown')
// const getDefaultPopupContainer = () => document.body
const Dropdown: React.FC<DropdownProps> = ({
  overlay,
  className,
  style,
  overlayStyle,
  overlayClassName,
  // getPopupContainer = getDefaultPopupContainer,
  children,
}) => {
  const [isShowOverlay, setIsShowOverlay] = useState(false)
  // const triggerElRef = useRef<HTMLDivElement>(null)
  // const overlayElRef = useRef<HTMLDivElement>(null)
  // const [offsetPos, setOffsetPos] = useState<{ top: number; left: number }>()
  // const [posDirection, setPosDirection] = useState<'top' | 'bottom'>()
  // const triggerElIsLoaded = triggerElRef.current !== null
  // const overlayElIsLoaded = overlayElRef.current !== null

  // useLayoutEffect(() => {
  //   const posHandler = () => {
  //     if (!triggerElIsLoaded || !overlayElIsLoaded) return
  //     const pos = { top: 0, left: 0 }
  //     const el = triggerElRef.current
  //     const overlayEl = overlayElRef.current
  //     const rect = el.getBoundingClientRect()
  //     const overlayWidth = overlayEl.clientWidth
  //     // 处理offset left
  //     if (overlayWidth < rect.left) {
  //       const diffWidth = overlayWidth - rect.width
  //       pos.left = rect.left
  //       if (diffWidth > 0) {
  //         pos.left = pos.left - Math.abs(diffWidth) / 2
  //       } else if (diffWidth < 0) {
  //         pos.left = pos.left + Math.abs(diffWidth) / 2
  //       }
  //     }
  //     // 处理offset top
  //     const offsetTop = rect.top + window.scrollY
  //     if (rect.top < overlayEl.offsetHeight) {
  //       pos.top = offsetTop + rect.height
  //       setPosDirection('bottom')
  //     } else {
  //       pos.top = offsetTop - overlayEl.offsetHeight
  //       setPosDirection('top')
  //     }
  //     setOffsetPos(pos)
  //   }
  //   posHandler()
  // }, [overlayElIsLoaded, triggerElIsLoaded])

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
        // ref={triggerElRef}
        onMouseEnter={() => {
          setIsShowOverlay(true)
        }}
      >
        {children}
      </div>
      <div
        // ref={overlayElRef}
        className={classNames(genClass('overlay-container'), overlayClassName, {
          'overlay-active': isShowOverlay,
          // 'overlay-top': posDirection === 'top' && !isShowOverlay,
          // 'overlay-bottom': posDirection === 'bottom' && !isShowOverlay,
        })}
        style={overlayStyle}
        // style={{
        //   ...overlayStyle,
        //   top: offsetPos ? offsetPos.top : 0,
        //   left: offsetPos ? offsetPos.left : 0,
        // }}
      >
        {overlay}
      </div>
      {/* {triggerElRef.current && (
        <Portal wrapperElement={getPopupContainer(triggerElRef.current)}>
          <div
            ref={overlayElRef}
            className={classNames(genClass('overlay'), overlayClassName, {
              'overlay-active': isShowOverlay,
              'overlay-top': posDirection === 'top' && !isShowOverlay,
              'overlay-bottom': posDirection === 'bottom' && !isShowOverlay,
              'default-style': defaultStyle,
            })}
            style={{
              ...overlayStyle,
              top: offsetPos ? offsetPos.top : 0,
              left: offsetPos ? offsetPos.left : 0,
            }}
          >
            {overlay}
          </div>
        </Portal>
      )} */}
    </div>
  )
}

export default Dropdown
