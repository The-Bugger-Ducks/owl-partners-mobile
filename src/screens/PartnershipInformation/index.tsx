import { Button, Header, Text } from "@components";
import { PartnershipEdit } from "@screens/PartnershipEdit";
import { useState } from "react";
import { View } from "react-native";
import { ContactView, Container, InformationView } from "./styles";

const partner = {
  partner: "USP",
  classification: "Universidade",
  location: "São Paulo, Brasil",
  address: "Rua 10, 123",
  membersQuantity: "100",
  email: "usp@gmail.com",
  phoneNumber: "(12)99464-4356",
  status: "Em prospecção",
};

export function PartnershipInformation() {
  const [visibleModal, setVisibleModal] = useState(false);
  return (
    <Container>
      <Header />
      <View>
        <Text>Informação da parceria</Text>
      </View>

      <InformationView>
        <Text>
          {partner.classification} | {partner.partner}
        </Text>
        <Text>Status: {partner.status} </Text>
        <Text>Quantidade de menbros: {partner.membersQuantity}</Text>
        <Text>Localização: {partner.location}</Text>
      </InformationView>

      <ContactView>
        <Text>E-mail: {partner.email} </Text>
        <Text>Telefone: {partner.phoneNumber}</Text>
      </ContactView>

      <Button type="unfilled">Deletar parceria</Button>
      <Button type="filled" onPress={() => setVisibleModal(true)}>
        Editar parceria
      </Button>
      <PartnershipEdit
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
      />
    </Container>
  );
}
