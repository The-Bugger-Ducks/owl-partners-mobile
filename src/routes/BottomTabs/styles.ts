import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 72px;
`;

export const Tab = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TabIndicator = styled.View`
  width: 12px;
  height: 1.5px;
  background-color: #ef4444;
`;
