import {
  Button,
  Eye,
  EyeHidden,
  Header,
  Input,
  Modal,
  Text,
} from "@components";
import { IUserRegister } from "@interfaces/user.interface";
import userRequest from "@requests/user.request";
import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import {
  Container,
  IconButton,
  PassswordInput,
  PasswordInputContainer,
} from "./styles";
import { StackActions, useNavigation } from "@react-navigation/native";
import { PropsStack } from "@custom-types/rootStackParamList";
import StorageController from "@utils/handlers/StorageController";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("SIMPLE");
  const [lastName, setLastName] = useState("");

  const navigation = useNavigation<PropsStack>();

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [visiblePassword, setVisiblePassword] = useState(false);

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
    <Container style={{ gap: 35 }}>
      <Header isHero={true} />
      <ScrollView>
        <View style={{ gap: 12 }}>
          <Text>Meu perfil</Text>
          <Input
            label="Primeiro Nome"
            placeholder="Ana"
            onChangeText={text => {
              setName(text);
            }}
          />

          <Input
            label="Último Nome"
            placeholder="Soares"
            onChangeText={text => {
              setLastName(text);
            }}
          />

          <Input
            label="Email"
            placeholder="Ana@gmail.com"
            onChangeText={text => {
              setEmail(text);
            }}
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
                onChangeText={text => {
                  setPassword(text);
                }}
                secureTextEntry={!visiblePassword}
              />
              <IconButton onPress={() => setVisiblePassword(!visiblePassword)}>
                {visiblePassword ? <EyeHidden /> : <Eye />}
              </IconButton>
            </PassswordInput>
          </PasswordInputContainer>
        </View>
      </ScrollView>
      <Button
        disabled={
          name.length == 0 ||
          email.length == 0 ||
          lastName.length == 0 ||
          password.length == 0
        }
        onPress={() => handleSubmit()}
      >
        Cadastrar
      </Button>
    </Container>
  );
}
