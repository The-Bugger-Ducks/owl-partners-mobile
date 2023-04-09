import { Drop, Modal, Text } from "@components";
import {
  ClassificationSelectOptions,
  stateSelecOptions,
  statusSelectOptions,
} from "@constants";
import {
  IModalPropsEdit,
  IPartnershipEdit,
} from "@interfaces/partner.interface";
import partnershipRequests from "@requests/partnership.requests";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Modal as ReactNativeModal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  ClassicationDropDownArea,
  DropDownArea,
  StateDropDowArea,
  StatusTypeText,
  StatusView,
  TextInput,
} from "./styles";

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

  const [isStatusSelectOpen, setIsStatusSelectOpen] = useState(false);
  const [isStatesSelectOpen, setIsStatesSelectOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isClassificationSelectOpen, setIsClassificationSelectOpen] =
    useState(false);

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

    setIsLoading(true);
    await partnershipRequests.updatePartnership(data, partnerProps.id);
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
        <ScrollView style={{ gap: 12 }}>
          <Text weight="500">Informações gerais</Text>

          <Controller
            control={control}
            name="name"
            rules={{ required: "informe o nome do parceiro" }}
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
                <TouchableOpacity
                  onPress={() =>
                    setIsClassificationSelectOpen(!isClassificationSelectOpen)
                  }
                >
                  <StatusView>
                    <Text>{field.value}</Text>
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
                                field.onChange(classification);
                                setIsClassificationSelectOpen(false);
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
            render={({ field }) => (
              <>
                <Text>Status</Text>
                <TouchableOpacity
                  onPress={() => setIsStatusSelectOpen(!isStatusSelectOpen)}
                >
                  <StatusView>
                    <Text>{field.value}</Text>
                    <Drop />
                  </StatusView>
                </TouchableOpacity>
                {errors.status && <Text>Este campo é obrigatório</Text>}
                {isStatusSelectOpen && (
                  <DropDownArea>
                    {statusSelectOptions.map(status => {
                      return (
                        <TouchableOpacity key={status.id}>
                          <StatusTypeText
                            onPress={() => {
                              field.onChange(status.value);
                              setIsStatusSelectOpen(false);
                            }}
                          >
                            {status.description}
                          </StatusTypeText>
                        </TouchableOpacity>
                      );
                    })}
                  </DropDownArea>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="state"
            render={({ field }) => (
              <>
                <Text>Estado</Text>
                <TouchableOpacity
                  onPress={() => setIsStatesSelectOpen(!isStatesSelectOpen)}
                >
                  <StatusView>
                    <Text>{field.value}</Text>
                    <Drop />
                  </StatusView>
                </TouchableOpacity>

                {isStatesSelectOpen && (
                  <ReactNativeModal
                    onRequestClose={() => setIsStatesSelectOpen(false)}
                  >
                    <StateDropDowArea>
                      {stateSelecOptions.map(state => {
                        return (
                          <TouchableOpacity key={state.UF}>
                            <StatusTypeText
                              onPress={() => {
                                field.onChange(state.name);
                                setIsStatesSelectOpen(false);
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
        </ScrollView>
      }
    />
  );
}
