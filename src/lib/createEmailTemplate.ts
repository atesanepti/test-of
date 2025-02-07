import { Templates } from "@/types/enum";
import { TemplateProps } from "@/types/interface";

export const createTemplate = (
  template: Templates,
  props: TemplateProps
): { subject: string; html: string } | undefined => {
  if (template === Templates.EMAIL_VERIFICATION) {
    return {
      subject: "Verify You Email",
      html: ` <main
  style="
    font-family: arial;

>
  <div style="text-align: center; padding-block: 30px">
    <img src="./public/assets/logo.png" alt="nimpg" style="width: 100px" />
  </div>
  <div>
    <div style="padding: 10px; border-radius: 10px;">
      <span
        style="
          font-size: 15px;
          text-align: center;
          text-align: center;
          display: inline-block;
        "
      >
        Hello <b>${props.name}</b>, User this link to verify your account <a href="${props.redirectURL}">Click here</a>.
      </span>
    </div>
  </div>
</main>
`,
    };
  } else if (template === Templates.FORGET_PASSWORD) {
    return {
      subject: "Forget Password",
      html: `<main
  style="
    font-family: arial;
    box-sizing: border-box;
    padding: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    min-width: 320px;
    max-width: 350px;
    margin-inline: auto;
    margin-top: 150px;
  "
>
  <div style="text-align: center; padding-block: 30px">
    <img src="./public/assets/logo.png" alt="nimpg" style="width: 100px" />
  </div>
  <div>
    <div style="padding: 10px; border-radius: 10px;">
      <span
        style="
          font-size: 15px;
          text-align: center;
          text-align: center;
          display: inline-block;
        "
      >
        Hello <b>${props.name}</b>, You tried to change your account password. Use
        this for verifing
      </span>

      <div style="background-color: #6663ff; padding: 10; width: 100%; box-sizing: border-box;margin-top: 25px">
        <span style="font-weight: 500; color: #fff; text-align: center;display: block;"
          >467890</span
        >
      </div>
    </div>
  </div>
</main>
`,
    };
  }
};
