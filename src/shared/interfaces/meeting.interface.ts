import { IComment } from "./annotation.interface";
import { IPartnership } from "./partner.interface";

export interface IMeeting {
  id?: string;
  partnership: IPartnership;
  date: string;
  time: string;
  theme?: string;
  comments?: IComment[];
}
