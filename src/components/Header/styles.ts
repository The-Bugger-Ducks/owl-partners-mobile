import styled from "styled-components/native";

export const Container = styled.View`
  margin: 24px 24px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextContainer = styled.View<{ textAlign: "center" | "left" }>`
  text-align: ${({ textAlign }) => textAlign};
`;
