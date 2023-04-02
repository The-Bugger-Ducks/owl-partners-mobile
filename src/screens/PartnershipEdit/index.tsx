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

const statusSelectOptions = [
  { id: 1, description: "Em prospecção" },
  { id: 2, description: "Primeiro contato feito" },
  { id: 3, description: "Primeira reunião marcada/realizada" },
  { id: 4, description: "Documentação enviada/em análise (Parceiro)" },
  { id: 5, description: "Documentação devolvida (Academy)" },
  { id: 6, description: "Documentação devolvida (Legal)" },
  { id: 7, description: "Documentação Analisada e devolvida (Parceiro)" },
  { id: 8, description: "Preparação de Executive Sumary (Academy)" },
  { id: 9, description: "ES em analise (Legal)" },
  { id: 10, description: "ES em analise (Academy Global)" },
  { id: 11, description: "Pronto para assinatura, Parceria Firmada" },
];

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
  const [selectStatus, setSelecteStatus] = useState("");

  // useEffect(() => {
  //   console.log('requisição');
  //   setSelecteStatus('Primeiro contato feito');
  // }, [])

  async function hendlerPartnershipForm(statusSelectOptions: formDataProps) {
    console.log(statusSelectOptions);
    onClose();
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
                  <TextInput
                    placeholder="São Paulo, Brasil"
                    {...field}
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
                    value={String({ ...field })}
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
                      <Text>{selectStatus}</Text>
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

                  {errors && <Text>Este campo é obrigatório</Text>}
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
