/** @format */
import { useState, useEffect } from "react";
import Typography from "../ui/typography";
import { ScrollReveal, ScaleIn } from "../../lib/animations";

const DateCounter = () => {
  // ============================================================
  // TANGGAL & WAKTU ACARA
  // ============================================================
  // Format:
  // YYYY-MM-DDTHH:mm:ss+08:00
  //
  // YYYY = Tahun
  // MM   = Bulan (01 = Januari, 10 = Oktober)
  // DD   = Tanggal
  // HH   = Jam (format 24 jam)
  // mm   = Menit
  // ss   = Detik
  //
  // +08:00 = Zona waktu WITA (UTC+8)
  //
  // CONTOH:
  // 2026-10-01T17:00:00+08:00
  //             │  │  │
  //             │  │  └── Detik: 00
  //             │  └───── Menit: 00
  //             └──────── Jam: 17.00 WITA
  //
  // Jadi tanggal acara di bawah adalah:
  // 1 Oktober 2026, pukul 17.00 WITA
  // ============================================================
  const weddingDate = new Date("2026-10-01T10:00:00+08:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const witaOffset = 8 * 60;
      const localOffset = now.getTimezoneOffset();
      const witaNow = new Date(
        now.getTime() + (witaOffset + localOffset) * 60000,
      );

      const difference = weddingDate - witaNow;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdownData = [
    { value: timeLeft.days, label: "Hari" },
    { value: timeLeft.hours, label: "Jam" },
    { value: timeLeft.minutes, label: "Menit" },
    { value: timeLeft.seconds, label: "Detik" },
  ];

  return (
    <section className="py-10">
      <div className="container">
        <ScrollReveal threshold={0.3}>
          {/* Heading */}
          <div className="mb-6">
            <Typography
              variant="h5"
              className="text-center font-medium uppercase tracking-[0.35em] sm:tracking-[0.45em] text-accent mb-8"
            >
              Menuju Hari Bahagia
            </Typography>
            <Typography className="italic text-primary text-center tracking-wide mt-0! mb-8">
              Kamis, 1 Oktober 2026 &nbsp;·&nbsp; 10.00 WITA
            </Typography>
          </div>

          {/* Counter */}
          <div className="flex items-center justify-center gap-2">
            {countdownData.map((item, index) => (
              <>
                <ScaleIn key={index} delay={index * 0.1}>
                  <div>
                    <div className="size-16 p-2 border border-accent rounded-md flex items-center justify-center">
                      <span className="text-center">
                        <Typography
                          variant="h3"
                          className="mb-0! text-center text-primary"
                        >
                          {String(item.value).padStart(2, "0")}
                        </Typography>
                      </span>
                    </div>
                    <Typography className="text-center mt-2! sm:mt-3 text-[0.5rem] sm:text-[0.6rem] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
                      {item.label}
                    </Typography>
                  </div>
                </ScaleIn>

                {/* Separator titik dua, kecuali setelah item terakhir */}
                {index < countdownData.length - 1 && (
                  <Typography
                    variant="h3"
                    className="text-primary/50 mb-0! select-none"
                  >
                    :
                  </Typography>
                )}
              </>
            ))}
          </div>

          <div className="mt-8 sm:mt-10">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex-1 h-px bg-linear-to-r from-transparent to-accent" />
              <div className="flex-1 h-px bg-linear-to-l from-transparent to-accent" />
            </div>
            <Typography className="mt-3! text-center text-sm italic text-primary tracking-wide">
              Dengan penuh cinta, kami menantikan kehadiranmu
            </Typography>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DateCounter;
