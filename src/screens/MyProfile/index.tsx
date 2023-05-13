import { Button, Header, Input, Modal, Text } from "@components";
import { IModalPropsForm } from "@interfaces/partner.interface";
import { IUserUpdate } from "@interfaces/user.interface";
import userRequest from "@requests/user.request";
import StorageController from "@utils/handlers/StorageController";
import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Container } from "./styles";

export function MyProfile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function getUser() {
    const user = await StorageController.getUserInfo();
    if (!user) {
      return alert("Usuário não encontrado");
    }
    setEmail(user.email);
    setName(user.name);
    setLastName(user.lastName);
    setRole(user.role);
  }

  useEffect(() => {
    getUser();
  }, []);

  async function handleSubmit() {
    if (confirmPassword != password) {
      Alert.alert("Opa!", "As senha não conferem");
      return;
    }

    const payload: IUserUpdate = {
      name,
      lastName,
      email,
    };

    if (password.length > 0) {
      payload.password = password;
    }
    console.log(payload);

    setIsLoading(true);
    await userRequest.updateUser(payload);
    setIsLoading(false);
  }

  return (
    <Container style={{ gap: 12 }}>
      <Header />
      <ScrollView>
        <View style={{ gap: 12 }}>
          <Text>Meu perfil</Text>
          <Input
            label="Primeiro Nome"
            defaultValue={name}
            placeholder="Ana Soares"
            onChangeText={text => setName(text)}
          />
          <Input
            label="Último Nome"
            defaultValue={lastName}
            placeholder="Ana Soares"
            onChangeText={text => setLastName(text)}
          />

          <Input
            label="Email"
            defaultValue={email}
            placeholder="Ana@gmail.com"
            onChangeText={text => setEmail(text)}
          />

          <Input
            label="Senha"
            placeholder="********"
            textContentType="password"
            onChangeText={text => setPassword(text)}
          />
          <Input
            label="Confirmação de senha"
            placeholder="********"
            textContentType="password"
            onChangeText={text => setConfirmPassword(text)}
          />
        </View>
      </ScrollView>

      <Button onPress={() => handleSubmit()}>Salvar</Button>
    </Container>
  );
}