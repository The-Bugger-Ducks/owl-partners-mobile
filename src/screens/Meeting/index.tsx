import { Button, Header, Input, Loading, Modal, Text } from "@components";
import { RootStackParamList } from "@custom-types/rootStackParamList";
import { IMeeting } from "@interfaces/meeting.interface";
import { RouteProp, useRoute } from "@react-navigation/native";
import meetingRequest from "@requests/meeting.request";
import { formatDate } from "@utils/formatDate";
import { formatTime } from "@utils/formatTime";
import { useEffect, useState } from "react";
import { View } from "react-native";
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
  const [updatedMeetingDate, setUpdatedMeetingDate] = useState("");
  const [updatedMeetingHour, setUpdatedMeetingHour] = useState("");
  const [updatedMeetingTheme, setUpdatedMeetingTheme] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const route = useRoute<RouteProp<RootStackParamList, "Meeting">>();
  const { id } = route.params;

  async function getData() {
    setIsLoading(true);
    const meetingData: IMeeting = await meetingRequest.getMeeting(id);
    setData(meetingData);
    setUpdatedMeetingDate(formatDate(meetingData.meetingDateTime));
    setUpdatedMeetingHour(formatTime(meetingData.meetingDateTime));
    setUpdatedMeetingTheme(meetingData.title);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [id]);

  async function handleDeleteMeeting() {
    setIsLoadingDelete(true);
    await meetingRequest.deleteMeeting(id);
    setIsLoadingDelete(false);
  }

  async function handleUpdateMeeting() {
    setIsLoading(true);
    const year = Number(updatedMeetingDate.split("/")[2]);
    const month = Number(updatedMeetingDate.split("/")[1]) - 1;
    const day = Number(updatedMeetingDate.split("/")[0]);
    const hours = Number(updatedMeetingHour.split(":")[0]);
    const minutes = Number(updatedMeetingHour.split(":")[1]);

    const meetingDate = new Date(year, month, day, hours, minutes);
    const dateTime = meetingDate.toISOString();

    const updatedData: IMeeting = await meetingRequest.updateMeeting(
      id,
      dateTime,
      updatedMeetingTheme,
    );
    setData(updatedData);
    setIsEditModalOpen(false);
    setIsLoading(false);
  }

  return (
    <Container>
      <View style={{ height: 40 }} />
      <Header />

      {isLoading ? (
        <View style={{ height: 80 }}>
          <Loading />
        </View>
      ) : (
        <InfoContainer>
          <>
            <Text>Informações da reunião</Text>
          </>
          {data && (
            <InfoCardContainer>
              <Text color="#EF4444" size={14} weight="500" numberOfLines={1}>
                {data.Partner.name} |{" "}
                <Text size={14} weight="500">
                  {data.title}
                </Text>
              </Text>
              <Text color="#999999" size={12} weight="500" numberOfLines={1}>
                Agendada para {formatDate(data.meetingDateTime)} às{" "}
                {formatTime(data.meetingDateTime)}
              </Text>
            </InfoCardContainer>
          )}
        </InfoContainer>
      )}

      <ButtonsContainer>
        <Button type="unfilled" onPress={handleDeleteMeeting}>
          {isLoadingDelete ? <Loading /> : "   Deletar reunião"}
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
            {data && (
              <>
                <Input
                  label="Data"
                  value={updatedMeetingDate}
                  onChangeText={text => setUpdatedMeetingDate(text)}
                />
                <Input
                  label="Hora"
                  value={updatedMeetingHour}
                  onChangeText={text => setUpdatedMeetingHour(text)}
                />
                <Input
                  label="Tema (opcional)"
                  value={updatedMeetingTheme}
                  onChangeText={text => setUpdatedMeetingTheme(text)}
                />
              </>
            )}
          </ModalContent>
        }
      />
    </Container>
  );
}
