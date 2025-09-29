import * as nodemailer from 'nodemailer';

export const createTransporter = (
  emailUsername: string,
  emailPassword: string,
) => {
  return nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: emailUsername,
      pass: emailPassword,
    },
  });
};
