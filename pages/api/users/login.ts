import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../src/middleware/connectDB";
import User from "../../../src/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          throw new Error("Unable to login, cant find user");
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (isMatch === false) {
          throw new Error("Unable to login, wrong password");
        }
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_TOKEN_KEY ?? ""
        );
        user.tokens = user.tokens.concat({ token });
        await user.save();
        const email = user.email;
        res.send({ token });
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
