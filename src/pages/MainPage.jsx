/** @format */
import Vinyl from "@/components/Vinyl";
import RsvpShortcut from "@/components/RsvpShortcut";
import { FadeIn } from "@/lib/animations";
import HeroSection from "@/components/sections/HeroSection";
import OpeningVerse from "@/components/sections/OpeningVerse";
import Couple from "@/components/sections/Couple";
import WeddingDate from "@/components/sections/WeddingDate";
import DateCounter from "@/components/sections/DateCounter";
import Gallery from "@/components/sections/gallery/Gallery";
import DigitalGift from "@/components/sections/DigitalGift";
import RSVP from "@/components/sections/rsvp/RSVP";
import Closing from "@/components/sections/Closing";
import Footer from "@/components/sections/Footer";

const MainPage = ({ isMusicPlaying, onToggleMusic }) => {
  return (
    <>
      {/* Floating RSVP Shortcut - Bottom Left */}
      <FadeIn delay={0.5} duration={0.6}>
        <RsvpShortcut />
      </FadeIn>

      {/* Vinyl Player - Mobile & Tablet Only (Bottom Right) */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <FadeIn delay={0.5} duration={0.6}>
          <Vinyl isPlaying={isMusicPlaying} onToggle={onToggleMusic} />
        </FadeIn>
      </div>

      <HeroSection />
      <OpeningVerse />
      <Couple />
      <WeddingDate />
      <DateCounter />
      <Gallery />
      <DigitalGift />
      <RSVP />
      <Closing />
      <Footer />
    </>
  );
};

export default MainPage;
