import type { NextApiRequest, NextApiResponse } from "next";
import { getMailOptions } from "../../../src/templates/mail";
import { transporter } from "../../../src/utils/nodemailer";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const msg = "Mail successfully sent";
        const { email, type } = req.body;
        const mailOptions = getMailOptions(type, email);
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            return res.json(err);
          } else {
            return res.json({
              code: 1,
              msg,
              info,
            });
          }
        });
        return res.json({
          code: 1,
          msg,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          code: -999,
          msg: "Something really went wrong.",
        });
      }
      break;
    default:
      res.status(404).json({ success: false });
      break;
  }
};

export default handler;
