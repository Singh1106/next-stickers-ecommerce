import type { NextApiResponse } from "next";
import auth from "../../../src/middleware/auth";
import connectDB from "../../../src/middleware/connectDB";
import { getMailOptions } from "../../../src/templates/mail";
import { NextApiRequestWithUser } from "../../../src/types/types";
import { transporter } from "../../../src/utils/nodemailer";

const handler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<any>
) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case "GET":
      try {
        const type = "verificationEmail";
        const user = req.user;
        const date = new Date();
        date.setMinutes(date.getMinutes() + 30);
        user.tempEmailVerifyToken = {
          code: Math.floor(Math.random() * 1000000000),
          expiry: date,
        };
        const mailOptions = getMailOptions(type, req.user.email, {
          verificationCode: user.tempEmailVerifyToken.code,
          domain: req.headers.host,
          date,
        });
        const mailRes = await transporter.sendMail(mailOptions);
        await user.save();
        if (mailRes?.accepted.length !== 0) {
          return res.json({
            code: 1,
            info: mailRes,
            date,
          });
        }
        res.json({
          code: 0,
          err: mailRes,
        });
      } catch (err: any) {
        console.log(err);
        res
          .status(500)
          .json({ msg: "Something really went wrong.", code: -99 });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default auth(handler);
