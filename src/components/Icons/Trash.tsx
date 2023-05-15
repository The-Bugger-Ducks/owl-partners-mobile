import { SvgXml } from "react-native-svg";

export function Trash() {
  const markup = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5428 21.0037H8.45698C7.28078 21.0037 6.30288 20.0982 6.21267 18.9254L5.24707 6.37265H18.7527L17.7871 18.9254C17.6969 20.0982 16.719 21.0037 15.5428 21.0037V21.0037Z" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20.0032 6.37264H3.99658" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.1865 2.99625H14.8138C15.4354 2.99625 15.9393 3.50014 15.9393 4.12172V6.37265H8.06104V4.12172C8.06104 3.50014 8.56492 2.99625 9.1865 2.99625Z" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.9694 10.8745V16.5019" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.0305 10.8745V16.5019" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  return <SvgXml xml={markup} />;
}
