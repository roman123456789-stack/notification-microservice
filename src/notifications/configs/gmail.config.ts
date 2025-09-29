import * as nodemailer from 'nodemailer';

export const createTransporter = (
  emailAddress: string,
  emailPassword: string,
) => {
  return nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: emailAddress,
      pass: emailPassword,
    },
  });
};
