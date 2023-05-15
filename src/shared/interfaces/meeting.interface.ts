import { IComment } from "./annotation.interface";
import { IPartnership } from "./partner.interface";

export interface IMeeting {
  id: string;
  title: string;
  description: string;
  meetingDateTime: string;
  Partner: {
    id: IPartnership["id"];
    name: IPartnership["name"];
    email?: IPartnership["email"];
    phoneNumber?: IPartnership["phoneNumber"];
    status?: IPartnership["status"];
    disabled?: IPartnership["disabled"];
  };
  meetingComments: IComment[];
}
export interface IMeetingsHome {
  pastMeetings: {
    id: string;
    title: string;
    description: string;
    meetingDateTime: string;
    Partner: { name: string; partnerId: string; disabled: string };
  }[];
  upcomingMeetings: {
    id: string;
    title: string;
    description: string;
    meetingDateTime: string;
    Partner: { name: string; partnerId: string; disabled: string };
  }[];
}
