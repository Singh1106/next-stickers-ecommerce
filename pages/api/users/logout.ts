import type { NextApiResponse } from "next";
import type { NextApiRequestWithUser } from "../../../src/types/types";
import connectDB from "../../../src/middleware/connectDB";
import auth from "../../../src/middleware/auth";

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
            return token.token !== req.headers.authorization;
          }
        );
        await req.user.save();
        console.log("Logged out. :(");
        res.send("User logged out successfully");
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
