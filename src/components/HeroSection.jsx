import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "#050505",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Floating orbs */}
      <div style={{
        position: "absolute", top: "12%", left: "8%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)",
        animation: "float1 10s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", right: "8%",
        width: 420, height: 420,
        background: "radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)",
        animation: "float2 13s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "55%", right: "30%",
        width: 220, height: 220,
        background: "radial-gradient(circle, rgba(0,255,135,0.06) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(40px)",
        animation: "float1 16s ease-in-out infinite reverse",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20 relative w-full" style={{ zIndex: 1 }}>

        {/* File path */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs mb-5 tracking-widest"
          style={{ color: "#00d4ff", opacity: 0.7 }}
        >
          ~/portfolio/src/developer.config.js
        </motion.p>

        {/* Code block card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            background: "#0d0d0d",
            border: "1px solid #1e1e1e",
            borderRadius: 14,
            padding: "36px 40px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.92rem",
            lineHeight: 2.1,
            position: "relative",
            boxShadow: "0 0 80px rgba(0,212,255,0.04), 0 30px 60px rgba(0,0,0,0.6)",
          }}
        >
          {/* Window chrome dots */}
          <div style={{ position: "absolute", top: 16, right: 18, display: "flex", gap: 6 }}>
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
          </div>

          {/* File tab */}
          <div style={{
            position: "absolute", top: -1, left: 24,
            background: "#1a1a1a", borderRadius: "0 0 8px 8px",
            padding: "2px 14px", fontSize: "0.68rem",
            color: "#475569", fontFamily: "JetBrains Mono, monospace",
            borderLeft: "1px solid #252525", borderRight: "1px solid #252525",
          }}>
            developer.config.js
          </div>

          {/* Code lines */}
          <div><span style={{ color: "#6272a4" }}>{"// Full-Stack & AI Engineer"}</span></div>
          <div style={{ marginTop: 4 }}>
            <span style={{ color: "#ff79c6" }}>const </span>
            <span style={{ color: "#8be9fd" }}>developer</span>
            <span style={{ color: "#f8f8f2" }}> = {"{"}</span>
          </div>

          {[
            ["name",      `"Sai Kaushik Surampudi"`, "#f1fa8c"],
            ["location",  `"Dallas, TX"`,             "#f1fa8c"],
            ["education", `"M.S. Artificial Intelligence"`, "#f1fa8c"],
          ].map(([key, val, col]) => (
            <div key={key} style={{ paddingLeft: 28 }}>
              <span style={{ color: "#50fa7b" }}>{key}</span>
              <span style={{ color: "#f8f8f2" }}>: </span>
              <span style={{ color: col }}>{val}</span>
              <span style={{ color: "#f8f8f2" }}>,</span>
            </div>
          ))}

          {/* Role - static */}
          <div style={{ paddingLeft: 28 }}>
            <span style={{ color: "#50fa7b" }}>role</span>
            <span style={{ color: "#f8f8f2" }}>: </span>
            <span style={{ color: "#f1fa8c" }}>"Gen AI Engineer at Walmart Inc"</span>
            <span style={{ color: "#f8f8f2" }}>,</span>
          </div>

          <div>
            <span style={{ color: "#f8f8f2" }}>{"}"};</span>
          </div>
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap gap-4 mt-9"
        >
          {[
            { label: "$ open linkedin",  href: "https://linkedin.com/in/saikaushiksurampudi", primary: true  },
            { label: "$ git clone github", href: "https://github.com/saikaushiksurampudi",   primary: false },
            { label: "$ mail --contact",  href: "mailto:saikaushiksurampudi@yahoo.com",       primary: false },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target={btn.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="font-mono text-xs px-5 py-2.5 rounded-sm transition-all duration-300"
              style={btn.primary
                ? { background: "#00d4ff", color: "#050505", fontWeight: 700, boxShadow: "0 0 20px rgba(0,212,255,0.35)" }
                : { border: "1px solid #1e1e1e", color: "#64748b", background: "#0d0d0d" }
              }
              onMouseEnter={e => {
                if (!btn.primary) {
                  e.currentTarget.style.borderColor = "#00d4ff";
                  e.currentTarget.style.color = "#00d4ff";
                  e.currentTarget.style.boxShadow = "0 0 14px rgba(0,212,255,0.15)";
                } else {
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.55)";
                }
              }}
              onMouseLeave={e => {
                if (!btn.primary) {
                  e.currentTarget.style.borderColor = "#1e1e1e";
                  e.currentTarget.style.color = "#64748b";
                  e.currentTarget.style.boxShadow = "none";
                } else {
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.35)";
                }
              }}
            >
              {btn.label}
            </a>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-16 flex flex-col items-start gap-2"
        >
          <div style={{
            width: 1, height: 48,
            background: "linear-gradient(to bottom, transparent, #00d4ff)",
          }} />
          <span className="font-mono" style={{ fontSize: "0.68rem", color: "#334155", letterSpacing: "0.1em" }}>
            scroll_down()
          </span>
        </motion.div>
      </div>
    </section>
  );
}
