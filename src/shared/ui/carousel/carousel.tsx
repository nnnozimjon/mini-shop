import React, { Fragment, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CarouselProps } from "./types";

export const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = true,
  interval = 4000,
  showIcons = false,
}) => {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [index, autoPlay, interval]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <picture
            key={i}
            className="h-55 w-full shrink-0 sm:h-47.5 md:h-105"
          >
            <source
              srcSet={img.mobile}
              media="(max-width: 767px)"
            />

            <source
              srcSet={img.desktop}
              media="(min-width: 768px)"
            />

            <img
              src={img.desktop}
              alt={img.alt ?? `Slide ${i + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </picture>
        ))}
      </div>

      {showIcons && (
        <Fragment>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
          >
            <ChevronRight size={20} />
          </button>
        </Fragment>
      )}

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full select-none transition ${
              i === index ? "bg-blue-600" : "bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
