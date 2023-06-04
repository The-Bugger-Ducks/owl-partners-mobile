import { css } from "styled-components";
import styled from "styled-components/native";

export const Container = styled.View`
  margin: 24px 24px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextContainer = styled.View<{ textAlign: "center" | "left" }>`
  text-align: ${({ textAlign }) => textAlign};
  flex: 1;

  ${({ textAlign }) =>
    textAlign === "center" &&
    css`
      display: flex;
      align-items: center;
    `}
`;

export const ImageLogo = styled.Image`
  height: 56px;
  width: 56px;
`;
