import styled, { css } from "styled-components/native";

export const Container = styled.TouchableOpacity<{
  type: "filled" | "unfilled";
  marginVertical?: string;
}>`
  background: ${({ disabled }) => (disabled ? "#999" : "#EF4444")};
  border-radius: 48px;
  padding: 14px 24px;
  align-items: center;
  justify-content: center;

  ${({ type, disabled }) =>
    type === "unfilled" &&
    css`
      background: transparent;
      border: 2px solid ${disabled ? "#999" : "#EF4444"};
    `}
`;
