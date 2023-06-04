import { StatusBar } from "react-native";
import styled from "styled-components/native";

import { isAndroid } from "@constants";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : "0"};
  flex: 1;
  background: #f4f5f7;
`;

export const ButtonView = styled.View`
  padding: 24px 24px;
`;

export const TabsContainer = styled.View`
  padding: 16px 24px 0px;
  flex: 1;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

export const PartnershipsList = styled.ScrollView`
  margin: 16px 0px 32px;
`;

export const TextInput = styled.TextInput`
  background: #f4f5f7;
  padding: 0px 16px;
  border-radius: 8px;
  border: 1px solid #cccccc;
  align-items: center;
  justify-content: center;
  width: 345px;
  height: 56px;
`;

export const LoadingContainer = styled.View`
  padding-top: 24px;
`;

export const PartnerView = styled.TouchableOpacity`
  background: #ffffff;
  gap: 8px;
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 24px;
  justify-content: center;
`;
