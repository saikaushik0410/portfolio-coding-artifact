import React from "react";
import { motion } from "framer-motion";

const milestones = [
  {
    year: "1950",
    title: "The Turing Test",
    description:
      "Alan Turing proposed the 'Imitation Game' — asking if machines can truly think.",
  },
  {
    year: "1956",
    title: "Birth of AI at Dartmouth",
    description:
      "The Dartmouth Conference formally established Artificial Intelligence as an academic discipline.",
  },
  {
    year: "1974–1980",
    title: "The First AI Winter 🌨️",
    description:
      "Funding and interest declined as early symbolic AI failed to meet expectations. Research slowed until computing power improved.",
  },
  {
    year: "1987–1993",
    title: "The Second AI Winter ❄️",
    description:
      "Overpromised 'expert systems' led to disappointment. Investment dried up again, prompting a focus on machine learning fundamentals.",
  },
  {
    year: "1997",
    title: "Deep Blue Defeats Kasparov",
    description:
      "IBM’s Deep Blue beat the reigning world chess champion, marking AI's first major victory against human strategy.",
  },
  {
    year: "2016",
    title: "AlphaGo’s Historic Victory",
    description:
      "DeepMind’s AlphaGo defeated Lee Sedol in Go, mastering strategic and creative decision-making.",
  },
  {
    year: "2018",
    title: "The Transformer Revolution ⚡",
    description:
      "The introduction of the Transformer architecture revolutionized natural language processing, powering GPT and BERT.",
  },
  {
    year: "2022–Present",
    title: "The Generative AI Era 🚀",
    description:
      "Tools like ChatGPT, Midjourney, and Claude have democratized AI, blending creativity with automation across industries.",
  },
];

export default function TimelineSection() {
  return (
    <section className="max-w-5xl mx-auto py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-2xl font-bold mb-8 flex items-center gap-2"
      >
        🗓️ Historical Timeline
      </motion.h2>

      <div className="relative border-l-4 border-indigo-400 pl-6">
        {milestones.map((m, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="mb-8 bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="text-indigo-600 font-semibold">{m.year}</div>
            <h3 className="font-bold text-lg text-slate-800 mt-1">{m.title}</h3>
            <p className="text-sm text-slate-600 mt-2">{m.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
