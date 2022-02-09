import React, { useEffect, useRef, useState } from 'react'

import { usePlayerLoaded } from '@/hooks'
import { generateClassName } from '@/utils'
import { Play, Duration, Volume, Fullscreen } from '../controls'

import './Player.css'
import { PlayerProps } from './Player.types'

const genClass = generateClassName('player')
const Player: React.FC<PlayerProps> = ({
  qualityList,
  defaultQuality,
  nativeControls,
  onQualitySelect,
  children,
  ...props
}) => {
  const videoEl = useRef<HTMLVideoElement>(null)
  const { isLoaded } = usePlayerLoaded(videoEl)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState<number>()
  const [totalTime, setTotalTime] = useState<number>()
  const [volume, setVolume] = useState(100)

  useEffect(() => {
    if (videoEl.current) {
      const video = videoEl.current
      setIsPaused(video.paused)
      setIsMuted(video.muted)
      setTotalTime(video.duration)
    }
  }, [isLoaded])

  return (
    <div className={genClass('container')}>
      <video
        {...props}
        className={genClass()}
        ref={videoEl}
        controls={nativeControls}
        onTimeUpdate={() => {
          if (videoEl.current) {
            const time = Math.floor(videoEl.current.currentTime)
            setCurrentTime(time)
          }
        }}
      >
        {children}
      </video>
      {!nativeControls && isLoaded && (
        <div className={genClass('control')}>
          <div className={genClass('control-top')}>
            <div className={genClass('control-top-left')}>
              <Play
                isPlaying={!isPaused}
                onPlayChange={(val) => {
                  setIsPaused(!val)
                  if (val) {
                    videoEl.current?.play()
                  } else {
                    videoEl.current?.pause()
                  }
                }}
              />
              {totalTime !== undefined && currentTime !== undefined && (
                <Duration
                  style={{ marginLeft: '8px' }}
                  current={currentTime}
                  total={totalTime}
                />
              )}
            </div>
            <div className={genClass('control-top-right')}>
              {/* {qualityList && (
       <Picker
         list={qualityList}
         defaultValue={defaultQuality}
         onSelect={onQualitySelect}
       />
     )} */}
              <Volume
                style={{ marginRight: '12px', verticalAlign: 'middle' }}
                value={volume}
                isMuted={isMuted}
                onMuteChange={(val) => {
                  if (!videoEl.current) return
                  setIsMuted(val)
                  if (val) {
                    videoEl.current.muted = true
                  } else {
                    videoEl.current.muted = false
                  }
                }}
                onVolumeChange={(val) => {
                  setVolume(val)
                  if (val <= 0) {
                    setIsMuted(true)
                  } else {
                    setIsMuted(false)
                  }
                  if (videoEl.current) {
                    videoEl.current.volume = val / 100
                  }
                }}
              />
              <Fullscreen
                style={{ verticalAlign: 'middle' }}
                isFullscreen={isFullscreen}
                onFullscreenChange={(val) => {
                  setIsFullscreen(val)
                  if (val) {
                    const parentEl = videoEl.current
                      ?.parentNode as HTMLDivElement
                    parentEl.requestFullscreen()
                  } else {
                    document.exitFullscreen()
                  }
                }}
              />
            </div>
          </div>
          <div>{/* <Progress /> */}</div>
        </div>
      )}
    </div>
  )
}

export default Player
