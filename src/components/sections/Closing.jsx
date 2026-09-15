/** @format */
import Typography from "../ui/typography";
import WaveShape6 from "../shapes/WaveShape6";
import { ScrollReveal } from "@/lib/animations";

const Closing = () => {
  const Data = {
    couple_name: "Dwiyana & Yuningsih",
    closing_message:
      "Kehadiran dan doa restu Anda merupakan kebahagiaan yang sangat berarti bagi kami. Terima kasih telah menjadi bagian dari hari istimewa kami.",
  };
  return (
    <>
      <section className="min-h-screen bg-center bg-closing bg-cover bg-no-repeat relative mt-10">
        <WaveShape6 fillColors="fill-background" />
        <div className="container flex items-end justify-center min-h-screen">
          {/* Information */}
          <ScrollReveal>
            <div className="flex flex-col items-center w-full justify-center z-20 *:text-secondary text-center space-y-4 pb-10">
              <Typography
                variant="h1"
                className="font-great-vibes font-medium text-5xl"
              >
                {Data.couple_name}
              </Typography>
              <Typography className="text-sm md:max-w-md lg:max-w-full leading-relaxed">
                {Data.closing_message}
              </Typography>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Closing;
