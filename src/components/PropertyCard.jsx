import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiArrowUpRight,
  FiHeart,
  FiMapPin,
  FiMaximize2,
  FiCheck,
} from "react-icons/fi";

import { useFavorites } from "../context/FavoritesContext";
import { useCompare } from "../context/CompareContext";
import { LuGitCompareArrows } from "react-icons/lu";

import { formatPrice } from "../data/properties";

const PropertyCard = ({ property, index = 0 }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const {
    isCompared,
    toggleCompare,
    compareCount,
    maxCompare,
  } = useCompare();

  const saved = isFavorite(property.id);

  const compared = isCompared(property.id);

  const compareLimitReached =
    !compared && compareCount >= maxCompare;

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.65,
        delay: Math.min(index, 3) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group min-w-0"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden bg-[#E8E2D7]">
        <Link
          to={`/property/${property.id}`}
          className="block h-80 overflow-hidden md:h-95"
        >
          <img
            src={property.image}
            alt={property.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
          />
        </Link>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />

        {/* BADGE */}
        <span className="absolute top-5 left-5 bg-[#F7F5F0] px-5 py-2.5 text-[10px] font-semibold tracking-[2px] text-[#17352D] uppercase">
          {property.status}
        </span>

        {/* FAVORITES */}
        <button
          type="button"
          aria-label={
            saved
              ? `Remove ${property.name} from favorites`
              : `Save ${property.name} to favorites`
          }
          aria-pressed={saved}
          onClick={() => toggleFavorite(property.id)}
          className={`absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 ${
            saved
              ? "bg-[#17352D] text-white"
              : "bg-[#F7F5F0] text-[#17352D]"
          }`}
        >
          <FiHeart
            size={18}
            fill={saved ? "currentColor" : "none"}
          />
        </button>

        {/* PROPERTY LINK */}
        <Link
          to={`/property/${property.id}`}
          aria-label={`View ${property.name}`}
          className="absolute right-5 bottom-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F5F0] text-[#17352D]! transition-transform duration-300 group-hover:rotate-45"
        >
          <FiArrowUpRight size={21} />
        </Link>
      </div>

      {/* DETAILS */}
      <div className="pt-7">
        <div className="mb-4 flex items-center gap-2 text-xs text-[#65716A]">
          <FiMapPin size={14} className="text-[#B89B72]" />
          {property.location}
        </div>

        <Link to={`/property/${property.id}`}>
          <h3
            className="mb-4 text-3xl text-[#17352D] transition-colors duration-300 group-hover:text-[#8C7658] md:text-4xl"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            {property.name}
          </h3>
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#17352D]/15 pt-5">
          <p className="text-lg font-medium text-[#17352D]">
            {formatPrice(property.price)}
          </p>

          <div className="flex items-center gap-3 text-xs text-[#65716A]">
            <span>{property.beds} Beds</span>
            <span className="text-[#B89B72]">·</span>
            <span>{property.baths} Baths</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#65716A]">
            <FiMaximize2 size={13} />
            {property.area.toLocaleString()} Sq. Ft.
          </div>

          {/* COMPARE BUTTON */}
          <button
            type="button"
            disabled={compareLimitReached}
            aria-pressed={compared}
            onClick={() =>
              toggleCompare(property.id)
            }
            title={
              compareLimitReached
                ? "Maximum 3 residences can be compared"
                : undefined
            }
            className={`inline-flex items-center gap-2 border-b pb-1 text-[10px] font-semibold tracking-[1px] uppercase transition-colors ${
              compared
                ? "border-[#17352D] text-[#17352D]"
                : compareLimitReached
                  ? "cursor-not-allowed border-transparent text-[#65716A]/40"
                  : "border-[#B89B72] text-[#8C7658] hover:text-[#17352D]"
            }`}
          >
            {compared ? (
              <FiCheck size={15} />
            ) : (
             <LuGitCompareArrows size={15} />
            )}

            {compared ? "Added" : "Compare"}
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default PropertyCard;