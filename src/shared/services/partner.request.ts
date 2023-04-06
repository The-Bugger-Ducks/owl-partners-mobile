import { api } from "./api";

import { IPartnership } from "@interfaces/partner.interface";
import { PARTNERSHIP_ENDPOINTS } from "../constants/endpoints";

class PartnerRequest {
  public async create(payload: IPartnership) {
    await api.post(PARTNERSHIP_ENDPOINTS.CREATE, payload);
  }

  public async Edit(payload: IPartnership) {
    await api.put(PARTNERSHIP_ENDPOINTS.EDIT, payload);
  }

  public async ListId(id: string) {
    await api.get(PARTNERSHIP_ENDPOINTS.DETAILS + id);
  }

  public async List(disabled: boolean) {
    try {
      const response = await api.get(
        PARTNERSHIP_ENDPOINTS.LIST_PARTNERSHIP + "?disabled=" + disabled,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
export default new PartnerRequest();
