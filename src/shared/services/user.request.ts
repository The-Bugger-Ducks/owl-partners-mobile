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
      alertError(error, "Não foi possível cadastrar a parceria :(");
    }
  }
}

export default new UserRequest();
