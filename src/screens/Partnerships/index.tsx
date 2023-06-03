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
  FilterContainer,
  LoadingContainer,
  PartnerView,
  PartnershipsList,
  TabsContainer,
} from "./styles";
import { PartnerStatus } from "@interfaces/partner.interface";
import { FilterPartnershipModal } from "./FilterPartnershipModal";

export function Partnerships() {
  const [visibleAddPartnershipModal, setVisibleAddPartnershipModal] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IPartnership[]>([]);
  const [filteredData, setFilteredData] = useState<IPartnership[]>([]);
  const [tab, setTab] = useState(0);
  const [searchPartner, setSearchPartner] = useState("");
  const [filterStatusPartner, setFilterStatusPartner] = useState<
    PartnerStatus | ""
  >("");
  const [filterPartnerStatusVisible, setFilterPartnerStatusVisible] =
    useState(false);

  const navigation = useNavigation<PropsStack>();

  async function getPartnerships() {
    setIsLoading(true);
    const partnerships = await partnershipRequests.getPartnerships(tab === 1);
    setData(partnerships ?? []);
    setFilteredData(partnerships ?? []);
    setIsLoading(false);
  }

  async function filterPartnership(name: string, status: PartnerStatus | "") {
    setSearchPartner(name);
    const isPartnershipDisabledTab = tab === 1;
    const filteredPartnerships = await partnershipRequests.getPartnerships(
      isPartnershipDisabledTab,
      name,
      status,
    );
    setFilteredData(filteredPartnerships ?? []);
  }

  useEffect(() => {
    filterPartnership(searchPartner, filterStatusPartner);
  }, [tab]);

  function handleCloseEditModal() {
    getPartnerships();
    setVisibleAddPartnershipModal(false);
  }

  function handleFilterPartner(status: PartnerStatus | null) {
    setFilterStatusPartner(status ?? "");
    filterPartnership(searchPartner, status ?? "");
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

        <FilterContainer>
          <Input
            label="Encontrar parceria"
            placeholder="The Bugger Ducks..."
            onChangeText={text => filterPartnership(text, filterStatusPartner)}
            hasOutIcon
            onPressIcon={() => setFilterPartnerStatusVisible(true)}
            icon="filter"
          />
          <FilterPartnershipModal
            visible={filterPartnerStatusVisible}
            onClose={() => setFilterPartnerStatusVisible(false)}
            onFilter={handleFilterPartner}
          />
        </FilterContainer>

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
                    onPress={() =>
                      navigation.navigate("Partnership", { id: id ?? "" })
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
