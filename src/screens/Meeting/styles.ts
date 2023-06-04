import { StatusBar } from "react-native";
import styled from "styled-components/native";

import { isAndroid } from "@constants";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : "0"};
  padding-top: 32px;
  flex: 1;
`;

export const ButtonsContainer = styled.View`
  padding: 12px 24px;
`;

export const AnnotationsListContainer = styled.View`
  padding: 24px 24px;
  flex: 1;
`;

export const ModalContent = styled.View`
  gap: 8px;
`;

export const ListContainer = styled.ScrollView``;

export const LoadingContainer = styled.View`
  margin-top: 24px;
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

export const InfoContainer = styled.View`
  padding: 24px 24px;
  gap: 10px;
`;

export const InfoCardContainer = styled.View`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  gap: 8px;
  margin-top: 8px;
  justify-content: center;
`;

export const AlertDisabledPartnershipContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px;
  margin: 0px 24px;
  background-color: #ffffff;
  border-radius: 8px;
`;
