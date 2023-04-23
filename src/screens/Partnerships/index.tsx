import { Button, Header, Input, Loading, Tabs, Text } from "@components";
import { PropsStack } from "@custom-types/rootStackParamList";
import { IPartnership } from "@interfaces/partner.interface";
import { useNavigation } from "@react-navigation/native";
import partnershipRequests from "@requests/partnership.requests";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { AddPartnershipModal } from "./AddPartnershipModal";
import {
  ButtonView,
  Container,
  LoadingContainer,
  PartnerView,
  PartnershipsList,
  TabsContainer,
} from "./styles";

export function Partnerships() {
  const [visibleAddPartnershipModal, setVisibleAddPartnershipModal] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IPartnership[]>([]);
  const [filteredData, setFilteredData] = useState<IPartnership[]>([]);
  const [tab, setTab] = useState(0);

  const navigation = useNavigation<PropsStack>();

  async function getPartnerships() {
    setIsLoading(true);
    const partnerships: IPartnership[] =
      await partnershipRequests.getPartnerships(tab === 1);
    setData(partnerships);
    setFilteredData(partnerships);
    setIsLoading(false);
  }

  async function filterPartnership(name: string) {
    const filteredPartnerships = await partnershipRequests.getPartnerships(
      tab === 1,
      name,
    );
    setFilteredData(filteredPartnerships);
  }

  useEffect(() => {
    getPartnerships();
  }, [tab]);

  function handleCloseEditModal() {
    getPartnerships();
    setVisibleAddPartnershipModal(false);
  }

  return (
    <Container>
      <Header isHero={true} />
      <ButtonView>
        <Button
          type="unfilled"
          onPress={() => setVisibleAddPartnershipModal(true)}
        >
          Adicionar nova parceria
        </Button>
      </ButtonView>

      <TabsContainer>
        <Tabs
          tabHeaders={["Ativas", "Deletadas"]}
          onChangeTab={tab => setTab(tab)}
        />

        <Input
          label="Encontrar parceria"
          placeholder="The Bugger Ducks..."
          type="text"
          onChangeText={text => filterPartnership(text)}
        />

        <PartnershipsList>
          <Text style={{ marginBottom: 16 }}>Parcerias encontradas</Text>

          {isLoading ? (
            <LoadingContainer>
              <Loading />
            </LoadingContainer>
          ) : (
            <>
              {filteredData.length === 0 && (
                <View>
                  <Text
                    size={14}
                    color="#999999"
                    style={{ textAlign: "center", marginVertical: 24 }}
                  >
                    Não foi encontrada nenhuma parceria
                  </Text>
                </View>
              )}
              {filteredData?.map(({ name, classification, status, id }) => {
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
                    <Text color="#999999" size={14} numberOfLines={1}>
                      Status: <Text>{status}</Text>
                    </Text>
                  </PartnerView>
                );
              })}
            </>
          )}
        </PartnershipsList>
      </TabsContainer>

      <AddPartnershipModal
        visible={visibleAddPartnershipModal}
        onClose={() => setVisibleAddPartnershipModal(false)}
        closeAfterUpdate={() => handleCloseEditModal()}
      />
    </Container>
  );
}
