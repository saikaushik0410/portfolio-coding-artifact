import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./SkillsSection";

const EDUCATION = [
  {
    degree: "Master of Science — Artificial Intelligence",
    spec: "Data Analytics Specialization",
    school: "Indiana Wesleyan University",
    location: "Marion, IN",
    period: "Aug 2025 – Present",
    status: "current",
    accent: "#00ff87",
  },
  {
    degree: "Master of Science — Artificial Intelligence",
    spec: "Machine Learning Specialization",
    school: "University of North Texas",
    location: "Dallas, TX",
    period: "Aug 2021 – May 2023",
    status: "completed",
    accent: "#00d4ff",
  },
  {
    degree: "Bachelor of Technology — Electronics & Communication",
    spec: "Electronics & Communication Engineering",
    school: "Marri Laxman Reddy Institute of Technology",
    location: "Hyderabad, India",
    period: "Jun 2017 – Jul 2021",
    status: "completed",
    accent: "#a855f7",
  },
];

export default function EducationSection() {
  return (
    <section id="education" style={{ background: "#050505", padding: "100px 0" }}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader number="05" title="education" />

        <div className="relative">
          {/* Timeline line */}
          <div style={{
            position: "absolute", left: 5, top: 8, bottom: 8,
            width: 1,
            background: "linear-gradient(to bottom, #00d4ff40, #a855f740, transparent)",
          }} className="hidden md:block" />

          <div className="space-y-6">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="md:pl-12 relative"
              >
                {/* Timeline dot */}
                <div className="hidden md:block" style={{
                  position: "absolute", left: 0, top: 20,
                  width: 11, height: 11, borderRadius: "50%",
                  background: edu.accent,
                  boxShadow: `0 0 12px ${edu.accent}80`,
                }} />

                <div
                  className="card-hover"
                  style={{
                    background: "#0d0d0d",
                    border: "1px solid #1a1a1a",
                    borderLeft: `3px solid ${edu.accent}`,
                    borderRadius: "0 12px 12px 0",
                    padding: "22px 26px",
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-mono font-bold text-base mb-1" style={{ color: edu.accent }}>
                        {edu.degree}
                      </h3>
                      <p className="text-sm mb-0.5" style={{ color: "#94a3b8" }}>{edu.spec}</p>
                      <p className="font-mono text-sm font-semibold" style={{ color: "#f1f5f9" }}>{edu.school}</p>
                      <p className="font-mono text-xs mt-1" style={{ color: "#475569" }}>
                        {edu.location} · {edu.period}
                      </p>
                    </div>
                    <span
                      className="font-mono text-xs px-2.5 py-1 rounded-sm flex-shrink-0"
                      style={edu.status === "current"
                        ? { background: "rgba(0,255,135,0.08)", color: "#00ff87", border: "1px solid rgba(0,255,135,0.2)" }
                        : { background: "#111", color: "#475569", border: "1px solid #1e1e1e" }
                      }
                    >
                      {edu.status === "current" ? "● Active" : "✓ Completed"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
