import { generateClassName } from '@/utils'
import classNames from 'classnames'
import React from 'react'

import { Icon } from '../../common'

import './Fullscreen.css'
import { FullscreenProps } from './Fullscreen.types'

const genClass = generateClassName('player-control-fullscreen')
const Fullscreen: React.FC<FullscreenProps> = ({
  isFullscreen,
  className,
  style,
  onFullscreenChange,
}) => {
  return (
    <Icon
      className={classNames(genClass(), className)}
      style={style}
      icon={isFullscreen ? 'compress' : 'expand'}
      onClick={() => {
        onFullscreenChange(!isFullscreen)
      }}
    />
  )
}

export default Fullscreen
