import { StatusBar } from "react-native";
import styled from "styled-components/native";

import { isAndroid } from "@constants";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? "60px" : "0"};
  flex: 1;
  background: #f4f5f7;
  padding: 24px 24px;
`;

export const PassswordInput = styled.View`
  padding: 0px 16px;
  border-radius: 8px;
  border: 1px solid #cccccc;
  flex-direction: row;
  justify-content: space-between;
  height: 56px;
  width: 100%;
`;

export const PasswordInputContainer = styled.View``;

export const IconButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  justify-self: flex-end;
`;
