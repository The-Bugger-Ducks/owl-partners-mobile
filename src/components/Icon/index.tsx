import { SvgXml } from "react-native-svg";

import { iconList, iconsName } from "./icons";

import InfoIcon from "../../shared/assets/icons/info.svg";

interface IconProps {
  icon: iconsName;
  size?: number;
  width?: number;
  height?: number;
  fillColor?: string;
  strokeColor?: string;
  color?: string;
}

export function Icon({
  icon,
  size,
  width = 24,
  height = 24,
  strokeColor,
  fillColor,
  color,
}: IconProps) {
  function getIcon() {
    const svgFile = iconList.find(item => item.name == icon);

    if (svgFile) return svgFile.image;

    return InfoIcon;
  }

  return (
    <SvgXml
      color={color}
      xml={getIcon()}
      stroke={strokeColor}
      fill={fillColor}
      width={size || width}
      height={size || height}
    />
  );
}
