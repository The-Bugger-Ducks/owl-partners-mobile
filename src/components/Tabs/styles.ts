import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: rgba(204, 204, 204, 0.4);
  margin-bottom: 16px;
`;

export const Tab = styled.TouchableOpacity<{ isActive: boolean }>`
  background: ${({ isActive }) => (isActive ? "#FFFFFF" : "transparent")};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 36px;
  width: 50%;
  align-items: center;
  justify-content: center;
`;
