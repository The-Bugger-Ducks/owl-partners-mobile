// import { SvgProps } from "react-native-svg";

import checkIcon from "../../shared/assets/icons/check.svg";
import checkboxOffIcon from "../../shared/assets/icons/checkbox-off.svg";
import checkboxOnIcon from "../../shared/assets/icons/checkbox-on.svg";
import closeIcon from "../../shared/assets/icons/close.svg";
import editIcon from "../../shared/assets/icons/edit.svg";
import eyeHiddenIcon from "../../shared/assets/icons/eye-hidden.svg";
import eyeIcon from "../../shared/assets/icons/eye.svg";
import homeIcon from "../../shared/assets/icons/home.svg";
import imageIcon from "../../shared/assets/icons/image.svg";
import infoIcon from "../../shared/assets/icons/info.svg";
import loadingIcon from "../../shared/assets/icons/loading.svg";
import logOffIcon from "../../shared/assets/icons/log-off.svg";
import menuIcon from "../../shared/assets/icons/menu.svg";
import minusIcon from "../../shared/assets/icons/minus.svg";
import orderIcon from "../../shared/assets/icons/order.svg";
import plusIcon from "../../shared/assets/icons/plus.svg";
import profileIcon from "../../shared/assets/icons/profile.svg";
import questionIcon from "../../shared/assets/icons/question.svg";
import radio1Icon from "../../shared/assets/icons/radio-1.svg";
import radioIcon from "../../shared/assets/icons/radio.svg";
import refreshIcon from "../../shared/assets/icons/refresh.svg";
import searchIcon from "../../shared/assets/icons/search.svg";
import trashIcon from "../../shared/assets/icons/trash.svg";
import usersIcon from "../../shared/assets/icons/users.svg";

export type iconsName =
  | "check"
  | "checkbox-off"
  | "checkbox-on"
  | "close"
  | "edit"
  | "eye-hidden"
  | "eye"
  | "home"
  | "image"
  | "info"
  | "loading"
  | "log-off"
  | "menu"
  | "minus"
  | "order"
  | "plus"
  | "profile"
  | "question"
  | "radio-1"
  | "radio"
  | "refresh"
  | "search"
  | "trash"
  | "users";

interface Icon {
  name: iconsName;
  image: any;
  // image: React.FC<SvgProps>
}

export const iconList: Icon[] = [
  { image: checkIcon, name: "check" },
  { image: checkboxOffIcon, name: "checkbox-off" },
  { image: checkboxOnIcon, name: "checkbox-on" },
  { image: closeIcon, name: "close" },
  { image: editIcon, name: "edit" },
  { image: eyeHiddenIcon, name: "eye-hidden" },
  { image: eyeIcon, name: "eye" },
  { image: homeIcon, name: "home" },
  { image: imageIcon, name: "image" },
  { image: infoIcon, name: "info" },
  { image: loadingIcon, name: "loading" },
  { image: logOffIcon, name: "log-off" },
  { image: menuIcon, name: "menu" },
  { image: minusIcon, name: "minus" },
  { image: orderIcon, name: "order" },
  { image: plusIcon, name: "plus" },
  { image: profileIcon, name: "profile" },
  { image: questionIcon, name: "question" },
  { image: radio1Icon, name: "radio-1" },
  { image: radioIcon, name: "radio" },
  { image: refreshIcon, name: "refresh" },
  { image: searchIcon, name: "search" },
  { image: trashIcon, name: "trash" },
  { image: usersIcon, name: "users" },
];
