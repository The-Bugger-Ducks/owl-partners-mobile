import { Button, Header, Input, Modal, Text } from "@components";
import { IUserRegister } from "@interfaces/user.interface";
import userRequest from "@requests/user.request";
import React from "react";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Container } from "./styles";
import { IModalPropsForm } from "@interfaces/partner.interface";

export function SignUp({
  visible,
  onClose,
  closeAfterUpdate,
}: IModalPropsForm) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("SIMPLE");
  const [lastName, setLastName] = useState("");

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    if (!name) {
      Alert.alert(
        "Opa!",
        "O nome é obrigatório. Por favor, preencha o campo correspondente",
      );
      return;
    }

    if (!email) {
      Alert.alert(
        "Opa!",
        "O email é obrigatório. Por favor, preencha o campo correspondente",
      );
      return;
    }

    if (!password) {
      Alert.alert(
        "Opa!",
        "A senha é obrigatória. Por favor, preencha o campo correspondente",
      );
      return;
    }

    setIsLoading(true);

    const newUser: IUserRegister = {
      name,
      lastName,
      role,
      email,
      password,
    };

    await userRequest.createUser(newUser);
    setIsLoading(false);
  }

  return (
    <Container style={{ gap: 35 }}>
      <Header isHero={true} />
      <ScrollView>
        <View style={{ gap: 12 }}>
          <Text>Meu perfil</Text>
          <Input
            label=" Primeiro Nome"
            placeholder="Ana"
            onChangeText={text => setName(text)}
          />

          <Input
            label="Ultimo Nome"
            placeholder="Soares"
            onChangeText={text => setLastName(text)}
          />

          <Input
            label="Email"
            placeholder="Ana@gmail.com"
            onChangeText={text => setEmail(text)}
          />

          <Input
            label="Senha"
            placeholder="********"
            textContentType="password"
            onChangeText={text => setPassword(text)}
          />
        </View>
      </ScrollView>
      <Button onPress={handleSubmit}>Salvar </Button>
    </Container>
  );
}
