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
    case "POST":
      try {
        const { userId, orders, status } = req.body;
        const user = await User.findById(userId);
        user.orders.forEach((order: any) => {
          if (orders.includes(order.id)) {
            order.status = status;
          }
        });
        await user.save();
        res.json({
          msg: "Successfully updated the orders",
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
