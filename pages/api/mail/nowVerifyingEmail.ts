import type { NextApiResponse } from "next";
import auth from "../../../src/middleware/auth";
import connectDB from "../../../src/middleware/connectDB";
import { NextApiRequestWithUser } from "../../../src/types/types";

const handler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<any>
) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case "POST":
      try {
        const user = req.user;
        const date = new Date();
        const { code } = req.body;
        if (
          date < user.tempEmailVerifyToken.expiry &&
          code === user.tempEmailVerifyToken.code
        ) {
          user.tempEmailVerifyToken = {};
          user.verifiedEmail = true;
          await user.save();
          return res.json({
            code: 1,
          });
        }
        res.json({
          code: 0,
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

export default auth(handler);
