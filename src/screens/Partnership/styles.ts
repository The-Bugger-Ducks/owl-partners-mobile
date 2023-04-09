import { StatusBar } from "react-native";
import styled from "styled-components/native";

import { isAndroid } from "@constants";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : "0"};
  flex: 1;
  background: #f4f5f7;
  gap: 10px;
`;

export const ButtonsContainer = styled.View`
  padding: 12px 24px;
`;

export const HistoryContainer = styled.View`
  padding: 24px 24px;
  flex: 1;
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

export const InformationView = styled.View`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  gap: 8px;
  width: 345px;
  height: 160px;
  justify-content: center;
`;

export const ContactView = styled.View`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  gap: 8px;
  width: 345px;
  height: 123px;
  justify-content: center;
`;

export const PartnerInfoView = styled.View`
  padding: 24px 24px;
  gap: 10px;
`;
