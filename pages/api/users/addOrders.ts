import type { NextApiResponse } from "next";
import type { NextApiRequestWithUser } from "../../../src/types/types";
import connectDB from "../../../src/middleware/connectDB";
import auth from "../../../src/middleware/auth";

const handler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<any>
) => {
  const { method } = req;
  const { orders: newOrders } = req.body;
  await connectDB();

  switch (method) {
    case "POST":
      try {
        const orders = req.user.orders ?? [];
        orders.push(...newOrders);
        req.user.orders = orders;
        await req.user.save();

        res.json({
          msg: "Successfully updated orders",
          code: 1,
          data: req.user.orders,
        });
      } catch (e) {
        res.status(500).send({
          msg: "Something really went wrong",
          code: -999,
          error: e,
        });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default auth(handler);
