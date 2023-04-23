import { StatusBar } from "react-native";
import styled from "styled-components/native";

import { isAndroid } from "@constants";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : "0"};
  gap: 10px;
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

export const AddPartnerView = styled.View`
  margin-bottom: 15px;
`;

export const StatusView = styled.View`
  background: #f4f5f7;
  padding: 0px 16px;
  border-radius: 8px;
  border: 1px solid #cccccc;
  align-items: center;
  width: 345px;
  height: 56px;

  justify-content: "space-between";
  flex-direction: "row";
  gap: 140.25;
`;

export const SelectArea = styled.View`
  background: #f4f5f7;
  border-radius: 8px;
  border: 1px solid #cccccc;
`;
