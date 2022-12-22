import type { NextApiRequest } from "next";

export interface NextApiRequestWithUser extends NextApiRequest {
  user: any;
}

export interface JWT_Decoded {
  _id: string;
}
export interface User {
  name: string;
  email: string;
  verifiedEmail?: boolean;
}

export interface cartItem {
  id: string;
  quantity: number;
  name: string;
  price: number;
}
export interface initialState {
  user: User;
  userEntryType: number;
  isUserLoggedIn: boolean;
  cart: cartItem[];
}

export interface messageType {
  fromAdmin: boolean;
  message: string;
  sentAt: Date;
}
