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
    email: IPartnership["email"];
    phoneNumber: IPartnership["phoneNumber"];
    status: IPartnership["status"];
  };
  meetingComments: IComment[];
}
