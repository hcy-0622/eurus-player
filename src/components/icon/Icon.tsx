import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProps } from "../icon/Icon.types";

const Icon: React.FC<IconProps> = (props) => {
  return <FontAwesomeIcon {...props} />;
};

export default Icon;
