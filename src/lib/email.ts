import nodeMailer, { SendMailOptions } from "nodemailer";
import { createTemplate } from "./createEmailTemplate";
import { Templates } from "@/types/enum";
import { TemplateProps } from "@/types/interface";

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (
  email: string,
  template: Templates,
  props: TemplateProps
) => {
  if (!email || typeof email !== "string") {
    return null;
  }

  const options: SendMailOptions = {
    from: process.env.SMTP_USERNAME,
    to: email,
    ...createTemplate(template, props),
  };

  try {
    const info = await transporter.sendMail(options);
    console.log("DEV : ", { info });
  } catch (error: unknown) {
    // TODO : it will be deleted on production env.
    if (error instanceof Error) {
      console.log("DEV ERROR : ", error.message);
    }

    return null;
  }
};
