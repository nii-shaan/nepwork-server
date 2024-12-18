import nodemailer from "nodemailer";

class Mail {
  constructor(senderAddress, password) {
    this.senderAddress = senderAddress;
    this.password = password;

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.senderAddress,
        pass: this.password,
      },
    });
  }

  welcomeMail = async function (to, firstName, lastName) {
    const mailOptions = {
      from: this.senderAddress,
      to: to,
      subject: "Welcome to Nepwork",
      text: `We warmly welcome you to Nepwork, ${firstName} ${lastName}`,
    };

    await this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) console.log(error);
      else {
        console.log(info.response);
      }
    });
  };

  otpMail = async function (to, otpCode) {
    const mailOptions = {
      from: this.senderAddress,
      to: to,
      subject: "OTP for Email verification",
      text: `Dear, ${to} your OTP for Email Verification is  ${otpCode}\n This OTP will expire after 5 minutes  `,
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, function (error, info) {
        if (error) reject(error);
        else resolve(info);
      });
    });
  };
}

export const MailService = new Mail(
  process.env.EMAIL_ADDRESS,
  process.env.EMAIL_APP_PASSWORD
);
