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

export const StatusView = styled.View`
  background: #f4f5f7;
  padding: 0px 16px;
  border-radius: 8px;
  border: 1px solid #cccccc;
  align-items: center;
  width: 345px;
  height: 56px;
`;

export const DropDowArea = styled.View`
  width: 100%;
  height: 450px;
  border-radius: 10px;
  margin-top: 15px;
  background-color: #fff;
  elevation: 3;
  align-self: center;
  margin-bottom: 10px;
`;

export const StateDropDowArea = styled.View`
  width: 100%;
  height: 450px;
  border-radius: 10px;
  margin-top: 15px;
  background-color: #fff;
  elevation: 3;
  align-self: center;
  margin-bottom: 10px;
`;

export const StatusTypeText = styled.Text`
  width: 85%;
  height: 40px;
  border-bottom-width: 0.2px;
  border-bottom-color: #8e8e8e;
  align-self: center;
  justify-content: center;
`;
