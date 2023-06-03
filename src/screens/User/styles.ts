import { StatusBar } from "react-native";
import styled from "styled-components/native";

import { isAndroid } from "@constants";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? "60px" : "0"};
  flex: 1;
  background: #f4f5f7;
`;

export const UsersContainer = styled.ScrollView`
  padding: 24px 24px;
`;

export const UserCard = styled.View`
  padding: 24px 24px;
  width: 345px;
  height: 97px;
  border-radius: 8px;
  background: #ffffff;
  justify-content: center;
`;

export const UserCardActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const IconArea = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

export const LoadingContainer = styled.TouchableOpacity`
  padding-top: 24px;
`;
