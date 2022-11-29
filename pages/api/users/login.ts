import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../src/middleware/connectDB";
import User from "../../../src/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          return res.json({
            msg: "Unable to login, cant find user",
            code: -1,
          });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (isMatch === false) {
          return res.json({
            msg: "Unable to login, Wrong Password. Try again.",
            code: -2,
          });
        }
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
        if (user.isAdmin) {
          return res.json({
            msg: "Admin Logged in successfully",
            code: 2,
          });
        }
        res.json({
          msg: "Logged in successfully",
          code: 1,
        });
      } catch (err: any) {
        console.log(err);
        res
          .status(500)
          .json({ msg: "Something really went wrong.", code: -99 });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
