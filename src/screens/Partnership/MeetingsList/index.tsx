import { Card, Loading, Text } from "@components";
import { PropsStack } from "@custom-types/rootStackParamList";
import { IMeetingsHome } from "@interfaces/meeting.interface";
import { IPartnership } from "@interfaces/partner.interface";
import { useNavigation } from "@react-navigation/native";
import meetingRequest from "@requests/meeting.request";
import { formatDate } from "@utils/formatDate";
import { formatTime } from "@utils/formatTime";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

interface MeetingListyProps {
  partnershipId: string;
  partnerProps: IPartnership;
}

export function MeetingsList({
  partnershipId,
  partnerProps,
}: MeetingListyProps) {
  const [data, setData] = useState<IMeetingsHome>();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<PropsStack>();

  async function getMeetings() {
    setIsLoading(true);
    const meeting: IMeetingsHome = await meetingRequest.getPartnerMeetigs(
      partnershipId,
    );
    setData(meeting);
    setIsLoading(false);
  }

  useEffect(() => {
    getMeetings();
  }, [partnershipId]);

  return (
    <ScrollView>
      {isLoading ? (
        <View style={{ marginTop: 24 }}>
          <Loading />
        </View>
      ) : data?.upcomingMeetings?.length === 0 ? (
        <Text
          size={14}
          color={"#999999"}
          style={{ textAlign: "center", marginVertical: 24 }}
        >
          Não há proximas reuniões
        </Text>
      ) : (
        <>
          <Text>Proximas reuniões</Text>
          <View style={{ marginVertical: 16 }}>
            {data?.upcomingMeetings.map(
              ({
                id,
                title,
                description,
                Partner: { disabled },
                meetingDateTime,
              }) => {
                return (
                  <Card
                    id={id}
                    key={id}
                    type={title ? "meeting" : "update"}
                    date={formatDate(meetingDateTime)}
                    time={formatTime(meetingDateTime)}
                    canEdit={false}
                    description={description}
                    title={title}
                    partner={partnerProps.name}
                    onPress={() => {
                      partnerProps.disabled
                        ? null
                        : navigation.navigate("Meeting", { id });
                    }}
                  />
                );
              },
            )}
          </View>
        </>
      )}

      {isLoading ? (
        <View style={{ marginTop: 24 }}>
          <Loading />
        </View>
      ) : data?.pastMeetings?.length === 0 ? (
        <Text
          size={14}
          color={"#999999"}
          style={{ textAlign: "center", marginVertical: 24 }}
        >
          Não há reuniões passadas
        </Text>
      ) : (
        <>
          <Text>Ultimas reuniões</Text>
          <View style={{ marginVertical: 16 }}>
            {data?.pastMeetings.map(
              ({ id, title, description, meetingDateTime }) => {
                return (
                  <Card
                    id={id}
                    key={id}
                    type={title ? "meeting" : "update"}
                    date={formatDate(meetingDateTime)}
                    time={formatTime(meetingDateTime)}
                    canEdit={false}
                    description={description}
                    title={title}
                    partner={partnerProps.name}
                    onPress={() => {
                      partnerProps.disabled
                        ? null
                        : navigation.navigate("Meeting", { id });
                    }}
                  />
                );
              },
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}
