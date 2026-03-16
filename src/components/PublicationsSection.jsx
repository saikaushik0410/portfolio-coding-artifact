import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./SkillsSection";

export default function PublicationsSection() {
  return (
    <section id="publications" style={{ background: "#050505", padding: "100px 0 120px" }}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader number="06" title="publications" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card-hover"
          style={{
            background: "#0d0d0d",
            border: "1px solid #1a1a1a",
            borderLeft: "3px solid #a855f7",
            borderRadius: "0 14px 14px 0",
            padding: "28px 32px",
          }}
        >
          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs px-2.5 py-1 rounded-sm" style={{
              background: "rgba(168,85,247,0.1)", color: "#a855f7",
              border: "1px solid rgba(168,85,247,0.25)",
            }}>
              IEEE Publication
            </span>
            <span className="font-mono text-xs" style={{ color: "#334155" }}>2021 · ICCCI · Coimbatore, India</span>
          </div>

          {/* Title */}
          <h3 className="font-mono font-bold text-base mb-3 leading-snug" style={{ color: "#f1f5f9" }}>
            Word Level LSTM and Recurrent Neural Network for Automatic Text Generation
          </h3>

          {/* Authors */}
          <p className="text-sm mb-5" style={{ color: "#64748b" }}>
            H. V. K. S. Buddana,{" "}
            <span style={{ color: "#a855f7" }}>S. S. Kaushik</span>,
            {" "}P. Manogna, S. K. P. S.
          </p>

          {/* Conference */}
          <p className="font-mono text-xs mb-5" style={{ color: "#475569" }}>
            2021 International Conference on Computer Communication and Informatics (ICCCI)
          </p>

          {/* DOI / link */}
          <a
            href="https://doi.org/10.1109/ICCCI50826.2021.9402488"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs inline-flex items-center gap-2 px-4 py-2 rounded-sm transition-all duration-300"
            style={{
              border: "1px solid #1e1e1e", color: "#64748b", background: "#111",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#a855f7";
              e.currentTarget.style.color = "#a855f7";
              e.currentTarget.style.boxShadow = "0 0 14px rgba(168,85,247,0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#1e1e1e";
              e.currentTarget.style.color = "#64748b";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            $ open --doi 10.1109/ICCCI50826.2021.9402488
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-24 pt-12 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid #111" }}
        >
          <span className="font-mono text-xs" style={{ color: "#1e293b" }}>
            {"// designed & built by Sai Kaushik Surampudi"}
          </span>
          <span className="font-mono text-xs" style={{ color: "#1e293b" }}>
            {"React · Framer Motion · Tailwind CSS"}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
