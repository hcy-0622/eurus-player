import React, { useEffect, useRef, useState } from "react";

import "./Player.css";
import { PlayerProps } from "./Player.types";

import { usePlayerLoaded } from "@/hooks";

import Icon from "../icon";
import { Play, Duration, Volume } from "../controls";

const Player: React.FC<PlayerProps> = ({
  qualityList,
  defaultQuality,
  nativeControls,
  onQualitySelect,
  children,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isLoaded } = usePlayerLoaded(videoRef);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>();
  const [totalTime, setTotalTime] = useState<number>();

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      setIsPaused(video.paused);
      setIsMuted(video.muted);
      setTotalTime(video.duration);
    }
  }, [isLoaded]);

  return (
    <div className="xg-player-container">
      <video
        {...props}
        className="xg-player"
        ref={videoRef}
        controls={nativeControls}
        onTimeUpdate={() => {
          if (videoRef.current) {
            const time = Math.floor(videoRef.current.currentTime);
            setCurrentTime(time);
          }
        }}
      >
        {children}
      </video>
      {!nativeControls && (
        <div className="xg-player-control">
          <div className="xg-player-control-top">
            <div className="xg-player-control-top-left">
              <Play
                isPlaying={isPaused}
                onPlayChange={(val) => {
                  setIsPaused(val);
                }}
              />
              {totalTime !== undefined && currentTime !== undefined && (
                <Duration
                  className="ml-2"
                  current={currentTime}
                  total={totalTime}
                />
              )}
            </div>
            <div className="xg-player-control-top-right">
              {/* {qualityList && (
       <Picker
         list={qualityList}
         defaultValue={defaultQuality}
         onSelect={onQualitySelect}
       />
     )} */}
              <Volume
                value={10}
                isMuted={isMuted}
                onMuteChange={() => {
                  if (isMuted) {
                    setIsMuted(false);
                    if (videoRef.current) {
                      videoRef.current.muted = false;
                    }
                  } else {
                    setIsMuted(true);
                    if (videoRef.current) {
                      videoRef.current.muted = true;
                    }
                  }
                }}
              />
              <Icon
                className="xg-player-control-fullscreen"
                icon={isFullscreen ? "compass" : "expand"}
                onClick={() => {
                  if (isFullscreen) {
                    setIsFullscreen(false);
                    document.exitFullscreen();
                  } else {
                    setIsFullscreen(true);
                    videoRef.current && videoRef.current.requestFullscreen();
                  }
                }}
              />
            </div>
          </div>
          <div>{/* <Progress /> */}</div>
        </div>
      )}
    </div>
  );
};

export default Player;
