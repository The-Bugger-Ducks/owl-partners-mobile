import { Button, Close, Drop, Input, Text } from "@components";
import { useState } from "react";
import {
  Controller,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import {
  AddPartnerView,
  ClassicationDropDownArea,
  Container,
  DropDowArea,
  StateDropDowArea,
  StatusTypeText,
  StatusView,
  TextInput,
} from "./styles";
import { stateSelecOptions } from "@utils/stateSelectOptions";
import { statusSelectOptions } from "@utils/statusSelectOptions";
import { IPartnership } from "../../shared/interfaces/partner.interface";
import partnerRequest from "../../shared/services/partner.request";
import { ClassificationSelectOptions } from "@utils/classificationSelectOptions";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

export function PartnershipForm({ visible, onClose }: ModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPartnership>();

  const [selectStatus, setSelecteStatus] = useState("");
  const [selectStates, setSelectedStates] = useState("");
  const [selectClassification, setSelectClassification] = useState("");

  const [isStatusSelectOpen, setisStatusSelectOpen] = useState(false);
  const [isStatesSelectOpen, setisStatesSelectOpen] = useState(false);
  const [isClassificationSelectOpen, setisClassificationSelectOpen] =
    useState(false);

  const onSubmit: SubmitHandler<IPartnership> = async payload => {
    const data = {
      ...payload,
      memberNumber: Number(payload.memberNumber),
    };
    console.log(data);
    await partnerRequest.create(data);
  };

  function handlerStatusPartenerSelected(statusSelectOptions: {
    value: string;
  }) {
    setSelecteStatus(statusSelectOptions.value);
    setisStatusSelectOpen(false);
  }

  function handlerStatesPartenerSelected(statesSelectOptions: {
    name: string;
  }) {
    setSelectedStates(statesSelectOptions.name);
    setisStatesSelectOpen(false);
  }

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
                  <TouchableOpacity
                    onPress={() => {
                      setisClassificationSelectOpen(
                        !isClassificationSelectOpen,
                      );
                    }}
                  >
                    <StatusView
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        gap: 140.25,
                      }}
                    >
                      <Text>{selectClassification}</Text>
                      <Drop />
                    </StatusView>
                  </TouchableOpacity>
                  {isClassificationSelectOpen ? (
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
                  ) : null}
                </View>
              )}
            />

            <Controller
              control={control}
              name="status"
              rules={{
                required: "informe o status da parceria",
              }}
              render={({ field: { onChange } }) => (
                <View>
                  <Text>Status</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setisStatusSelectOpen(!isStatusSelectOpen);
                    }}
                  >
                    <StatusView
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        gap: 140.25,
                      }}
                    >
                      <Text>{selectStatus}</Text>
                      <Drop />
                    </StatusView>
                  </TouchableOpacity>
                  {errors.status && <Text>Este campo é obrigatório</Text>}
                  {isStatusSelectOpen ? (
                    <DropDowArea>
                      {statusSelectOptions.map(status => {
                        return (
                          <TouchableOpacity key={status.id}>
                            <StatusTypeText
                              onPress={() => {
                                handlerStatusPartenerSelected(status),
                                onChange(status.value);
                              }}
                            >
                              {status.description}
                            </StatusTypeText>
                          </TouchableOpacity>
                        );
                      })}
                    </DropDowArea>
                  ) : null}
                </View>
              )}
            />

            <Controller
              control={control}
              name="state"
              render={({ field: { onChange } }) => (
                <View>
                  <Text>Estado</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setisStatesSelectOpen(!isStatesSelectOpen);
                    }}
                  >
                    <StatusView
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        gap: 140.25,
                      }}
                    >
                      <Text>{selectStates}</Text>
                      <Drop />
                    </StatusView>
                  </TouchableOpacity>

                  {isStatesSelectOpen ? (
                    <Modal
                      onRequestClose={() =>
                        setisStatesSelectOpen(!isStatesSelectOpen)
                      }
                    >
                      <StateDropDowArea>
                        {stateSelecOptions.map(states => {
                          return (
                            <TouchableOpacity key={states.UF}>
                              <StatusTypeText
                                onPress={() => {
                                  handlerStatesPartenerSelected(states);
                                  onChange(states.name);
                                }}
                              >
                                {states.name}
                              </StatusTypeText>
                            </TouchableOpacity>
                          );
                        })}
                      </StateDropDowArea>
                    </Modal>
                  ) : null}
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
