import { IUserRegister } from "@interfaces/user.interface";
import { alertError } from "@utils/alertError";
import { USER_ENDPOINTS } from "../constants/endpoints";
import { api } from "@api";

class UserRequest {
  async createUser(newUser: IUserRegister) {
    try {
      const { data } = await api.post(USER_ENDPOINTS.CREATE, newUser);
      return data;
    } catch (error) {
      alertError(error, "Não foi possível cadastrar o usuário :(");
    }
  }

  async listUser() {
    try {
      const { data } = await api.get(USER_ENDPOINTS.LIST);
      return data;
    } catch (error) {
      alertError(error, "Não foi possível achar os usuários :(");
    }
  }

  async deleteUser(id: string) {
    try {
      const { data } = await api.delete(USER_ENDPOINTS.DELETE + id);
      return data;
    } catch (error) {
      alertError(error, "Não foi possível deletar o usuário :(");
    }
  }

  async updateUser(payload: IUserRegister, id: string) {
    try {
      const { data } = await api.put(USER_ENDPOINTS.UPDATE + id, payload);
      return data;
    } catch (error) {
      alertError(error, "Não foi possível editar o usuário :(");
    }
  }
}

export default new UserRequest();
