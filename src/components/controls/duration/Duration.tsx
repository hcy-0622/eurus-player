import React from 'react'
import classNames from 'classnames'

import { generateClassName, timeFormat } from '@/utils'

import './Duration.css'
import { DurationProps } from './Duration.types'

const genClass = generateClassName('player-control-duration')
const Duration: React.FC<DurationProps> = ({
  current,
  total,
  className,
  style,
}) => {
  return (
    <div className={classNames(genClass(), className)} style={style}>
      <span className={genClass('time')}>{timeFormat(current)}</span>
      <span> / </span>
      <span className={genClass('time')}>{timeFormat(total)}</span>
    </div>
  )
}

export default Duration
