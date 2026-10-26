import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  FiArrowLeft,
  FiArrowRight,
  FiMaximize2,
  FiX,
} from "react-icons/fi";

const PropertyGallery = ({ property }) => {
  const images = [
    property.image,
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&auto=format&fit=crop&q=85",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&auto=format&fit=crop&q=85",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&auto=format&fit=crop&q=85",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setIsOpen(false);
  }, [property.id]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((previous) =>
          (previous + 1) % images.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((previous) =>
          (previous - 1 + images.length) % images.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, images.length]);

  const nextImage = () => {
    setActiveIndex((previous) =>
      (previous + 1) % images.length
    );
  };

  const previousImage = () => {
    setActiveIndex((previous) =>
      (previous - 1 + images.length) % images.length
    );
  };

  return (
    <>
      <section className="px-4 lg:px-12">
        <div className="mx-auto max-w-350">
          {/* MAIN IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative h-95 overflow-hidden bg-[#E8E2D7] sm:h-125 lg:h-165"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={images[activeIndex]}
                alt={`${property.name} - View ${activeIndex + 1}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

            {/* TOP BADGE */}
            <div className="absolute top-6 left-6 border border-white/25 bg-[#17352D]/45 px-5 py-3 text-[10px] tracking-[2px] text-white uppercase backdrop-blur-xl">
              {property.status} Residence
            </div>

            {/* FULLSCREEN BUTTON */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="View property images fullscreen"
              className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center border border-white/35 bg-[#17352D]/35 text-white backdrop-blur-xl transition-colors hover:bg-[#17352D]/70"
            >
              <FiMaximize2 size={18} />
            </button>

            {/* BOTTOM GLASS CONTROLS */}
            <div className="absolute right-5 bottom-5 left-5 flex items-center justify-between gap-4 border border-white/20 bg-[#17352D]/35 p-4 text-white backdrop-blur-xl sm:right-7 sm:bottom-7 sm:left-7 sm:px-6">
              <div>
                <p className="text-[9px] tracking-[2px] text-white/65 uppercase">
                  Residence Gallery
                </p>

                <p
                  className="mt-1 text-2xl sm:text-3xl"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  Architectural Perspectives
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden text-xs tracking-[2px] text-white/80 sm:block">
                  {String(activeIndex + 1).padStart(2, "0")}
                  {" / "}
                  {String(images.length).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={previousImage}
                  aria-label="Previous image"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/20"
                >
                  <FiArrowLeft size={17} />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next image"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/20"
                >
                  <FiArrowRight size={17} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* THUMBNAILS */}
          <div className="mt-4 grid grid-cols-4 gap-3 sm:gap-4">
            {images.map((image, index) => (
              <button
                key={`${property.id}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View image ${index + 1}`}
                aria-pressed={activeIndex === index}
                className={`relative h-20 overflow-hidden border-2 transition-all sm:h-30 lg:h-38 ${
                  activeIndex === index
                    ? "border-[#B89B72]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={image}
                  alt={`${property.name} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${property.name} image gallery`}
            className="fixed inset-0 z-100 flex items-center justify-center bg-[#0D1915]/97 px-5 py-20"
          >
            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close gallery"
              className="absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 md:top-10 md:right-10"
            >
              <FiX size={22} />
            </button>

            {/* IMAGE */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={images[activeIndex]}
                alt={`${property.name} fullscreen view ${activeIndex + 1}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-h-[75vh] max-w-full object-contain"
              />
            </AnimatePresence>

            {/* CONTROLS */}
            <div className="absolute right-0 bottom-8 left-0 flex items-center justify-center gap-8 text-white">
              <button
                type="button"
                onClick={previousImage}
                aria-label="Previous fullscreen image"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
              >
                <FiArrowLeft size={20} />
              </button>

              <span className="text-xs tracking-[3px]">
                {String(activeIndex + 1).padStart(2, "0")}
                {" / "}
                {String(images.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Next fullscreen image"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
              >
                <FiArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyGallery;