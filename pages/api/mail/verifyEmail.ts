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
        console.log(req.rawHeaders);
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
          domain: req.rawHeaders[1],
          date,
        });
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            return res.json(err);
          } else {
            return res.json({
              code: 1,
              info,
            });
          }
        });
        await user.save();
        return res.json({
          code: 1,
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
