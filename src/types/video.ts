import { Channel } from "./channel";

export type Video = {
  id: string;
  title: string;
  desc: string;
  thumbnail: string;
  channel: Channel;
  viewCount: number;
  createdAt: string | Date;
  duration: number;
  preview: string;
};

export interface UploadVideoForm {
  title: string;
  desc: string;
  videoId: string;
  thumbnailId: string;
  playlist: string;
  category: string;
  isForKids: boolean;
  isAgeRestricted: boolean;
  privacy: string;
  allowComments: boolean;
  allowDownloads: boolean;
  tags: string;
}
