import React from "react";

import { useNavigation } from "@react-navigation/native";

import { Icon } from "@components";
import { Container } from "./styles";

export function CustomHeaderTitle() {
  const navigation = useNavigation();

  return (
    <Container onPress={navigation.goBack}>
      <Icon icon="arrow-left" size={18} />
    </Container>
  );
}
