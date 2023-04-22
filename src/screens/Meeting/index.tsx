import { Button, Header, Input, Modal, Text } from "@components";
import { RootStackParamList } from "@custom-types/rootStackParamList";
import { IMeeting } from "@interfaces/meeting.interface";
import { RouteProp, useRoute } from "@react-navigation/native";
import meetingRequest from "@requests/meeting.request";
import { formatDate } from "@utils/formatDate";
import { formatTime } from "@utils/formatTime";
import { useEffect, useState } from "react";
import {
  ButtonsContainer,
  Container,
  InfoCardContainer,
  InfoContainer,
  ModalContent,
} from "./styles";

export function Meeting() {
  const [data, setData] = useState<IMeeting>();
  const [isLoading, setIsLoading] = useState(true);
  const [updatedMeeting, setUpdatedMeeting] = useState<IMeeting>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const route = useRoute<RouteProp<RootStackParamList, "Meeting">>();
  const { id } = route.params;

  async function getData() {
    setIsLoading(true);
    const meetingData = await meetingRequest.getMeeting(id);
    setData(meetingData);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [id]);

  async function handleDeleteMeeting() {
    await meetingRequest.deleteMeeting(id);
  }

  async function handleUpdateMeeting() {
    const updatedData = await meetingRequest.updateMeeting(updatedMeeting!);
    setData(updatedData);
  }

  return (
    <Container>
      <Header />

      {data && (
        <InfoContainer>
          <>
            <Text>Informações da reunião</Text>
          </>
          <InfoCardContainer>
            <Text color="#EF4444" size={14} weight="500" numberOfLines={1}>
              {data?.Partner.name} |{" "}
              <Text size={14} weight="500">
                {data?.title}
              </Text>
            </Text>
            <Text color="#999999" size={12} weight="500" numberOfLines={1}>
              Agendada para {formatDate(data?.meetingDateTime)} às{" "}
              {formatTime(data?.meetingDateTime)}
            </Text>
          </InfoCardContainer>
        </InfoContainer>
      )}

      <ButtonsContainer>
        <Button type="unfilled" onPress={handleDeleteMeeting}>
          Deletar reunião
        </Button>
        <Button
          onPress={() => setIsEditModalOpen(true)}
          style={{ marginVertical: 8 }}
        >
          Editar reunião
        </Button>
      </ButtonsContainer>

      {/* <AnnotationsListContainer>
        <AnnotationsList data={data?.meetingComments} />
      </AnnotationsListContainer> */}

      <Modal
        visible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={"Editar reunião"}
        buttonTitle="Editar reunião"
        onPressButton={handleUpdateMeeting}
        isLoading={isLoading}
        content={
          <ModalContent>
            <Input
              label="Data"
              value={formatDate(data!.meetingDateTime!)}
              onChangeText={text => console.log(text)}
            />
            <Input
              label="Hora"
              value={formatTime(data!.meetingDateTime!)}
              onChangeText={text => console.log(text)}
            />
            <Input
              label="Tema (opcional)"
              value={data!.title}
              onChangeText={text => console.log(text)}
            />
          </ModalContent>
        }
      />
    </Container>
  );
}
