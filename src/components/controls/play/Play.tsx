import React from 'react'
import classNames from 'classnames'

import { generateClassName } from '@/utils'
import { Icon } from '../../common'

import './Play.css'
import { PlayProps } from './Play.types'

const genClass = generateClassName('player-control-play')
const Play: React.FC<PlayProps> = ({
  isPlaying,
  color,
  className,
  style,
  onPlayChange,
}) => {
  return (
    <Icon
      className={classNames(genClass(), className, {
        [genClass('playing')]: isPlaying,
        [genClass('paused')]: !isPlaying,
      })}
      style={style}
      icon={isPlaying ? 'pause' : 'play'}
      color={color}
      onClick={() => {
        onPlayChange(!isPlaying)
      }}
    />
  )
}

export default Play
