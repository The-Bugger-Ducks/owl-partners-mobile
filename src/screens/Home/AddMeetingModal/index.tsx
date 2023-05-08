import { Input, Modal, Text } from "@components";
import { IPartnership } from "@interfaces/partner.interface";
import { Picker } from "@react-native-picker/picker";
import meetingRequest from "@requests/meeting.request";
import partnershipRequests from "@requests/partnership.requests";
import { formatDateISO } from "@utils/formatDateISO";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { PartnershipDropDownArea } from "./styles";
import { formatInput } from "@utils/formatInput";

interface AddMeetingModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AddMeetingModal({ visible, onClose }: AddMeetingModalProps) {
  const [partnership, setPartnership] = useState("");
  const [pickerFocused, setPickerFocused] = useState(false);
  const [partnerships, setPartnerships] = useState<IPartnership[]>([]);

  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [theme, setTheme] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function getPartnerships() {
    const data = await partnershipRequests.getPartnerships();
    setPartnerships(data ?? []);
  }

  useEffect(() => {
    getPartnerships();
  }, []);

  async function handleSubmit() {
    setIsLoading(true);
    await meetingRequest.createMeeting(
      partnership,
      formatDateISO(date, hour),
      theme,
    );
    setPartnership("");
    setDate("");
    setHour("");
    setTheme("");
    setIsLoading(false);
    onClose();
  }

  return (
    <Modal
      title="Agendar reunião"
      visible={visible}
      isLoading={isLoading}
      onClose={() => {
        setPartnership("");
        setDate("");
        setHour("");
        setTheme("");
        onClose();
      }}
      buttonTitle="Agendar reunião"
      onPressButton={handleSubmit}
      content={
        <ScrollView>
          <View style={{ gap: 12 }}>
            <>
              <Text>Parceria</Text>
              <PartnershipDropDownArea>
                <Picker
                  placeholder="Escolha uma parceria"
                  selectedValue={partnership}
                  onValueChange={itemValue => setPartnership(itemValue)}
                  onFocus={() => setPickerFocused(true)}
                  onBlur={() => setPickerFocused(false)}
                >
                  <Picker.Item
                    color="#9A9A9A"
                    label="Escolha uma parceria"
                    value=""
                    enabled={!pickerFocused}
                  />
                  {partnerships.map(option => {
                    return (
                      <Picker.Item
                        key={option.id}
                        label={option.name}
                        value={option.id}
                      />
                    );
                  })}
                </Picker>
              </PartnershipDropDownArea>
            </>
            <Input
              label="Data"
              placeholder="21/07/2023"
              maxLength={10}
              value={date}
              onChangeText={text => setDate(formatInput(text, "date"))}
            />
            <Input
              label="Hora"
              placeholder="16:00"
              maxLength={5}
              value={hour}
              onChangeText={text => setHour(formatInput(text, "hour"))}
            />
            <Input
              label="Tema (opcional)"
              onChangeText={text => setTheme(text)}
            />
          </View>
        </ScrollView>
      }
    />
  );
}
