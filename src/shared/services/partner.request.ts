import { PARTNERSHIP_ENDPOINTS } from "../utils/endpoints";
import { api } from "./api";

class PartnerRequest {
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
