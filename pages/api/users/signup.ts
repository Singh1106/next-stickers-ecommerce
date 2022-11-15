import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../src/middleware/connectDB";
import User from "../../../src/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

// export let UserType: any;

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case "POST":
      const data = req.body;
      data.password = await bcrypt.hash(data.password, 8);
      const user = new User(data);
      try {
        await user.save();
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_TOKEN_KEY ?? ""
        );
        user.tokens = user.tokens.concat({ token });
        await user.save();
        const serialised = serialize("OursiteJWT", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });

        res.setHeader("Set-Cookie", serialised);
        res.json({
          msg: "Logged in successfully",
          code: 1,
        });
      } catch (e) {
        res.status(400).json({
          msg: "Something really went wrong",
          code: -99,
          err: e,
        });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
