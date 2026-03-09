import React from "react";
import { motion } from "framer-motion";

export default function AnimatedButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      className={`btn btn-${variant} btn-${size} ${className}`.trim()}
      {...props}
    >
      {children}
    </motion.button>
  );
}

