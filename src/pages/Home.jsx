import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import About from "../components/About";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <About />
      <Footer />
    </>
  );
};

export default Home;