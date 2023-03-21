import { SvgXml } from 'react-native-svg';

export function Drop() {
  const markup = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.02269 10.0166L12.0186 14.0207L16.0227 10.0249" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  return <SvgXml xml={markup} />;
}