import { Button, Header, Loading, Tabs, Text } from "@components";
import { PropsStack } from "@custom-types/rootStackParamList";
import { IPartnership } from "@interfaces/partner.interface";
import { useNavigation } from "@react-navigation/native";
import partnershipRequests from "@requests/partnership.requests";
import { PartnershipForm } from "@screens/PartnershipForm";
import { useEffect, useState } from "react";
import {
  ButtonView,
  Container,
  LoadingContainer,
  PartnerView,
  PartnershipsList,
  TabsContainer,
} from "./styles";

export function Partnerships() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IPartnership[]>([]);
  const [tab, setTab] = useState(0);
  const navigation = useNavigation<PropsStack>();

  async function getPartnerships() {
    setIsLoading(true);
    const partnerships: IPartnership[] =
      await partnershipRequests.getPartnerships(tab === 1);
    setData(partnerships);
    setIsLoading(false);
  }

  useEffect(() => {
    getPartnerships();
  }, [tab]);

  function handleCloseEditModal() {
    getPartnerships();
    setVisibleModal(false);
  }

  return (
    <Container>
      <Header isHero={true} />
      <ButtonView>
        <Button type="unfilled" onPress={() => setVisibleModal(true)}>
          Adicionar nova parceria
        </Button>
      </ButtonView>

      <TabsContainer>
        <Tabs
          tabHeaders={["Ativas", "Deletadas"]}
          onChangeTab={tab => setTab(tab)}
        />

        <PartnershipsList>
          <Text style={{ marginBottom: 16 }}>Parcerias encontradas</Text>

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
                  onPress={() => navigation.navigate("Partnership", { id })}
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
        </PartnershipsList>
      </TabsContainer>

      <PartnershipForm
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
        closeAfterUpdate={() => handleCloseEditModal()}
      />
    </Container>
  );
}
