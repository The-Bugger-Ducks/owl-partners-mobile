import { Header, Input, Loading, PlusCircle, Text } from "@components";
import {
  IUser,
  IUserUpdatePermission,
  RoleEnum,
} from "@interfaces/user.interface";
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
import { Trash } from "../../components/Icons/Trash";
import { MinusCircle } from "../../components/Icons/MinusCircle";
import StorageController from "@utils/handlers/StorageController";
import { Alert } from "react-native";
import { useThrottle } from "@utils/useThrottle";

export function User() {
  const [data, setData] = useState<IUser[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [role, setNewRole] = useState<RoleEnum>();
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
    const filteredUser: IUser[] = await userRequest.listUserByName(name);
    setData(filteredUser);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function handleDeleteUser(id: string) {
    try {
      if (id) await userRequest.deleteUser(id);
      getUsers();
    } catch (error) {
      console.error(error);
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
    const payload: IUserUpdatePermission = { role };
    if (cardRole == RoleEnum.SIMPLE) payload.role = RoleEnum.ADMIN;
    await userRequest.upatadeUserPermission(payload, id);
    getUsers();
  }

  async function handleDemoteUser(id: string, cardRole: string) {
    const payload: IUserUpdatePermission = { role };
    if (cardRole == RoleEnum.ADMIN) payload.role = RoleEnum.SIMPLE;
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

                  <IconArea
                    onPress={() => handleDemoteUser(user.id, user.role)}
                  >
                    <MinusCircle />
                    <Text weight="400" color="#000000" size={14}>
                      Rebaixar
                    </Text>
                  </IconArea>

                  <IconArea
                    disabled={isAdmin}
                    onPress={() => handlePromoteUser(user.id, user.role)}
                  >
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
