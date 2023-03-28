import { Button, Header, Text } from "@components";
import { PartnershipForm } from "@screens/PartnershipForm";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Container, ButtonView, SearchView, PartnerView } from "./styles";

export function CreatePartnership() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://owlpartners.onrender.com/partners", {})
      .then(response => response.json())
      .then(setData);
  }, []);

  return (
    <Container>
      <Header isHero={true} />

      <ButtonView>
        <Button type="unfilled" onPress={() => setVisibleModal(true)}>
          Adicionar nova parceria
        </Button>
      </ButtonView>

      <SearchView>
        <Text>Parcerias encontradas</Text>
        {data.map(partner => {
          const { name, classification, status, id } = partner;
          return (
            <PartnerView key={id}>
              <Text>
                {classification} | {name}
              </Text>
              <Text>Status: {status}</Text>
            </PartnerView>
          );
        })}
      </SearchView>

      <PartnershipForm
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
      />
    </Container>
  );
}
