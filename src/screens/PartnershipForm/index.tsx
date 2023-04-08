import { Button, Close, Drop, Text } from "@components";
import { useState } from "react";
import {
  Controller,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  AddPartnerView,
  ClassicationDropDownArea,
  Container,
  StateDropDowArea,
  StatusDropDowArea,
  TextInput,
} from "./styles";
import { stateSelectOptions } from "@utils/stateSelectOptions";
import { statusSelectOptions } from "@utils/statusSelectOptions";
import {
  IModalPropsForm,
  IPartnership,
} from "../../shared/interfaces/partner.interface";
import partnerRequest from "../../shared/services/partner.request";
import { ClassificationSelectOptions } from "@utils/classificationSelectOptions";

export function PartnershipForm({
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

  const [isLoading, setIsLoading] = useState(true);
  const [pickerFocused, setPickerFocused] = useState(false)


  const onSubmit: SubmitHandler<IPartnership> = async payload => {
    const data = {
      ...payload,
      memberNumber: Number(payload.memberNumber)
    };
    console.log(data);

    try {
      setIsLoading(true);
      await partnerRequest.create(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    closeAfterUpdate();
  };


  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent
    >
      <Container>
        <AddPartnerView
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            gap: 140.25,
            marginBottom: 24,
          }}
        >
          <Text>Adicionar nova parceria</Text>

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
              render={({ field: { onChange } }) => (
                <View>
                  <Text>Parceria</Text>
                  <TextInput
                    placeholder="The Bugger Ducks"
                    onChangeText={onChange}
                  />
                  {errors.name && <Text>Este campo é obrigatório</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange } }) => (
                <View>
                  <Text>E-mail</Text>
                  <TextInput
                    placeholder="nome@gmail.com"
                    onChangeText={onChange}
                  />
                </View>
              )}
            />


            <Controller
              control={control}
              name="classification"
              render={({ field: { onChange } }) => (
                <View>
                  <Text>Classificação</Text>
                  <ClassicationDropDownArea>
                    <Picker
                      selectedValue={selectClassification}
                      onValueChange={(itemValue) => { setSelectClassification(itemValue), onChange(itemValue) }}
                      onFocus={() => setPickerFocused(true)}
                      onBlur={() => setPickerFocused(false)}
                    >

                      {Object.keys(ClassificationSelectOptions).map(
                        classification => {
                          return <Picker.Item key={classification} label={classification} value={classification}></Picker.Item>
                        },
                      )}

                    </Picker>

                  </ClassicationDropDownArea>
                </View>
              )}
            />

            <Controller
              control={control}
              name="status"
              rules={{
                required: "informe o status da parceria",
              }}
              render={({ field: {onChange} }) => (
                <View>
                  <Text>Status</Text>
                  <StatusDropDowArea>

                    <Picker
                      placeholder="status"
                      selectedValue={selectStatus}
                      onValueChange={(itemValue) =>  {setSelectStatus(itemValue), onChange(itemValue)}
                      }>

                      {statusSelectOptions.map(status => {
                        return <Picker.Item key={status.id} label={status.description} value={status.value}></Picker.Item>
                      })}
                    </Picker>
                  </StatusDropDowArea>
                  {errors.status && <Text>Este campo é obrigatório</Text>}
                  
                  
                </View>
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
                      onValueChange={(itemValue) => {setSelectStates(itemValue), onChange(itemValue)}
                      }>
                      {stateSelectOptions.map(state => {
                        return <Picker.Item  key={state.UF} label={state.name} value={state.name}></Picker.Item>
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
                <View>
                  <Text>Cidade</Text>
                  <TextInput
                    placeholder="São José dos campos"
                    onChangeText={onChange}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="zipCode"
              render={({ field: { onChange } }) => (
                <View>
                  <Text>CEP</Text>
                  <TextInput placeholder="12654-356" onChangeText={onChange} />
                </View>
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field: { onChange } }) => (
                <View>
                  <Text>Endereço</Text>
                  <TextInput
                    placeholder="Rua 21, 123"
                    onChangeText={onChange}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="memberNumber"
              render={({ field: { onChange } }) => (
                <View>
                  <Text>Número de membros</Text>
                  <TextInput
                    placeholder="100"
                    keyboardType="number-pad"
                    onChangeText={onChange}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange } }) => (
                <View>
                  <Text>Telefone</Text>
                  <TextInput
                    keyboardType="phone-pad"
                    placeholder="(12)99454-3275"
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
          </View>
        </ScrollView>

        <View style={{ padding: 20 }}>
          <Button type="filled" onPress={handleSubmit(onSubmit)}>
            Adicionar parceria
          </Button>
        </View>
      </Container>
    </Modal>
  );
}
