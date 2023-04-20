import { api } from "@api";
import { alertError } from "@utils/alertError";
import { MEETING_ENDPOINTS } from "../constants/endpoints";
import { IMeeting } from "@interfaces/meeting.interface";

class MeetingRequests {
  async getMeetigs() {
    try {
      const { data } = await api.get(MEETING_ENDPOINTS.LIST);
      return data;
    } catch (error) {
      alertError(error, "Não foi possível carregar a lista de reuniões :(");
    }
  }

  async getPartnerMeetigs(Id: string) {
    try {
      const { data } = await api.get(MEETING_ENDPOINTS.DETAILS + Id);
      return data;
    } catch (error) {
      alertError(error, "Não foi possível carregar a lista de reuniões :(");
    }
  }
}

export default new MeetingRequests();
