import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../src/middleware/connectDB";
import Product from "../../../src/models/product";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case "POST":
      try {
        const { page, limit } = req.body;
        const products = await Product.find({})
          .limit(page * limit)
          .skip((page - 1) * limit);
        res.status(200).json({ success: true, code: 1, data: products });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
