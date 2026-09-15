/** @format */
import { Fragment, useState, useEffect } from "react";
import Typography from "../ui/typography";

const ArcRing = ({ value, max, label, delay = 0 }) => {
  const r = 38;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - Math.min(value / max, 1));

  return (
    <div
      className="flex flex-col items-center"
      style={{
        opacity: 0,
        animation: `fadeUp 0.6s ease ${delay}s forwards`,
      }}
    >
      <div className="relative size-18">
        <svg
          viewBox="0 0 88 88"
          className="w-full h-full"
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* track */}
          <circle
            cx="44"
            cy="44"
            r={r}
            className="stroke-accent/30 fill-none stroke-3"
          />
          {/* fill */}
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            className="stroke-accent"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>

        {/* number inside */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Typography
            variant="h3"
            className="font-semibold text-primary text-lg sm:text-xl md:text-2xl"
          >
            {String(value).padStart(2, "0")}
          </Typography>
        </div>
      </div>

      {/* label */}
      <Typography className="mt-2 sm:mt-3 text-[0.5rem] sm:text-[0.6rem] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
        {label}
      </Typography>
    </div>
  );
};

const DateCounter2 = () => {
  const weddingDate = new Date("2026-03-25T10:00:00+08:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const witaOffset = 8 * 60;
      const localOffset = now.getTimezoneOffset();
      const witaNow = new Date(
        now.getTime() + (witaOffset + localOffset) * 60000,
      );
      const diff = weddingDate - witaNow;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    calculate();
    const t = setInterval(calculate, 1000);
    return () => clearInterval(t);
  }, []);

  const items = [
    { value: timeLeft.days, label: "Hari", max: 365 },
    { value: timeLeft.hours, label: "Jam", max: 24 },
    { value: timeLeft.minutes, label: "Menit", max: 60 },
    { value: timeLeft.seconds, label: "Detik", max: 60 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;500;600&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <section className="py-10">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          {/* ── top ornament ── */}
          <div
            className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
            style={{ opacity: 0, animation: "fadeUp 0.6s ease 0.05s forwards" }}
          >
            <div className="flex-1 h-px bg-linear-to-r from-transparent to-accent" />
            <div className="size-1.5 bg-accent shrink-0 rotate-45" />
            <div className="flex-1 h-px bg-linear-to-l from-transparent to-accent" />
          </div>

          {/* ── label ── */}
          <Typography className="text-center font-medium text-[0.5rem] sm:text-[0.6rem] uppercase tracking-[0.35em] sm:tracking-[0.45em] text-accent mb-2">
            Menuju Hari Bahagia
          </Typography>

          {/* ── date ── */}
          <Typography className="text-center italic text-primary tracking-wide mb-8">
            Rabu, 1 Oktober 2026 &nbsp;·&nbsp; 17.00 WITA
          </Typography>

          {/* ── counter ── */}
          <div className="flex items-center justify-center gap-1 sm:gap-0">
            {items.map((item, i) => (
              <Fragment key={i}>
                <ArcRing
                  value={item.value}
                  max={item.max}
                  label={item.label}
                  delay={0.3 + i * 0.1}
                />
                {i < items.length - 1 && (
                  <div className="text-lg sm:text-2xl font-bold text-primary mx-1 sm:mx-2">
                    :
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          {/* ── bottom ── */}
          <div
            className="mt-8 sm:mt-10"
            style={{ opacity: 0, animation: "fadeUp 0.6s ease 0.85s forwards" }}
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex-1 h-px bg-linear-to-r from-transparent to-accent" />
              <div className="flex-1 h-px bg-linear-to-l from-transparent to-accent" />
            </div>
            <Typography className="text-center text-sm italic text-primary tracking-wide">
              Dengan penuh cinta, kami menantikan kehadiranmu
            </Typography>
          </div>
        </div>
      </section>
    </>
  );
};

export default DateCounter2;
