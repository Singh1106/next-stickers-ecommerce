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
        if (req.user.isAdmin) {
          return res.json({
            msg: "Successfully got user",
            code: 2,
            user: req.user,
          });
        }
        res.json({
          msg: "Successfully got user",
          code: 1,
          user: req.user,
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
