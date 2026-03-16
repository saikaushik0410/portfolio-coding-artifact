import React from "react";
import { motion } from "framer-motion";

export default function ReflectionSection() {
  return (
    <motion.section
      className="max-w-5xl mx-auto py-16 px-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-orange-600">
        💡 Professional Reflection
      </h2>
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
        <p className="text-gray-700 leading-relaxed">
          The evolution of AI is a story of resilience — from early symbolic reasoning to modern deep learning breakthroughs. 
          Each milestone reflects humanity’s growing understanding of intelligence and our desire to replicate it.  
        </p>
        <p className="mt-3 text-gray-700 leading-relaxed">
          The setbacks of the AI Winter remind us that progress often comes in waves 🌊 — where each pause sparks renewed creativity. 
          The current era of generative AI demonstrates how far innovation can go when computing, data, and imagination align.  
        </p>
        <p className="mt-3 text-gray-700 leading-relaxed">
          As we look ahead, responsible development, interpretability, and human-centric design remain essential. 
          The true value of AI lies not in replacing humans, but in amplifying our capacity to learn, create, and make ethical decisions for a better future. 🌍
        </p>
      </div>
    </motion.section>
  );
}
