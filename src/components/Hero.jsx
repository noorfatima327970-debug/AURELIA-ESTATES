import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";

import {
  FiArrowDown,
  FiArrowUpRight,
} from "react-icons/fi";

const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.08 },
        {
          scale: 1,
          duration: 2.5,
          ease: "power2.out",
        }
      );
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-175 items-end overflow-hidden bg-[#17352D] text-white md:min-h-screen"
    >
      {/* Background */}
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/hero-villa.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-black/30" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-350 px-6 pb-25 lg:px-12 lg:pb-26">
        <div className="max-w-250">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-[#B89B72]" />

            <p className="text-[10px] font-medium tracking-[4px] text-[#E8E2D7] uppercase">
              A NEW PERSPECTIVE ON LIVING
            </p>
          </motion.div>

          <h1
            className="text-[clamp(4.2rem,10vw,10rem)] leading-[0.82] font-normal tracking-[-0.035em]"
            style={{
              fontFamily: "Cormorant Garamond",
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block"
            >
              Beyond the
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-3 block italic text-[#E8E2D7]"
            >
              Ordinary.
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-col justify-between gap-9 md:mt-13 md:flex-row md:items-end"
          >
            <p className="max-w-md text-sm leading-8 text-white/85 md:text-base">
              Extraordinary spaces. Exceptional living.
              Discover a world where architecture,
              elegance and lifestyle come together.
            </p>

            {/* Working Button */}
            <Link
              to="/properties"
              className="group inline-flex w-fit items-center gap-5 rounded-full bg-[#F7F5F0] px-8 py-5 text-[11px] font-semibold tracking-[2px] text-[#17352D]! transition-transform duration-300 hover:scale-[1.03]"
            >
              EXPLORE RESIDENCES

              <FiArrowUpRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Details */}
      <div className="absolute right-6 bottom-8 left-6 z-10 flex items-end justify-between border-t border-white/30 pt-6 lg:right-12 lg:left-12">
        <p className="text-[10px] tracking-[2px] text-white/80 uppercase">
          CURATED SPACES · DISTINCTIVE LIVING
        </p>

        <Link
          to="/#properties"
          aria-label="Scroll to properties"
          className="flex items-center gap-3 text-[10px] tracking-[2px] text-white!"
        >
          SCROLL TO EXPLORE
          <FiArrowDown size={17} />
        </Link>
      </div>
    </section>
  );
};

export default Hero;