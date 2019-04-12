/** 消息  */
import { Document } from 'mongoose';
// 微信回调 参数
export interface MessagePost {
  readonly signature: string;
  readonly timestamp: string;
  readonly nonce: string;
  readonly echostr: string;
}

// 微信消息参数
export interface MessageXml {
  MsgType: string;
  CreateTime?: string;
  Content?: string | any[];
  ToUserName?: string;
  FromUserName?: string;
  MediaId?: string;
  Title?: string;
  Description?: string;
  MusicUrl?: string;
  HQMusicUrl?: string;
  ThumbMediaId?: string;
  Event?: string;
  [props: string]: any;
}

//  schemas 参数
export interface MessageSchema extends Document {
  MsgType: string;
  Content: string;
  ToUserName?: string;
  Reply?: MessageXml;
}
