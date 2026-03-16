import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SkillsSection";

const EXPERIENCES = [
  {
    id: 1,
    role: "Gen AI Backend Engineer",
    company: "Bayone Solutions",
    client: "Walmart",
    type: "Full Time",
    location: "Dallas, TX (Remote)",
    period: "Dec 2025 – Present",
    accent: "#00d4ff",
    filename: "bayone_solutions.sh",
    tech: ["Python", "Java", "LLMs", "LangChain", "AWS Bedrock", "Spring Boot", "Kafka", "GCP", "Docker", "Kubernetes"],
    bullets: [
      "Architected production-grade Gen AI pipelines at Walmart scale — millions of daily requests at sub-200ms latency via AWS Bedrock and LangChain.",
      "Built intelligent product recommendation and catalog enrichment systems using fine-tuned LLMs, improving catalog quality scores by 35%.",
      "Designed multi-agent RAG systems integrating structured and unstructured Walmart data to power internal knowledge assistants.",
      "Led Java Spring Boot backend API development for AI microservices, maintaining 99.9% uptime across GCP and AWS.",
      "Implemented real-time event-driven pipelines via Apache Kafka to stream inventory/pricing updates into AI inference services with zero data loss.",
      "Standardized MLOps workflows using Docker, Kubernetes, and CI/CD, reducing model deployment time by 40%.",
      "Mentored engineers on prompt engineering best practices within the Walmart GenAI Center of Excellence.",
    ],
  },
  {
    id: 2,
    role: "Software Developer",
    company: "Leap Robots",
    client: null,
    type: "Full Time",
    location: "Hyderabad, India",
    period: "Dec 2019 – Mar 2021",
    accent: "#00ff87",
    filename: "leap_robots.sh",
    tech: ["ROS", "Python", "C++", "OpenCV", "LiDAR", "AWS EC2", "Apache Kafka", "SLAM", "PCL"],
    bullets: [
      "Deployed ROS-based autonomous navigation systems implementing SLAM algorithms and real-time 3D depth sensor integration for indoor/outdoor localization.",
      "Integrated 3D LiDAR and vision-based feature segmentation, reducing false positive object detection by 30%.",
      "Designed modular Python nodes for image-guided navigation: point cloud analysis, real-time localization, and trajectory tracking.",
      "Improved multi-sensor fusion frameworks, boosting path planning efficiency by 25% and reducing obstacle avoidance latency.",
      "Scaled real-time data processing pipelines using Apache Kafka, deployed on AWS EC2 environments.",
    ],
  },
];

export default function ExperienceSection() {
  const [expanded, setExpanded] = useState(1);

  return (
    <section id="experience" style={{ background: "#050505", padding: "100px 0" }}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader number="03" title="professional_experience" />

        {/* Terminal outer shell */}
        <div style={{
          background: "#0a0a0a",
          border: "1px solid #1a1a1a",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
        }}>
          {/* Terminal title bar */}
          <div style={{
            background: "#111",
            borderBottom: "1px solid #1a1a1a",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <span className="font-mono text-xs" style={{ color: "#334155" }}>sai@portfolio — experience</span>
          </div>

          {/* Prompt line */}
          <div style={{ padding: "16px 20px 8px", borderBottom: "1px solid #111" }}>
            <span className="font-mono text-xs" style={{ color: "#475569" }}>
              <span style={{ color: "#00d4ff" }}>❯ </span>
              cat ./experience/all.json
            </span>
          </div>

          {/* Experience cards */}
          <div className="divide-y" style={{ borderColor: "#111" }}>
            {EXPERIENCES.map((exp, i) => {
              const isOpen = expanded === exp.id;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                >
                  {/* Card header — clickable */}
                  <div
                    onClick={() => setExpanded(isOpen ? null : exp.id)}
                    className="cursor-pointer"
                    style={{
                      padding: "20px 24px",
                      background: isOpen ? "#0f0f0f" : "transparent",
                      borderLeft: `3px solid ${isOpen ? exp.accent : "#1a1a1a"}`,
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = "#0c0c0c"; }}
                    onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = "transparent"; }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Filename tab */}
                        <span className="font-mono text-xs mb-2 block" style={{ color: "#334155" }}>
                          ~/experience/{exp.filename}
                        </span>

                        {/* Role */}
                        <h3 className="font-mono font-bold text-lg mb-1" style={{ color: exp.accent, textShadow: `0 0 20px ${exp.accent}40` }}>
                          {exp.role}
                        </h3>

                        {/* Company + client */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                          <span className="font-mono text-sm font-semibold" style={{ color: "#f1f5f9" }}>{exp.company}</span>
                          {exp.client && (
                            <span className="font-mono text-sm" style={{ color: "#64748b" }}>· Client: {exp.client}</span>
                          )}
                          <span className="font-mono text-xs px-2 py-0.5 rounded-sm" style={{
                            background: "rgba(0,255,135,0.08)", color: "#00ff87",
                            border: "1px solid rgba(0,255,135,0.2)",
                          }}>● {exp.type}</span>
                        </div>

                        {/* Meta */}
                        <div className="font-mono text-xs flex flex-wrap gap-x-4" style={{ color: "#475569" }}>
                          <span>{exp.location}</span>
                          <span style={{ color: exp.accent, opacity: 0.7 }}>{exp.period}</span>
                        </div>
                      </div>

                      {/* Expand chevron */}
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-mono text-lg mt-1 flex-shrink-0"
                        style={{ color: "#334155" }}
                      >
                        ▾
                      </motion.span>
                    </div>

                    {/* Tech tags — always visible */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.tech.map(t => (
                        <span key={t} className="font-mono text-xs px-2 py-0.5 rounded-sm" style={{
                          background: "#111", border: "1px solid #1e1e1e", color: "#475569",
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expandable bullets */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{ overflow: "hidden", borderLeft: `3px solid ${exp.accent}` }}
                      >
                        <div style={{ padding: "16px 24px 24px", background: "#0a0a0a" }}>
                          <div className="font-mono text-xs mb-3" style={{ color: "#334155" }}>
                            {"// output:"}
                          </div>
                          <div className="space-y-2.5">
                            {exp.bullets.map((b, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex gap-3 items-start"
                              >
                                <span className="font-mono text-xs mt-0.5 flex-shrink-0" style={{ color: exp.accent, opacity: 0.7 }}>▸</span>
                                <span className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{b}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
