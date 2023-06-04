import { Header, Icon, Input, Loading, Text } from "@components";
import {
  IUser,
  IUserUpdatePermission,
  RoleEnum,
} from "@interfaces/user.interface";
import userRequest from "@requests/user.request";
import StorageController from "@utils/handlers/StorageController";
import { useThrottle } from "@utils/useThrottle";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  Container,
  IconArea,
  LoadingContainer,
  UserCard,
  UserCardActions,
  UsersContainer,
} from "./styles";

export function User() {
  const [data, setData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [userNameFilter, setUserNameFilter] = useState("");

  useThrottle(userNameFilter, getUserByName);

  async function getUserInfomation() {
    const userInfo = await StorageController.getUserInfo();
    if (!userInfo) return alert("Usuário não encontrado");
    setUserId(userInfo.id);
  }

  useEffect(() => {
    getUserInfomation();
  }, []);

  async function getUsers() {
    setIsLoading(true);
    const users: IUser[] = await userRequest.listUser();
    setData(users);
    setIsLoading(false);
  }

  async function getUserByName(name: string) {
    setIsLoading(true);
    setData([]);
    const filteredUser: IUser[] = await userRequest.listUserByName(name);
    setData(filteredUser);
    setIsLoading(false);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function handleDeleteUser(id: string) {
    if (id) await userRequest.deleteUser(id);
    getUsers();
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

  async function handleChangeUserPermission(id: string, cardRole: string) {
    const payload: IUserUpdatePermission = { role: RoleEnum.SIMPLE };
    if (cardRole === RoleEnum.SIMPLE) payload.role = RoleEnum.ADMIN;
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
          onChangeText={text => setUserNameFilter(text)}
          style={{ marginBottom: 16 }}
        />
        <Text>Usuários encontrados</Text>
        {isLoading && (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        )}
        {data?.map(user => {
          const isMyself = userId == user.id;
          const isAdmin = user.role == RoleEnum.ADMIN;
          const isSimple = user.role == RoleEnum.SIMPLE;
          if (!isMyself) {
            return (
              <UserCard key={user.id} style={{ marginVertical: 10 }}>
                <Text weight="500" color="#000000" size={12}>
                  {user.role == "ADMIN" ? "Administrador" : "Simples"} |{" "}
                  {user.name} {user.lastName}
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

                  <IconArea
                    onPress={() =>
                      handleChangeUserPermission(user.id, user.role)
                    }
                    disabled={isSimple}
                  >
                    <Icon icon="minus" />
                    <Text
                      weight="400"
                      color="#000000"
                      size={14}
                      disabled={isSimple}
                    >
                      Rebaixar
                    </Text>
                  </IconArea>

                  <IconArea
                    disabled={isAdmin}
                    onPress={() =>
                      handleChangeUserPermission(user.id, user.role)
                    }
                  >
                    <Icon icon="plus" />
                    <Text weight="400" size={14} disabled={isAdmin}>
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
