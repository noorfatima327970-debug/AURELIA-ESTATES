import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const About = () => {
  const sectionRef = useRef(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="overflow-hidden bg-[#E8E2D7] py-24 md:py-35"
    >
      <div className="mx-auto grid max-w-350 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-12">
        {/* Editorial Image */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="h-125 overflow-hidden md:h-160">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&auto=format&fit=crop&q=85"
              alt="Elegant contemporary interior"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute right-0 bottom-0 bg-[#17352D] px-8 py-8 text-white md:px-12 md:py-10">
            <p
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              Art of Living
            </p>

            <p className="mt-2 text-[10px] tracking-[3px] text-[#B89B72] uppercase">
              AURELIA ESTATES
            </p>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
        >
          <div className="mb-9 flex items-center gap-4">
            <span className="h-px w-10 bg-[#B89B72]" />

            <p className="text-[10px] font-semibold tracking-[4px] text-[#9B805B] uppercase">
              THE AURELIA PHILOSOPHY
            </p>
          </div>

          <h2
            className="mb-10 text-6xl leading-[0.95] text-[#17352D] md:text-8xl"
            style={{ fontFamily: "Cormorant Garamond" }}
          >
            Spaces that
            <br />
            <span className="italic">Inspire.</span>
          </h2>

          <p className="mb-7 max-w-lg text-sm leading-9 text-[#65716A] md:text-base">
            We believe a home is more than a place to live.
            It is a reflection of individuality, aspiration
            and the moments that define us.
          </p>

          <p className="mb-11 max-w-lg text-sm leading-9 text-[#65716A] md:text-base">
            AURELIA ESTATES brings together exceptional
            architecture, considered design and a deeper
            appreciation for beautiful living.
          </p>

          <Link
            to="/#contact"
            className="group inline-flex items-center gap-4 border-b border-[#17352D] pb-3 text-xs font-semibold tracking-[2px] text-[#17352D]!"
          >
            DISCOVER OUR PHILOSOPHY

            <FiArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;