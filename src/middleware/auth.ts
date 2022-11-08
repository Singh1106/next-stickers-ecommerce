import jwt from "jsonwebtoken";
import User from "../models/user";
import type { NextApiResponse } from "next";
import type { JWT_Decoded, NextApiRequestWithUser } from "../types/types";

const auth = (handler: any) => {
  return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const token = req?.headers?.authorization?.replace("Bearer ", "");
      const decoded = jwt.verify(
        token ?? "",
        process.env.JWT_TOKEN_KEY ?? ""
      ) as JWT_Decoded;
      const user = await User.findById(decoded._id);
      if (!user) {
        throw new Error();
      }
      req.user = user;
      return handler(req, res);
    } catch (e) {
      console.log(e);
      res.status(401).send({ error: "Please authenticate." });
    }
  };
};
export default auth;
