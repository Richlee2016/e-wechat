import { Document } from 'mongoose';

export interface Token extends Document {
  name?: string;
  readonly access_token: string;
  readonly expires_in: number;
  readonly refresh_token?: string;
  readonly openid?: string;
  readonly meta?: any;
}

// export interface OauthToken {
//   readonly access_token:string
//   readonly expires_in:number
//   readonly refresh_token:string
//   readonly openid:string
//   readonly scope:string
// }
