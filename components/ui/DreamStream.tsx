import { useEffect, useMemo, useState } from "react";

const DREAM_ASSETS = [
  "/assets/mansion-dark.jpeg",
  "/assets/yacht-bw.jpeg",
  "/assets/car-dark.jpeg",
  "/assets/truck-noir.jpeg",
] as const;

export function DreamStream() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const assets = useMemo(() => [...DREAM_ASSETS], []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % assets.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [assets.length]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-black via-transparent to-black" />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-transparent to-black" />
      <div className="absolute inset-0 z-10 bg-black/60 mix-blend-multiply" />

      {assets.map((src, index) => (
        <div
          key={src}
          className={[
            "absolute inset-0 w-full h-full transition-all duration-[3000ms] ease-in-out",
            index === currentIndex ? "opacity-40 scale-100 blur-0" : "opacity-0 scale-110 blur-xl",
          ].join(" ")}
        >
          <img
            src={src}
            alt="Dream Asset"
            className="w-full h-full object-cover grayscale"
            loading={index === currentIndex ? "eager" : "lazy"}
          />
        </div>
      ))}
    </div>
  );
}

