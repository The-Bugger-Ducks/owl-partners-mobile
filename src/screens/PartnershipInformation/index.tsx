import { Button, Header, Text } from "@components";
import { PartnershipEdit } from "@screens/PartnershipEdit";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ContactView, Container, InformationView } from "./styles";
import partnerRequest from "src/shared/services/partner.request";
import { SubmitHandler } from "react-hook-form";
import { CreatePartnerProps } from "src/shared/interfaces/partner.interface";

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

export async function PartnershipInformation() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [data, setData] = useState<CreatePartnerProps>();

  useEffect(() => {
    fetch("https://owlpartners.onrender.com/partners/3f64eea9-38bb-48c5-a034-4e0f6c0a8870", {})
    .then(response => response.json())
    .then(setData);
}, []);

  return (
    <Container>
      <Header />
      <View>
        <Text>Informação da parceria</Text>
      </View>
      <InformationView>
        <Text>
          {data?.classification} | {data?.name}
        </Text>
        <Text>Status: {data?.status} </Text>
        <Text>Quantidade de menbros: {data?.memberNumber}</Text>
        <Text>Localização: {data?.state}</Text>
      </InformationView>

      <ContactView>
        <Text>E-mail: {data?.email} </Text>
        <Text>Telefone: {data?.phoneNumber}</Text>
      </ContactView>
      <PartnershipEdit
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
        partnerProps = {data}
      />
    </Container>
  );
}
