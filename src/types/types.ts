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
  age: number;
}

export interface initialState {
  user: User;
}
