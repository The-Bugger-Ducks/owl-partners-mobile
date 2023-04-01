import { isAxiosError } from "axios";

import { api } from "./api";

import { IUserAuthenticated, IUserLogin } from "../interfaces/user.interface";
import { USER_ENDPOINTS } from "../utils/endpoints";
import StorageController from "../utils/handlers/StorageController";

class AuthRequest {

  public async authenticate(payload: IUserLogin) {
    try {
      const response = await api.post<IUserAuthenticated>(USER_ENDPOINTS.USER_LOGIN, payload);

      const user = response.data;

      await StorageController.setToken(user.token)
      await StorageController.setUserInfo(user)

      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            throw new Error("Unauthorized")
          }
        }
      }
      throw new Error("Algo inesperado aconteceu, tente novamente!")
    }
  }

}

export default new AuthRequest();
