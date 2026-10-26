import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  FiSearch,
  FiSliders,
  FiArrowRight,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";

import { properties } from "../data/properties";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1800&auto=format&fit=crop&q=90";

const selectStyle =
  "w-full border-b border-[#17352D]/20 bg-transparent py-3 text-sm text-[#17352D] outline-none transition-colors focus:border-[#B89B72]";

const FilterContent = ({
  locations,
  types,
  location,
  setLocation,
  type,
  setType,
  priceRange,
  setPriceRange,
  resetFilters,
}) => {
  return (
    <div className="space-y-9">
      {/* LOCATION */}
      <div>
        <label
          htmlFor="property-location"
          className="mb-3 block text-[10px] font-semibold tracking-[2px] text-[#65716A] uppercase"
        >
          Location
        </label>

        <select
          id="property-location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className={selectStyle}
        >
          {locations.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Locations" : item}
            </option>
          ))}
        </select>
      </div>

      {/* PROPERTY TYPE */}
      <div>
        <label
          htmlFor="property-type"
          className="mb-3 block text-[10px] font-semibold tracking-[2px] text-[#65716A] uppercase"
        >
          Property Type
        </label>

        <select
          id="property-type"
          value={type}
          onChange={(event) => setType(event.target.value)}
          className={selectStyle}
        >
          {types.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Properties" : item}
            </option>
          ))}
        </select>
      </div>

      {/* PRICE RANGE */}
      <div>
        <label
          htmlFor="property-price"
          className="mb-3 block text-[10px] font-semibold tracking-[2px] text-[#65716A] uppercase"
        >
          Price Range
        </label>

        <select
          id="property-price"
          value={priceRange}
          onChange={(event) => setPriceRange(event.target.value)}
          className={selectStyle}
        >
          <option value="All">Any Price</option>
          <option value="under4">Under $4 Million</option>
          <option value="4to5">$4M – $5M</option>
          <option value="over5">Above $5 Million</option>
        </select>
      </div>

      {/* RESET */}
      <button
        type="button"
        onClick={resetFilters}
        className="flex items-center gap-3 text-[11px] font-semibold tracking-[1.5px] text-[#8C7658] transition-colors hover:text-[#17352D]"
      >
        RESET FILTERS
        <FiArrowRight size={15} />
      </button>
    </div>
  );
};

const Properties = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sort, setSort] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const locations = [
    "All",
    ...new Set(
      properties.map((property) =>
        property.location.split(",")[0].trim()
      )
    ),
  ];

  const types = [
    "All",
    ...new Set(properties.map((property) => property.type)),
  ];

  // FILTERING + SORTING
  const filteredProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        property.name.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.type.toLowerCase().includes(query);

      const matchesLocation =
        location === "All" ||
        property.location.startsWith(location);

      const matchesType =
        type === "All" || property.type === type;

      let matchesPrice = true;

      if (priceRange === "under4") {
        matchesPrice = property.price < 4000000;
      }

      if (priceRange === "4to5") {
        matchesPrice =
          property.price >= 4000000 &&
          property.price <= 5000000;
      }

      if (priceRange === "over5") {
        matchesPrice = property.price > 5000000;
      }

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesPrice
      );
    });

    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      filtered.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return filtered;
  }, [search, location, type, priceRange, sort]);

  const resetFilters = () => {
    setSearch("");
    setLocation("All");
    setType("All");
    setPriceRange("All");
    setSort("featured");
  };

  const hasActiveFilters =
    search !== "" ||
    location !== "All" ||
    type !== "All" ||
    priceRange !== "All";

  const filterProps = {
    locations,
    types,
    location,
    setLocation,
    type,
    setType,
    priceRange,
    setPriceRange,
    resetFilters,
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F5F0]">
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden bg-[#17352D]">
          <div className="grid min-h-152.5 lg:min-h-170 lg:grid-cols-[52%_48%]">
            {/* LEFT HERO */}
            <div className="relative z-10 flex items-center px-6 pt-36 pb-20 md:px-12 lg:pt-40 lg:pb-24 xl:pl-[max(4rem,calc((100vw-1400px)/2))]">
              {/* SUBTLE DECORATION */}
              <div className="pointer-events-none absolute -bottom-40 -left-40 h-100 w-100 rounded-full border border-white/5" />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative w-full max-w-xl"
              >
                <div className="mb-8 flex items-center gap-4">
                  <span className="h-px w-9 bg-[#B89B72]" />

                  <span className="text-[10px] font-medium tracking-[3px] text-[#B89B72] uppercase">
                    The Aurelia Collection
                  </span>
                </div>

                <h1
                  className="text-[clamp(3.5rem,5.4vw,6.2rem)] leading-[0.98] tracking-[-1.5px] text-[#F7F5F0]"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  Explore Our
                  <br />

                  <span className="italic text-[#E8E2D7]">
                    Exceptional
                  </span>

                  <br />
                  Homes.
                </h1>

                <div className="mt-9 h-px w-16 bg-[#B89B72]/70" />

                <p className="mt-7 max-w-md text-sm leading-8 text-white/65 md:text-[15px]">
                  Discover a considered collection of
                  architectural residences, where thoughtful
                  design and extraordinary living come
                  together.
                </p>

                <a
                  href="#residences"
                  className="group mt-10 inline-flex items-center gap-5 text-[11px] font-semibold tracking-[2px] text-[#F7F5F0] uppercase"
                >
                  Explore the Collection

                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-all duration-300 group-hover:border-[#B89B72] group-hover:bg-[#B89B72]">
                    <FiArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </a>
              </motion.div>
            </div>

            {/* RIGHT HERO IMAGE */}
            <div className="relative min-h-95 overflow-hidden sm:min-h-115 lg:min-h-full">
              <motion.div
                initial={{ scale: 1.12, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <img
                  src={HERO_IMAGE}
                  alt="Luxury contemporary architectural residence"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              {/* IMAGE SHADING */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10" />

              {/* GLASS FEATURED CARD */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.65,
                }}
                className="absolute right-5 bottom-6 left-5 sm:right-8 sm:bottom-8 sm:left-8 lg:right-10 lg:bottom-10 lg:left-10"
              >
                <div className="flex items-end justify-between gap-5 border border-white/25 bg-[#17352D]/35 px-6 py-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:px-8 sm:py-6">
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="h-px w-6 bg-[#B89B72]" />

                      <p className="text-[9px] tracking-[2.5px] text-white/80 uppercase">
                        Architectural Inspiration
                      </p>
                    </div>

                    <h2
                      className="text-3xl leading-none text-white sm:text-4xl"
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                      }}
                    >
                      Timeless by Design.
                    </h2>

                    <p className="mt-3 text-[11px] tracking-[0.5px] text-white/65">
                      A vision of contemporary luxury living
                    </p>
                  </div>

                  <span className="hidden text-[10px] tracking-[2px] text-white/75 uppercase sm:block">
                    Aurelia
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* GLASS BOTTOM STRIP */}
          <div className="relative border-t border-white/10 bg-white/8 backdrop-blur-xl">
            <div className="mx-auto flex max-w-350 items-center justify-between gap-4 px-6 py-5 lg:px-12">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B89B72]" />

                <p className="text-[9px] tracking-[2px] text-white/65 uppercase">
                  Curated Architectural Living
                </p>
              </div>

              <p className="text-[9px] tracking-[2px] text-[#D8BE98] uppercase">
                {String(properties.length).padStart(2, "0")} Residences
              </p>
            </div>
          </div>
        </section>

        {/* ================= LISTINGS ================= */}
        <section
          id="residences"
          className="scroll-mt-20 py-20 md:py-28"
        >
          <div className="mx-auto max-w-350 px-6 lg:px-12">
            {/* SECTION INTRO */}
            <div className="mb-14">
              <div className="mb-5 flex items-center gap-4">
                <span className="h-px w-8 bg-[#B89B72]" />

                <p className="text-[10px] tracking-[3px] text-[#8C7658] uppercase">
                  Discover Your Space
                </p>
              </div>

              <h2
                className="text-5xl leading-none text-[#17352D] md:text-6xl"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                The Residence{" "}
                <span className="italic">Collection</span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#65716A]">
                Browse distinctive homes and refine the
                collection to discover the spaces that speak
                to you.
              </p>
            </div>

            {/* SEARCH + SORT */}
            <div className="mb-14 flex flex-col justify-between gap-7 border-b border-[#17352D]/15 pb-9 lg:flex-row lg:items-center">
              <div className="relative w-full max-w-xl">
                <FiSearch
                  size={20}
                  className="absolute top-1/2 left-0 -translate-y-1/2 text-[#8C7658]"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search residences or locations..."
                  aria-label="Search properties"
                  className="w-full border-b border-[#17352D]/25 bg-transparent py-4 pr-4 pl-10 text-sm text-[#17352D] outline-none placeholder:text-[#65716A] focus:border-[#B89B72]"
                />
              </div>

              <div className="flex items-center justify-between gap-5">
                <button
                  type="button"
                  onClick={() =>
                    setMobileFiltersOpen((previous) => !previous)
                  }
                  aria-expanded={mobileFiltersOpen}
                  className="flex items-center gap-2 text-xs font-semibold tracking-[1px] text-[#17352D] lg:hidden"
                >
                  <FiSliders size={17} />
                  FILTERS
                </button>

                <select
                  value={sort}
                  onChange={(event) =>
                    setSort(event.target.value)
                  }
                  aria-label="Sort properties"
                  className="bg-transparent py-3 text-xs text-[#17352D] outline-none"
                >
                  <option value="featured">
                    Featured First
                  </option>

                  <option value="low">
                    Price: Low to High
                  </option>

                  <option value="high">
                    Price: High to Low
                  </option>

                  <option value="name">
                    Name: A to Z
                  </option>
                </select>
              </div>
            </div>

            {/* MOBILE FILTERS */}
            {mobileFiltersOpen && (
              <div className="mb-12 border border-[#17352D]/15 bg-[#E8E2D7] p-7 lg:hidden">
                <FilterContent {...filterProps} />
              </div>
            )}

            <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] xl:gap-16">
              {/* DESKTOP FILTERS */}
              <aside className="hidden lg:block">
                <div className="sticky top-32">
                  <div className="mb-10 flex items-center gap-3">
                    <FiSliders
                      size={18}
                      className="text-[#8C7658]"
                    />

                    <h3 className="text-sm font-semibold tracking-[2px] text-[#17352D] uppercase">
                      Refine Search
                    </h3>
                  </div>

                  <FilterContent {...filterProps} />
                </div>
              </aside>

              {/* PROPERTY GRID */}
              <div>
                <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs tracking-[1px] text-[#65716A] uppercase">
                    Showing {filteredProperties.length}{" "}
                    {filteredProperties.length === 1
                      ? "Residence"
                      : "Residences"}
                  </p>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="text-xs text-[#8C7658] underline underline-offset-4 transition-colors hover:text-[#17352D]"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>

                {filteredProperties.length > 0 ? (
                  <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
                    {filteredProperties.map(
                      (property, index) => (
                        <PropertyCard
                          key={property.id}
                          property={property}
                          index={index}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex min-h-100 flex-col items-center justify-center bg-[#E8E2D7] px-6 text-center">
                    <h3
                      className="mb-5 text-4xl text-[#17352D]"
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                      }}
                    >
                      No Residences Found
                    </h3>

                    <p className="mb-8 max-w-sm text-sm leading-7 text-[#65716A]">
                      Try adjusting your search preferences
                      to discover more properties.
                    </p>

                    <button
                      type="button"
                      onClick={resetFilters}
                      className="inline-flex items-center gap-3 rounded-full bg-[#17352D] px-8 py-4 text-xs tracking-[2px] text-white transition-colors hover:bg-[#24483C]"
                    >
                      RESET SEARCH
                      <FiArrowRight />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <div className="border-t border-[#17352D]/10 py-8 text-center">
          <p className="text-xs text-[#65716A]">
            Properties and pricing are illustrative.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Properties;