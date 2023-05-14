import { Card, Header, PlusCircle, Text } from "@components";
import { IUser, IUserRegister } from "@interfaces/user.interface";
import userRequest from "@requests/user.request";
import { useEffect, useState } from "react";
import {
  Container,
  UserCardActions,
  UserCard,
  UsersContainer,
  IconArea,
} from "./styles";
import { Trash } from "../../components/Icons/Trash";
import { MinusCircle } from "../../components/Icons/MinusCircle";
import StorageController from "@utils/handlers/StorageController";
import { Alert, View } from "react-native";
import { then } from "metro.config";

export function User() {
  const [data, setData] = useState<IUser[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [userId, setUserId] = useState("");

  async function getUserInfomation() {
    const userInfo = await StorageController.getUserInfo();

    if (!userInfo) {
      return alert("Usuário não encontrado");
    }
    setUserId(userInfo.id);
  }

  useEffect(() => {
    getUserInfomation();
  }, []);

  async function getUser() {
    setIsLoading(true);
    const user: IUser[] = await userRequest.listUser();

    setData(user);
    setIsLoading(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  async function handleDeleteUser(id: string) {
    setIsLoadingDelete(true);
    if (id) await userRequest.deleteUser(id);
    setIsLoadingDelete(false);
    getUser();
  }

  async function handleDeleteUserConfirmation(id: string) {
    try {
      Alert.alert("Você está deletando um usuário!", "Tem certeza disso?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "OK", onPress: () => handleDeleteUser(id) },
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Header />
      <UsersContainer>
        <Text>Usuários encontrados</Text>
        {data?.map(user => {
          const isMyself = userId == user.id;
          if (!isMyself) {
            return (
              <UserCard key={user.id} style={{ marginVertical: 10 }}>
                <Text weight="500" color="#000000" size={12}>
                  {user.role} | {user.name} {user.lastName}
                </Text>
                <UserCardActions>
                  <IconArea
                    onPress={() => handleDeleteUserConfirmation(user.id)}
                  >
                    <Trash />
                    <Text weight="400" color="#000000" size={14}>
                      Remover
                    </Text>
                  </IconArea>

                  <IconArea>
                    <MinusCircle />
                    <Text weight="400" color="#000000" size={14}>
                      Rebaixar
                    </Text>
                  </IconArea>

                  <IconArea>
                    <PlusCircle />
                    <Text weight="400" color="#000000" size={14}>
                      Promover
                    </Text>
                  </IconArea>
                </UserCardActions>
              </UserCard>
            );
          }
        })}
      </UsersContainer>
    </Container>
  );
}
