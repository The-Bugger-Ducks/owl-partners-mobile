import { StatusBar } from "react-native";
import styled from "styled-components/native";

import { isAndroid } from "@constants";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : "0"};
  flex: 1;
  background: #f4f5f7;
  padding: 24px 24px;
`;

export const PartnershipDropDownArea = styled.View`
  background: #f4f5f7;
  border-radius: 8px;
  border: 1px solid #cccccc;
`;
