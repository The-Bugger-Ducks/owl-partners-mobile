import { StatusBar } from "react-native";
import styled, { css } from "styled-components/native";

import { isAndroid } from "@constants";

export const Overlay = styled.KeyboardAvoidingView<{ isBottom: boolean }>`
  background: rgba(0, 0, 0, 0.6);
  flex: 1;
  align-items: stretch;
  justify-content: center;
  padding: 0 24px;

  ${({ isBottom }) =>
    isBottom &&
    css`
      padding: 0;
      justify-content: flex-end;
    `}
`;

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : "0"};
  background: #f4f5f7;
  padding: 24px 24px;
  border-radius: 8px;
`;

export const Header = styled.View`
  justify-content: space-between;
  flex-direction: row;
  gap: 140.25px;
  margin-bottom: 24px;
`;

export const TextInput = styled.TextInput`
  background: #f4f5f7;
  padding: 0px 16px;
  border-radius: 8px;
  border: 1px solid #cccccc;
  align-items: center;
  justify-content: center;
  width: 345px;
  height: 56px;
`;

export const Footer = styled.View`
  padding: 16px 0px;
`;
