import { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import { Text } from "../Text";
import { Container } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  disabled?: boolean;
  type?: "filled" | "unfilled" | "text";
}

export function Button({
  children,
  disabled = false,
  type = "filled",
  ...rest
}: ButtonProps) {
  let textColor = "#FFFFFF";
  if (type !== "filled") textColor = disabled ? "#999" : "#EF4444";

  return (
    <Container disabled={disabled} type={type} {...rest}>
      <Text weight="600" color={textColor}>
        {children}
      </Text>
    </Container>
  );
}
