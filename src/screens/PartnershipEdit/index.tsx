import { Button, Close, Drop, Text } from "@components";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import {
  AddPartnerView,
  Container,
  SelectArea,
  TextInput,
} from "./styles";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { ClassificationSelectOptions } from "@utils/classificationSelectOptions";
import {
  IModalPropsEdit,
  IPartnership,
  IPartnershipEdit,
} from "../../shared/interfaces/partner.interface";
import { stateSelectOptions } from "@utils/stateSelectOptions";
import { statusSelectOptions } from "@utils/statusSelectOptions";
import PartnershipController from "@requests/PartnershipController";
import { Picker } from "@react-native-picker/picker";

export function PartnershipEdit({
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


  const [isLoading, setIsLoading] = useState(true);

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
      await PartnershipController.updatePartnership(data, partnerProps.id);
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
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent
    >
      <Container>
        <AddPartnerView
          style={{ justifyContent: "space-between", flexDirection: "row" }}
        >
          <Text>Editar parceria</Text>

          <TouchableOpacity onPress={onClose}>
            <Close color="#666666" />
          </TouchableOpacity>
        </AddPartnerView>
        <ScrollView>
          <View style={{ gap: 12 }}>
            <Text weight="500">Informações gerais</Text>

            <Controller
              control={control}
              name="name"
              rules={{
                required: "informe o nome do parceiro",
              }}
              render={({ field }) => (
                <View>
                  <Text>Parceria</Text>
                  <TextInput
                    {...field}
                    placeholder="The Bugger Ducks"
                    onChangeText={field.onChange}
                  />
                  {errors.name && <Text>Este campo é obrigatório</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <View>
                  <Text>E-mail</Text>
                  <TextInput
                    {...field}
                    placeholder="nome@gmail.com"
                    onChangeText={field.onChange}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="classification"
              render={({ field }) => (
                <View>
                  <Text>Classificação</Text>
                  <SelectArea>
                    <Picker
                      selectedValue={field.value}
                      onValueChange={(itemValue) => { setSelectClassification(itemValue), field.onChange(itemValue) }}
                    >

                      {Object.keys(ClassificationSelectOptions).map(
                        classification => {
                          return <Picker.Item key={classification} label={classification} value={classification}></Picker.Item>
                        },
                      )}

                    </Picker>

                  </SelectArea>
                </View>
              )}
            />

            <Controller
              control={control}
              name="status"
              rules={{
                required: "informe o status da parceria",
              }}
              render={({ field }) => (
                <View>
                  <Text>Status</Text>
                  <SelectArea>

                    <Picker
                      placeholder="status"
                      selectedValue={field.value}
                      onValueChange={(itemValue) => { setSelectStatus(itemValue), field.onChange(itemValue) }
                      }>

                      {statusSelectOptions.map(status => {
                        return <Picker.Item key={status.id} label={status.description} value={status.value}></Picker.Item>
                      })}
                    </Picker>
                  </SelectArea>
                  {errors.status && <Text>Este campo é obrigatório</Text>}


                </View>
              )}
            />

            <Controller
              control={control}
              name="state"
              render={({ field }) => (
                <View>
                  <Text>Estado</Text>
                  <SelectArea>
                    <Picker
                      selectedValue={field.value}
                      onValueChange={(itemValue) => { setSelectStates(itemValue), field.onChange(itemValue) }
                      }>
                      {stateSelectOptions.map(state => {
                        return <Picker.Item key={state.UF} label={state.name} value={state.name}></Picker.Item>
                      })}
                    </Picker>
                  </SelectArea>
                </View>
              )}
            />

            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <View>
                  <Text>Cidade</Text>
                  <TextInput
                    {...field}
                    placeholder="São José dos campos"
                    onChangeText={field.onChange}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="zipCode"
              render={({ field }) => (
                <View>
                  <Text>CEP</Text>
                  <TextInput
                    {...field}
                    placeholder="12654-356"
                    onChangeText={field.onChange}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <View>
                  <Text>Endereço</Text>
                  <TextInput
                    {...field}
                    placeholder="Rua 21, 123"
                    onChangeText={field.onChange}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="memberNumber"
              render={({ field }) => (
                <View>
                  <Text>Número de membros</Text>
                  <TextInput
                    value={`${field.value}`}
                    placeholder="100"
                    keyboardType="number-pad"
                    onChangeText={field.onChange}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <View>
                  <Text>Telefone</Text>
                  <TextInput
                    {...field}
                    keyboardType="phone-pad"
                    placeholder="(12)99454-3275"
                    onChangeText={field.onChange}
                  />
                </View>
              )}
            />
          </View>
        </ScrollView>

        <View style={{ padding: 20 }}>
          <Button type="filled" onPress={handleSubmit(onSubmit)}>
            Editar parceria
          </Button>
        </View>
      </Container>
    </Modal>
  );
}
