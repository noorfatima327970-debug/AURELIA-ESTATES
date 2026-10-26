import React from "react";
import { Link } from "react-router-dom";

import {
  FiArrowUpRight,
  FiArrowUp,
  FiMail,
} from "react-icons/fi";

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="contact"
      className="scroll-mt-20 bg-[#17352D] pt-25 text-[#F7F5F0]"
    >
      <div className="mx-auto max-w-350 px-6 lg:px-12">
        {/* CTA */}
        <div className="flex flex-col justify-between gap-10 border-b border-white/20 pb-20 lg:flex-row lg:items-end">
          <div>
            <p className="mb-8 text-[10px] tracking-[4px] text-[#B89B72] uppercase">
              YOUR NEXT CHAPTER
            </p>

            <h2
              className="text-6xl leading-[0.95] md:text-8xl lg:text-9xl"
              style={{
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              Find Your
              <br />

              <span className="italic text-[#B89B72]">
                Place.
              </span>
            </h2>
          </div>

          <Link
            to="/properties"
            className="group inline-flex w-fit items-center gap-5 rounded-full border border-white/40 px-8 py-5 text-xs font-semibold tracking-[2px] text-white! transition-colors duration-300 hover:border-[#B89B72]"
          >
            EXPLORE RESIDENCES

            <FiArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* FOOTER CONTENT */}
        <div className="grid gap-14 py-17 md:grid-cols-3">
          {/* BRAND */}
          <div>
            <Link
              to="/"
              className="inline-flex flex-col text-white!"
            >
              <span
                className="text-4xl tracking-[3px]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                AURELIA
              </span>

              <span className="mt-1 text-[10px] tracking-[6px]">
                ESTATES
              </span>
            </Link>

            <p className="mt-8 max-w-xs text-sm leading-8 text-white/60">
              A considered approach to architectural
              living and extraordinary spaces.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <p className="mb-8 text-xs tracking-[3px] text-[#B89B72] uppercase">
              EXPLORE
            </p>

            <div className="flex flex-col gap-5">
              <Link
                to="/"
                className="w-fit text-sm text-white/70! transition-colors hover:text-white!"
              >
                Home
              </Link>

              <Link
                to="/properties"
                className="w-fit text-sm text-white/70! transition-colors hover:text-white!"
              >
                Residences
              </Link>

              <Link
                to="/#about"
                className="w-fit text-sm text-white/70! transition-colors hover:text-white!"
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <p className="mb-8 text-xs tracking-[3px] text-[#B89B72] uppercase">
              CONNECT
            </p>

            <p className="max-w-xs text-sm leading-8 text-white/65">
              Have a question or want to connect?
              We'd love to hear from you.
            </p>

            <a
              href="mailto:hello@yourdomain.com"
              className="group mt-7 inline-flex items-center gap-3 border-b border-[#B89B72] pb-3 text-sm text-white! transition-colors hover:text-[#B89B72]!"
            >
              <FiMail size={18} />

              GET IN TOUCH

              <FiArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <p className="mt-7 text-xs leading-6 text-white/45">
              Property information is illustrative
              and presented for design exploration.
            </p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-start justify-between gap-5 border-t border-white/15 py-8 md:flex-row md:items-center">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} AURELIA ESTATES.
            All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollTop}
            className="flex items-center gap-3 text-xs tracking-[2px] text-white/70 transition-colors hover:text-white"
          >
            BACK TO TOP

            <FiArrowUp size={17} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;