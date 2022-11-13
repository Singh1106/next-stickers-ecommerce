import jwt from "jsonwebtoken";
import User from "../models/user";
import type { NextApiResponse } from "next";
import type { JWT_Decoded, NextApiRequestWithUser } from "../types/types";

const auth = (handler: any) => {
  return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const { cookies } = req;

      const token = cookies.OursiteJWT;
      const decoded = jwt.verify(
        token ?? "",
        process.env.JWT_TOKEN_KEY ?? ""
      ) as JWT_Decoded;
      const user = await User.findById(decoded._id);
      if (!user) {
        throw new Error();
      }
      const filteredTokens = user.tokens.filter(
        (userToken: { token: string; _id: string }) => {
          return userToken.token === token;
        }
      );
      const isTokenAvailableAtUser = filteredTokens.length !== 0;

      if (!isTokenAvailableAtUser) {
        throw new Error();
      }
      req.user = user;
      return handler(req, res);
    } catch (err) {
      console.log(err);
      res.status(401).json({ msg: "Please authenticate.", code: -99 });
    }
  };
};
export default auth;
