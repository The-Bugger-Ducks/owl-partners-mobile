import { Button, Header, Text, Card } from "@components";
import { ButtonsContainer, Container, MeetingContainer } from "./styles";
import { RootStackParamList } from "@custom-types/rootStackParamList";
import { IMeeting } from "@interfaces/meeting.interface";
import { RouteProp, useRoute } from "@react-navigation/native";
import meetingRequest from "@requests/meeting.request";
import { formatDate } from "@utils/formatDate";
import { formatTime } from "@utils/formatTime";
import { useEffect, useState } from "react";
import { View } from "react-native";

export function Home() {
  const [data, setData] = useState<IMeeting>();
  const [isLoading, setIsLoading] = useState(true);

  async function getMeetings() {
    setIsLoading(true);
    const meeting: IMeeting = await meetingRequest.getMeetigs();
    setData(meeting);
    setIsLoading(false);
  }

  useEffect(() => {
    getMeetings();
  });

  return (
    <Container>
      <Header isHero={true} />

      <ButtonsContainer>
        <Button type="unfilled" onPress={() => alert("Reunião!")}>
          Agendar reunião
        </Button>
        <Button
          onPress={() => alert("Usuários!")}
          style={{ marginVertical: 8 }}
        >
          Gerenciar usuários
        </Button>
      </ButtonsContainer>

      <MeetingContainer>
        <View>
          <Text>Proximas reuniões</Text>
          {data?.upcomingMeetings.map(
            ({
              id,
              title,
              description,
              meetingDateTime,
              Partner: { name, partnerId },
            }) => {
              const isEdited = meetingDateTime != meetingDateTime;
              return (
                <Card
                  id={partnerId}
                  key={id}
                  type={title ? "meeting" : "update"}
                  date={formatDate(meetingDateTime)}
                  time={formatTime(meetingDateTime)}
                  canEdit={true}
                  description={description}
                  title={title}
                  partner={name}
                />
              );
            },
          )}
        </View>

        <View>
          <Text>Ultimas reuniões</Text>
          {data?.pastMeetings.map(
            ({
              id,
              title,
              description,
              meetingDateTime,
              Partner: { name, partnerId },
            }) => {
              const isEdited = meetingDateTime != meetingDateTime;
              return (
                <Card
                  id={partnerId}
                  key={id}
                  type={title ? "meeting" : "meeting"}
                  date={formatDate(
                    isEdited ? meetingDateTime : meetingDateTime,
                  )}
                  time={formatTime(
                    isEdited ? meetingDateTime : meetingDateTime,
                  )}
                  description={description}
                  title={title}
                  partner={name}
                  canEdit={true}
                />
              );
            },
          )}
        </View>
      </MeetingContainer>
    </Container>
  );
}
