import type { NextApiResponse } from "next";
import type { NextApiRequestWithUser } from "../../../src/types/types";
import connectDB from "../../../src/middleware/connectDB";
import auth from "../../../src/middleware/auth";
import User from "../../../src/models/user";

const handler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<any>
) => {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "GET":
      try {
        const users = await User.find();
        res.json({
          msg: "Successfully got back the users",
          code: 1,
          users,
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
