import React from "react";
import { motion } from "framer-motion";

const SKILLS = {
  "Languages":           { color: "#00d4ff",  skills: ["Python", "C++", "Java", "SQL", "React Native"] },
  "ML & Deep Learning":  { color: "#00ff87",  skills: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "HuggingFace", "ViTs", "CNNs", "GANs", "Diffusion Models"] },
  "Generative AI":       { color: "#a855f7",  skills: ["LLMs", "Multimodal AI", "Prompt Engineering", "RAG Pipelines", "Foundation Models", "Self-Supervised Learning"] },
  "Cloud & DevOps":      { color: "#ff0080",  skills: ["AWS (EC2, S3)", "GCP", "Docker", "Kubernetes", "MLflow", "CI/CD", "Git", "TensorRT"] },
  "Data Engineering":    { color: "#febc2e",  skills: ["Apache Kafka", "Apache Airflow", "Snowflake", "ETL/ELT"] },
  "Navigation & Vision": { color: "#00d4ff",  skills: ["SLAM", "Visual-Inertial Odometry", "3D Object Detection", "LiDAR Segmentation", "Sensor Fusion", "OpenCV", "PCL"] },
  "Visualization":       { color: "#00ff87",  skills: ["D3.js", "Tableau", "Power BI", "OpenCV"] },
  "Medical Imaging":     { color: "#a855f7",  skills: ["3D Depth Mapping", "Multispectral Imaging", "Feature Extraction", "Image Registration"] },
};

const SectionHeader = ({ number, title }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex items-center gap-4 mb-14"
  >
    <span className="font-mono text-sm" style={{ color: "#00d4ff", opacity: 0.6 }}>{number}.</span>
    <h2 className="font-mono text-2xl font-bold" style={{ color: "#f1f5f9" }}>{title}</h2>
    <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #1e1e1e, transparent)", maxWidth: 280 }} />
  </motion.div>
);

export default function SkillsSection() {
  return (
    <section id="skills" style={{ background: "#050505", padding: "100px 0" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader number="02" title="technical_skills" />

        {/* Preamble comment */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs mb-10"
          style={{ color: "#334155" }}
        >
          {"// stack organized by domain — hover a skill to highlight"}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(SKILLS).map(([category, { color, skills }], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="card-hover"
              style={{
                background: "#0d0d0d",
                border: "1px solid #1a1a1a",
                borderRadius: 12,
                padding: "22px 24px",
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-4">
                <div style={{ width: 3, height: 16, background: color, borderRadius: 2, boxShadow: `0 0 8px ${color}80` }} />
                <span className="font-mono text-xs font-bold tracking-wide" style={{ color }}>
                  {category.toLowerCase().replace(/ /g, "_")}
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="tag-hover font-mono text-xs px-2.5 py-1 rounded-sm cursor-default"
                    style={{
                      background: "#111",
                      border: "1px solid #1e1e1e",
                      color: "#64748b",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { SectionHeader };
