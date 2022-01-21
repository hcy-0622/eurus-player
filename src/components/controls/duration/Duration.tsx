import React from "react";
import "./Duration.css";
import { DurationProps } from "./Duration.types";
import { timeFormat } from "../../../utils";
import classNames from "classnames";

const Duration: React.FC<DurationProps> = ({
  current,
  total,
  className,
  style,
}) => {
  return (
    <div
      className={classNames("xg-player-control-duration", className)}
      style={style}
    >
      <span className="time">{timeFormat(current)}</span>
      <span> / </span>
      <span className="time">{timeFormat(total)}</span>
    </div>
  );
};

export default Duration;
