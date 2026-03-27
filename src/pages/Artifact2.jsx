import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const NN_COMPONENTS = [
  {
    id: "layers",
    name: "Layers",
    icon: "📦",
    color: "#00d4ff",
    role: "Organizational Structure",
    badge: "Foundation",
    badgeColor: "#00d4ff",
    definition:
      "Layers are organized groups of neurons that process information at each stage. Three types exist: input (receives data), hidden (learns representations), and output (produces predictions).",
    why: "Layers allow progressive feature abstraction — from raw pixels to high-level patterns. More hidden layers = deeper, more complex representations. This is why the technique is called deep learning.",
    details: [
      "Input Layer — receives raw feature data (X₁, X₂ … Xₙ)",
      "Hidden Layers — learn intermediate representations",
      "Output Layer — produces final predictions",
      "Depth = number of hidden layers",
    ],
    analogy: "Like floors in a building — each level processes and passes refined information upward.",
    xp: 80,
  },
  {
    id: "neurons",
    name: "Neurons",
    icon: "⚡",
    color: "#00ff87",
    role: "Core Computational Unit",
    badge: "Core Unit",
    badgeColor: "#00ff87",
    definition:
      "Neurons are the individual processing nodes in each layer. Each computes a weighted sum of its inputs, adds a bias, then passes the result through an activation function.",
    why: "Neurons are the smallest unit of learning capacity. More neurons per layer = more expressive power, but also more risk of overfitting on small datasets.",
    details: [
      "Receives weighted inputs from prior layer",
      "Adds a learnable bias term b",
      "Applies activation function σ(Wx + b)",
      "Passes output to the next layer",
    ],
    analogy: "Like a single brain cell — it fires when its combined input crosses a threshold.",
    xp: 100,
  },
  {
    id: "weights",
    name: "Weights",
    icon: "⚖️",
    color: "#a855f7",
    role: "Learnable Parameters",
    badge: "Learning Parameter",
    badgeColor: "#a855f7",
    definition:
      "Weights are numerical values on each connection between neurons. They control how strongly one neuron's output influences the next. All learning happens through adjusting weights.",
    why: "Weights are what the model actually learns. Correct weights → accurate predictions. They are updated via backpropagation using gradient signals from the loss function.",
    details: [
      "Initialized randomly (Xavier or He initialization)",
      "Updated each training iteration via optimizer",
      "Encode all knowledge extracted from training data",
      "Shared across positions in CNNs for efficiency",
    ],
    analogy: "Like a volume knob — higher weight = stronger signal passing through the connection.",
    xp: 140,
  },
  {
    id: "activation",
    name: "Activation Functions",
    icon: "🔥",
    color: "#febc2e",
    role: "Non-linearity Injector",
    badge: "Decision Maker",
    badgeColor: "#febc2e",
    definition:
      "Activation functions introduce non-linearity, enabling the network to learn complex patterns beyond linear relationships. Without them, a deep network collapses to a single linear transformation.",
    why: "Non-linearity is what makes deep learning uniquely powerful. ReLU avoids vanishing gradients. Sigmoid/Softmax produce probabilities. The choice impacts training speed and accuracy significantly.",
    details: [
      "ReLU — f(x) = max(0, x), fast, most common in hidden layers",
      "Sigmoid — output 0–1, used for binary output layers",
      "Tanh — output –1 to 1, zero-centered variant",
      "Softmax — multi-class probability distributions",
    ],
    analogy: "Like a gate — it decides whether a neuron's signal is strong enough to pass forward.",
    xp: 200,
  },
  {
    id: "loss",
    name: "Loss Functions",
    icon: "📉",
    color: "#f43f5e",
    role: "Error Quantifier",
    badge: "Performance Gauge",
    badgeColor: "#f43f5e",
    definition:
      "The loss function measures how wrong the model's predictions are relative to true labels. Training minimizes this value by adjusting weights through backpropagation.",
    why: "Without a loss function, there is no learning signal. It converts prediction error into a differentiable scalar the optimizer can minimize via gradient descent.",
    details: [
      "MSE (Mean Squared Error) — for regression tasks",
      "Binary Cross-Entropy — binary classification (0/1 output)",
      "Categorical Cross-Entropy — multi-class classification",
      "Hinge Loss — SVM-style margin-based classification",
    ],
    analogy: "Like a test score — the lower the loss, the better your model performed.",
    xp: 180,
  },
  {
    id: "optimizer",
    name: "Optimization Algorithms",
    icon: "🚀",
    color: "#ff79c6",
    role: "Weight Update Engine",
    badge: "Training Engine",
    badgeColor: "#ff79c6",
    definition:
      "Optimization algorithms update the model's weights to minimize the loss function. They compute how much each weight should change based on its gradient — the partial derivative of the loss.",
    why: "The optimizer is what drives learning. Adam adapts learning rates per-parameter and converges faster. SGD is simple but powerful with momentum. Choosing well speeds up training.",
    details: [
      "SGD — stochastic gradient descent, simple and effective",
      "Adam — adaptive per-parameter learning rates (most popular)",
      "RMSProp — running average of gradient magnitudes",
      "Adagrad — larger steps for rare features, smaller for frequent",
    ],
    analogy: "Like GPS navigation — finds the most efficient path downhill toward the lowest loss.",
    xp: 220,
  },
];

function NeuralNetDiagram() {
  const [activeLayer, setActiveLayer] = useState(-1);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev >= 3 ? -1 : prev + 1));
    }, 700);
    return () => clearInterval(interval);
  }, [running]);

  const layers = [
    { x: 80, neurons: [110, 200, 290], color: "#00d4ff", label: "Input Layer", sublabel: "X₁  X₂  X₃" },
    { x: 260, neurons: [70, 153, 237, 320], color: "#a855f7", label: "Hidden Layer 1", sublabel: "4 neurons" },
    { x: 460, neurons: [70, 153, 237, 320], color: "#a855f7", label: "Hidden Layer 2", sublabel: "4 neurons" },
    { x: 640, neurons: [153, 237], color: "#00ff87", label: "Output Layer", sublabel: "Ŷ₁  Ŷ₂" },
  ];

  const connections = [];
  for (let li = 0; li < layers.length - 1; li++) {
    layers[li].neurons.forEach((fy) => {
      layers[li + 1].neurons.forEach((ty) => {
        connections.push({ x1: layers[li].x, y1: fy, x2: layers[li + 1].x, y2: ty, layerIndex: li });
      });
    });
  }

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 64px" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "#334155", letterSpacing: 3, marginBottom: 20 }}>
        // ARCHITECTURE — ANIMATED FORWARD PASS
      </div>
      <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 20, padding: "32px 24px", overflowX: "auto" }}>
        <svg viewBox="0 0 740 400" style={{ width: "100%", maxWidth: 740, display: "block", margin: "0 auto" }}>
          <defs>
            {layers.map((layer, i) => (
              <radialGradient key={i} id={`glow2-${i}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={layer.color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={layer.color} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {connections.map((c, idx) => {
            const isActive = activeLayer === c.layerIndex || activeLayer === c.layerIndex + 1;
            return (
              <line key={idx} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                stroke={isActive ? layers[c.layerIndex].color : "#1a1a1a"}
                strokeWidth={isActive ? 1.5 : 0.8}
                strokeOpacity={isActive ? 0.5 : 0.3}
                style={{ transition: "stroke 0.3s ease" }}
              />
            );
          })}

          {layers.map((layer, li) =>
            layer.neurons.map((ny, ni) => {
              const isActive = activeLayer === li;
              return (
                <g key={`${li}-${ni}`}>
                  {isActive && (
                    <circle cx={layer.x} cy={ny} r={28} fill={`url(#glow2-${li})`} opacity={0.6} />
                  )}
                  <circle cx={layer.x} cy={ny} r={18}
                    fill={isActive ? layer.color : "#111"}
                    stroke={layer.color}
                    strokeWidth={isActive ? 2 : 1}
                    strokeOpacity={isActive ? 1 : 0.4}
                    style={{ transition: "fill 0.3s ease" }}
                  />
                  {li === 0 && (
                    <text x={layer.x} y={ny + 1} textAnchor="middle" dominantBaseline="middle"
                      style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, fill: isActive ? "#050505" : layer.color, fontWeight: 700 }}>
                      X{ni + 1}
                    </text>
                  )}
                  {li === layers.length - 1 && (
                    <text x={layer.x} y={ny + 1} textAnchor="middle" dominantBaseline="middle"
                      style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, fill: isActive ? "#050505" : layer.color, fontWeight: 700 }}>
                      Ŷ{ni + 1}
                    </text>
                  )}
                </g>
              );
            })
          )}

          {layers.map((layer, li) => (
            <g key={`label-${li}`}>
              <text x={layer.x} y={358} textAnchor="middle"
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fill: activeLayer === li ? layer.color : "#475569", fontWeight: 700, transition: "fill 0.3s ease" }}>
                {layer.label}
              </text>
              <text x={layer.x} y={374} textAnchor="middle"
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8, fill: "#334155" }}>
                {layer.sublabel}
              </text>
            </g>
          ))}

          {layers.slice(0, -1).map((layer, li) => (
            <text key={`arrow-${li}`} x={(layer.x + layers[li + 1].x) / 2} y={22} textAnchor="middle"
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, fill: activeLayer === li ? "#ffffff66" : "#33415533", transition: "fill 0.3s ease" }}>
              →
            </text>
          ))}
        </svg>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
          <button onClick={() => setRunning((r) => !r)}
            style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", padding: "8px 18px",
              background: running ? "rgba(0,212,255,0.12)" : "#0d0d0d",
              border: `1px solid ${running ? "#00d4ff" : "#1a1a1a"}`,
              color: running ? "#00d4ff" : "#475569",
              borderRadius: 999, cursor: "pointer",
            }}>
            {running ? "⏸ pause_forward_pass()" : "▶ run_forward_pass()"}
          </button>
          {layers.map((layer, li) => (
            <div key={li} style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: "0.63rem", padding: "6px 12px",
              background: activeLayer === li ? `${layer.color}18` : "transparent",
              border: `1px solid ${activeLayer === li ? layer.color + "44" : "#1a1a1a"}`,
              color: activeLayer === li ? layer.color : "#334155",
              borderRadius: 999, transition: "all 0.3s",
            }}>
              {activeLayer === li ? "●" : "○"} {layer.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivationViz() {
  const W = 130, H = 80, cx = 65, cy = 40, scale = 18;
  const range = Array.from({ length: 41 }, (_, i) => -2 + i * 0.1);

  function pts(fn) {
    return range.map((x, i) => {
      const sx = cx + x * scale;
      const sy = cy - fn(x) * scale;
      return `${i === 0 ? "M" : "L"} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
    }).join(" ");
  }

  const fns = [
    { name: "ReLU", color: "#00ff87", tag: "Most Common", path: pts((x) => Math.max(0, x)), desc: "f(x) = max(0, x) — fast, avoids vanishing gradient" },
    { name: "Sigmoid", color: "#00d4ff", tag: "Binary Output", path: pts((x) => 1 / (1 + Math.exp(-x))), desc: "f(x) = 1/(1+e⁻ˣ) — squishes output to 0–1" },
    { name: "Tanh", color: "#febc2e", tag: "Zero-Centered", path: pts((x) => Math.tanh(x)), desc: "f(x) = tanh(x) — output range –1 to 1" },
    { name: "Leaky ReLU", color: "#a855f7", tag: "No Dead Neurons", path: pts((x) => x >= 0 ? x : 0.1 * x), desc: "f(x) = x if x≥0, else 0.1x — fixes dying ReLU" },
  ];

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 64px" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "#334155", letterSpacing: 3, marginBottom: 20 }}>
        // ACTIVATION FUNCTIONS — VISUAL COMPARISON
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
        {fns.map((fn) => (
          <div key={fn.name} style={{ background: "#0d0d0d", border: `1px solid ${fn.color}33`, borderRadius: 16, padding: 20, boxShadow: `0 0 20px ${fn.color}0a` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.9rem", color: fn.color, fontWeight: 700 }}>{fn.name}</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", border: `1px solid ${fn.color}44`, background: `${fn.color}12`, color: fn.color, borderRadius: 999, padding: "3px 8px" }}>{fn.tag}</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", background: "#090909", borderRadius: 8, display: "block" }}>
              <line x1={0} y1={cy} x2={W} y2={cy} stroke="#1a1a1a" strokeWidth={1} />
              <line x1={cx} y1={0} x2={cx} y2={H} stroke="#1a1a1a" strokeWidth={1} />
              <path d={fn.path} fill="none" stroke={fn.color} strokeWidth={2} />
            </svg>
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#94a3b8", marginTop: 10, lineHeight: 1.6 }}>{fn.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrainingPipeline() {
  const steps = [
    { icon: "📥", label: "Forward Pass", desc: "Data flows through layers; weighted sums + activations produce predictions.", color: "#00d4ff" },
    { icon: "📉", label: "Loss Calculation", desc: "Compare predictions to true labels and compute the scalar error value.", color: "#f43f5e" },
    { icon: "↩️", label: "Backpropagation", desc: "Compute gradients of the loss with respect to every weight via chain rule.", color: "#febc2e" },
    { icon: "🔄", label: "Weight Update", desc: "Optimizer uses gradients to adjust weights, reducing loss each iteration.", color: "#00ff87" },
  ];

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 64px" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "#334155", letterSpacing: 3, marginBottom: 20 }}>
        // TRAINING PIPELINE — ONE ITERATION
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 4, position: "relative" }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "stretch", position: "relative" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              style={{
                background: "#0d0d0d", border: `1px solid ${step.color}44`, borderRadius: 16,
                padding: "24px 16px", textAlign: "center", flex: 1, margin: "0 4px",
                boxShadow: `0 0 24px ${step.color}0e`,
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{step.icon}</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", color: step.color, fontSize: "0.8rem", fontWeight: 700, marginBottom: 8 }}>{step.label}</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", color: "#94a3b8", fontSize: "0.68rem", lineHeight: 1.6 }}>{step.desc}</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", color: step.color, fontSize: "0.6rem", marginTop: 10, opacity: 0.45 }}>step_{i + 1}()</div>
            </motion.div>
            {i < steps.length - 1 && (
              <div style={{ position: "absolute", right: -4, top: "50%", transform: "translateY(-50%)", color: "#334155", fontSize: "1rem", zIndex: 2, pointerEvents: "none" }}>→</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 18, fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#334155" }}>
        ↺ repeat for N epochs until loss converges to minimum
      </div>
    </section>
  );
}

function ComponentCard({ comp }) {
  const [flipped, setFlipped] = useState(false);

  const face = (isBack) => ({
    position: "absolute", inset: 0, borderRadius: 18, background: "#0d0d0d",
    border: `1px solid ${comp.color}33`, padding: 24, display: "flex",
    flexDirection: "column", gap: 10, boxShadow: `0 0 32px ${comp.color}10`,
    backfaceVisibility: "hidden", transform: isBack ? "rotateY(180deg)" : "rotateY(0deg)",
  });

  return (
    <motion.div layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
      style={{ perspective: 1400, minHeight: 390 }}>
      <div onClick={() => setFlipped((f) => !f)}
        style={{
          cursor: "pointer", position: "relative", width: "100%", minHeight: 390,
          transformStyle: "preserve-3d", transition: "transform 0.7s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>
        {/* Front */}
        <div style={face(false)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>{comp.icon}</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "1rem", color: comp.color, fontWeight: 700 }}>{comp.name}</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#64748b", marginTop: 4 }}>{comp.role}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", border: `1px solid ${comp.badgeColor}44`, background: `${comp.badgeColor}12`, color: comp.badgeColor, borderRadius: 999, padding: "4px 9px", marginBottom: 8 }}>{comp.badge}</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#00d4ff" }}>+{comp.xp} XP</div>
            </div>
          </div>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: "0.85rem", margin: "8px 0 0" }}>{comp.definition}</p>
          <div style={{ marginTop: "auto", color: "#475569", fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem" }}>click_to_inspect()</div>
        </div>

        {/* Back */}
        <div style={face(true)}>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.75rem", color: comp.color, letterSpacing: 2, marginBottom: 10 }}>// WHY IT MATTERS</div>
          <p style={{ color: "#cbd5e1", fontSize: "0.82rem", lineHeight: 1.7, margin: "0 0 12px" }}>{comp.why}</p>
          <div style={{ fontFamily: "JetBrains Mono, monospace", color: "#475569", fontSize: "0.65rem", marginBottom: 8 }}>DETAILS</div>
          {comp.details.map((d) => (
            <div key={d} style={{ color: "#94a3b8", fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem", marginBottom: 6 }}>
              <span style={{ color: comp.color }}>▸</span> {d}
            </div>
          ))}
          <div style={{ marginTop: 12, borderTop: "1px solid #1a1a1a", paddingTop: 12 }}>
            <div style={{ fontFamily: "JetBrains Mono, monospace", color: "#475569", fontSize: "0.65rem", marginBottom: 6 }}>ANALOGY</div>
            <div style={{ color: "#64748b", fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem", fontStyle: "italic" }}>"{comp.analogy}"</div>
          </div>
          <div style={{ marginTop: "auto", color: "#475569", fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem" }}>click_to_return()</div>
        </div>
      </div>
    </motion.div>
  );
}

function SummarySection() {
  const insights = [
    { icon: "🧩", title: "Structure Enables Depth", text: "Layers organize computation. More hidden layers allow learning increasingly abstract features — from edges to shapes to semantic concepts.", color: "#00d4ff" },
    { icon: "📡", title: "Weights Hold All Knowledge", text: "Everything the model learns is encoded in weights. Training is simply finding the right weights through repeated, gradient-guided error correction.", color: "#a855f7" },
    { icon: "⚡", title: "Non-linearity Is Everything", text: "Without activation functions, any deep network collapses to one linear transform. Non-linearity is what makes deep learning uniquely expressive.", color: "#febc2e" },
    { icon: "🔁", title: "Optimization Is Iterative", text: "No model trains in one pass. Thousands of weight updates, guided by loss gradients, gradually push the model toward accurate predictions.", color: "#00ff87" },
    { icon: "📊", title: "Noise & Complexity Trade-off", text: "High noise requires more complex models. But too many neurons on simple data causes overfitting — the playground makes this trade-off visible.", color: "#ff79c6" },
    { icon: "🏗️", title: "Visualization Builds Intuition", text: "Seeing forward pass animations, loss curves, and decision boundaries transforms abstract math into tangible insight — critical for ML practitioners.", color: "#f43f5e" },
  ];

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 96px" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "#334155", letterSpacing: 3, marginBottom: 20 }}>
        // SUMMARY — KEY INSIGHTS FROM THIS EXERCISE
      </div>
      <div style={{
        background: "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(168,85,247,0.06) 100%)",
        border: "1px solid #1a1a1a", borderRadius: 20, padding: "36px 28px", marginBottom: 32,
      }}>
        <h2 style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "clamp(1.3rem, 3vw, 2rem)", color: "#f8fafc", marginBottom: 14 }}>
          Why Visualize Neural{" "}
          <span style={{ color: "#00d4ff", textShadow: "0 0 20px rgba(0,212,255,0.4)" }}>Networks?</span>
        </h2>
        <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: "0.95rem", maxWidth: 820, margin: 0 }}>
          Neural networks are often called "black boxes," but visualization transforms them into interpretable systems.
          By mapping out layers, tracing how weights propagate signals, and seeing how activation functions shape decision
          boundaries, practitioners gain the intuition needed to debug, optimize, and architect better models.
          This artifact brings that understanding into an interactive, accessible format — for both technical
          and non-technical audiences.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
        {insights.map((item) => (
          <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.3 }}
            style={{ background: "#0d0d0d", border: `1px solid ${item.color}22`, borderRadius: 14, padding: 22, boxShadow: `0 0 20px ${item.color}08` }}>
            <div style={{ fontSize: "1.5rem", marginBottom: 10 }}>{item.icon}</div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", color: item.color, fontSize: "0.82rem", fontWeight: 700, marginBottom: 8 }}>{item.title}</div>
            <p style={{ color: "#94a3b8", fontSize: "0.82rem", lineHeight: 1.7, margin: 0 }}>{item.text}</p>
          </motion.div>
        ))}
      </div>

      <div style={{
        marginTop: 40, background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 14,
        padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", color: "#475569", fontSize: "0.72rem" }}>
          artifact_2.complete() → neural_network_visualizer
        </div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", color: "#00d4ff", fontSize: "0.8rem", fontWeight: 700 }}>
          Total XP: +{NN_COMPONENTS.reduce((s, c) => s + c.xp, 0)}
        </div>
      </div>
    </section>
  );
}

export default function Artifact2() {
  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "#f8fafc" }}>
      <Navbar />

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "110px 2rem 56px", position: "relative" }}>
        <div style={{
          position: "absolute", inset: "0 auto auto 5%", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 72%)",
          filter: "blur(80px)", pointerEvents: "none",
        }} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div style={{ fontFamily: "JetBrains Mono, monospace", color: "#334155", fontSize: "0.72rem", letterSpacing: 3, marginBottom: 14 }}>
            // PORTFOLIO ARTIFACT 2 — NEURAL NETWORK VISUALIZATION
          </div>
          <h1 style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "clamp(2rem, 5vw, 3.8rem)", lineHeight: 1.1, margin: "0 0 14px" }}>
            Neural Network{" "}
            <span style={{ color: "#a855f7", textShadow: "0 0 24px rgba(168,85,247,0.45)" }}>Visualizer</span>
          </h1>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.78rem", color: "#00ff87", marginBottom: 16 }}>
            neural_network.build(layers, neurons, weights, activations, loss, optimizer)
          </div>
          <p style={{ maxWidth: 820, color: "#94a3b8", lineHeight: 1.8, fontSize: "1rem", margin: 0 }}>
            This artifact explores the six core components of a neural network — layers, neurons, weights, activation
            functions, loss functions, and optimization algorithms — through an animated forward-pass diagram,
            activation function comparisons, a training pipeline flowchart, and interactive component cards.
          </p>
        </motion.div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 26 }}>
          {NN_COMPONENTS.map((c) => (
            <div key={c.id} style={{
              borderRadius: 999, border: `1px solid ${c.color}44`, background: `${c.color}12`,
              color: c.color, padding: "7px 14px", fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem",
            }}>
              {c.icon} {c.name}
            </div>
          ))}
        </div>
      </section>

      <NeuralNetDiagram />
      <TrainingPipeline />
      <ActivationViz />

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 88px" }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "#334155", letterSpacing: 3, marginBottom: 20 }}>
          // COMPONENT DEEP DIVE — CLICK CARDS TO EXPLORE
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
          {NN_COMPONENTS.map((comp) => (
            <ComponentCard key={comp.id} comp={comp} />
          ))}
        </div>
      </section>

      <SummarySection />
    </div>
  );
}
