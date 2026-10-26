import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
  FiArrowRight,
  FiX,
} from "react-icons/fi";

import { properties } from "../data/properties";
import { useCompare } from "../context/CompareContext";
import { LuGitCompareArrows } from "react-icons/lu";

const CompareBar = () => {
  const location = useLocation();

  const {
    compareIds,
    compareCount,
    maxCompare,
    removeCompare,
    clearCompare,
  } = useCompare();

  const selectedProperties = compareIds
    .map((id) =>
      properties.find((property) => property.id === id)
    )
    .filter(Boolean);

  const shouldShow =
    compareCount > 0 && location.pathname !== "/compare";

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 35 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed right-4 bottom-4 left-4 z-90 mx-auto max-w-5xl border border-white/20 bg-[#17352D]/90 p-4 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:right-6 sm:bottom-6 sm:left-6 sm:p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-5">
            {/* LEFT */}
            <div className="flex items-center gap-4 text-white">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20">
                <LuGitCompareArrows size={19} />
              </span>

              <div>
                <p className="text-[10px] tracking-[2px] text-[#B89B72] uppercase">
                  Compare Residences
                </p>

                <p className="mt-1 text-xs text-white/70">
                  {compareCount} of {maxCompare} selected
                </p>
              </div>
            </div>

            {/* PROPERTY THUMBNAILS */}
            <div className="hidden items-center gap-3 md:flex">
              {selectedProperties.map((property) => (
                <div
                  key={property.id}
                  className="relative"
                >
                  <img
                    src={property.image}
                    alt={property.name}
                    className="h-12 w-16 object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeCompare(property.id)
                    }
                    aria-label={`Remove ${property.name}`}
                    className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#F7F5F0] text-[#17352D]"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={clearCompare}
                className="text-[10px] tracking-[1px] text-white/65 transition-colors hover:text-white"
              >
                CLEAR
              </button>

              <Link
                to="/compare"
                className="inline-flex items-center gap-3 rounded-full bg-[#F7F5F0] px-5 py-3 text-[10px] font-semibold tracking-[1px] text-[#17352D]!"
              >
                COMPARE NOW
                <FiArrowRight size={15} />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompareBar;