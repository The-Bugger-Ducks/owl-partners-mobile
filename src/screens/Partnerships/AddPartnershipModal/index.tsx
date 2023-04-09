import { Drop, Modal, Text } from "@components";
import {
  ClassificationSelectOptions,
  stateSelecOptions,
  statusSelectOptions,
} from "@constants";
import { IModalPropsForm, IPartnership } from "@interfaces/partner.interface";
import partnershipRequests from "@requests/partnership.requests";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Modal as ReactNativeModal,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ClassicationDropDownArea,
  DropDowArea,
  StateDropDowArea,
  StatusTypeText,
  StatusView,
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

  const [selectStatus, setSelecteStatus] = useState("");
  const [selectStates, setSelectedStates] = useState("");
  const [selectClassification, setSelectClassification] = useState("");

  const [isStatusSelectOpen, setIsStatusSelectOpen] = useState(false);
  const [isStatesSelectOpen, setIsStatesSelectOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isClassificationSelectOpen, setisClassificationSelectOpen] =
    useState(false);

  const onSubmit: SubmitHandler<IPartnership> = async payload => {
    const data = {
      ...payload,
      memberNumber: Number(payload.memberNumber),
    };

    setIsLoading(true);
    await partnershipRequests.createPartnership(data);
    setIsLoading(false);
    closeAfterUpdate();
  };

  function handleSelectStatus(status: string) {
    setSelecteStatus(status);
    setIsStatusSelectOpen(false);
  }

  function handleSelectState(state: string) {
    setSelectedStates(state);
    setIsStatesSelectOpen(false);
  }

  return (
    <Modal
      title="Adicionar nova parceria"
      visible={visible}
      isLoading={isLoading}
      onClose={onClose}
      buttonTitle=" Adicionar parceria"
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
                  <TouchableOpacity
                    onPress={() =>
                      setisClassificationSelectOpen(!isClassificationSelectOpen)
                    }
                  >
                    <StatusView>
                      <Text>{selectClassification}</Text>
                      <Drop />
                    </StatusView>
                  </TouchableOpacity>
                  {isClassificationSelectOpen && (
                    <ClassicationDropDownArea>
                      {Object.keys(ClassificationSelectOptions).map(
                        classification => {
                          return (
                            <TouchableOpacity key={classification}>
                              <StatusTypeText
                                onPress={() => {
                                  setSelectClassification(classification);
                                  setisClassificationSelectOpen(false);
                                  onChange(classification);
                                }}
                              >
                                {classification}
                              </StatusTypeText>
                            </TouchableOpacity>
                          );
                        },
                      )}
                    </ClassicationDropDownArea>
                  )}
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
                  <TouchableOpacity
                    onPress={() => setIsStatusSelectOpen(!isStatusSelectOpen)}
                  >
                    <StatusView>
                      <Text>{selectStatus}</Text>
                      <Drop />
                    </StatusView>
                  </TouchableOpacity>
                  {errors.status && <Text>Este campo é obrigatório</Text>}
                  {isStatusSelectOpen && (
                    <DropDowArea>
                      {statusSelectOptions.map(status => {
                        return (
                          <TouchableOpacity key={status.id}>
                            <StatusTypeText
                              onPress={() => {
                                handleSelectStatus(status.value);
                                onChange(status.value);
                              }}
                            >
                              {status.description}
                            </StatusTypeText>
                          </TouchableOpacity>
                        );
                      })}
                    </DropDowArea>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name="state"
              render={({ field: { onChange } }) => (
                <View>
                  <Text>Estado</Text>
                  <TouchableOpacity
                    onPress={() => setIsStatesSelectOpen(!isStatesSelectOpen)}
                  >
                    <StatusView>
                      <Text>{selectStates}</Text>
                      <Drop />
                    </StatusView>
                  </TouchableOpacity>

                  {isStatesSelectOpen && (
                    <ReactNativeModal
                      onRequestClose={() =>
                        setIsStatesSelectOpen(!isStatesSelectOpen)
                      }
                    >
                      <StateDropDowArea>
                        {stateSelecOptions.map(state => {
                          return (
                            <TouchableOpacity key={state.UF}>
                              <StatusTypeText
                                onPress={() => {
                                  handleSelectState(state.name);
                                  onChange(state.name);
                                }}
                              >
                                {state.name}
                              </StatusTypeText>
                            </TouchableOpacity>
                          );
                        })}
                      </StateDropDowArea>
                    </ReactNativeModal>
                  )}
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
