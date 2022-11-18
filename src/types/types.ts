import type { NextApiRequest } from "next";
import { StringLiteral } from "typescript";

export interface NextApiRequestWithUser extends NextApiRequest {
  user: any;
}

export interface JWT_Decoded {
  _id: string;
}
export interface User {
  name: string;
  email: string;
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
  isLoggedIn: boolean;
  cart: cartItem[];
}
