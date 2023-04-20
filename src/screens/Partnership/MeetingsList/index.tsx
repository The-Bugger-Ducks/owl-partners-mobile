import { Card, Loading, Text } from "@components";
import { RootStackParamList } from "@custom-types/rootStackParamList";
import { IMeeting } from "@interfaces/meeting.interface";
import { RouteProp, useRoute } from "@react-navigation/native";
import meetingRequest from "@requests/meeting.request";
import { formatDate } from "@utils/formatDate";
import { formatTime } from "@utils/formatTime";
import { useEffect, useState } from "react";
import { View } from "react-native";

interface MeetingListyProps {
  isPartnershipDisabled: boolean;
}

export function MeetingsList({ isPartnershipDisabled }: MeetingListyProps) {
  const route = useRoute<RouteProp<RootStackParamList, "Partnership">>();
  const [data, setData] = useState<IMeeting>();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = route.params;

  async function getMeetings() {
    setIsLoading(true);
    const meeting: IMeeting = await meetingRequest.getPartnerMeetigs(id);
    console.log(meeting);

    setData(meeting);
    setIsLoading(false);
  }

  useEffect(() => {
    getMeetings();
  }, [id]);

  return (
    <View>
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
        <View>
          <Text>Proximas reuniões</Text>
          {data?.upcomingMeetings.map(
            ({ id, title, description, meetingDateTime, name }) => {
              const isEdited = meetingDateTime != meetingDateTime;
              return (
                <Card
                  id={id}
                  key={id}
                  type={title ? "meeting" : "update"}
                  date={formatDate(
                    isEdited ? meetingDateTime : meetingDateTime,
                  )}
                  time={formatTime(
                    isEdited ? meetingDateTime : meetingDateTime,
                  )}
                  isDisabled={isPartnershipDisabled}
                  description={description}
                  title={title}
                  partner={name}
                  isInHomepage={false}
                />
              );
            },
          )}
        </View>
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
        <View>
          <Text>Ultimas reuniões</Text>
          {data?.pastMeetings.map(
            ({ id, title, description, meetingDateTime, name }) => {
              const isEdited = meetingDateTime != meetingDateTime;
              return (
                <Card
                  id={id}
                  key={id}
                  type={title ? "meeting" : "update"}
                  date={formatDate(
                    isEdited ? meetingDateTime : meetingDateTime,
                  )}
                  time={formatTime(
                    isEdited ? meetingDateTime : meetingDateTime,
                  )}
                  isDisabled={isPartnershipDisabled}
                  description={description}
                  title={title}
                  partner={name}
                  isInHomepage={false}
                />
              );
            },
          )}
        </View>
      )}
    </View>
  );
}
