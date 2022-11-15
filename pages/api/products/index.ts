import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../src/middleware/connectDB";
import Product from "../../../src/models/product";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case "GET":
      try {
        const products = await Product.find({});
        res.status(200).json({ success: true, code: 1, data: products });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      const { name, desc, imageURL } = req.body;
      try {
        const newProduct = new Product({
          name,
          desc,
          image: imageURL,
        });
        const product = await newProduct.save();
        res.json(product);
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
