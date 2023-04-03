import { api } from "./api";
import { PARTNERSHIP_ENDPOINTS } from "../utils/endpoints";
import { CreatePartnerProps } from "../interfaces/partner.interface";

class PartnerRequest {

  public async create(payload: CreatePartnerProps) {
    await api.post(PARTNERSHIP_ENDPOINTS.CREATE, payload);
  }

  public async Edit(payload: CreatePartnerProps) {
    await api.put(PARTNERSHIP_ENDPOINTS.EDIT, payload);
  }

  public async List(id: string) {
    await api.get(PARTNERSHIP_ENDPOINTS.DETAILS + id);
  }
}
export default new PartnerRequest();
