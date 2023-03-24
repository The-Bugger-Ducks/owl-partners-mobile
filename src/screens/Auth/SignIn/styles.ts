import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f4f5f7;
`;

export const FormContainer = styled.KeyboardAvoidingView`
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

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: "#999999",
})`
  margin-top: 8px;
  padding-left: 8px;
  height: 54px;

  border: 1px solid;
  border-radius: 8px;

  /* border-color: ${props => (props.onTextInput ? "red" : "blue")}; */
  border-color: #cccccc;
`;
