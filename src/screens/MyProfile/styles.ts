import styled from "styled-components/native";

import { isAndroid } from "@constants";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? "60px" : "0"};
  flex: 1;
  background: #f4f5f7;
  padding: 24px 24px;
`;
