import HomeHeader from "@/components/headers/HomeHeader";
import AboutUs from "@/components/Home/AboutUs";
import Crash from "@/components/Home/Crash";
import FeaturesSlider from "@/components/Home/FeaturesSlider";
import Footer from "@/components/Home/Footer";
import GameList from "@/components/Home/GameList";
import LuckyDraw from "@/components/Home/LuckyDraw";
import SlideInfo from "@/components/Home/SlideInfo";
import Sponsor from "@/components/Home/Sponsor";
import TabLayout from "@/components/TabLayout";
import Contact from "@/components/Home/Contact";
import Intro from "@/components/Home/Intro";

export default function Home() {
  return (
    <div className="forg-bg overflow-x-hidden">
      <TabLayout>
        <HomeHeader />
        <div className="container">
          <FeaturesSlider />
          <SlideInfo />

          <Intro />
          <GameList />
          <Crash />
          <LuckyDraw />
          <AboutUs />
          <Sponsor />
          <Contact />
          <Footer />
        </div>
      </TabLayout>
    </div>
  );
}
