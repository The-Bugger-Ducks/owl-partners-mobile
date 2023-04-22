import { alertError } from "@utils/alertError";
import { Alert } from "react-native";
import { MEETING_ENDPOINTS } from "../constants/endpoints";
import { api } from "./api";

class MeetingRequests {
  async createMeeting(partnershipId: string, dateTime: string, theme: string) {
    try {
      const payload = {
        title: theme.trim(),
        partnerId: partnershipId,
        meetingDateTime: dateTime,
      };
      await api.post(MEETING_ENDPOINTS.CREATE, payload);
      Alert.alert(
        "Reunião cadastrada!",
        "A partir de agora a nova reunião irá aparecer nas listagens",
      );
    } catch (error) {
      alertError(error, "Não foi possível cadastrar a reunião :(");
    }
  }

  async getMeetings() {
    try {
      const { data } = await api.get(MEETING_ENDPOINTS.LIST);
      return data;
    } catch (error) {
      alertError(error, "Não foi possível carregar a lista de reuniões :(");
    }
  }

  async getPartnerMeetigs(partnershipId: string) {
    try {
      const { data } = await api.get(
        MEETING_ENDPOINTS.BY_PARTNER + partnershipId,
      );
      return data;
    } catch (error) {
      alertError(error, "Não foi possível carregar a lista de reuniões :(");
    }
  }

  async getMeeting(id: string) {
    try {
      const { data } = await api.get(MEETING_ENDPOINTS.DETAILS + id);
      return data;
    } catch (error) {
      alertError(error, "Não foi possível carregar os dados da reunião :(");
    }
  }

  async updateMeeting(id: string, dateTime: string, updatedTheme: string) {
    try {
      const payload = {
        meetingDateTime: dateTime,
        title: updatedTheme.trim(),
      };
      await api.put(MEETING_ENDPOINTS.EDIT + id, payload);
      Alert.alert(
        "Reunião atualizada!",
        "Os dados da reunião foram atualizados",
      );
    } catch (error) {
      alertError(error, "Não foi possível atualizar os dados da reunião :(");
    }
  }

  async deleteMeeting(id: string) {
    try {
      await api.delete(MEETING_ENDPOINTS.DELETE + id);
      Alert.alert(
        "Reunião excluída!",
        "Esta reunião deixará de aparecer em listagens e históricos",
      );
    } catch (error) {
      alertError(error, "Não foi possível deletar a reunião :(");
    }
  }

  async getMeetingComments(id: string) {
    try {
      const { data } = await api.get(MEETING_ENDPOINTS.COMMENTS + id);
      return data;
    } catch (error) {
      alertError(
        error,
        "Não foi possível carregar os comentários da reunião :(",
      );
    }
  }

  async createMeetingComment(
    meetingId: string,
    comment: string,
    userId: string,
  ) {
    try {
      const payload = {
        comment,
        meetingId,
        userId,
      };
      const { data } = await api.post(MEETING_ENDPOINTS.ADD_COMMENT, payload);
      return data;
    } catch (error) {
      alertError(error, "Não foi possível cadastrar o comentário :(");
    }
  }

  async updateMeetingComment(commentId: string, comment: string) {
    try {
      const { data } = await api.put(
        MEETING_ENDPOINTS.UPDATE_COMMENT + commentId,
        comment,
      );
      return data;
    } catch (error) {
      alertError(error, "Não foi possível atualizar o comentário :(");
    }
  }
}

export default new MeetingRequests();
