import type { NextApiRequest } from "next";

export interface NextApiRequestWithUser extends NextApiRequest {
  user: any;
}

export interface JWT_Decoded {
  _id: string;
}
