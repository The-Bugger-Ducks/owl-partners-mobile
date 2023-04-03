import { api } from "@api";
import { PARTNERSHIP_ENDPOINTS } from "../endpoints";
import { CreatePartnerProps, IPartner } from "@interfaces/partner.interface";

class PartnershipController {
  async getPartnerships() {
    try {
      const { data } = await api.get(PARTNERSHIP_ENDPOINTS.LIST);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getPartnership(id: string) {
    try {
      const { data } = await api.get(PARTNERSHIP_ENDPOINTS.DETAILS + id);
      return data as IPartner;
    } catch (error) {
      console.error(error);
    }
  }

  async deletePartnership(id: string) {
    try {
      await api.delete(PARTNERSHIP_ENDPOINTS.DELETE + id);
      alert("Parceria excluída!");
    } catch (error) {
      console.error(error);
    }
  }

  async updatePartnership(payload: IPartner) {
    try {
      await api.put(PARTNERSHIP_ENDPOINTS.EDIT + payload.id, payload);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new PartnershipController();
