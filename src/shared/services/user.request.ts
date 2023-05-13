import { IUserRegister, IUserUpdate } from "@interfaces/user.interface";
import { alertError } from "@utils/alertError";
import { USER_ENDPOINTS } from "../constants/endpoints";
import { api } from "@api";
import StorageController from "@utils/handlers/StorageController";

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

  async listUserById() {
    try {
      const user = await StorageController.getUserInfo();

      if (!user || user?.id == null) {
        throw new Error("User is empty");
      }

      const { data } = await api.get(USER_ENDPOINTS.USER_ID + user.id);
      return data;
    } catch (error) {
      alertError(error, "Não foi possível achar os usuários :(");
    }
  }

  async deleteUser(id: string) {
    try {
      return await api.delete(USER_ENDPOINTS.DELETE + id);
    } catch (error) {
      alertError(error, "Não foi possível deletar o usuário :(");
    }
  }

  async updateUser(payload: IUserUpdate) {
    try {
      const user = await StorageController.getUserInfo();

      if (!user || user?.id == null) {
        throw new Error("User is empty");
      }

      const { data } = await api.put(USER_ENDPOINTS.UPDATE + user.id, payload);
      return data;
    } catch (error) {
      alertError(error, "Não foi possível editar o usuário :(");
    }
  }
}

export default new UserRequest();
