import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiArrowLeft,
  FiArrowUpRight,
  FiX,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LuGitCompareArrows } from "react-icons/lu";

import {
  properties,
  formatPrice,
} from "../data/properties";

import { useCompare } from "../context/CompareContext";

const Compare = () => {
  const {
    compareIds,
    removeCompare,
    clearCompare,
  } = useCompare();

  const selectedProperties = compareIds
    .map((id) =>
      properties.find((property) => property.id === id)
    )
    .filter(Boolean);

  const comparisonRows = [
    {
      label: "Price",
      render: (property) =>
        formatPrice(property.price),
    },
    {
      label: "Location",
      render: (property) => property.location,
    },
    {
      label: "Property Type",
      render: (property) => property.type,
    },
    {
      label: "Bedrooms",
      render: (property) => property.beds,
    },
    {
      label: "Bathrooms",
      render: (property) => property.baths,
    },
    {
      label: "Interior Area",
      render: (property) =>
        `${property.area.toLocaleString()} Sq. Ft.`,
    },
    {
      label: "Status",
      render: (property) => property.status,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F5F0]">
        {/* HEADER */}
        <section className="bg-[#17352D] px-6 pt-38 pb-22 text-white lg:px-12">
          <div className="mx-auto max-w-350">
            <Link
              to="/properties"
              className="mb-12 inline-flex items-center gap-3 text-[11px] tracking-[2px] text-white/70! transition-colors hover:text-white!"
            >
              <FiArrowLeft size={17} />
              BACK TO RESIDENCES
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-9 bg-[#B89B72]" />

                <p className="text-[10px] tracking-[3px] text-[#B89B72] uppercase">
                  THE AURELIA COLLECTION
                </p>
              </div>

              <h1
                className="text-5xl leading-none md:text-7xl lg:text-8xl"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                Compare{" "}
                <span className="italic text-[#E8E2D7]">
                  Residences.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-sm leading-8 text-white/65">
                Explore the details side by side and discover
                the residence that best reflects your vision
                of exceptional living.
              </p>
            </motion.div>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-350 px-6 lg:px-12">
            {selectedProperties.length === 0 ? (
              <div className="flex min-h-100 flex-col items-center justify-center bg-[#E8E2D7] px-6 text-center">
                <LuGitCompareArrows
  size={35}
  className="mb-6 text-[#8C7658]"
/>

                <h2
                  className="mb-5 text-4xl text-[#17352D] md:text-5xl"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  No Residences Selected
                </h2>

                <p className="mb-8 max-w-md text-sm leading-7 text-[#65716A]">
                  Add properties to your comparison to explore
                  their features side by side.
                </p>

                <Link
                  to="/properties"
                  className="rounded-full bg-[#17352D] px-8 py-4 text-xs tracking-[2px] text-white!"
                >
                  EXPLORE RESIDENCES
                </Link>
              </div>
            ) : (
              <>
                {/* ACTIONS */}
                <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
                  <p className="text-xs tracking-[1px] text-[#65716A] uppercase">
                    {selectedProperties.length} of 3 Residences
                    Selected
                  </p>

                  <button
                    type="button"
                    onClick={clearCompare}
                    className="text-xs text-[#8C7658] underline underline-offset-4 hover:text-[#17352D]"
                  >
                    Clear Comparison
                  </button>
                </div>

                {/* COMPARISON TABLE */}
                <div className="overflow-x-auto border border-[#17352D]/10">
                  <div
                    className="grid min-w-175"
                    style={{
                      gridTemplateColumns: `180px repeat(${selectedProperties.length}, minmax(210px, 1fr))`,
                    }}
                  >
                    {/* EMPTY LABEL SPACE */}
                    <div className="border-r border-[#17352D]/10 bg-[#E8E2D7]" />

                    {/* PROPERTY HEADERS */}
                    {selectedProperties.map((property) => (
                      <div
                        key={property.id}
                        className="relative border-r border-[#17352D]/10 bg-white/50 p-4 last:border-r-0"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            removeCompare(property.id)
                          }
                          aria-label={`Remove ${property.name}`}
                          className="absolute top-6 right-6 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F5F0] text-[#17352D]"
                        >
                          <FiX size={16} />
                        </button>

                        <img
                          src={property.image}
                          alt={property.name}
                          className="h-38 w-full object-cover"
                        />

                        <h3
                          className="mt-5 text-2xl leading-none text-[#17352D] md:text-3xl"
                          style={{
                            fontFamily: "Cormorant Garamond, serif",
                          }}
                        >
                          {property.name}
                        </h3>

                        <Link
                          to={`/property/${property.id}`}
                          className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[1px] text-[#8C7658]!"
                        >
                          VIEW RESIDENCE
                          <FiArrowUpRight size={15} />
                        </Link>
                      </div>
                    ))}

                    {/* ROWS */}
                    {comparisonRows.map((row, rowIndex) => (
                      <React.Fragment key={row.label}>
                        <div
                          className={`flex items-center border-t border-r border-[#17352D]/10 px-5 py-6 text-xs font-semibold tracking-[1px] text-[#17352D] uppercase ${
                            rowIndex % 2 === 0
                              ? "bg-[#E8E2D7]"
                              : "bg-[#F1EEE7]"
                          }`}
                        >
                          {row.label}
                        </div>

                        {selectedProperties.map((property) => (
                          <div
                            key={`${row.label}-${property.id}`}
                            className={`flex items-center justify-center border-t border-r border-[#17352D]/10 px-5 py-6 text-center text-sm text-[#17352D] last:border-r-0 ${
                              rowIndex % 2 === 0
                                ? "bg-white/50"
                                : "bg-[#F7F5F0]"
                            }`}
                          >
                            {row.render(property)}
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <p className="mt-6 text-xs text-[#65716A]">
                  Property details and pricing are illustrative.
                </p>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Compare;