import React, {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigationType,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Lenis from "lenis";

import { FavoritesProvider } from "./context/FavoritesContext";
import { CompareProvider } from "./context/CompareContext";

import CompareBar from "./components/CompareBar";
import PageTransition from "./components/PageTransition";

// ============================================
// LAZY LOADED PAGES
// ============================================

const Home = lazy(() => import("./pages/Home"));

const Properties = lazy(() =>
  import("./pages/Properties")
);

const PropertyDetails = lazy(() =>
  import("./pages/PropertyDetails")
);

const Favorites = lazy(() =>
  import("./pages/Favorites")
);

const Compare = lazy(() =>
  import("./pages/Compare")
);

// ============================================
// DISABLE BROWSER SCROLL RESTORATION
// ============================================

if (
  typeof window !== "undefined" &&
  "scrollRestoration" in window.history
) {
  window.history.scrollRestoration = "manual";
}

// ============================================
// PAGE LOADER
// ============================================

const PageLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F5F0]">
      <div className="text-center">
        <p
          className="text-4xl tracking-[4px] text-[#17352D]"
          style={{
            fontFamily: "Cormorant Garamond, serif",
          }}
        >
          AURELIA
        </p>

        <p className="mt-2 text-[10px] tracking-[5px] text-[#8C7658]">
          ESTATES
        </p>

        <div className="mx-auto mt-7 h-px w-24 overflow-hidden bg-[#17352D]/15">
          <div className="h-full w-1/2 animate-pulse bg-[#B89B72]" />
        </div>
      </div>
    </div>
  );
};

// ============================================
// SCROLL MANAGER
// ============================================

const ScrollManager = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === "POP") {
      window.scrollTo(0, 0);
      return;
    }

    if (location.hash) {
      const timer = window.setTimeout(() => {
        const sectionId = decodeURIComponent(
          location.hash.slice(1)
        );

        const target = document.getElementById(sectionId);

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 250);

      return () => window.clearTimeout(timer);
    }

    window.scrollTo(0, 0);
  }, [location.pathname, location.hash, navigationType]);

  return null;
};

// ============================================
// LENIS SMOOTH SCROLL
// ============================================

const SmoothScroll = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let animationFrame;

    const animate = (time) => {
      lenis.raf(time);

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  return null;
};

// ============================================
// ANIMATED ROUTES
// ============================================

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}
      >
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />

        <Route
          path="/properties"
          element={
            <PageTransition>
              <Properties />
            </PageTransition>
          }
        />

        <Route
          path="/property/:id"
          element={
            <PageTransition>
              <PropertyDetails />
            </PageTransition>
          }
        />

        <Route
          path="/favorites"
          element={
            <PageTransition>
              <Favorites />
            </PageTransition>
          }
        />

        <Route
          path="/compare"
          element={
            <PageTransition>
              <Compare />
            </PageTransition>
          }
        />

        <Route
          path="*"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// ============================================
// MAIN APP
// ============================================

const App = () => {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <CompareProvider>
          <SmoothScroll />

          <ScrollManager />

          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>

          <CompareBar />
        </CompareProvider>
      </FavoritesProvider>
    </BrowserRouter>
  );
};

export default App;