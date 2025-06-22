import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASSWORD!,
  },
});

export const sendVerificationEmail = async (to: string, code: string) => {
  const html = `
    <p>Mã xác minh của bạn là: <b>${code}</b></p>
    <p>Lưu ý: Mã sẽ hết hạn sau 5 phút.</p>
  `;

  await transporter.sendMail({
    from: `"Dnfresh" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Xác minh email",
    html,
  });

  console.log(`Verification code ${code} sent to ${to}`);
};

