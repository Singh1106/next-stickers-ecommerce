import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../src/middleware/connectDB";
import Product from "../../../src/models/product";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { method } = req;
  const { id } = req.query;

  await connectDB();

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res
          .status(400)
          .json({ msg: "something went really wrong", code: -999 });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
