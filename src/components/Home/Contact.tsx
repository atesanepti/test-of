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
const Contact = () => {
  const { data } = useFetchContactInfoQuery();
  const contactInfo = data?.payload;
  const lan = useTranslation((state) => state.lan);
  return (
    <>
      {contactInfo && (
        <div>
          <h5
            className="text-white text-sm font-semibold 
                "
          >
            {lan == "BN" ? "যোগাযোগ" : "Contacet"}
          </h5>
          <ul className="mt-2 flex  gap-2">
            {contactInfo.facebook && (
              <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
                <Link href={contactInfo.facebook} target="_blank">
                  <Image src={facebook} alt="Facebook" className="w-7" />
                </Link>
              </li>
            )}
            {contactInfo.whatsapp && (
              <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
                <Link
                  href={`https://wa.me/${contactInfo.whatsapp.replace(
                    "+",
                    ""
                  )}?text=Hello!%20I%20need%20assistance`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={whatsapp} alt="Whatsapp" className="w-7" />
                </Link>
              </li>
            )}
            {contactInfo.telegram && (
              <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
                <Link
                  href={`https://t.me/${contactInfo.telegram}`}
                  target="_blank"
                >
                  <Image src={telegram} alt="Telegram" className="w-7" />
                </Link>
              </li>
            )}

            <li className="text-xs text-muted-foreground hover:underline hover:text-white transition-all">
              <Link href="#">
                <BadgeHelp className="w-7 h-7 rounded-full bg-blue-700 text-white p-2 " />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Contact;
