import { api } from "./api";

import { IUserAuthenticated, IUserLogin } from "@interfaces/user.interface";
import StorageController from "@utils/handlers/StorageController";
import { USER_ENDPOINTS } from "../constants/endpoints";

class AuthRequests {
  async authenticate(payload: IUserLogin) {
    const response = await api.post<IUserAuthenticated>(
      USER_ENDPOINTS.USER_LOGIN,
      payload,
    );

    const data = response.data;

    await StorageController.setToken(data.token);
    await StorageController.setUserInfo(data.user);

    return response;
  }
}

export default new AuthRequests();
