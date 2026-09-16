/** @format */

import Typography from "./ui/typography";
import { Badge } from "./ui/badge";
import Vinyl from "./Vinyl";
import { FadeIn } from "@/lib/animations";

const LeftContent = ({ isMusicPlaying, onToggleMusic }) => {
  const Data = {
    name: ["Dek Open", "Yuni"],
    date: "1 Oktober 2026",
  };
  return (
    <>
      {/* Vinyl Player */}
      <FadeIn delay={0.8} duration={0.6}>
        <div className="hidden lg:block absolute bottom-7 right-7">
          <Vinyl isPlaying={isMusicPlaying} onToggle={onToggleMusic} />
        </div>
      </FadeIn>

      <div className="absolute bottom-7 left-7">
        <div className="flex items-center space-x-4 *:font-medium! *:text-7xl">
          <Typography variant="h3" className="text-secondary font-great-vibes">
            {Data.name[0]}
          </Typography>
          <Typography variant="h3" className="text-secondary font-great-vibes">
            &
          </Typography>
          <Typography variant="h3" className="text-secondary font-great-vibes">
            {Data.name[1]}
          </Typography>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <Badge className="bg-secondary/10 backdrop-blur-md border border-secondary/20 text-secondary tracking-wide">
            {Data.date}
          </Badge>
          <div className="h-0.5 w-full block bg-secondary" />
        </div>
      </div>
    </>
  );
};

export default LeftContent;
