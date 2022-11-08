import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../src/middleware/connectDB";
import User from "../../../src/models/user";
import bcrypt from "bcrypt";

// export let UserType: any;

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { method } = req;
  console.log(req);

  await connectDB();

  switch (method) {
    case "POST":
      const data = req.body;
      data.password = await bcrypt.hash(data.password, 8);
      const user = new User(data);
      try {
        await user.save();
        res.status(201).send({
          message: "user successfully created",
          user,
        });
      } catch (e) {
        res.status(400).send(e);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
