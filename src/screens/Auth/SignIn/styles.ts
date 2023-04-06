import styled from "styled-components/native";

import { isIOS } from "@constants";

export const Container = styled.SafeAreaView`
  position: relative;
  flex: 1;
  background: #f4f5f7;
`;

export const FormContainer = styled.KeyboardAvoidingView.attrs({
  behavior: isIOS ? "padding" : "height",
})`
  flex: 1;
  padding: 32px 32px;

  justify-content: space-between;
`;

export const TextContainer = styled.View`
  align-items: center;

  height: 54px;
`;

export const Form = styled.View`
  flex: 1;
  justify-content: center;

  gap: 24px;
`;

export const InfoErrorContainer = styled.View`
  margin-top: 8px;

  text-align: center;
  flex-direction: row;
  gap: 4px;

  align-items: center;
`;

export const PasswordInputContainer = styled.View<{
  borderColor?: string;
}>`
  margin-top: 8px;

  height: 54px;

  flex-direction: row;
  align-items: center;
  gap: 4px;

  border: 1px solid;
  border-radius: 8px;
  border-color: ${({ borderColor }) => borderColor || "#cccccc"};
`;

export const InputPassword = styled.TextInput.attrs({
  placeholderTextColor: "#999999",
  cursorColor: "#EF4444",
})`
  padding-left: 8px;
  height: 100%;

  width: 85%;
`;

export const IconButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  justify-self: flex-end;
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: "#999999",
  cursorColor: "#EF4444",
})<{
  borderColor?: string;
}>`
  margin-top: 8px;

  padding-left: 8px;
  height: 54px;

  border: 1px solid;
  border-radius: 8px;
  border-color: ${({ borderColor }) => borderColor || "#cccccc"};
`;

export const LoadingContainer = styled.View`
  max-height: 60px;
`;
