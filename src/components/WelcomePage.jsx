/** @format */

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Mail } from "lucide-react";
import Typography from "./ui/typography";
import { FadeIn, SlideInUp, ScaleIn } from "@/lib/animations";
import { useUrlParams } from "@/hooks/useUrlParams";

const welcomeData = {
  date: "1 Oktober 2026",
  label: "Pawiwahan",
  bride: {
    name: "Dek Open",
  },
  groom: {
    name: "Yuni",
  },
  invitation: {
    greeting: "Kepada Yth. Bapak/Ibu/Saudara/i",
    guestName: "Tamu Undangan",
  },
  button: {
    text: "Buka Undangan",
  },
};

const WelcomePage = ({ isVisible, onOpenInvitation }) => {
  const { guestName, hasGuestName } = useUrlParams();

  return (
    <>
      <div
        className={`bg-cover bg-center bg-no-repeat h-screen bg-welcome-mobile md:bg-welcome-desktop fixed inset-0 z-50 transition-transform duration-1000 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center flex flex-col items-center justify-between h-90">
            <div className="">
              <ScaleIn delay={0.2} duration={0.6}>
                <Badge className="bg-secondary/10 backdrop-blur-md border border-secondary/20 text-white tracking-wide">
                  {welcomeData.date}
                </Badge>
              </ScaleIn>
              <FadeIn delay={0.4} duration={0.5}>
                <Typography className="text-secondary text-sm uppercase tracking-wider mt-2!">
                  {welcomeData.label}
                </Typography>
              </FadeIn>
              <div className="flex gap-4 items-center lg:gap-6 **:font-medium! **:text-5xl lg:**:text-6xl mt-3">
                <FadeIn delay={0.8} duration={0.8}>
                  <div className="h-0.5 w-14 hidden md:block bg-secondary"></div>
                </FadeIn>
                <SlideInUp delay={0.6} duration={0.6}>
                  <Typography
                    variant="h1"
                    className="text-secondary font-great-vibes"
                  >
                    {welcomeData.bride.name}
                  </Typography>
                </SlideInUp>
                <ScaleIn delay={0.9} duration={0.5}>
                  <Typography
                    variant="h1"
                    className="text-secondary font-great-vibes text-6xl! lg:text-7xl!"
                  >
                    &
                  </Typography>
                </ScaleIn>
                <SlideInUp delay={0.6} duration={0.6}>
                  <Typography
                    variant="h1"
                    className="text-secondary font-great-vibes"
                  >
                    {welcomeData.groom.name}
                  </Typography>
                </SlideInUp>
                <FadeIn delay={0.8} duration={0.8}>
                  <div className="h-0.5 w-14 hidden md:block bg-secondary"></div>
                </FadeIn>
              </div>
            </div>
            <SlideInUp delay={1.2} duration={0.6}>
              <div className="">
                <Typography
                  variant="p"
                  className="text-secondary font-medium mt-4 text-sm"
                >
                  {welcomeData.invitation.greeting}
                </Typography>
                <Typography variant="h3" className="text-secondary">
                  {hasGuestName ? guestName : welcomeData.invitation.guestName}
                </Typography>
              </div>
            </SlideInUp>
          </div>
          <SlideInUp delay={1.5} duration={0.6}>
            <Button
              size="lg"
              className="rounded-full px-8! md:px-16! border-2 border-primary hover:bg-transparent hover:text-secondary hover:border-accent transition-all duration-300 animate-glow-accent backdrop-blur-md mt-4"
              onClick={onOpenInvitation}
            >
              <Mail />
              {welcomeData.button.text}
            </Button>
          </SlideInUp>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
