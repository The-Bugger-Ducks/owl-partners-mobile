import { StatusBar } from "react-native";
import styled from "styled-components/native";
import { isAndroid } from "@constants";

export const Container = styled.TouchableOpacity`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : "0"};
`;
