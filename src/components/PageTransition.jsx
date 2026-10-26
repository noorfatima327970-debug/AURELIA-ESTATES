import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const PageTransition = ({ children }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : -8,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;