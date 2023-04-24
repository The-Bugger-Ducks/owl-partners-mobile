import { Drop, Modal, Text } from "@components";
import {
  ClassificationSelectOptions,
  stateSelectOptions,
  statusSelectOptions,
} from "@constants";
import { IModalPropsForm, IPartnership } from "@interfaces/partner.interface";
import partnershipRequests from "@requests/partnership.requests";
import { Key, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  ClassicationDropDownArea,
  Container,
  StateDropDowArea,
  StatusDropDowArea,
  TextInput,
} from "./styles";

export function AddPartnershipModal({
  visible,
  onClose,
  closeAfterUpdate,
}: IModalPropsForm) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPartnership>();

  const [selectStatus, setSelectStatus] = useState("");
  const [selectStates, setSelectStates] = useState("");
  const [selectClassification, setSelectClassification] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [pickerFocused, setPickerFocused] = useState(false);

  const onSubmit: SubmitHandler<IPartnership> = async payload => {
    const data = {
      ...payload,
      memberNumber: Number(payload.memberNumber),
    };

    try {
      setIsLoading(true);
      await partnershipRequests.createPartnership(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    closeAfterUpdate();
  };

  return (
    <Modal
      title="Adicionar nova parceria"
      visible={visible}
      isLoading={isLoading}
      onClose={onClose}
      buttonTitle="Adicionar parceria"
      onPressButton={handleSubmit(onSubmit)}
      content={
        <ScrollView>
          <View style={{ gap: 12 }}>
            <Text weight="500">Informações gerais</Text>

            <Controller
              control={control}
              name="name"
              rules={{ required: "informe o nome do parceiro" }}
              render={({ field: { onChange } }) => (
                <>
                  <Text>Parceria</Text>
                  <TextInput
                    placeholder="The Bugger Ducks"
                    onChangeText={onChange}
                  />
                  {errors.name && <Text>Este campo é obrigatório</Text>}
                </>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange } }) => (
                <>
                  <Text>E-mail</Text>
                  <TextInput
                    placeholder="nome@gmail.com"
                    onChangeText={onChange}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name="classification"
              render={({ field: { onChange } }) => (
                <>
                  <Text>Classificação</Text>
                  <ClassicationDropDownArea>
                    <Picker
                      placeholder="Universidade"
                      selectedValue={selectClassification}
                      onValueChange={itemValue => {
                        setSelectClassification(itemValue), onChange(itemValue);
                      }}
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
                            ></Picker.Item>
                          );
                        },
                      )}
                    </Picker>
                  </ClassicationDropDownArea>
                </>
              )}
            />

            <Controller
              control={control}
              name="status"
              rules={{ required: "informe o status da parceria" }}
              render={({ field: { onChange } }) => (
                <>
                  <Text>Status</Text>
                  <StatusDropDowArea>
                    <Picker
                      placeholder="status"
                      selectedValue={selectStatus}
                      onValueChange={itemValue => {
                        setSelectStatus(itemValue), onChange(itemValue);
                      }}
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
                          ></Picker.Item>
                        );
                      })}
                    </Picker>
                  </StatusDropDowArea>
                  {errors.status && <Text>Este campo é obrigatório</Text>}
                </>
              )}
            />

            <Controller
              control={control}
              name="state"
              render={({ field: { onChange } }) => (
                <View>
                  <Text>Estado</Text>
                  <StateDropDowArea>
                    <Picker
                      selectedValue={selectStates}
                      onValueChange={itemValue => {
                        setSelectStates(itemValue), onChange(itemValue);
                      }}
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
                </View>
              )}
            />

            <Controller
              control={control}
              name="city"
              render={({ field: { onChange } }) => (
                <>
                  <Text>Cidade</Text>
                  <TextInput
                    placeholder="São José dos campos"
                    onChangeText={onChange}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name="zipCode"
              render={({ field: { onChange } }) => (
                <>
                  <Text>CEP</Text>
                  <TextInput placeholder="12654-356" onChangeText={onChange} />
                </>
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field: { onChange } }) => (
                <>
                  <Text>Endereço</Text>
                  <TextInput
                    placeholder="Rua 21, 123"
                    onChangeText={onChange}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name="memberNumber"
              render={({ field: { onChange } }) => (
                <>
                  <Text>Número de membros</Text>
                  <TextInput
                    placeholder="100"
                    keyboardType="number-pad"
                    onChangeText={onChange}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange } }) => (
                <>
                  <Text>Telefone</Text>
                  <TextInput
                    keyboardType="phone-pad"
                    placeholder="(12)99454-3275"
                    onChangeText={onChange}
                  />
                </>
              )}
            />
          </View>
        </ScrollView>
      }
    />
  );
}
