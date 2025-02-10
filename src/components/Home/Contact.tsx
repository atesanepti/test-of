"use client";
import { useFetchContactInfoQuery } from "@/lib/features/api/contactApiSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import facebook from "@/../public/assets/facebook.png";
import telegram from "@/../public/assets/telegram.png";
import whatsapp from "@/../public/assets/whatsapp.png";
import { BadgeHelp } from "lucide-react";
import { useTranslation } from "@/lib/store";
import { Skeleton } from "../ui/skeleton";
const Contact = () => {
  const { data, isLoading } = useFetchContactInfoQuery();
  const contactInfo = data?.payload;
  const lan = useTranslation((state) => state.lan);
  return (
    <>
      {contactInfo && (
        <div className="my-12 ">
          <h5
            className="text-white text-sm  text-center mb-2
                "
          >
            {lan == "BN" ? "যোগাযোগ" : "Contacet"}
          </h5>
          <ul className="mt-2 flex justify-between w-full rounded-lg shadow-sm bg-input gap-2 py-8 px-2">
            {contactInfo.facebook && (
              <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all flex-1">
                <Link
                  href={contactInfo.facebook}
                  target="_blank"
                  className="flex flex-col justify-center items-center"
                >
                  <Image src={facebook} alt="Facebook" className="w-7" />
                  <span className="text-xs text-white ">Facebook</span>
                </Link>
              </li>
            )}
            {contactInfo.whatsapp && (
              <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all flex-1">
                <Link
                  href={`https://wa.me/${contactInfo.whatsapp.replace(
                    "+",
                    ""
                  )}?text=Hello!%20I%20need%20assistance`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col justify-center items-center"
                >
                  <Image src={whatsapp} alt="Whatsapp" className="w-7" />
                  <span className="text-xs text-white ">Whatsapp</span>
                </Link>
              </li>
            )}
            {contactInfo.telegram && (
              <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all flex-1">
                <Link
                  href={`https://t.me/${contactInfo.telegram}`}
                  target="_blank"
                  className="flex flex-col justify-center items-center"
                >
                  <Image src={telegram} alt="Telegram" className="w-7" />
                  <span className="text-xs text-white ">Telegram</span>
                </Link>
              </li>
            )}

            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all flex-1">
              <Link
                href="#"
                className="flex flex-col justify-center items-center"
              >
                <BadgeHelp className="w-7 h-7 rounded-full bg-blue-700 text-white p-2 " />
                <span className="text-xs text-white ">Help Line</span>
              </Link>
            </li>
          </ul>
        </div>
      )}

      {isLoading && (
        <div className="rounded-md bg-input shadow-sm h-[110px] w-full flex justify-between items-center px-8">
          <Skeleton className="h-10 w-10 !bg-primary rounded-sm" />
          <Skeleton className="h-10 w-10 !bg-primary rounded-sm" />
          <Skeleton className="h-10 w-10 !bg-primary rounded-sm" />
          <Skeleton className="h-10 w-10 !bg-primary rounded-sm" />
        </div>
      )}
    </>
  );
};

export default Contact;
