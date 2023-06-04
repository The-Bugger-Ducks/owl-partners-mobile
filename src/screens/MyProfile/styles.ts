import { StatusBar } from "react-native";
import styled from "styled-components/native";

import { isAndroid } from "@constants";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : "0"};
  flex: 1;
`;

export const Content = styled.ScrollView`
  padding: 0px 24px 24px;
`;

export const InputsContainer = styled.View`
  gap: 12px;
  margin: 16px 0px;
`;
