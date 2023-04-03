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

export const DropDownArea = styled.View`
  width: 100%;
  height: 480px;
  border-radius: 10px;
  margin-top: 15px;
  background-color: #fff
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  align-self: center;
  margin-bottom: 10px;
  line-height: 1.5px;
  padding: 10px;
`;

export const StatusTypeText = styled.Text`
  width: 85%;
  height: 40px;
  border-bottom-width: 0.2px;
  border-bottom-color: #8e8e8e;
  align-self: center;
  padding: 3px;
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
