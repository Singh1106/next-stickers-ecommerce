export const getMailOptions = (type: string, email: string, options?: any) => {
  let mailOptions = {};
  switch (type) {
    case "signup":
      mailOptions = {
        from: process.env.SENDER_MAIL,
        to: email,
        subject: `nextCommerce welcomes you, ${email}`,
        html: `The body of the email goes here in HTML`,
      };
      break;
    case "verificationEmail":
      mailOptions = {
        from: process.env.SENDER_MAIL,
        to: email,
        subject: `Verification Email for nextCommerce`,
        html: `Okay, nice. You wanna verify your email. Click here <a href="${options?.domain}/emailVerificationResult/${options.verificationCode}" target="_blank" rel="noopener noreferrer">YO, LINK IS HERE</a>.
        <p>${options?.domain}/emailVerificationResult/${options.verificationCode}</p>
        <p>Your email is valid till ${options?.date}.</p>
        <p>Hurry up.</p>`,
      };
      break;
    default:
      mailOptions = {
        from: process.env.SENDER_EMAIl,
        to: email,
        subject: `Default Email`,
        html: `Default Email`,
      };
      break;
  }
  return mailOptions;
};
