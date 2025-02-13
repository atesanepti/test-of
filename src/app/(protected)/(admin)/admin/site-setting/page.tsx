import React from "react";
import HomeHeader from "@/components/headers/HomeHeader";

import SettingForm from "@/components/site/SettingForm";
import Agents from "@/components/site/Agents";
import Contact from "@/components/site/Contact";
import { Metadata } from "next";
import SilderInfo from "@/components/site/SilderInfo";
import FeaturesImages from "@/components/site/FeaturesImages";

export const metadata: Metadata = {
  title: "Site Setting | CasinoCity24",
  description:
    "Customize and manage your site settings. Control features, preferences, and configurations for your Bangladesh casino and betting site.",
};

const SiteSetting = () => {
  return (
    <div className="px-2">
      <HomeHeader />
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <FeaturesImages/>
          <SettingForm />
          <Agents />
          <Contact />
          <SilderInfo />
        </div>
      </div>
    </div>
  );
};

export default SiteSetting;
