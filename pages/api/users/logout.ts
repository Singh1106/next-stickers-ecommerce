import type { NextApiResponse } from "next";
import type { NextApiRequestWithUser } from "../../../src/types/types";
import connectDB from "../../../src/middleware/connectDB";
import auth from "../../../src/middleware/auth";
import { serialize } from "cookie";

const handler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<any>
) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case "GET":
      try {
        req.user.tokens = req.user.tokens.filter(
          (token: { token: string; _id: string }) => {
            return token.token !== req.cookies?.OursiteJWT;
          }
        );
        await req.user.save();
        res.setHeader("Set-Cookie", [
          serialize("OursiteJWT", "false", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: true,
            maxAge: 5,
            path: "/",
          }),
        ]);
        res
          .status(200)
          .json({
            msg: "Successfully logged out",
            code: 1,
            roles: null,
            auth: false,
          });
      } catch (e) {
        res.status(500).send(e);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default auth(handler);
