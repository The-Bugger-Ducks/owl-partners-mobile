import { Button, Header, Icon, Input, Text } from "@components";
import { PropsStack } from "@custom-types/rootStackParamList";
import { IUserRegister, RoleEnum } from "@interfaces/user.interface";
import { StackActions, useNavigation } from "@react-navigation/native";
import userRequest from "@requests/user.request";
import StorageController from "@utils/handlers/StorageController";
import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import {
  Container,
  IconButton,
  PassswordInput,
  PasswordInputContainer,
} from "./styles";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const navigation = useNavigation<PropsStack>();

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
      role: RoleEnum.SIMPLE,
      email,
      password,
    };
    await userRequest.createUser(newUser);
    setIsLoading(false);
    handleUserAuthentication();
  }

  async function handleUserAuthentication() {
    const token = await StorageController.getToken();
    if (token) goToApp();
  }

  function goToApp() {
    navigation.dispatch(StackActions.replace("HomeStack"));
  }

  return (
    <Container>
      <Header isHero={true} />
      <ScrollView contentContainerStyle={{ gap: 24, padding: 24 }}>
        <Input
          label="Primeiro Nome"
          placeholder="Ana"
          onChangeText={text => setName(text)}
        />
        <Input
          label="Último Nome"
          placeholder="Soares"
          onChangeText={text => setLastName(text)}
        />
        <Input
          label="Email"
          placeholder="Ana@gmail.com"
          onChangeText={text => setEmail(text)}
        />
        <PasswordInputContainer style={{ gap: 8 }}>
          <Text size={14} color={"#666666"}>
            Senha
          </Text>
          <PassswordInput>
            <Input
              style={{
                width: "85%",
                borderWidth: 0,
                backgroundColor: "transparent",
                paddingLeft: 2,
              }}
              placeholder="********"
              textContentType="newPassword"
              onChangeText={text => setPassword(text)}
              secureTextEntry={!visiblePassword}
            />
            <IconButton onPress={() => setVisiblePassword(!visiblePassword)}>
              {visiblePassword ? (
                <Icon icon="eye-hidden" />
              ) : (
                <Icon icon="eye" />
              )}
            </IconButton>
          </PassswordInput>
        </PasswordInputContainer>
      </ScrollView>
      <Button
        style={{ marginHorizontal: 24 }}
        disabled={
          name.length == 0 ||
          email.length == 0 ||
          lastName.length == 0 ||
          password.length == 0 ||
          isLoading
        }
        onPress={() => handleSubmit()}
      >
        Cadastrar
      </Button>
    </Container>
  );
}
