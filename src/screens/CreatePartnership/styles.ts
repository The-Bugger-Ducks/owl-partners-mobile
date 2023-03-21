import { StatusBar } from "react-native";
import styled from "styled-components/native";

import { isAndroid } from "@utils/checkPlatform";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : "0"};
  flex: 1;
  background: #f4f5f7;
  
`;

export const ButtonView = styled.View`
  padding: 24px 24px;
`;

export const SearchView = styled.View`
  padding: 24px 24px;
  gap:10px;
`;

export const TextInput = styled.TextInput`
  background: #f4f5f7;
  padding: 0px 16px;
  border-radius: 8px;
  border: 1px solid #CCCCCC;
  align-items: center;
  justify-content: center;
  width: 345px;
  height: 56px;

`;