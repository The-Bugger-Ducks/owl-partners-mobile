import styled, { css } from "styled-components/native";

export const Container = styled.View``;

export const TextInput = styled.TextInput<{ hasOutIcon: boolean }>`
  padding: 0px 16px;
  border-radius: 8px;
  border: 1px solid #cccccc;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 100%;

  ${({ hasOutIcon }) =>
    hasOutIcon &&
    css`
      width: 85%;
    `}
`;

export const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const IconButton = styled.TouchableOpacity`
  width: 48px;
  align-items: center;
  justify-content: center;
`;
