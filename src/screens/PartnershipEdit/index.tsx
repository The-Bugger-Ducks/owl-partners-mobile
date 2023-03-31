import { Button, Close, Drop, Text } from "@components";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import {
  AddPartnerView,
  Container,
  DropDowArea,
  StatusTypeText,
  StatusView,
  TextInput,
} from "./styles";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { statusSelectOptions } from "@utils/statusSelectOptions";
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

// const partner =  {
//   name: "xuxu",
//   email: "xuxu@email.com",
//   phoneNumber: "12345678",
//   zipCode:"12345678",
//   state:"SP",
//   city:"SJC",
//   neighborhood: "Uniao",
//   address: "21",
//   classification: "COLEGIOS",
//   status: "EmProspeccao",
//   memberNumber: 20
// }

export function PartnershipEdit({ visible, onClose }: ModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataProps>({
    mode: "onChange",
    defaultValues: async () => {
      const result = await fetch(
        "https://owlpartners.onrender.com/partners/d65d3f16-ead4-4b4b-a3ce-84b9ddf20a51"
      ).then(res => res.json());
      return result;
    },
  });

  const [isStatusSelectOpen, setisStatusSelectOpen] = useState(false);
  const [isStatesSelectOpen, setisStatesSelectOpen] = useState(false);
  const [selectStatus, setSelectedStatus] = useState("");
  const [selectStates, setSelectedStates] = useState("");

  async function hendlerPartnershipForm(statusSelectOptions: formDataProps) {
    console.log(statusSelectOptions);
    onClose();
  }

  function handlerStatusPartenerSelected(statusSelectOptions: {
    description: string;
  }) {
    setSelectedStatus(statusSelectOptions.description);
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
                  <Text>Classificação </Text>
                  <TextInput
                    placeholder="Universidade"
                    {...field}
                    onChangeText={field.onChange}
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
                      <DropDowArea>
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
                      </DropDowArea>
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
                    <DropDowArea>
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
                    </DropDowArea>
                  ) : null}
                </View>
              )}
            />
          </View>
        </ScrollView>

        <View style={{ padding: 20 }}>
          <Button type="filled" onPress={handleSubmit(hendlerPartnershipForm)}>
            Editar parceria
          </Button>
        </View>
      </Container>
    </Modal>
  );
}
