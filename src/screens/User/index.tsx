import {
  IUser,
  IUserRegister,
  IUserUpdate,
  IUserUpdatePermission,
  RoleEnum,
} from "@interfaces/user.interface";
import { Card, Header, Icon, Input, Loading, Text } from "@components";
import userRequest from "@requests/user.request";
import { useEffect, useState } from "react";
import {
  Container,
  UserCardActions,
  UserCard,
  UsersContainer,
  IconArea,
  LoadingContainer,
} from "./styles";
import StorageController from "@utils/handlers/StorageController";
import { Alert, View } from "react-native";

export function User() {
  const [data, setData] = useState<IUser[]>();
  const [filteredData, setFilteredData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [userId, setUserId] = useState("");
  const [role, setNewRole] = useState<RoleEnum>();

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

  async function getUsers() {
    setIsLoading(true);
    const user: IUser[] = await userRequest.listUser();

    setData(user);
    setFilteredData(user);
    setIsLoading(false);
  }

  async function getUserByName(name: string) {
    setIsLoading(true);
    setFilteredData([]);
    const filteredUser: IUser[] = await userRequest.listUserByName(name);

    setFilteredData(filteredUser);
    setIsLoading(false);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function handleDeleteUser(id: string) {
    try {
      setIsLoadingDelete(true);
      if (id) await userRequest.deleteUser(id);
      setIsLoadingDelete(false);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteUserConfirmation(id: string) {
    Alert.alert("Você está deletando um usuário!", "Tem certeza disso?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "OK", onPress: () => handleDeleteUser(id) },
    ]);
  }

  async function handlePromoteUser(id: string, cardRole: string) {
    const payload: IUserUpdatePermission = {
      role,
    };
    if (cardRole == RoleEnum.SIMPLE) {
      payload.role = RoleEnum.ADMIN;
    }

    await userRequest.upatadeUserPermission(payload, id);
    getUsers();
  }

  async function handleDemoteUser(id: string, cardRole: string) {
    const payload: IUserUpdatePermission = {
      role,
    };
    if (cardRole == RoleEnum.ADMIN) {
      payload.role = RoleEnum.SIMPLE;
    }

    await userRequest.upatadeUserPermission(payload, id);
    getUsers();
  }

  return (
    <Container>
      <Header />
      <UsersContainer>
        <Input
          label="Encontrar usuário"
          placeholder="Fulano de Tal..."
          onChangeText={text => getUserByName(text)}
          style={{ marginBottom: 16 }}
        />
        <Text>Usuários encontrados</Text>
        {isLoading && (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        )}
        {filteredData?.map(user => {
          const isMyself = userId == user.id;
          const isAdmin = user.role == RoleEnum.ADMIN;
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
                    <Icon icon="trash" />
                    <Text weight="400" color="#000000" size={14}>
                      Remover
                    </Text>
                  </IconArea>

                  <IconArea>
                    <Icon icon="minus" />
                    <Text weight="400" color="#000000" size={14}>
                      Rebaixar
                    </Text>
                  </IconArea>

                  <IconArea>
                    <Icon icon="plus" />
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
