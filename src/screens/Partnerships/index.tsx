import { Button, Header, Text } from "@components";
import { PartnershipForm } from "@screens/PartnershipForm";
import { useState } from "react";
import { ButtonView, Container, SearchView } from "./styles";

export function Partnerships() {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <Container>
      <Header isHero />

      <ButtonView>
        <Button type="unfilled" onPress={() => setVisibleModal(true)}>
          Adicionar nova parceria
        </Button>
      </ButtonView>

      <SearchView>
        <Text>Parcerias encontradas</Text>
      </SearchView>

      <PartnershipForm
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
      />
    </Container>
  );
}
