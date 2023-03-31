import { Button, Close, Drop, Text } from "@components";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import {
  AddPartnerView,
  Container,
  DropDowArea,
  StateDropDowArea,
  StatusTypeText,
  StatusView,
  TextInput,
} from "./styles";
import { statusSelectOptions } from "@utils/statusSelectOptions";

import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { statesSelecOptions } from "@utils/stateSelectOptions";

type formDataProps = {
  name: string;
  classification: string;
  state: string;
  address: string;
  memberNumber: number;
  email: string;
  phoneNumber: string;
  status: string;
};

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

export function PartnershipForm({ visible, onClose }: ModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataProps>();
  const [selectStatus, setSelecteStatus] = useState("");
  const [selectStates, setSelectedStates] = useState("");
  const [isStatusSelectOpen, setisStatusSelectOpen] = useState(false);
  const [isStatesSelectOpen, setisStatesSelectOpen] = useState(false);
  const [data, setData] = useState([]);

  function hendlerPartnershipForm(statusSelectOptions: formDataProps) {
    console.log(statusSelectOptions);
    onClose();
  }

  function handlerStatesSelected(statesSelectOptions: { name: string }) {
    setSelectedStates(statesSelectOptions.name);
    setisStatesSelectOpen(false);
  }

  function handlerStatusPartenerSelected(statusSelectOptions: {
    description: string;
  }) {
    setSelecteStatus(statusSelectOptions.description);
    setisStatusSelectOpen(false);
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
              name="classification"
              render={({ field: { onChange } }) => (
                <View>
                  <Text>Classificação </Text>
                  <TextInput
                    placeholder="Universidade"
                    onChangeText={onChange}
                  />
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
                      <Text>{selectStates}</Text>
                      <Drop />
                    </StatusView>
                  </TouchableOpacity>

                  {isStatesSelectOpen ? (
                    <Modal>
                      <StateDropDowArea>
                        {statesSelecOptions.map(states => {
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
                      </StateDropDowArea>
                    </Modal>
                  ) : null}
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
                                onChange(status.description);
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
          </View>
        </ScrollView>

        <View style={{ padding: 20 }}>
          <Button type="filled" onPress={handleSubmit(hendlerPartnershipForm)}>
            Adicionar parceria
          </Button>
        </View>
      </Container>
    </Modal>
  );
}
