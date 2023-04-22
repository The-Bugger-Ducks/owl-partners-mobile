import { Button, Card, Header, Loading, Text } from "@components";
import { PropsStack } from "@custom-types/rootStackParamList";
import { IMeetingsHome } from "@interfaces/meeting.interface";
import { useNavigation } from "@react-navigation/native";
import meetingRequest from "@requests/meeting.request";
import { formatDate } from "@utils/formatDate";
import { formatTime } from "@utils/formatTime";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ButtonsContainer, Container, MeetingContainer } from "./styles";

export function Home() {
  const [data, setData] = useState<IMeetingsHome>();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<PropsStack>();

  async function getMeetings() {
    setIsLoading(true);
    const meeting: IMeetingsHome = await meetingRequest.getMeetings();
    setData(meeting);
    setIsLoading(false);
  }

  useEffect(() => {
    getMeetings();
  }, []);

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
        <>
          <Text>Proximas reuniões</Text>
          {isLoading ? (
            <View style={{ height: 80, marginVertical: 16 }}>
              <Loading />
            </View>
          ) : (
            <View style={{ marginTop: 16 }}>
              {data?.upcomingMeetings.map(
                ({
                  id,
                  title,
                  description,
                  meetingDateTime,
                  Partner: { name, partnerId },
                }) => {
                  return (
                    <Card
                      id={partnerId}
                      key={id}
                      type={"meeting"}
                      date={formatDate(meetingDateTime)}
                      time={formatTime(meetingDateTime)}
                      canEdit={false}
                      description={description}
                      title={title}
                      partner={name}
                      onPress={() => navigation.navigate("Meeting", { id })}
                    />
                  );
                },
              )}
            </View>
          )}
        </>

        <>
          <Text>Ultimas reuniões</Text>
          {isLoading ? (
            <View style={{ height: 80, marginVertical: 16 }}>
              <Loading />
            </View>
          ) : (
            <View style={{ marginTop: 16 }}>
              {data?.pastMeetings.map(
                ({
                  id,
                  title,
                  description,
                  meetingDateTime,
                  Partner: { name, partnerId },
                }) => {
                  return (
                    <Card
                      id={partnerId}
                      key={id}
                      type={"meeting"}
                      date={formatDate(meetingDateTime)}
                      time={formatTime(meetingDateTime)}
                      description={description}
                      title={title}
                      partner={name}
                      canEdit={false}
                      onPress={() => navigation.navigate("Meeting", { id })}
                    />
                  );
                },
              )}
            </View>
          )}
        </>
      </MeetingContainer>
    </Container>
  );
}
