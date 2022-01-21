import React from "react";
import classNames from "classnames";
import Icon from "../../icon";
import { PlayProps } from "./Play.types";

const Play: React.FC<PlayProps> = ({
  isPlaying,
  color,
  className,
  style,
  onPlayChange,
}) => {
  return (
    <Icon
      className={classNames("xg-player-control-play", className, {
        "xg-player-control-play-playing": isPlaying,
        "xg-player-control-play-paused": !isPlaying,
      })}
      style={style}
      icon={isPlaying ? "pause" : "play"}
      color={color}
      onClick={() => {
        onPlayChange(!isPlaying);
      }}
    />
  );
};

export default Play;
