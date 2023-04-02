import { Button, Header, Text } from "@components";
import { PartnershipForm } from "@screens/PartnershipForm";
import { useEffect, useState } from "react";
import { Container, ButtonView, SearchView, PartnerView } from "./styles";
import partnerRequest from "../../shared/services/partner.request";
import { ScrollView } from "react-native";
import { CreatePartnerProps } from "src/shared/interfaces/partner.interface";

export function Partnerships() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [data, setData] = useState([]);

  const getPartner = async () => {
    const resp = await partnerRequest.List();
    return setData(resp);
  };

  useEffect(() => {
    getPartner();
  }, []);

  return (
    <Container>
      <Header isHero={true} />
      <ButtonView>
        <Button type="unfilled" onPress={() => setVisibleModal}>
          Adicionar nova parceria
        </Button>
      </ButtonView>

      <ScrollView>
        <SearchView>
          <Text>Parcerias encontradas</Text>
          {data.map(({ name, classification, status, id }) => {
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
      </ScrollView>
      <PartnershipForm
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
      />
    </Container>
  );
}
