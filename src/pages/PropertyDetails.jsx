import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiHeart,
  FiMapPin,
  FiHome,
  FiMaximize2,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import PropertyGallery from "../components/PropertyGallery";

import {
  properties,
  formatPrice,
} from "../data/properties";

import { useFavorites } from "../context/FavoritesContext";

const PropertyDetails = () => {
  const { id } = useParams();

  const { isFavorite, toggleFavorite } = useFavorites();

  const property = properties.find(
    (item) => item.id === Number(id)
  );

  if (!property) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen flex-col items-center justify-center bg-[#F7F5F0] px-6 pt-30 text-center">
          <h1
            className="mb-6 text-5xl text-[#17352D]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            Residence Not Found
          </h1>

          <Link
            to="/properties"
            className="rounded-full bg-[#17352D] px-8 py-4 text-xs tracking-[2px] text-white!"
          >
            EXPLORE RESIDENCES
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  const saved = isFavorite(property.id);

  const related = properties
    .filter((item) => item.id !== property.id)
    .slice(0, 3);

  const specifications = [
    {
      label: "Bedrooms",
      value: String(property.beds).padStart(2, "0"),
    },
    {
      label: "Bathrooms",
      value: String(property.baths).padStart(2, "0"),
    },
    {
      label: "Interior Area",
      value: `${property.area.toLocaleString()} Sq. Ft.`,
    },
    {
      label: "Residence Type",
      value: property.type,
    },
    {
      label: "Location",
      value: property.location,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-[#F7F5F0]">
        {/* ================= HEADING ================= */}
        <section className="px-6 pt-36 pb-12 md:pt-42 md:pb-16 lg:px-12">
          <div className="mx-auto max-w-350">
            <Link
              to="/properties"
              className="mb-12 inline-flex items-center gap-3 text-[11px] font-semibold tracking-[2px] text-[#65716A]! transition-colors hover:text-[#17352D]!"
            >
              <FiArrowLeft size={17} />
              ALL RESIDENCES
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
            >
              <div>
                <div className="mb-6 flex items-center gap-3 text-xs text-[#8C7658]">
                  <FiMapPin size={16} />
                  {property.location}
                </div>

                <h1
                  className="max-w-4xl text-[clamp(3.5rem,6vw,7.5rem)] leading-[0.9] tracking-[-1px] text-[#17352D]"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  {property.name}
                </h1>
              </div>

              <div className="border-l-2 border-[#B89B72] pl-6 lg:mb-2">
                <p className="mb-3 text-[10px] tracking-[2px] text-[#65716A] uppercase">
                  Illustrative Price
                </p>

                <p className="text-2xl font-medium text-[#17352D] md:text-3xl">
                  {formatPrice(property.price)}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= GALLERY ================= */}
        <PropertyGallery key={property.id} property={property} />

        {/* ================= PROPERTY DETAILS ================= */}
        <section className="py-24 md:py-32">
          <div className="mx-auto grid max-w-350 gap-16 px-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-24 lg:px-12">
            {/* DESCRIPTION */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75 }}
            >
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-[#B89B72]" />

                <p className="text-[10px] tracking-[3px] text-[#8C7658] uppercase">
                  THE RESIDENCE
                </p>
              </div>

              <h2
                className="mb-9 text-5xl leading-[0.95] text-[#17352D] md:text-7xl"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                A Distinctive
                <br />
                <span className="italic">
                  Way of Living.
                </span>
              </h2>

              <p className="max-w-2xl text-base leading-9 text-[#65716A]">
                {property.description}
              </p>

              <p className="mt-7 max-w-2xl text-sm leading-9 text-[#65716A]">
                Thoughtfully presented with an appreciation
                for architecture and design, this residence
                reflects the beauty of contemporary living.
                Explore its generous proportions, considered
                spaces and distinctive character.
              </p>

              {/* FAVORITE BUTTON */}
              <button
                type="button"
                aria-pressed={saved}
                onClick={() =>
                  toggleFavorite(property.id)
                }
                className={`group mt-12 inline-flex items-center gap-3 rounded-full px-8 py-4 text-xs font-semibold tracking-[1px] transition-all duration-300 ${
                  saved
                    ? "border border-[#17352D] bg-transparent text-[#17352D] hover:bg-[#E8E2D7]"
                    : "bg-[#17352D] text-white hover:bg-[#24483C]"
                }`}
              >
                <FiHeart
                  size={18}
                  fill={saved ? "currentColor" : "none"}
                />

                {saved
                  ? "SAVED TO FAVORITES"
                  : "SAVE THIS RESIDENCE"}
              </button>
            </motion.div>

            {/* SPECIFICATIONS CARD */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.75,
                delay: 0.15,
              }}
              className="h-fit border border-[#17352D]/10 bg-[#E8E2D7]/75 p-8 shadow-[0_20px_60px_rgba(23,53,45,0.06)] backdrop-blur-xl md:p-11"
            >
              <div className="mb-8 flex items-center gap-3">
                <FiHome
                  size={20}
                  className="text-[#8C7658]"
                />

                <h3
                  className="text-3xl text-[#17352D]"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  Property Overview
                </h3>
              </div>

              <div>
                {specifications.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start justify-between gap-5 border-b border-[#17352D]/15 py-5"
                  >
                    <span className="text-sm text-[#65716A]">
                      {item.label}
                    </span>

                    <span className="text-right text-sm font-medium text-[#17352D]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex items-center gap-3 text-[#65716A]">
                <FiMaximize2 size={17} />

                <p className="text-xs">
                  Architectural property presentation
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= RELATED PROPERTIES ================= */}
        <section className="bg-[#E8E2D7] py-24 md:py-32">
          <div className="mx-auto max-w-350 px-6 lg:px-12">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
              <div>
                <p className="mb-6 text-[10px] tracking-[4px] text-[#8C7658] uppercase">
                  CONTINUE EXPLORING
                </p>

                <h2
                  className="text-5xl text-[#17352D] md:text-7xl"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  More to{" "}
                  <span className="italic">
                    Discover.
                  </span>
                </h2>
              </div>

              <Link
                to="/properties"
                className="inline-flex items-center gap-3 border-b border-[#17352D] pb-3 text-xs font-semibold tracking-[2px] text-[#17352D]!"
              >
                ALL RESIDENCES
                <FiArrowUpRight size={19} />
              </Link>
            </div>

            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item, index) => (
                <PropertyCard
                  key={item.id}
                  property={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="relative overflow-hidden bg-[#17352D] px-6 py-24 text-center text-white">
          <div className="pointer-events-none absolute -right-30 -bottom-50 h-100 w-100 rounded-full border border-white/10" />

          <div className="relative">
            <p className="mb-7 text-[10px] tracking-[3px] text-[#B89B72] uppercase">
              THE AURELIA COLLECTION
            </p>

            <h2
              className="mb-8 text-5xl md:text-7xl"
              style={{
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              Explore More{" "}
              <span className="italic">
                Spaces.
              </span>
            </h2>

            <Link
              to="/properties"
              className="inline-flex items-center gap-3 rounded-full bg-[#F7F5F0] px-8 py-4 text-xs font-semibold tracking-[2px] text-[#17352D]!"
            >
              DISCOVER RESIDENCES

              <FiArrowRight size={17} />
            </Link>
          </div>
        </section>

        {/* DISCLAIMER */}
        <p className="bg-[#F7F5F0] px-6 py-6 text-center text-xs text-[#65716A]">
          Property details and pricing are illustrative.
        </p>
      </main>

      <Footer />
    </>
  );
};

export default PropertyDetails;