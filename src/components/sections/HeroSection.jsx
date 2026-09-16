/** @format */
import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import gallery1 from "@/assets/image/gallery/gallery(22).jpg";
import gallery2 from "@/assets/image/gallery/gallery(6).jpg";
import gallery3 from "@/assets/image/gallery/gallery(47).jpg";
import gallery4 from "@/assets/image/gallery/gallery(17).jpg";
import gallery5 from "@/assets/image/gallery/gallery(16).jpg";
import Typography from "../ui/typography";
import WaveShape1 from "../shapes/WaveShape1";

const images = [gallery1, gallery2, gallery3, gallery4, gallery5];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const Data = {
    title: "The Wedding of",
    name: "Dek Open & Yuni",
    date: "Rabu, 1 Oktober 2026",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative">
        <div className="h-[85vh] md:h-[90vh] relative overflow-hidden bg-primary">
          <AnimatePresence mode="sync" initial={false}>
            <Motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Gallery ${currentIndex + 1}`}
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: [1.05, 1],
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 7, ease: "linear" },
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          {/* Overlay to top */}
          <div className="absolute bottom-0 left-0 right-0 h-70 bg-linear-to-t from-primary via-primary/60 to-transparent"></div>

          {/* Information */}
          <div className="absolute flex flex-col items-center w-full justify-center z-20 *:text-secondary! text-center left-1/2 -translate-x-1/2 bottom-0">
            <Typography className="tracking-wider">{Data.title}</Typography>
            <Typography
              variant="h1"
              className="font-great-vibes font-medium text-5xl mt-2"
            >
              {Data.name}
            </Typography>
            <Typography className="tracking-wider mt-1!">
              {Data.date}
            </Typography>
          </div>
        </div>

        {/* Dots indicator*/}
        <div className="absolute bottom-6  left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-700 ease-in-out ${index === currentIndex
                ? "bg-secondary w-8 scale-110"
                : "bg-secondary/30 w-2 hover:bg-secondary/50 hover:scale-110"
                }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Shape */}
        <WaveShape1 />
      </section>
    </>
  );
};

export default HeroSection;
