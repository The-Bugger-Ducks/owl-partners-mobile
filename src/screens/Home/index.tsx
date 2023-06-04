import { Button, Card, Header, Loading, Text } from "@components";
import { PropsStack } from "@custom-types/rootStackParamList";
import { IMeetingsHome } from "@interfaces/meeting.interface";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import meetingRequest from "@requests/meeting.request";
import { checkUserAdmin } from "@utils/checkUserAdmin";
import { formatDate } from "@utils/formatDate";
import { formatTime } from "@utils/formatTime";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { AddMeetingModal } from "./AddMeetingModal";
import { ButtonsContainer, Container, MeetingContainer } from "./styles";

export function Home() {
  const [data, setData] = useState<IMeetingsHome>();
  const [isLoading, setIsLoading] = useState(true);
  const [isAddMeetingModalOpen, setIsAddMeetingModalOpen] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  checkUserAdmin().then((userIsAdmin: boolean) => setIsAdmin(userIsAdmin));

  const navigation = useNavigation<PropsStack>();

  async function getMeetings() {
    setIsLoading(true);
    const meeting: IMeetingsHome = await meetingRequest.getMeetings();
    setData(meeting);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      getMeetings();
    }, []),
  );

  return (
    <Container>
      <Header isHero={true} />

      {isAdmin && (
        <ButtonsContainer>
          <Button
            type="unfilled"
            onPress={() => setIsAddMeetingModalOpen(true)}
          >
            Agendar reunião
          </Button>
          <Button
            onPress={() => navigation.navigate("User")}
            style={{ marginVertical: 8 }}
          >
            Gerenciar usuários
          </Button>
        </ButtonsContainer>
      )}

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
                      onPress={() => {
                        navigation.navigate("Meeting", { id });
                      }}
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
            <View style={{ marginVertical: 16 }}>
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
                      onPress={() => {
                        navigation.navigate("Meeting", { id });
                      }}
                    />
                  );
                },
              )}
            </View>
          )}
        </>

        <AddMeetingModal
          visible={isAddMeetingModalOpen}
          onClose={() => setIsAddMeetingModalOpen(false)}
        />
      </MeetingContainer>
    </Container>
  );
}
