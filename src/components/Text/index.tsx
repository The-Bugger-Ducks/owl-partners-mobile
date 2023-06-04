import styled from "styled-components/native";

interface TextProps {
  weight?: "400" | "500" | "600" | "700";
  color?: string;
  size?: number;
  opacity?: number;
  disabled?: boolean;
}

export const Text = styled.Text<TextProps>`
  font-family: ${({ weight }) => (weight ? `Inter_${weight}` : "Inter_400")};
  color: ${({ color, disabled }) => (disabled ? "#999999" : color || "#333")};
  font-size: ${({ size }) => (size ? `${size}px` : "16px")};
  opacity: ${({ opacity }) => opacity || 1};
`;
