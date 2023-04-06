import { api } from "./api";

import { IUserAuthenticated, IUserLogin } from "../interfaces/user.interface";
import { USER_ENDPOINTS } from "../utils/endpoints";
import StorageController from "../utils/handlers/StorageController";

class AuthRequest {
  public async authenticate(payload: IUserLogin) {
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

export default new AuthRequest();
