import type { NextApiResponse } from "next";
import User from "../../../src/models/user";
import type { NextApiRequestWithUser } from "../../../src/types/types";

const handler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<any>
) => {
  const { method } = req;
  const { email } = req.query;

  switch (method) {
    case "GET":
      try {
        const user = await User.findOne({ email });
        if (user) {
          res.json({
            msg: "Successfully found you.",
            code: 1,
          });
        } else {
          res.json({
            msg: "Could not find you.",
            code: 2,
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

export default handler;
