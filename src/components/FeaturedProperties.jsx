import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiArrowUpRight,
  FiArrowRight,
} from "react-icons/fi";

import { properties } from "../data/properties";
import PropertyCard from "./PropertyCard";

const FeaturedProperties = () => {
  const featured = properties.slice(0, 3);

  return (
    <section
      id="properties"
      className="bg-[#F7F5F0] py-25 md:py-35"
    >
      <div className="mx-auto max-w-350 px-6 lg:px-12">
        <div className="mb-15 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 bg-[#B89B72]" />

              <p className="text-[10px] font-semibold tracking-[4px] text-[#B89B72] uppercase">
                THE COLLECTION
              </p>
            </div>

            <h2
              className="text-6xl leading-[0.95] text-[#17352D] md:text-8xl"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              Exceptional
              <br />

              <span className="italic">
                Residences.
              </span>
            </h2>
          </motion.div>

          <div className="max-w-sm">
            <p className="mb-8 text-sm leading-8 text-[#65716A]">
              Discover thoughtfully selected homes where
              striking architecture meets an extraordinary
              way of life.
            </p>

            <Link
              to="/properties"
              className="group inline-flex items-center gap-4 border-b border-[#17352D] pb-3 text-xs font-semibold tracking-[2px] text-[#17352D]!"
            >
              VIEW ALL PROPERTIES

              <FiArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={index}
            />
          ))}
        </div>

        <div className="mt-16 flex justify-center lg:hidden">
          <Link
            to="/properties"
            className="inline-flex items-center gap-3 rounded-full bg-[#17352D] px-8 py-4 text-xs tracking-[2px] text-white!"
          >
            ALL PROPERTIES
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;