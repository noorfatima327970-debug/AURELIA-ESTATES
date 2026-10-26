import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiHeart,
  FiArrowRight,
  FiTrash2,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";

import { properties } from "../data/properties";
import { useFavorites } from "../context/FavoritesContext";

const Favorites = () => {
  const {
    favorites,
    clearFavorites,
  } = useFavorites();

  const savedProperties = properties.filter((property) =>
    favorites.includes(property.id)
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F5F0] pt-38 pb-25">
        <div className="mx-auto max-w-350 px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 bg-[#B89B72]" />

              <p className="text-[10px] tracking-[4px] text-[#8C7658] uppercase">
                YOUR COLLECTION
              </p>
            </div>

            <h1
              className="text-6xl text-[#17352D] md:text-8xl"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              Saved{" "}
              <span className="italic">
                Residences.
              </span>
            </h1>

            <p className="mt-7 text-sm text-[#65716A]">
              {savedProperties.length}{" "}
              {savedProperties.length === 1
                ? "residence"
                : "residences"}{" "}
              in your collection
            </p>
          </motion.div>

          {savedProperties.length === 0 ? (
            <div className="flex flex-col items-center bg-[#E8E2D7] px-6 py-24 text-center">
              <div className="mb-9 flex h-22 w-22 items-center justify-center rounded-full border border-[#17352D]/15">
                <FiHeart
                  size={36}
                  className="text-[#8C7658]"
                />
              </div>

              <h2
                className="mb-6 text-4xl text-[#17352D]"
                style={{ fontFamily: "Cormorant Garamond" }}
              >
                Your Collection Awaits.
              </h2>

              <p className="mb-10 max-w-md text-sm leading-8 text-[#65716A]">
                Save the spaces that inspire you and revisit
                your favorite residences whenever you wish.
              </p>

              <Link
                to="/properties"
                className="inline-flex items-center gap-3 rounded-full bg-[#17352D] px-9 py-4 text-xs font-semibold tracking-[2px] text-white!"
              >
                EXPLORE RESIDENCES
                <FiArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10 flex justify-end">
                <button
                  type="button"
                  onClick={clearFavorites}
                  className="inline-flex items-center gap-2 text-xs tracking-[1px] text-[#8C7658]"
                >
                  <FiTrash2 size={16} />
                  CLEAR COLLECTION
                </button>
              </div>

              <div className="grid gap-x-9 gap-y-15 md:grid-cols-2 xl:grid-cols-3">
                {savedProperties.map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Favorites;