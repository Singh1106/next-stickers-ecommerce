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
        // const orders = await User.aggregate([
        //   {
        //     $match: {},
        //   },
        // ]);
        const users = await User.find();
        const usersWithOnlyUnfulfilledOrders = users.filter((user) => {
          user.orders = user.orders.filter((order: any) => {
            if (order.status !== "Fulfilled") {
              return true;
            }
            return false;
          });
          if (user.orders.length !== 0) {
            return true;
          }
          return false;
        });
        res.json({
          msg: "Successfully sent the unfulfilled orders",
          code: 1,
          users: usersWithOnlyUnfulfilledOrders,
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
