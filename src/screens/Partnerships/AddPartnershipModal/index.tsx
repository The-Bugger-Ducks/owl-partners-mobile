import { Input, Modal, Text } from "@components";
import {
  ClassificationSelectOptions,
  stateSelectOptions,
  statusSelectOptions,
} from "@constants";
import { IModalPropsForm } from "@interfaces/partner.interface";
import partnershipRequests from "@requests/partnership.requests";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  ClassicationDropDownArea,
  StateDropDowArea,
  StatusDropDowArea,
} from "./styles";
import { IPartnership } from "@interfaces/partner.interface";

export function AddPartnershipModal({
  visible,
  onClose,
  closeAfterUpdate,
}: IModalPropsForm) {
  const [partnership, setPartnership] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [membersCount, setMembersCount] = useState(0);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [classification, setClassification] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [pickerFocused, setPickerFocused] = useState(false);

  async function handleSubmit() {
    if (!partnership) {
      Alert.alert(
        "Opa!",
        "O nome da parceria é obrigatório. Por favor, preencha o campo correspondente",
      );
      return;
    }
    if (!status) {
      Alert.alert(
        "Opa!",
        "O status da parceria é obrigatório. Por favor, preencha o campo correspondente",
      );
      return;
    }

    setIsLoading(true);

    const newPartnershipData: IPartnership = {
      name: partnership,
      email,
      phoneNumber: phone,
      state,
      city,
      classification,
      status,
      memberNumber: membersCount,
    };

    await partnershipRequests.createPartnership(newPartnershipData);

    setIsLoading(false);
    closeAfterUpdate();
  }

  return (
    <Modal
      title="Adicionar nova parceria"
      visible={visible}
      isLoading={isLoading}
      onClose={onClose}
      buttonTitle="Adicionar parceria"
      onPressButton={handleSubmit}
      content={
        <ScrollView>
          <View style={{ gap: 12 }}>
            <Text weight="500">Informações gerais</Text>

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
              <Text>Classificação</Text>
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
              <Text>Status</Text>
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
              <Text>Estado</Text>
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
              onChangeText={text => setPhone(text)}
            />
          </View>
        </ScrollView>
      }
    />
  );
}
