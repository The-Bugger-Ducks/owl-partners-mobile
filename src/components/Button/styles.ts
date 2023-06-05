import styled, { css } from "styled-components/native";

export const Container = styled.TouchableOpacity<{
  type: "filled" | "unfilled" | "text";
  marginVertical?: string;
}>`
  background: ${({ type, disabled }) =>
    type === "text" ? "transparent" : disabled ? "#999" : "#EF4444"};
  border-radius: 48px;
  padding: 12px 24px;
  align-items: center;
  justify-content: center;

  ${({ type, disabled }) =>
    type === "unfilled" &&
    css`
      background: transparent;
      border: 2px solid ${disabled ? "#999" : "#EF4444"};
    `}
`;
