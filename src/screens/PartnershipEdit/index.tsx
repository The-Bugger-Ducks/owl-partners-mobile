import { Button, Close, Drop, Text } from "@components";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import {
  AddPartnerView,
  Container,
  DropDownArea,
  StatusTypeText,
  StatusView,
  TextInput,
} from "./styles";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { ClassificationSelectOptions } from "@utils/classificationSelectOptions";
import { CreatePartnerProps } from "../../shared/interfaces/partner.interface";
import { statesSelectOptions } from "@utils/statesSelectOptions";
import { statusSelectOptions } from "@utils/statusSelectOptions";
import partnerRequest from "src/shared/services/partner.request";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  partnerProps?: CreatePartnerProps;
}

export function PartnershipEdit({
  visible,
  onClose,
  partnerProps,
}: ModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePartnerProps>({
    mode: "onChange",
    defaultValues: partnerProps,
  });

  const [isStatusSelectOpen, setisStatusSelectOpen] = useState(false);
  const [isStatesSelectOpen, setisStatesSelectOpen] = useState(false);
  const [isClassificationSelectOpen, setisClassificationSelectOpen] =
    useState(false);

  const [selectStatus, setSelectedStatus] = useState("");
  const [selectStates, setSelectedStates] = useState("");
  const [selectClassification, setSelectClassification] = useState("");

  function handlerPartnershipForm(statusSelectOptions: CreatePartnerProps) {
    console.log(statusSelectOptions);
    onClose();
  }

  function handlerStatusPartenerSelected(statusSelectOptions: {
    description: string;
  }) {
    setSelectedStatus(statusSelectOptions.description);
    setisStatusSelectOpen(false);
  }

  function handlerStatesPartenerSelected(statesSelectOptions: { UF: string }) {
    setSelectedStates(statesSelectOptions.UF);
    setisStatusSelectOpen(false);
  }

  function handlerStatesSelected(statesSelectOptions: { name: string }) {
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
              render={({ field }) => (
                <View>
                  <Text>Parceria</Text>
                  <TextInput
                    {...field}
                    onChangeText={field.onChange}
                    placeholder="The Bugger Ducks"
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
                      <Text>{`${field.value}`}</Text>
                      <Drop />
                    </StatusView>
                  </TouchableOpacity>
                  {isClassificationSelectOpen ? (
                    <DropDownArea>
                      {Object.keys(ClassificationSelectOptions).map(
                        classification => {
                          return (
                            <TouchableOpacity key={classification}>
                              <StatusTypeText
                                onPress={() => {
                                  setSelectClassification(classification);
                                  setisClassificationSelectOpen(false);
                                }}
                              >
                                {classification}
                              </StatusTypeText>
                            </TouchableOpacity>
                          );
                        },
                      )}
                    </DropDownArea>
                  ) : null}
                </View>
              )}
            />

            <Controller
              control={control}
              name="state"
              render={({ field }) => (
                <View>
                  <Text>Localização</Text>
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
                      <Text>{`${field.value}`}</Text>
                      <Drop />
                    </StatusView>
                  </TouchableOpacity>

                  {isStatesSelectOpen ? (
                    <Modal
                      onRequestClose={() =>
                        setisStatesSelectOpen(!isStatesSelectOpen)
                      }
                    >
                      <DropDownArea>
                        {statesSelectOptions.map(states => {
                          return (
                            <TouchableOpacity key={states.UF}>
                              <StatusTypeText
                                onPress={() => {
                                  handlerStatesPartenerSelected(states);
                                  field.onChange(states.name);
                                }}
                              >
                                {states.name}
                              </StatusTypeText>
                            </TouchableOpacity>
                          );
                        })}
                      </DropDownArea>
                    </Modal>
                  ) : null}
                </View>
              )}
            />

            <Controller
              control={control}
              name="state"
              render={({ field }) => (
                <View>
                  <Text>Localização</Text>
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
                      <Text>{`${field.value}`}</Text>
                      <Drop />
                    </StatusView>
                  </TouchableOpacity>

                  {isStatesSelectOpen ? (
                    <Modal
                      onRequestClose={() =>
                        setisStatesSelectOpen(!isStatesSelectOpen)
                      }
                    >
                      <DropDownArea>
                        {statesSelectOptions.map(states => {
                          return (
                            <TouchableOpacity key={states.UF}>
                              <StatusTypeText
                                onPress={() => {
                                  handlerStatesSelected(states);
                                  field.onChange(states.name);
                                }}
                              >
                                {states.name}
                              </StatusTypeText>
                            </TouchableOpacity>
                          );
                        })}
                      </DropDownArea>
                    </Modal>
                  ) : null}
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
                    placeholder="Rua 21, 123"
                    {...field}
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
                    keyboardType="number-pad"
                    placeholder="100"
                    value={`${field.value}`}
                    onChangeText={field.onChange}
                  />
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
                    placeholder="nome@gmail.com"
                    {...field}
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
                    keyboardType="phone-pad"
                    placeholder="(12)99454-3275"
                    {...field}
                    onChangeText={field.onChange}
                  />
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
                      <Text>{`${field.value}`}</Text>
                      <Drop />
                    </StatusView>
                  </TouchableOpacity>

                  {isStatusSelectOpen ? (
                    <DropDownArea>
                      {statusSelectOptions.map(status => {
                        return (
                          <TouchableOpacity key={status.id}>
                            <StatusTypeText
                              onPress={() => {
                                handlerStatusPartenerSelected(status);
                                field.onChange(status.description);
                              }}
                            >
                              {status.description}
                            </StatusTypeText>
                          </TouchableOpacity>
                        );
                      })}
                    </DropDownArea>
                  ) : null}

                  {errors.status && <Text>Este campo é obrigatório</Text>}
                </View>
              )}
            />
          </View>
        </ScrollView>

        <View style={{ padding: 20 }}>
          <Button type="filled" onPress={handleSubmit(handlerPartnershipForm)}>
            Editar parceria
          </Button>
        </View>
      </Container>
    </Modal>
  );
}
