import { Button, Header, Loading, Text } from "@components";
import { useNavigation } from "@react-navigation/native";
import { PartnershipForm } from "@screens/PartnershipForm";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import partnerRequest from "../../shared/services/partner.request";
import {
  ButtonView,
  Container,
  LoadingContainer,
  PartnerView,
  SearchView,
} from "./styles";

export function Partnerships() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  async function getPartnerships() {
    setIsLoading(true);
    const partnerships = await partnerRequest.List();
    setData(partnerships);
    setIsLoading(false);
  }

  useEffect(() => {
    getPartnerships();
  }, []);

  return (
    <Container>
      <Header isHero={true} />
      <ButtonView>
        <Button type="unfilled" onPress={() => setVisibleModal(true)}>
          Adicionar nova parceria
        </Button>
      </ButtonView>

      <ScrollView>
        <SearchView>
          <Text>Parcerias encontradas</Text>
          {isLoading ? (
            <LoadingContainer>
              <Loading />
            </LoadingContainer>
          ) : (
            data?.map(({ name, classification, status, id }) => {
              return (
                <PartnerView
                  key={id}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("Partnership", {
                      partnershipId: id,
                    })
                  }
                >
                  <Text
                    color="#EF4444"
                    size={12}
                    weight="500"
                    numberOfLines={1}
                  >
                    {classification} |{" "}
                    <Text size={12} weight="500">
                      {name}
                    </Text>
                  </Text>
                  <Text
                    color="#999999"
                    size={14}
                    weight="400"
                    numberOfLines={1}
                  >
                    Status:{" "}
                    <Text size={14} weight="400">
                      {status}
                    </Text>
                  </Text>
                </PartnerView>
              );
            })
          )}
        </SearchView>
      </ScrollView>
      <PartnershipForm
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
      />
    </Container>
  );
}
