import React from 'react'
import classNames from 'classnames'

import { generateClassName } from '@/utils'
import { Dropdown, Icon, Slider } from '../../common'

import './Volume.css'
import { VolumeProps } from './Volume.types'

const genClass = generateClassName('player-control-volume')
const Volume: React.FC<VolumeProps> = ({
  value,
  isMuted,
  className,
  style,
  onMuteChange,
  onVolumeChange,
}) => {
  return (
    <Dropdown
      className={className}
      style={style}
      overlay={
        <div className={genClass('overlay')}>
          <span className={genClass('overlay-value')}>{Math.floor(value)}</span>
          <Slider
            className={genClass('overlay-slider')}
            direction="vertical"
            value={value}
            onChange={onVolumeChange}
          />
        </div>
      }
    >
      <div className={classNames(genClass('wrapper'))}>
        <Icon
          className={classNames(genClass())}
          icon={isMuted ? 'volume-mute' : 'volume-off'}
          onClick={() => {
            onMuteChange(!isMuted)
          }}
        />
      </div>
    </Dropdown>
  )
}

export default Volume
