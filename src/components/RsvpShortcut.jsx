/** @format */

import { motion as Motion } from "motion/react";
import { MessageSquareHeart } from "lucide-react";

const RsvpShortcut = () => {
  const scrollToRSVP = () => {
    const rsvpElement = document.getElementById("rsvp");
    if (!rsvpElement) return;

    // Initial smooth scroll
    rsvpElement.scrollIntoView({ behavior: "smooth", block: "start" });

    // Kompensasi pergeseran tinggi halaman akibat lazy-loading foto di Gallery
    const checkPoints = [200, 450, 750, 1050];
    checkPoints.forEach((delay) => {
      setTimeout(() => {
        const target = document.getElementById("rsvp");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, delay);
    });
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 lg:left-[calc(70%+1rem)]">
      <Motion.button
        whileTap={{ scale: 0.95 }}
        onClick={scrollToRSVP}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-primary/95 text-secondary border border-accent/40 shadow-xl backdrop-blur-md hover:border-accent hover:shadow-accent/10 transition-all duration-300 group cursor-pointer"
        aria-label="Menuju ke RSVP"
      >
        <div className="relative flex items-center justify-center">
          <MessageSquareHeart
            size={18}
            className="text-accent group-hover:scale-110 transition-transform duration-300"
          />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
        </div>
        <span className="text-xs font-medium tracking-wider uppercase text-secondary font-playfair pr-0.5">
          RSVP
        </span>
      </Motion.button>
    </div>
  );
};

export default RsvpShortcut;
