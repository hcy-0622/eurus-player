import React, { useEffect, useState } from "react";
import classNames from "classnames";

import Icon from "../../icon";

import { VolumeProps } from "./Volume.types";
import "./Volume.css";

const Volume: React.FC<VolumeProps> = ({
  value,
  isMuted,
  className,
  style,
  onMuteChange,
  onVolumeChange,
}) => {
  const [sliderValue, setSliderValue] = useState(value);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  return (
    <span className="xg-player-control-volume-wrapper">
      <Icon
        className={classNames("xg-player-control-volume", className)}
        style={style}
        icon={isMuted ? "volume-mute" : "volume-off"}
        onClick={() => {
          onMuteChange(!isMuted);
        }}
      />
    </span>
  );
};

export default Volume;
