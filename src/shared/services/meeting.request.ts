import { IComment } from "@interfaces/annotation.interface";
import { IMeeting } from "@interfaces/meeting.interface";
import { alertError } from "@utils/alertError";
import { Alert } from "react-native";
import { MEETING_ENDPOINTS } from "../constants/endpoints";
import { api } from "./api";

class MeetingRequests {
  async createMeeting(meeting: IMeeting) {
    try {
      await api.post(MEETING_ENDPOINTS.CREATE, meeting);
    } catch (error) {
      console.error(error);
    }
  }

  async getMeetings(partnershipId?: string) {
    try {
      const { data } = await api.get(
        MEETING_ENDPOINTS.LIST +
          (partnershipId ? "?partnership=" + partnershipId : ""),
      );
      return data;
    } catch (error) {
      console.error(error);
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

  async updateMeeting(updatedMeeting: IMeeting) {
    try {
      const { data } = await api.put(MEETING_ENDPOINTS.EDIT, updatedMeeting);
      return data;
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

  async createMeetingComment(meetingId: string, comment: string) {
    try {
      const { data } = await api.post(
        MEETING_ENDPOINTS.ADD_COMMENT + meetingId,
        comment,
      );
      return data;
    } catch (error) {
      alertError(error, "Não foi possível cadastrar o comentário :(");
    }
  }

  async updateMeetingComment(comment: IComment) {
    try {
      const { data } = await api.put(
        MEETING_ENDPOINTS.UPDATE_COMMENT + comment.id,
        comment,
      );
      return data;
    } catch (error) {
      alertError(error, "Não foi possível atualizar o comentário :(");
    }
  }
}

export default new MeetingRequests();
