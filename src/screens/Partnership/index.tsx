import { Button, Header, Icon, Loading, Tabs, Text } from "@components";
import { RootStackParamList } from "@custom-types/rootStackParamList";
import { IPartnership } from "@interfaces/partner.interface";
import { RouteProp, useRoute } from "@react-navigation/native";
import partnershipRequests from "@requests/partnership.requests";
import { checkUserAdmin } from "@utils/checkUserAdmin";
import { formatInput } from "@utils/formatInput";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { AnnotationsList } from "./AnnotationsList";
import { EditPartnershipModal } from "./EditPartnershipModal";
import { MeetingsList } from "./MeetingsList";
import {
  AlertDisabledPartnershipContainer,
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

  const [isAdmin, setIsAdmin] = useState(false);
  checkUserAdmin().then((userIsAdmin: boolean) => setIsAdmin(userIsAdmin));

  const route = useRoute<RouteProp<RootStackParamList, "Partnership">>();
  const { id } = route.params;

  async function getPartnership() {
    setIsLoading(true);
    const partnerships = await partnershipRequests.getPartnership(id);
    setData(partnerships);
    setIsLoading(false);
  }

  useEffect(() => {
    getPartnership();
  }, []);

  function handleCloseEditModal() {
    getPartnership();
    setVisibleEditModal(false);
  }

  async function handleDeletePartnership() {
    await partnershipRequests.deletePartnership(id);
    getPartnership();
  }

  return (
    <Container>
      <Header />
      <ScrollView>
        {isLoading ? (
          <View style={{ height: 80 }}>
            <Loading />
          </View>
        ) : (
          <PartnerInfoView>
            <View>
              <Text>Informação da parceria</Text>
            </View>
            <InformationView>
              <Text color="#EF4444" size={14} weight="500">
                {data?.classification} |{" "}
                <Text size={14} weight="500">
                  {data?.name}
                </Text>
              </Text>
              <Text color="#999999" size={14} weight="400" numberOfLines={1}>
                Status:{" "}
                <Text size={14} weight="400">
                  {data?.status}
                </Text>
              </Text>
              <Text color="#999999" size={14} weight="400" numberOfLines={1}>
                Quantidade de membros:{" "}
                <Text size={14} weight="400">
                  {data?.memberNumber}
                </Text>
              </Text>
              <Text color="#999999" size={14} weight="400" numberOfLines={1}>
                Localização:{" "}
                <Text size={14} weight="400">
                  {data?.state}
                </Text>
              </Text>
            </InformationView>
            <ContactView>
              <Text color="#000000" weight="500">
                Informações de contato
              </Text>

              <Text color="#999999" size={14} weight="400" numberOfLines={1}>
                E-mail:{" "}
                <Text size={14} weight="400">
                  {data?.email}
                </Text>
              </Text>
              <Text color="#999999" size={14} weight="400" numberOfLines={1}>
                Telefone:{" "}
                <Text size={14} weight="400">
                  {formatInput(data?.phoneNumber ?? "", "phone")}
                </Text>
              </Text>
            </ContactView>

            {data && (
              <EditPartnershipModal
                visible={visibleEditModal}
                onClose={() => setVisibleEditModal(false)}
                closeAfterUpdate={() => handleCloseEditModal()}
                partnerProps={data}
              />
            )}
          </PartnerInfoView>
        )}

        {data?.disabled && (
          <AlertDisabledPartnershipContainer>
            <Icon icon="loading" />
            <Text size={12} weight="500" style={{ width: "90%" }}>
              Essa parceria foi deletada e, portanto, não pode ser modificada.
            </Text>
          </AlertDisabledPartnershipContainer>
        )}

        {!data?.disabled && isAdmin && (
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
        )}

        <HistoryContainer>
          <Tabs onChangeTab={tab => setTab(tab)} />
          {tab === 0 ? (
            <AnnotationsList
              isPartnershipDisabled={isLoading || (data?.disabled ?? false)}
              isAdmin={isAdmin}
            />
          ) : (
            data && <MeetingsList partnershipId={id} partnerProps={data} />
          )}
        </HistoryContainer>
      </ScrollView>
    </Container>
  );
}
