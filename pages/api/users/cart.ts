import type { NextApiResponse } from "next";
import type { NextApiRequestWithUser } from "../../../src/types/types";
import connectDB from "../../../src/middleware/connectDB";
import auth from "../../../src/middleware/auth";

const handler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<any>
) => {
  const { method } = req;
  const { cart } = req.body;
  await connectDB();

  switch (method) {
    case "POST":
      try {
        req.user.cart = cart;
        const user = await req.user.save();
        res.json({
          msg: "Successfully updated cart",
          code: 1,
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
