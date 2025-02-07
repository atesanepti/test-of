import Link from "next/link";
import React from "react";
// import fram_3 from "@/../public/assets/fram-up-3.png";
// import fram_down from "@/../public/assets/fram-down-1.png";
import Image from "next/image";

interface FormProps {
  formTitle?: string;
  formIntro?: string;
  children: React.ReactNode;
  formActionText?: string;
  formActionLink?: string;
  formActionHref?: string;
}
const Form = ({
  formTitle,
  formIntro,
  children,
  formActionText,
  formActionLink,
  formActionHref,
}: FormProps) => {
  return (
    <div className="relative w-[350px] md:[380px] rounded-lg p-4 shadow-lg bg-primary/15 backdrop-blur-sm  border border-border">
      <div className="absolute bottom-[-15px] right-2">
        <Image
          width={100}
          height={100}
          src={"/assets/fram-down-1.png"}
          alt="fram"
          className="w-[90px] h-auto select-none "
        />
      </div>
      <div className="absolute top-[-15px] left-5">
        <Image
          src={"/assets/fram-up-3.png"}
          width={100}
          height={100}
          alt="fram"
          className="w-[150px] h-auto select-none "
        />
      </div>
      {formTitle && (
        <div className="py-2">
          <h3 className="text-brand font-oswald uppercase text-lg lg:text-xl">
            {formTitle}
          </h3>

          {formIntro && (
            <span className="text-muted text-xs md:text-sm mt-2">
              {formIntro}
            </span>
          )}
        </div>
      )}

      <div className="w-full my-3">{children}</div>

      {formActionText && (
        <div className="mt-3 text-center">
          <span className="text-muted-foreground text-xs lg:text-sm">
            {formActionText}{" "}
            {formActionLink && (
              <Link
                href={formActionHref!}
                className="text-brand  hover:underline"
              >
                {formActionLink}
              </Link>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default Form;
