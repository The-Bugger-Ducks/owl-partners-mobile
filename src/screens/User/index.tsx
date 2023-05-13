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

export function User() {
  const [data, setData] = useState<IUser[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

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
    await userRequest.deleteUser(id);
    setIsLoadingDelete(false);
    getUser();
  }

  return (
    <Container>
      <Header />
      <UsersContainer>
        <Text>Usuários encontrados</Text>
        {data?.map(user => {
          return (
            <UserCard key={user.id} style={{ marginVertical: 10 }}>
              <Text weight="500" color="#000000" size={12}>
                {user.role} | {user.name}
              </Text>
              <UserCardActions>
                <IconArea onPress={() => handleDeleteUser(user.id)}>
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
        })}
      </UsersContainer>
    </Container>
  );
}
