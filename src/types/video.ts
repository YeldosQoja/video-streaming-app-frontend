import { Channel } from "./channel";

export interface Video {
  id: string;
  title: string;
  desc: string;
  thumbnail: string;
  channel: Channel;
  viewCount: number;
  createdAt: string | Date;
  duration: number;
  preview: string;
}
