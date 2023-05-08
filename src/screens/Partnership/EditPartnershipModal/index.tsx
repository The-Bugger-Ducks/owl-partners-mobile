import { Icon, Input, Modal, Text } from "@components";
import {
  ClassificationSelectOptions,
  stateSelectOptions,
  statusSelectOptions,
} from "@constants";
import {
  IModalPropsEdit,
  IPartnershipEdit,
} from "@interfaces/partner.interface";
import { Picker } from "@react-native-picker/picker";
import partnershipRequests from "@requests/partnership.requests";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { AddPartnerView, Container, SelectArea } from "./styles";
import { getPartnerStatusEnumByValue } from "@utils/handlers/formatEnumsPartner";
import { formatInput } from "@utils/formatInput";

export function EditPartnershipModal({
  visible,
  onClose,
  closeAfterUpdate,
  partnerProps,
}: IModalPropsEdit) {
  const [isLoading, setIsLoading] = useState(false);

  const [partnershipName, setPartnershipName] = useState(
    partnerProps.name ?? "",
  );
  const [email, setEmail] = useState(partnerProps.email ?? "");
  const [status, setStatus] = useState(
    getPartnerStatusEnumByValue(partnerProps.status)?.statusKey ??
      partnerProps.status,
  );
  const [city, setCity] = useState(partnerProps.city);
  const [membersCount, setMembersCount] = useState(
    partnerProps.memberNumber ?? "",
  );
  const [phone, setPhone] = useState(partnerProps.phoneNumber ?? "");
  const [state, setState] = useState(partnerProps.state ?? "");
  const [classification, setClassification] = useState(
    partnerProps.classification ?? "",
  );

  async function handleSubmit() {
    const partnershipEditted: IPartnershipEdit = {
      memberNumber: membersCount,
      city,
      classification,
      email,
      name: partnershipName,
      phoneNumber: phone,
      state,
      status,
    };

    setIsLoading(true);
    await partnershipRequests.updatePartnership(
      partnershipEditted,
      partnerProps.id!,
    );
    setIsLoading(false);
    closeAfterUpdate();
  }

  return (
    <Modal
      title="Editar parceria"
      onClose={onClose}
      isLoading={isLoading}
      visible={visible}
      buttonTitle="Editar parceria"
      onPressButton={handleSubmit}
      content={
        <ScrollView style={{ height: "80%" }}>
          <Container>
            <Input
              label="Parceria"
              defaultValue={partnershipName}
              placeholder="The Bugger Ducks"
              onChangeText={text => setPartnershipName(text)}
            />
            <Input
              label="E-mail"
              defaultValue={email}
              placeholder="nome@gmail.com"
              onChangeText={text => setEmail(text)}
            />
            <>
              <Text size={14} color={"#666666"} style={{ marginBottom: 8 }}>
                Classificação
              </Text>
              <SelectArea>
                <Picker
                  selectedValue={classification}
                  onValueChange={itemValue => setClassification(itemValue)}
                >
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
              </SelectArea>
            </>
            <>
              <Text size={14} color={"#666666"} style={{ marginBottom: 8 }}>
                Status
              </Text>
              <SelectArea>
                <Picker
                  placeholder="status"
                  selectedValue={status}
                  onValueChange={itemValue => setStatus(itemValue)}
                >
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
              </SelectArea>
            </>
            <>
              <Text size={14} color={"#666666"} style={{ marginBottom: 8 }}>
                Estado
              </Text>
              <SelectArea>
                <Picker
                  selectedValue={state}
                  onValueChange={itemValue => setState(itemValue)}
                >
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
              </SelectArea>
            </>
            <Input
              label="Cidade"
              defaultValue={city}
              placeholder="São José dos campos"
              onChangeText={text => setCity(text)}
            />
            <Input
              label="Número de membros"
              placeholder="100"
              keyboardType="number-pad"
              defaultValue={membersCount.toString()}
              onChangeText={text => setMembersCount(Number(text))}
            />
            <Input
              label="Telefone"
              keyboardType="phone-pad"
              placeholder="(12)99454-3275"
              defaultValue={phone}
              onChangeText={text => setPhone(formatInput(text, "phone"))}
            />
          </Container>
        </ScrollView>
      }
    />
  );
}
