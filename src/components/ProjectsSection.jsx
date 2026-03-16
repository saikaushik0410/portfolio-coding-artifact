import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./SkillsSection";

const PROJECTS = [
  {
    title: "NeuralMesh",
    subtitle: "Multi-Agent RAG Orchestration Platform",
    accent: "#00d4ff",
    tags: ["LangChain", "AWS Bedrock", "Python", "FastAPI", "Pinecone", "Kafka", "Docker"],
    metrics: ["Sub-150ms RAG response latency", "12+ LLM agents orchestrated", "10M+ daily vector lookups"],
    desc: "Enterprise-grade multi-agent Retrieval-Augmented Generation platform that routes queries across specialized AI agents. Uses hybrid vector + keyword search with Pinecone and real-time context injection via Kafka streams.",
  },
  {
    title: "AGRIBOT",
    subtitle: "Autonomous Robot for Agricultural Surveillance",
    accent: "#00ff87",
    tags: ["ROS", "Python", "SLAM", "GPS", "Multispectral Imaging"],
    metrics: ["25% better crop anomaly detection", "Real-time obstacle avoidance", "Precision farming pipeline"],
    desc: "ROS-based mobile robot combining SLAM, GPS, and multispectral sensors for precision agriculture. Implemented real-time pipelines for obstacle avoidance and path optimization.",
  },
  {
    title: "LiDAR Point Cloud Segmentation",
    subtitle: "CNN + CRF Deep Learning Architecture",
    accent: "#a855f7",
    tags: ["PyTorch", "CNNs", "CRF", "GIS Tools", "3D Point Cloud"],
    metrics: ["22% better segmentation accuracy", "Real-world spatial classification", "GIS terrain visualization"],
    desc: "Deep learning architecture combining CNNs with Conditional Random Fields to enhance segmentation of 3D LiDAR data. Visualized large-scale point cloud data for terrain and feature mapping.",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" style={{ background: "#050505", padding: "100px 0" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader number="04" title="featured_projects" />

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="card-hover flex flex-col"
              style={{
                background: "#0d0d0d",
                border: "1px solid #1a1a1a",
                borderRadius: 14,
                overflow: "hidden",
              }}
            >
              {/* Neon top bar */}
              <div style={{ height: 2, background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />

              <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <div className="mb-4">
                  <div className="font-mono text-xs mb-1" style={{ color: "#334155" }}>
                    {"// project_" + String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-mono font-bold text-lg" style={{ color: p.accent }}>
                    {p.title}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{p.subtitle}</p>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "#64748b" }}>
                  {p.desc}
                </p>

                {/* Metrics */}
                <div className="space-y-1.5 mb-5">
                  {p.metrics.map(m => (
                    <div key={m} className="flex items-center gap-2 font-mono text-xs">
                      <span style={{ color: p.accent, opacity: 0.7 }}>▸</span>
                      <span style={{ color: "#94a3b8" }}>{m}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(t => (
                    <span key={t} className="font-mono text-xs px-2 py-0.5 rounded-sm" style={{
                      background: "#111", border: "1px solid #1e1e1e", color: "#475569",
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
