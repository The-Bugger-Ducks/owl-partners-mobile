import { Input, Modal, Text } from "@components";
import { IModalPropsForm } from "@interfaces/partner.interface";
import { IUserRegister } from "@interfaces/user.interface";
import userRequest from "@requests/user.request";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

export function AddUserModal({
  visible,
  onClose,
  closeAfterUpdate,
}: IModalPropsForm) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    if (confirmPassword != password) {
      Alert.alert("Opa!", "Este campo deve ser igual ao anterior");
      return;
    }

    setIsLoading(true);

    const newUser: IUserRegister = {
      name,
      email,
      password,
    };

    await userRequest.createUser(newUser);
    setIsLoading(false);
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
              placeholder="Ana Soares"
              onChangeText={text => setName(text)}
            />

            <Input
              label="Email"
              placeholder="Ana@gmail.com"
              onChangeText={text => setEmail(text)}
            />

            <Input
              label="Senha"
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
