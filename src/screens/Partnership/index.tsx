import { Button, Header, Tabs, Text } from "@components";
import { RootStackParamList } from "@custom-types/rootStackParamList";
import { IPartnership } from "@interfaces/partner.interface";
import { RouteProp, useRoute } from "@react-navigation/native";
import partnershipRequests from "@requests/partnership.requests";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { AnnotationsList } from "./AnnotationsList";
import { EditPartnershipModal } from "./EditPartnershipModal";
import { MeetingsList } from "./MeetingsList";
import {
  ButtonsContainer,
  ContactView,
  Container,
  HistoryContainer,
  InformationView,
  PartnerInfoView,
} from "./styles";

export function Partnership() {
  const [tab, setTab] = useState(0);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [data, setData] = useState<IPartnership>();
  const [isLoading, setIsLoading] = useState(true);
  const [isPartnerDisable, setIsPartnerDisable] = useState(false);

  const route = useRoute<RouteProp<RootStackParamList, "Partnership">>();

  const { id } = route.params;

  async function getPartnerships() {
    setIsLoading(true);
    const partnerships = await partnershipRequests.getPartnership(id);
    setData(partnerships);
    setIsLoading(false);
  }

  useEffect(() => {
    getPartnerships();
  }, []);

  function handleCloseEditModal() {
    getPartnerships();
    setVisibleEditModal(false);
  }

  async function handleDeletePartnership() {
    await partnershipRequests.deletePartnership(id);
    getPartnerships();
  }

  return (
    <Container>
      <Header />
      <ScrollView>
        {!data?.disabled ? (
          <ButtonsContainer>
            <Button type="unfilled" onPress={handleDeletePartnership}>
              Deletar parceria
            </Button>
            <Button
              onPress={() => setVisibleEditModal(true)}
              style={{ marginVertical: 8 }}
            >
              Editar informações
            </Button>
          </ButtonsContainer>
        ) : null}
        <PartnerInfoView>
          <View>
            <Text>Informação da parceria</Text>
          </View>
          <InformationView>
            <Text color="#EF4444" size={14} weight="500" numberOfLines={1}>
              {data?.classification} |{" "}
              <Text size={14} weight="500">
                {data?.name}
              </Text>
            </Text>
            <Text color="#999999" size={16} weight="400" numberOfLines={1}>
              Status:{" "}
              <Text size={16} weight="400">
                {data?.status}
              </Text>
            </Text>
            <Text color="#999999" size={16} weight="400" numberOfLines={1}>
              Quantidade de membros :{" "}
              <Text size={16} weight="400">
                {data?.memberNumber}
              </Text>
            </Text>
            <Text color="#999999" size={16} weight="400" numberOfLines={1}>
              Localização:{" "}
              <Text size={16} weight="400">
                {data?.state}
              </Text>
            </Text>
          </InformationView>
          <ContactView>
            <Text color="#000000" weight="500">
              Informações de contato
            </Text>

            <Text color="#999999" size={16} weight="400" numberOfLines={1}>
              E-mail:{" "}
              <Text size={16} weight="400">
                {data?.email}{" "}
              </Text>
            </Text>
            <Text color="#999999" size={16} weight="400" numberOfLines={1}>
              Telefone:{" "}
              <Text size={16} weight="400">
                {data?.phoneNumber}
              </Text>
            </Text>
          </ContactView>
          {data?.disabled ? (
            <Text
              size={12}
              weight="500"
              style={{
                padding: 24,
                margin: 24,
                backgroundColor: "#FFFFFF",
                borderRadius: 8,
              }}
            >
              Essa parceria foi deletada e, portanto, não pode ser modificada.
            </Text>
          ) : null}

          {data && (
            <EditPartnershipModal
              visible={visibleEditModal}
              onClose={() => setVisibleEditModal(false)}
              closeAfterUpdate={() => handleCloseEditModal()}
              partnerProps={data}
            />
          )}
        </PartnerInfoView>

        <HistoryContainer>
          <Tabs onChangeTab={tab => setTab(tab)} />
          {tab === 0 ? (
            <AnnotationsList
              isPartnershipDisabled={isLoading || (data?.disabled ?? false)}
            />
          ) : (
            <MeetingsList
              isPartnershipDisabled={isLoading || (data?.disabled ?? false)}
            />
          )}
        </HistoryContainer>
      </ScrollView>
    </Container>
  );
}
