import type { NextApiResponse } from "next";
import type { NextApiRequestWithUser } from "../../../src/types/types";
import auth from "../../../src/middleware/auth";

const handler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<any>
) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        res.json({
          msg: "Successfully got user's messages with admin",
          code: 1,
          messages: req.user.messagesWithAdmin,
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
