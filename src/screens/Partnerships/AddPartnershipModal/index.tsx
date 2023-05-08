import { Input, Modal, Text } from "@components";
import {
  ClassificationSelectOptions,
  stateSelectOptions,
  statusSelectOptions,
} from "@constants";
import { IModalPropsForm } from "@interfaces/partner.interface";
import { Picker } from "@react-native-picker/picker";
import partnershipRequests from "@requests/partnership.requests";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import {
  ClassicationDropDownArea,
  StateDropDowArea,
  StatusDropDowArea,
} from "./styles";
import { formatInput } from "@utils/formatInput";

export function AddPartnershipModal({
  visible,
  onClose,
  closeAfterUpdate,
}: IModalPropsForm) {
  const [partnership, setPartnership] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [state, setState] = useState<string>();
  const [city, setCity] = useState<string>();
  const [membersCount, setMembersCount] = useState(0);
  const [phone, setPhone] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [classification, setClassification] = useState<string>();

  const [isLoading, setIsLoading] = useState(false);
  const [pickerFocused, setPickerFocused] = useState(false);

  async function handleSubmit() {
    if (!partnership || !status) {
      Alert.alert(
        "Opa!",
        "O nome e o status da parceria são campos obrigatórios. Por favor, preencha-os e tente novamente!",
      );
      return;
    }

    setIsLoading(true);
    await partnershipRequests.createPartnership(
      partnership,
      status,
      email,
      phone,
      state,
      city,
      classification,
      membersCount,
    );
    setIsLoading(false);
    closeAfterUpdate();
  }

  return (
    <Modal
      title="Adicionar nova parceria"
      visible={visible}
      isLoading={isLoading}
      onClose={() => {
        onClose();
        setPartnership(undefined);
        setEmail(undefined);
        setState(undefined);
        setCity(undefined);
        setMembersCount(0);
        setPhone(undefined);
        setStatus(undefined);
        setClassification(undefined);
      }}
      buttonTitle="Adicionar parceria"
      onPressButton={handleSubmit}
      content={
        <ScrollView style={{ height: "80%" }}>
          <View style={{ gap: 12 }}>
            <Input
              label="Parceria"
              placeholder="The Bugger Ducks"
              onChangeText={text => setPartnership(text)}
            />
            <Input
              label="E-mail"
              placeholder="nome@gmail.com"
              onChangeText={text => setEmail(text)}
            />

            <>
              <Text size={14} color={"#666666"} style={{ marginBottom: 8 }}>
                Classificação
              </Text>
              <ClassicationDropDownArea>
                <Picker
                  placeholder="Universidade"
                  selectedValue={classification}
                  onValueChange={itemValue => setClassification(itemValue)}
                  onFocus={() => setPickerFocused(true)}
                  onBlur={() => setPickerFocused(false)}
                >
                  <Picker.Item
                    color="#9A9A9A"
                    label="Universidades"
                    value=""
                    enabled={!pickerFocused}
                  />

                  {Object.keys(ClassificationSelectOptions).map(
                    classification => {
                      return (
                        <Picker.Item
                          key={classification}
                          label={classification}
                          value={classification}
                        />
                      );
                    },
                  )}
                </Picker>
              </ClassicationDropDownArea>
            </>

            <>
              <Text size={14} color={"#666666"} style={{ marginBottom: 8 }}>
                Status
              </Text>
              <StatusDropDowArea>
                <Picker
                  placeholder="status"
                  selectedValue={status}
                  onValueChange={itemValue => setStatus(itemValue)}
                >
                  <Picker.Item
                    color="#9A9A9A"
                    label="Em prospecção"
                    value=""
                    enabled={!pickerFocused}
                  />

                  {statusSelectOptions.map(status => {
                    return (
                      <Picker.Item
                        key={status.id}
                        label={status.description}
                        value={status.value}
                      />
                    );
                  })}
                </Picker>
              </StatusDropDowArea>
            </>

            <>
              <Text size={14} color={"#666666"} style={{ marginBottom: 8 }}>
                Estado
              </Text>
              <StateDropDowArea>
                <Picker
                  selectedValue={state}
                  onValueChange={itemValue => setState(itemValue)}
                >
                  <Picker.Item
                    color="#9A9A9A"
                    label="São Paulo"
                    value=""
                    enabled={!pickerFocused}
                  />

                  {stateSelectOptions.map(state => {
                    return (
                      <Picker.Item
                        key={state.UF}
                        label={state.name}
                        value={state.name}
                      />
                    );
                  })}
                </Picker>
              </StateDropDowArea>
            </>

            <Input
              label="Cidade"
              placeholder="São José dos campos"
              onChangeText={text => setCity(text)}
            />
            <Input
              label="Número de membros"
              placeholder="100"
              keyboardType="number-pad"
              onChangeText={text => setMembersCount(Number(text))}
            />
            <Input
              label="Telefone"
              keyboardType="phone-pad"
              placeholder="(12) 99454-3275"
              onChangeText={text => setPhone(formatInput(text, "phone"))}
            />
          </View>
        </ScrollView>
      }
    />
  );
}
