import { Button, Close, Drop, Text } from "@components";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import {
  AddPartnerView,
  Container,
  DropDownArea,
  StateDropDowArea,
  StatusTypeText,
  StatusView,
  TextInput,
} from "./styles";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { ClassificationSelectOptions } from "@utils/classificationSelectOptions";
import {
  IPartnership,
  IPartnershipEdit,
} from "../../shared/interfaces/partner.interface";
import { stateSelecOptions } from "@utils/stateSelectOptions";
import { statusSelectOptions } from "@utils/statusSelectOptions";
import PartnershipController from "@requests/PartnershipController";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  partnerProps: IPartnership;
}

export function PartnershipEdit({
  visible,
  onClose,
  partnerProps,
}: ModalProps) {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IPartnershipEdit>({
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

  const onSubmit: SubmitHandler<IPartnershipEdit> = async payload => {
    const data = {
      ...payload,
      memberNumber: Number(payload.memberNumber),
    };
    console.log(data);
    onClose();
    await PartnershipController.updatePartnership(data, partnerProps.id);
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

  function handlerStatusPartenerSelected(statusSelectOptions: {
    description: string;
  }) {
    setSelectedStatus(statusSelectOptions.description);
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
                      <Text>{field.value}</Text>
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
                                  field.onChange(classification);
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
                      <Text>{field.value}</Text>
                      <Drop />
                    </StatusView>
                  </TouchableOpacity>
                  {errors.status && <Text>Este campo é obrigatório</Text>}
                  {isStatusSelectOpen ? (
                    <DropDownArea>
                      {statusSelectOptions.map(status => {
                        return (
                          <TouchableOpacity key={status.id}>
                            <StatusTypeText
                              onPress={() => {
                                handlerStatusPartenerSelected(status),
                                field.onChange(status.value);
                              }}
                            >
                              {status.description}
                            </StatusTypeText>
                          </TouchableOpacity>
                        );
                      })}
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
                      <Text>{field.value}</Text>
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
                                  field.onChange(states.name);
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
