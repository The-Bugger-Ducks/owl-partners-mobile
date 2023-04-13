import { StatusBar } from "react-native";
import styled from "styled-components/native";

import { isAndroid } from "@utils/checkPlatform";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : "0"};
  flex: 1;
  background: #f4f5f7;
  padding: 24px 24px;
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
  justify-content: "space-between";
  flex-direction: "row";
  gap: 140.25px;
  margin-bottom: 24px;
`;



export const ClassicationDropDownArea = styled.View`
  background: #f4f5f7;
  border-radius: 8px;
  border: 1px solid #cccccc;
`;

export const StatusDropDowArea = styled.View`
  background: #f4f5f7;
  border-radius: 8px;
  border: 1px solid #cccccc;
`;

export const StateDropDowArea = styled.View`
  background: #f4f5f7;
  border-radius: 8px;
  border: 1px solid #cccccc;
`;

