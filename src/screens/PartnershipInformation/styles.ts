import { StatusBar } from "react-native";
import styled from "styled-components/native";

import { isAndroid } from "@utils/checkPlatform";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : "0"};
  flex: 1;
  background: #f4f5f7;
  padding: 24px 24px;
  gap: 10px;
`;

export const InformationView = styled.View`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  gap: 8px;
  width: 345px;
  height: 152px;
`;

export const ContactView = styled.View`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  gap: 8px;
  width: 345px;
  height: 123px;
`;
