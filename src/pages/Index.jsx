/** @format */
import { useState, useRef, useEffect } from "react";
import WelcomePage from "@/components/WelcomePage.jsx";
import { motion as Motion, AnimatePresence } from "motion/react";
import LeftContent from "@/components/LeftContent";
import MainPage from "./MainPage";
import musicSrc from "@/assets/music/suling.mp3";

const Index = () => {
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true); // Set true untuk producion
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 1024px)").matches,
  );
  const audioRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleMediaChange = (e) => setIsDesktop(e.matches);

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.log("Audio play error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  const handleOpenInvitation = () => {
    setIsWelcomeVisible(false);
    setIsMusicPlaying(true); // Start music when invitation opened
  };

  const handleToggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <>
      {/* Single Audio Element for entire app */}
      <audio ref={audioRef} loop>
        <source src={musicSrc} type="audio/mpeg" />
      </audio>

      <div className="flex h-screen overflow-hidden">
        {/* Welcome Page */}
        <WelcomePage
          isVisible={isWelcomeVisible}
          onOpenInvitation={handleOpenInvitation}
        />
        <Motion.div
          initial={{ opacity: 0, y: 100, x: -100 }}
          animate={{
            opacity: isWelcomeVisible ? 0 : 1,
            y: isWelcomeVisible ? 100 : 0,
            x: isWelcomeVisible ? -100 : 0,
          }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="w-[70%] bg-cover bg-center bg-left-content-desktop h-screen hidden lg:block overflow-hidden relative border-r border-accent"
        >
          <LeftContent
            isMusicPlaying={isMusicPlaying}
            onToggleMusic={handleToggleMusic}
          />
        </Motion.div>
        <Motion.main
          initial={isDesktop ? { opacity: 0, y: 100, x: 100 } : { opacity: 1 }}
          animate={
            isDesktop
              ? {
                opacity: isWelcomeVisible ? 0 : 1,
                y: isWelcomeVisible ? 100 : 0,
                x: isWelcomeVisible ? 100 : 0,
              }
              : { opacity: isWelcomeVisible ? 0 : 1 }
          }
          transition={
            isDesktop ? { duration: 1, delay: 0.3, ease: "easeOut" } : {}
          }
          className="w-full lg:w-[30%] h-screen overflow-y-auto"
        >
          <MainPage
            isMusicPlaying={isMusicPlaying}
            onToggleMusic={handleToggleMusic}
          />
        </Motion.main>
      </div>
    </>
  );
};

export default Index;
