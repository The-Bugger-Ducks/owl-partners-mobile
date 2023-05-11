import { Input, Modal, Text } from "@components";
import { IModalPropsForm } from "@interfaces/partner.interface";
import { IUserModalPropsForm, IUserRegister } from "@interfaces/user.interface";
import userRequest from "@requests/user.request";
import React from "react";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

export function AddUserModal({
  visible,
  onClose,
  closeAfterUpdate,
  userProps,
}: IUserModalPropsForm) {
  const [email, setEmail] = useState(userProps.email ?? "");
  const [name, setName] = useState(userProps.name ?? "");
  const [password, setPassword] = useState(userProps.password ?? "");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    if (confirmPassword != password) {
      Alert.alert("Opa!", "Este campo deve ser igual a senha");
      return;
    }

    const payload: IUserRegister = {
      name,
      email,
      password,
    };
    setIsLoading(true);
    await userRequest.updateUser(payload, userProps.id!);
    setIsLoading(false);
    closeAfterUpdate();
  }

  return (
    <Modal
      isLoading={isLoading}
      buttonTitle="Adicionar parceria"
      onPressButton={handleSubmit}
      visible={false}
      onClose={onClose}
      title="Novo usuário"
      content={
        <ScrollView>
          <View>
            <Text>Meu perfil</Text>
            <Input
              label="Nome"
              defaultValue={name}
              placeholder="Ana Soares"
              onChangeText={text => setName(text)}
            />

            <Input
              label="Email"
              defaultValue={email}
              placeholder="Ana@gmail.com"
              onChangeText={text => setEmail(text)}
            />

            <Input
              label="Senha"
              defaultValue={password}
              placeholder="********"
              onChangeText={text => setPassword(text)}
            />

            <Input
              label="Comfirmação de senha"
              placeholder="********"
              onChangeText={text => setConfirmPassword(text)}
            />
          </View>
        </ScrollView>
      }
    />
  );
}
