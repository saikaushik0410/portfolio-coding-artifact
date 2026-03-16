import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

const ALGORITHMS = [
  {
    id: "decision-tree",
    name: "Decision Tree",
    icon: "🌳",
    color: "#00ff87",
    type: "Supervised",
    family: "Classification",
    domains: ["Tabular Data"],
    uses: ["Medical triage", "Fraud checks", "Loan approval"],
    explanation:
      "Splits data through a sequence of feature-based questions until it reaches a prediction at a leaf node. It is easy to interpret because each prediction follows a visible path.",
    xp: 120,
  },
  {
    id: "random-forest",
    name: "Random Forest",
    icon: "🌲",
    color: "#00d4ff",
    type: "Supervised",
    family: "Ensemble",
    domains: ["Tabular Data", "Computer Vision"],
    uses: ["Risk scoring", "Disease classification", "Feature importance analysis"],
    explanation:
      "Combines many decision trees trained on random samples and random feature subsets, then averages or votes across them to improve stability and reduce overfitting.",
    xp: 220,
  },
  {
    id: "linear-regression",
    name: "Linear Regression",
    icon: "📈",
    color: "#f1fa8c",
    type: "Supervised",
    family: "Regression",
    domains: ["Tabular Data"],
    uses: ["Housing prices", "Sales forecasting", "Trend estimation"],
    explanation:
      "Fits a line or hyperplane that best models the relationship between inputs and a continuous target by minimizing prediction error.",
    xp: 80,
  },
  {
    id: "logistic-regression",
    name: "Logistic Regression",
    icon: "🎯",
    color: "#ff79c6",
    type: "Supervised",
    family: "Classification",
    domains: ["Tabular Data", "NLP"],
    uses: ["Spam detection", "Churn prediction", "CTR estimation"],
    explanation:
      "Uses a linear combination of features passed through a sigmoid function to estimate class probabilities, especially for binary classification.",
    xp: 100,
  },
  {
    id: "svm",
    name: "Support Vector Machine",
    icon: "⚔️",
    color: "#ff0080",
    type: "Supervised",
    family: "Classification",
    domains: ["Tabular Data", "Computer Vision", "NLP"],
    uses: ["Image labeling", "Text classification", "Bioinformatics"],
    explanation:
      "Finds the decision boundary with the largest margin between classes. Kernels let it model non-linear boundaries in higher-dimensional spaces.",
    xp: 260,
  },
  {
    id: "cnn",
    name: "Convolutional Neural Network",
    icon: "🧠",
    color: "#a855f7",
    type: "Supervised",
    family: "Deep Learning",
    domains: ["Computer Vision", "NLP"],
    uses: ["Object detection", "Medical imaging", "OCR pipelines"],
    explanation:
      "Applies learned filters across local regions of the input to detect patterns such as edges, textures, and shapes before making predictions.",
    xp: 420,
  },
  {
    id: "transformer",
    name: "Transformer / BERT",
    icon: "⚡",
    color: "#febc2e",
    type: "Supervised",
    family: "Deep Learning",
    domains: ["NLP", "Computer Vision", "Generative AI"],
    uses: ["Translation", "Question answering", "Large language models"],
    explanation:
      "Uses self-attention to let tokens weigh one another directly, capturing long-range context without recurrence and powering modern language modeling.",
    xp: 520,
  },
  {
    id: "kmeans",
    name: "K-Means Clustering",
    icon: "🔵",
    color: "#38bdf8",
    type: "Unsupervised",
    family: "Clustering",
    domains: ["Tabular Data", "Computer Vision"],
    uses: ["Customer segmentation", "Image compression", "Pattern discovery"],
    explanation:
      "Assigns points to the nearest centroid, then recomputes centroids repeatedly until the cluster assignments stabilize.",
    xp: 150,
  },
  {
    id: "pca",
    name: "Principal Component Analysis",
    icon: "🔬",
    color: "#22c55e",
    type: "Unsupervised",
    family: "Dimensionality Reduction",
    domains: ["Tabular Data", "Computer Vision"],
    uses: ["Feature compression", "Noise reduction", "2D visualization of high-D data"],
    explanation:
      "Rotates data into new orthogonal axes that capture the most variance, allowing fewer dimensions to preserve the most important structure.",
    xp: 190,
  },
  {
    id: "gan",
    name: "Generative Adversarial Network",
    icon: "🎨",
    color: "#f43f5e",
    type: "Unsupervised",
    family: "Generative Modeling",
    domains: ["Computer Vision", "Generative AI"],
    uses: ["Synthetic image generation", "Super-resolution", "Data augmentation"],
    explanation:
      "Pits a generator against a discriminator so the generator learns to create data that looks increasingly realistic.",
    xp: 460,
  },
];

const DOMAIN_COLORS = {
  "Tabular Data": "#00d4ff",
  "Computer Vision": "#a855f7",
  NLP: "#ff79c6",
  "Generative AI": "#ff0080",
};

const FILTERS = ["All", "Supervised", "Unsupervised", "Tabular Data", "Computer Vision", "NLP", "Generative AI"];

function TaxonomyGrid() {
  const columns = [
    {
      label: "Supervised",
      color: "#00ff87",
      groups: [
        ["Regression", ["Linear Regression"]],
        ["Classification", ["Decision Tree", "Logistic Regression", "Support Vector Machine"]],
        ["Ensemble / Deep", ["Random Forest", "Convolutional Neural Network", "Transformer / BERT"]],
      ],
    },
    {
      label: "Unsupervised",
      color: "#a855f7",
      groups: [
        ["Clustering", ["K-Means Clustering"]],
        ["Dimensionality Reduction", ["Principal Component Analysis"]],
        ["Generative", ["Generative Adversarial Network"]],
      ],
    },
  ];

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 64px" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "#334155", letterSpacing: 3, marginBottom: 20 }}>
        // VISUAL FRAMEWORK — HOW THE ALGORITHMS RELATE
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
        {columns.map((column) => (
          <div
            key={column.label}
            style={{
              background: "#0d0d0d",
              border: `1px solid ${column.color}33`,
              borderRadius: 16,
              padding: 24,
              boxShadow: `0 0 30px ${column.color}12`,
            }}
          >
            <div style={{ fontFamily: "JetBrains Mono, monospace", color: column.color, fontSize: "0.95rem", fontWeight: 700, marginBottom: 20 }}>
              {column.label}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {column.groups.map(([groupLabel, names]) => (
                <div key={groupLabel}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", color: "#94a3b8", fontSize: "0.72rem", marginBottom: 10 }}>
                    {groupLabel}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {names.map((name) => {
                      const algo = ALGORITHMS.find((item) => item.name === name);
                      return (
                        <span
                          key={name}
                          style={{
                            border: `1px solid ${algo.color}44`,
                            background: `${algo.color}12`,
                            color: algo.color,
                            borderRadius: 999,
                            padding: "6px 10px",
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: "0.68rem",
                          }}
                        >
                          {algo.icon} {name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DomainMatrix() {
  const domains = ["Tabular Data", "Computer Vision", "NLP", "Generative AI"];

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 64px" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "#334155", letterSpacing: 3, marginBottom: 20 }}>
        // DOMAIN MATRIX — WHERE EACH MODEL FITS
      </div>
      <div style={{ overflowX: "auto", background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 16, padding: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "JetBrains Mono, monospace" }}>
          <thead>
            <tr>
              <th style={thStyle("left")}>Algorithm</th>
              <th style={thStyle("center")}>Type</th>
              {domains.map((domain) => (
                <th key={domain} style={{ ...thStyle("center"), color: DOMAIN_COLORS[domain] }}>{domain}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALGORITHMS.map((algo, index) => (
              <tr key={algo.id} style={{ background: index % 2 ? "#090909" : "transparent" }}>
                <td style={tdStyle("left", algo.color)}>{algo.icon} {algo.name}</td>
                <td style={tdStyle("center", algo.type === "Supervised" ? "#00ff87" : "#a855f7")}>{algo.type}</td>
                {domains.map((domain) => (
                  <td key={domain} style={tdStyle("center", algo.domains.includes(domain) ? DOMAIN_COLORS[domain] : "#334155")}>
                    {algo.domains.includes(domain) ? "✓" : "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function thStyle(textAlign) {
  return {
    textAlign,
    padding: "12px 14px",
    color: "#475569",
    fontSize: "0.68rem",
    borderBottom: "1px solid #1a1a1a",
    whiteSpace: "nowrap",
  };
}

function tdStyle(textAlign, color) {
  return {
    textAlign,
    padding: "14px",
    color,
    fontSize: "0.72rem",
    borderBottom: "1px solid #111",
    verticalAlign: "top",
    whiteSpace: textAlign === "left" ? "normal" : "nowrap",
  };
}

function AlgoCard({ algo, unlocked, onUnlock }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    if (!unlocked) onUnlock(algo.id);
    setFlipped((value) => !value);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      style={{ perspective: 1400, minHeight: 370 }}
    >
      <div
        onClick={handleClick}
        style={{
          cursor: "pointer",
          position: "relative",
          width: "100%",
          minHeight: 370,
          transformStyle: "preserve-3d",
          transition: "transform 0.7s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div style={cardFace(algo, false)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <div>
              <div style={{ fontSize: "1.9rem", marginBottom: 8 }}>{algo.icon}</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "1rem", color: algo.color, fontWeight: 700 }}>
                {algo.name}
              </div>
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "#00d4ff" }}>
              +{algo.xp} XP
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
            <span style={pillStyle(algo.type === "Supervised" ? "#00ff87" : "#a855f7")}>{algo.type}</span>
            <span style={pillStyle("#64748b")}>{algo.family}</span>
            {unlocked && <span style={pillStyle("#00d4ff")}>Unlocked</span>}
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
            {algo.domains.map((domain) => (
              <span key={domain} style={pillStyle(DOMAIN_COLORS[domain])}>{domain}</span>
            ))}
          </div>

          <div style={{ marginTop: "auto", color: "#475569", fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem" }}>
            click_to_inspect()
          </div>
        </div>

        <div style={cardFace(algo, true)}>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.78rem", color: algo.color, letterSpacing: 2, marginBottom: 14 }}>
            // {algo.name.toUpperCase()}
          </div>
          <p style={{ color: "#cbd5e1", lineHeight: 1.7, fontSize: "0.9rem", margin: "0 0 18px" }}>
            {algo.explanation}
          </p>
          <div style={{ fontFamily: "JetBrains Mono, monospace", color: "#475569", fontSize: "0.68rem", marginBottom: 10 }}>
            REAL-WORLD USE CASES
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {algo.uses.map((useCase) => (
              <div key={useCase} style={{ color: "#94a3b8", fontFamily: "JetBrains Mono, monospace", fontSize: "0.72rem" }}>
                <span style={{ color: algo.color }}>▸</span> {useCase}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "auto", color: "#475569", fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem" }}>
            click_to_return()
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function cardFace(algo, flipped) {
  return {
    position: "absolute",
    inset: 0,
    borderRadius: 18,
    background: "#0d0d0d",
    border: `1px solid ${algo.color}33`,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    boxShadow: `0 0 32px ${algo.color}14`,
    backfaceVisibility: "hidden",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };
}

function pillStyle(color) {
  return {
    border: `1px solid ${color}44`,
    background: `${color}12`,
    color,
    borderRadius: 999,
    padding: "5px 10px",
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "0.64rem",
  };
}

export default function Artifact() {
  const [filter, setFilter] = useState("All");
  const [unlocked, setUnlocked] = useState([]);

  const filtered = useMemo(() => {
    return ALGORITHMS.filter((algo) => {
      if (filter === "All") return true;
      if (filter === "Supervised" || filter === "Unsupervised") return algo.type === filter;
      return algo.domains.includes(filter);
    });
  }, [filter]);

  const totalXp = unlocked.reduce((sum, id) => {
    const algo = ALGORITHMS.find((item) => item.id === id);
    return sum + (algo?.xp || 0);
  }, 0);

  const unlock = (id) => {
    setUnlocked((current) => (current.includes(id) ? current : [...current, id]));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "#f8fafc" }}>
      <Navbar />

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "110px 2rem 56px", position: "relative" }}>
        <div style={{
          position: "absolute",
          inset: "0 auto auto 10%",
          width: 420,
          height: 420,
          background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 72%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div style={{ fontFamily: "JetBrains Mono, monospace", color: "#334155", fontSize: "0.72rem", letterSpacing: 3, marginBottom: 14 }}>
            // PORTFOLIO ARTIFACT — MACHINE LEARNING INFOGRAPHIC
          </div>
          <h1 style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            lineHeight: 1.1,
            margin: "0 0 14px",
          }}>
            ML Algorithm{" "}
            <span style={{ color: "#00d4ff", textShadow: "0 0 24px rgba(0,212,255,0.45)" }}>Atlas</span>
          </h1>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.78rem", color: "#00ff87", marginBottom: 16 }}>
            infographic.build(type, domains, use_cases, explanations)
          </div>
          <p style={{ maxWidth: 780, color: "#94a3b8", lineHeight: 1.8, fontSize: "1rem", margin: 0 }}>
            This artifact compares 10 machine learning algorithms across supervised and unsupervised learning, maps them to tabular data, computer vision, NLP, and generative AI, and pairs each model with a short explanation plus real-world applications.
          </p>
        </motion.div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 26 }}>
          {FILTERS.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              style={{
                borderRadius: 999,
                border: `1px solid ${filter === item ? "#00d4ff" : "#1a1a1a"}`,
                background: filter === item ? "rgba(0,212,255,0.12)" : "#0d0d0d",
                color: filter === item ? "#00d4ff" : "#64748b",
                padding: "8px 14px",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.68rem",
                cursor: "pointer",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <TaxonomyGrid />
      <DomainMatrix />

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 88px" }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "#334155", letterSpacing: 3, marginBottom: 20 }}>
          // ALGORITHM CARDS — CLICK TO UNLOCK DETAILS
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((algo) => (
              <AlgoCard
                key={algo.id}
                algo={algo}
                unlocked={unlocked.includes(algo.id)}
                onUnlock={unlock}
              />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
