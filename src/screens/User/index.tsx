import {
  Card,
  Header,
  Icon,
  Input,
  Loading,
  PlusCircle,
  Text,
} from "@components";
import {
  IUser,
  IUserRegister,
  IUserUpdate,
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
import { Alert, View } from "react-native";
import { then } from "metro.config";

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

  async function handleChangeUserPermission(id: string, cardRole: string) {
    const payload: IUserUpdatePermission = {
      role,
    };
    if (cardRole == RoleEnum.SIMPLE) {
      payload.role = RoleEnum.ADMIN;
    }

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
          const isSimple = user.role == RoleEnum.SIMPLE;
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
