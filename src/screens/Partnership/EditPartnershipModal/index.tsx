import { Close, Drop, Modal, Text } from "@components";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { AddPartnerView, Container, SelectArea, TextInput } from "./styles";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Key, useEffect, useState } from "react";
import { ClassificationSelectOptions } from "@constants";
import {
  IModalPropsEdit,
  IPartnership,
  IPartnershipEdit,
} from "@interfaces/partner.interface"
import { stateSelectOptions } from "@constants";
import { statusSelectOptions } from "@constants";
import { Picker } from "@react-native-picker/picker";
import partnershipRequests from "@requests/partnership.requests";

export function EditPartnershipModal({
  visible,
  onClose,
  closeAfterUpdate,
  partnerProps,
}: IModalPropsEdit) {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IPartnershipEdit>({
    mode: "onChange",
    defaultValues: partnerProps,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [selectStatus, setSelectStatus] = useState("");
  const [selectStates, setSelectStates] = useState("");
  const [selectClassification, setSelectClassification] = useState("");

  const onSubmit: SubmitHandler<IPartnershipEdit> = async payload => {
    const data = {
      memberNumber: Number(payload.memberNumber),

      address: payload.address,
      city: payload.city,
      classification: payload.classification,
      email: payload.email,
      name: payload.name,
      neighborhood: payload.neighborhood,
      phoneNumber: payload.phoneNumber,
      state: payload.state,
      status: payload.status,
      zipCode: payload.zipCode,
    };
    console.log(data);
    try {
      setIsLoading(true);
      await partnershipRequests.updatePartnership(data, partnerProps.id)
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    closeAfterUpdate();
  };

  useEffect(() => {
    if (partnerProps) {
      setValue("name", partnerProps["name"]),
        setValue("email", partnerProps["email"]),
        setValue("phoneNumber", partnerProps["phoneNumber"]),
        setValue("zipCode", partnerProps["zipCode"]),
        setValue("state", partnerProps["state"]),
        setValue("city", partnerProps["city"]),
        setValue("neighborhood", partnerProps["neighborhood"]),
        setValue("address", partnerProps["address"]),
        setValue("classification", partnerProps["classification"]),
        setValue("status", partnerProps["status"]),
        setValue("memberNumber", partnerProps["memberNumber"]);
    }
  }, [partnerProps]);

  return (
    <Modal
      title="Editar parceria"
      onClose={onClose}
      isLoading={isLoading}
      visible={visible}
      buttonTitle="Editar parceria"
      onPressButton={handleSubmit(onSubmit)}
      content={
        <ScrollView>
          <Container>
            <AddPartnerView
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text>Editar parceria</Text>

              <TouchableOpacity onPress={onClose}>
                <Close color="#666666" />
              </TouchableOpacity>
            </AddPartnerView>
            <Text weight="500">Informações gerais</Text>

            <Controller
              control={control}
              name="name"
              rules={{
                required: "informe o nome do parceiro",
              }}
              render={({ field }) => (
                <>
                  <Text>Parceria</Text>
                  <TextInput
                    {...field}
                    placeholder="The Bugger Ducks"
                    onChangeText={field.onChange}
                  />
                  {errors.name && <Text>Este campo é obrigatório</Text>}
                </>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <>
                  <Text>E-mail</Text>
                  <TextInput
                    {...field}
                    placeholder="nome@gmail.com"
                    onChangeText={field.onChange}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name="classification"
              render={({ field }) => (
                <>
                  <Text>Classificação</Text>
                  <SelectArea>
                    <Picker
                      selectedValue={field.value}
                      onValueChange={itemValue => {
                        setSelectClassification(itemValue),
                          field.onChange(itemValue);
                      }}
                    >
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
                  </SelectArea>
                </>
              )}
            />

            <Controller
              control={control}
              name="status"
              rules={{
                required: "informe o status da parceria",
              }}
              render={({ field }) => (
                <>
                  <Text>Status</Text>
                  <SelectArea>
                    <Picker
                      placeholder="status"
                      selectedValue={field.value}
                      onValueChange={itemValue => {
                        setSelectStatus(itemValue), field.onChange(itemValue);
                      }}
                    >
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
                  </SelectArea>
                  {errors.status && <Text>Este campo é obrigatório</Text>}
                </>
              )}
            />

            <Controller
              control={control}
              name="state"
              render={({ field }) => (
                <>
                  <Text>Estado</Text>
                  <SelectArea>
                    <Picker
                      selectedValue={field.value}
                      onValueChange={itemValue => {
                        setSelectStates(itemValue), field.onChange(itemValue);
                      }}
                    >
                      {stateSelectOptions.map(state => {
                        return (
                          <Picker.Item
                            key={state.UF}
                            label={state.name}
                            value={state.name}
                          ></Picker.Item>
                        );
                      })}
                    </Picker>
                  </SelectArea>
                </>
              )}
            />

            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <>
                  <Text>Cidade</Text>
                  <TextInput
                    {...field}
                    placeholder="São José dos campos"
                    onChangeText={field.onChange}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name="zipCode"
              render={({ field }) => (
                <>
                  <Text>CEP</Text>
                  <TextInput
                    {...field}
                    placeholder="12654-356"
                    onChangeText={field.onChange}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <>
                  <Text>Endereço</Text>
                  <TextInput
                    {...field}
                    placeholder="Rua 21, 123"
                    onChangeText={field.onChange}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name="memberNumber"
              render={({ field }) => (
                <>
                  <Text>Número de membros</Text>
                  <TextInput
                    value={`${field.value}`}
                    placeholder="100"
                    keyboardType="number-pad"
                    onChangeText={field.onChange}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <>
                  <Text>Telefone</Text>
                  <TextInput
                    {...field}
                    keyboardType="phone-pad"
                    placeholder="(12)99454-3275"
                    onChangeText={field.onChange}
                  />
                </>
              )}
            />
          </Container>
        </ScrollView>
      }
    />


  );
}
