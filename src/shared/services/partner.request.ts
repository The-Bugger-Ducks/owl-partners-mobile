import { api } from "./api";
import { PARTNERSHIP } from "../utils/endpoints";
import { CreatePartnerProps } from "../interfaces/partner.interface";

class PartnerRequest {

  public async create(payload: CreatePartnerProps) {
    await api.post(PARTNERSHIP.CREATE_PARTNERSHIP, payload);
  }

  public async Edit(payload: CreatePartnerProps) {
    await api.put(PARTNERSHIP.CREATE_PARTNERSHIP, payload);
  }

  public async get(id: string) {
    await api.get(`${PARTNERSHIP.GET_PARTNER}/${id}`);
  }
}
export default new PartnerRequest();
