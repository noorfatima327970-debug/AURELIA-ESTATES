import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
  FiArrowUpRight,
  FiHeart,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { useFavorites } from "../context/FavoritesContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const { favoriteCount } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid =
    scrolled || location.pathname !== "/";

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Residences", to: "/properties" },
    { label: "Our Story", to: "/#about" },
  ];

  const textColor = solid
    ? "text-[#17352D]!"
    : "text-white!";

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          solid
            ? "border-b border-[#17352D]/10 bg-[#F7F5F0]/95 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-22 max-w-350 items-center justify-between px-6 lg:px-12">

          {/* Logo */}
          <Link
            to="/"
            className={`relative z-50 flex flex-col leading-none ${
              menuOpen
                ? "text-[#17352D]!"
                : textColor
            }`}
          >
            <span
              className="text-[27px] font-semibold tracking-[3px] md:text-[31px]"
              style={{
                fontFamily: "Cormorant Garamond",
              }}
            >
              AURELIA
            </span>

            <span className="mt-1 text-[9px] font-medium tracking-[5px]">
              ESTATES
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-11 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`group relative text-xs font-medium tracking-[1px] transition-colors duration-300 ${textColor}`}
              >
                {link.label}

                <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#B89B72] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden items-center gap-6 lg:flex">

            {/* Favorites */}
            <Link
              to="/favorites"
              aria-label={`Saved residences: ${favoriteCount}`}
              title="Saved Residences"
              className={`relative flex h-11 w-11 items-center justify-center transition-transform duration-300 hover:scale-105 ${textColor}`}
            >
              <FiHeart size={23} />

              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B89B72] px-1 text-[10px] font-semibold text-[#17352D]">
                  {favoriteCount}
                </span>
              )}
            </Link>

            {/* Contact */}
            <Link
              to="/#contact"
              className={`inline-flex items-center gap-3 rounded-full border px-6 py-3 text-[11px] font-semibold tracking-[1px] transition-all duration-300 hover:gap-4 ${
                solid
                  ? "border-[#17352D] bg-[#17352D] text-white!"
                  : "border-white/70 text-white!"
              }`}
            >
              GET IN TOUCH
              <FiArrowUpRight size={16} />
            </Link>
          </div>

          {/* Mobile Right */}
          <div className="relative z-50 flex items-center gap-5 lg:hidden">

            {/* Mobile Favorites Icon */}
            <Link
              to="/favorites"
              aria-label={`Saved residences: ${favoriteCount}`}
              onClick={() => setMenuOpen(false)}
              className={`relative flex h-10 w-10 items-center justify-center ${
                menuOpen
                  ? "text-[#17352D]!"
                  : textColor
              }`}
            >
              <FiHeart size={23} />

              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B89B72] px-1 text-[10px] font-semibold text-[#17352D]">
                  {favoriteCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() =>
                setMenuOpen((previous) => !previous)
              }
              className={
                menuOpen || solid
                  ? "text-[#17352D]"
                  : "text-white"
              }
            >
              {menuOpen ? (
                <FiX size={27} />
              ) : (
                <FiMenu size={27} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#F7F5F0] px-9 lg:hidden"
          >
            <p className="mb-10 text-[11px] tracking-[4px] text-[#B89B72] uppercase">
              EXPLORE AURELIA
            </p>

            {[
              ...navLinks,
              {
                label: `Saved Residences (${favoriteCount})`,
                to: "/favorites",
              },
            ].map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.07,
                }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-[#17352D]/10 py-5 text-4xl text-[#17352D]!"
                  style={{
                    fontFamily: "Cormorant Garamond",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <Link
              to="/#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-12 inline-flex w-fit items-center gap-3 rounded-full bg-[#17352D] px-8 py-4 text-xs tracking-[2px] text-white!"
            >
              CONTACT US
              <FiArrowUpRight />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;