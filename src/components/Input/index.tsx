import { TextInputProps } from "react-native";
import { PlusCircle } from "../Icons/PlusCircle";
import { Text } from "../Text";
import { Container, IconButton, InputContainer, TextInput } from "./styles";

interface InputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
  hasError?: boolean;
  errorText?: string;
  hasOutIcon?: boolean;
  onPressIcon?: () => void;
}

export function Input({
  label,
  placeholder,
  onChangeText,
  hasError,
  errorText,
  hasOutIcon = false,
  onPressIcon,
  ...rest
}: InputProps) {
  return (
    <Container>
      {label && (
        <Text size={14} color={"#666666"} style={{ marginBottom: 8 }}>
          {label}
        </Text>
      )}
      <InputContainer>
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          cursorColor={"#EF4444"}
          hasOutIcon={hasOutIcon}
          {...rest}
        />
        {hasOutIcon && (
          <IconButton onPress={() => onPressIcon && onPressIcon()}>
            <PlusCircle />
          </IconButton>
        )}
      </InputContainer>
      {hasError && (
        <Text size={12} color="#EF4444">
          {errorText}
        </Text>
      )}
    </Container>
  );
}
