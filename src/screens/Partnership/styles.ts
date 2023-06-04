import styled from "styled-components/native";

import { isAndroid } from "@constants";

export const Container = styled.SafeAreaView`
  padding-top: ${isAndroid ? "60px" : "0"};
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

export const InformationView = styled.View`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  gap: 8px;
  justify-content: center;
`;

export const ContactView = styled.View`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  gap: 8px;
  justify-content: center;
`;

export const PartnerInfoView = styled.View`
  padding: 24px 24px;
  gap: 10px;
`;
