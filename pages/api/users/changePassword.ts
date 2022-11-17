import type { NextApiResponse } from "next";
import type { NextApiRequestWithUser } from "../../../src/types/types";
import connectDB from "../../../src/middleware/connectDB";
import auth from "../../../src/middleware/auth";
import bcrypt from "bcrypt";

const handler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<any>
) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "POST":
      const { oldP, newP } = req.body;
      try {
        const isMatch = await bcrypt.compare(oldP, req.user.password);
        if (isMatch) {
          req.user.password = await bcrypt.hash(newP, 8);
          await req.user.save();
          res.status(200).json({
            msg: "Password successfully updated",
            code: 1,
          });
        } else {
          res.status(400).json({
            msg: "Old password not correct",
            code: -1,
          });
        }
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
