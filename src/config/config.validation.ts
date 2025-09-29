import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),

  GMAIL_EMAIL_ADDRESS: Joi.string().required(),
  GMAIL_EMAIL_PASSWORD: Joi.string().required(),

  MAIL_EMAIL_ADDRESS: Joi.string().required(),
  MAIL_EMAIL_PASSWORD: Joi.string().required(),
});
