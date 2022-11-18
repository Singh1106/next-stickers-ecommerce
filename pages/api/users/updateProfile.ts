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
        const { name, email } = req.body;
        req.user.name = name;
        if (email) {
          req.user.email = email;
          req.user.verifiedEmail = false;
        }
        await req.user.save();
        res.status(200).json({
          msg: "Successfully updated the user.",
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

export default auth(handler);
