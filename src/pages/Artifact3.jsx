import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

/* ─── Training Pipeline Steps ─────────────────────────────────── */
const PIPELINE_STEPS = [
  {
    id: "data-collection",
    step: "01",
    title: "Data Collection",
    icon: "🌐",
    color: "#00d4ff",
    duration: "Months",
    description:
      "Massive corpora are harvested from the open web (Common Crawl), books (Books3, Project Gutenberg), code repositories (GitHub), Wikipedia, academic papers (arXiv), and licensed data sources.",
    details: [
      "Common Crawl: ~400TB of raw web data per crawl",
      "GitHub: billions of lines of code across 28+ languages",
      "Wikipedia: 60+ language editions",
      "Books: millions of digitized volumes",
      "Proprietary & licensed content",
    ],
    stat: "~45TB",
    statLabel: "Curated tokens (GPT-4)",
  },
  {
    id: "preprocessing",
    step: "02",
    title: "Data Preprocessing",
    icon: "🔧",
    color: "#00ff87",
    duration: "Weeks",
    description:
      "Raw data is deduplicated, filtered for quality, tokenized, and shuffled. Toxic or low-quality content is removed using classifiers and heuristic rules.",
    details: [
      "Deduplication at document & n-gram level",
      "Language identification & filtering",
      "Quality scoring (perplexity filters, classifiers)",
      "Tokenization (BPE / SentencePiece)",
      "Sequence packing for GPU efficiency",
    ],
    stat: "~1.4T",
    statLabel: "Tokens (LLaMA 3.1 405B)",
  },
  {
    id: "pretraining",
    step: "03",
    title: "Pre-training",
    icon: "🧠",
    color: "#a855f7",
    duration: "Months",
    description:
      "The model learns to predict the next token across the entire dataset (self-supervised). Transformer weights are updated via gradient descent over trillions of token predictions.",
    details: [
      "Next-token prediction (causal LM objective)",
      "Gradient descent with AdamW optimizer",
      "Mixed-precision (bf16 / fp8) training",
      "Distributed training across thousands of GPUs",
      "Checkpoint saves every few thousand steps",
    ],
    stat: "~25,000",
    statLabel: "A100 GPUs (GPT-4 estimate)",
  },
  {
    id: "finetuning",
    step: "04",
    title: "Supervised Fine-Tuning",
    icon: "🎓",
    color: "#febc2e",
    duration: "Days–Weeks",
    description:
      "The pre-trained model is fine-tuned on curated instruction–response pairs written by human annotators to teach it to follow instructions helpfully and safely.",
    details: [
      "High-quality instruction–response dataset (10K–1M examples)",
      "Human-written demonstrations from expert labelers",
      "Conversation format training (System / User / Assistant)",
      "Lower learning rate to preserve pre-trained knowledge",
      "Domain-specific variants (code, math, medical)",
    ],
    stat: "~100K",
    statLabel: "SFT demonstrations",
  },
  {
    id: "rlhf",
    step: "05",
    title: "RLHF / Alignment",
    icon: "🏆",
    color: "#ff79c6",
    duration: "Weeks",
    description:
      "Human raters compare model outputs; a reward model is trained on their preferences. PPO (or DPO / GRPO) then optimizes the LLM to maximize that reward — aligning it with human values.",
    details: [
      "Reward Model trained on 100K+ human preference pairs",
      "PPO / DPO / GRPO optimization loops",
      "Constitutional AI (Anthropic) — AI self-critique",
      "Iterative red-teaming to surface failure modes",
      "Safety and helpfulness balanced via KL penalty",
    ],
    stat: "~1M",
    statLabel: "Human preference labels",
  },
  {
    id: "evaluation",
    step: "06",
    title: "Evaluation & Red-Teaming",
    icon: "🔍",
    color: "#fb923c",
    duration: "Weeks",
    description:
      "Models are benchmarked across hundreds of tasks (MMLU, HumanEval, GSM8K, HELM) and red-teamed for harmful outputs before deployment decisions are made.",
    details: [
      "Academic benchmarks: MMLU, BIG-Bench, MATH",
      "Code generation: HumanEval, MBPP",
      "Safety suites: TruthfulQA, AdvGLUE",
      "Internal & third-party red-team exercises",
      "A/B testing with real user traffic",
    ],
    stat: "200+",
    statLabel: "Evaluation benchmarks",
  },
  {
    id: "deployment",
    step: "07",
    title: "Deployment",
    icon: "🚀",
    color: "#4ade80",
    duration: "Ongoing",
    description:
      "Optimized models (quantization, speculative decoding, vLLM) are served via inference clusters with load balancing, monitoring, and continuous model updates.",
    details: [
      "Model quantization (INT4/INT8) for efficiency",
      "Speculative decoding to reduce latency",
      "vLLM / TensorRT-LLM serving engines",
      "Autoscaling inference endpoints (Kubernetes)",
      "Observability, rate limiting, content moderation",
    ],
    stat: "~100M",
    statLabel: "Daily requests (ChatGPT)",
  },
];

/* ─── Model Comparison Data ────────────────────────────────────── */
const MODELS = [
  {
    id: "gpt4",
    name: "GPT-4",
    org: "OpenAI",
    icon: "⚡",
    color: "#10a37f",
    released: "Mar 2023",
    params: "~1.8T (MoE, estimated)",
    tokens: "~13T tokens",
    gpuTime: "~25,000 A100s × ~90 days",
    energyMWh: "~50,000 MWh (estimated)",
    costUSD: "~$100M (estimated)",
    contextWindow: "128K tokens",
    keyFact: "First frontier multimodal GPT; mixture-of-experts architecture believed to underpin it.",
    benchmarks: { mmlu: 86.4, humaneval: 67.0, gsm8k: 92.0 },
  },
  {
    id: "claude3",
    name: "Claude 3 Opus",
    org: "Anthropic",
    icon: "🧩",
    color: "#d97706",
    released: "Mar 2024",
    params: "~Unknown (dense transformer)",
    tokens: "~Unknown",
    gpuTime: "~Comparable to GPT-4",
    energyMWh: "~40,000–60,000 MWh (est.)",
    costUSD: "~$100M+ (estimated)",
    contextWindow: "200K tokens",
    keyFact: "Built with Constitutional AI & RLHF-from-AI feedback (RLAIF). Strongest context length in class.",
    benchmarks: { mmlu: 86.8, humaneval: 84.9, gsm8k: 95.0 },
  },
  {
    id: "llama3",
    name: "LLaMA 3.1 405B",
    org: "Meta AI",
    icon: "🦙",
    color: "#3b82f6",
    released: "Jul 2024",
    params: "405B",
    tokens: "15.6T tokens",
    gpuTime: "~16,000 H100s × ~30 days",
    energyMWh: "~11,390 MWh",
    costUSD: "~$25M–$50M (estimated)",
    contextWindow: "128K tokens",
    keyFact: "First open-weight model rivaling proprietary frontier models. Trained on 15.6T high-quality tokens.",
    benchmarks: { mmlu: 88.6, humaneval: 89.0, gsm8k: 96.8 },
  },
  {
    id: "gemini",
    name: "Gemini 1.5 Pro",
    org: "Google DeepMind",
    icon: "✨",
    color: "#8b5cf6",
    released: "Feb 2024",
    params: "~Unknown (MoE)",
    tokens: "~Unknown",
    gpuTime: "Trained on Google TPU v5p pods",
    energyMWh: "~30,000–50,000 MWh (est.)",
    costUSD: "~$100M+ (estimated)",
    contextWindow: "1M tokens",
    keyFact: "Record 1M-token context via ring attention. Natively multimodal across text, image, audio, video.",
    benchmarks: { mmlu: 81.9, humaneval: 71.9, gsm8k: 91.7 },
  },
];

/* ─── Resource Categories ─────────────────────────────────────── */
const RESOURCES = [
  {
    icon: "🗄️",
    title: "Datasets",
    color: "#00d4ff",
    items: [
      { label: "GPT-4 (est.)", value: 45, unit: "TB filtered" },
      { label: "LLaMA 3.1", value: 62, unit: "TB filtered" },
      { label: "Common Crawl (raw)", value: 100, unit: "TB / crawl" },
    ],
    insight:
      "Quality trumps quantity. Modern pipelines discard 70–90 % of raw web text after filtering.",
  },
  {
    icon: "💻",
    title: "Compute",
    color: "#a855f7",
    items: [
      { label: "GPT-4 (est.)", value: 75, unit: "k A100-days" },
      { label: "LLaMA 3.1 405B", value: 48, unit: "k H100-days" },
      { label: "Gemini 1.0 Ultra", value: 90, unit: "k TPU v4-days" },
    ],
    insight:
      "Compute scales roughly with model size × tokens. Chinchilla scaling laws guide optimal allocation.",
  },
  {
    icon: "⚡",
    title: "Energy",
    color: "#febc2e",
    items: [
      { label: "GPT-4 (est.)", value: 80, unit: "k MWh" },
      { label: "LLaMA 3.1 405B", value: 11, unit: "k MWh" },
      { label: "Gemini Ultra (est.)", value: 50, unit: "k MWh" },
    ],
    insight:
      "Training a large LLM can emit CO₂ equivalent to hundreds of trans-Atlantic flights. Open models amortize this across millions of users.",
  },
  {
    icon: "⏱️",
    title: "Time",
    color: "#4ade80",
    items: [
      { label: "Data prep", value: 30, unit: "days" },
      { label: "Pre-training", value: 90, unit: "days" },
      { label: "RLHF + eval", value: 60, unit: "days" },
    ],
    insight:
      "Wall-clock time is compressed by massive parallelism, but orchestrating thousands of GPUs without failures remains a significant engineering challenge.",
  },
];

/* ─── Sub-components ──────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: "easeOut" },
  }),
};

function SectionLabel({ number, title }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="font-mono text-xs" style={{ color: "#334155" }}>
        {number}.
      </span>
      <span className="font-mono text-xl font-bold" style={{ color: "#e2e8f0" }}>
        {title}
      </span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#1e293b,transparent)" }} />
    </div>
  );
}

/* ─── Pipeline Step Card ─────────────────────────────────────── */
function PipelineCard({ step, index, active, onClick }) {
  return (
    <motion.button
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      style={{
        background: active ? `${step.color}14` : "#0d0d0d",
        border: `1px solid ${active ? step.color : "#1a1a1a"}`,
        borderRadius: 12,
        padding: "18px 20px",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "all 0.25s ease",
        boxShadow: active ? `0 0 20px ${step.color}30` : "none",
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xl">{step.icon}</span>
        <div>
          <div className="font-mono text-xs" style={{ color: step.color, opacity: 0.6 }}>
            STEP {step.step}
          </div>
          <div className="font-mono font-bold text-sm" style={{ color: step.color }}>
            {step.title}
          </div>
        </div>
        <div
          className="ml-auto font-mono text-xs px-2 py-0.5 rounded"
          style={{ background: "#111", color: "#475569", border: "1px solid #1e1e1e" }}
        >
          {step.duration}
        </div>
      </div>
      <div className="text-xs leading-relaxed" style={{ color: "#64748b" }}>
        {step.description.slice(0, 100)}…
      </div>
    </motion.button>
  );
}

/* ─── Model Card ─────────────────────────────────────────────── */
function ModelCard({ model, index, active, onClick }) {
  return (
    <motion.button
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      style={{
        background: active ? `${model.color}18` : "#0d0d0d",
        border: `1px solid ${active ? model.color : "#1a1a1a"}`,
        borderRadius: 14,
        padding: "20px",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "all 0.25s ease",
        boxShadow: active ? `0 0 24px ${model.color}35` : "none",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{model.icon}</span>
        <div>
          <div className="font-mono font-bold text-base" style={{ color: model.color }}>
            {model.name}
          </div>
          <div className="font-mono text-xs" style={{ color: "#475569" }}>
            {model.org} · {model.released}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <Stat label="Params" value={model.params} color={model.color} />
        <Stat label="Context" value={model.contextWindow} color={model.color} />
      </div>
    </motion.button>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{ background: "#111", borderRadius: 8, padding: "8px 10px" }}>
      <div style={{ color: "#334155", fontSize: "0.6rem", marginBottom: 2 }}>{label}</div>
      <div style={{ color, fontSize: "0.7rem", fontWeight: 700 }}>{value}</div>
    </div>
  );
}

/* ─── Benchmark Bar ─────────────────────────────────────────── */
function BenchBar({ label, value, color }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between font-mono text-xs mb-1" style={{ color: "#94a3b8" }}>
        <span>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div style={{ background: "#1a1a1a", borderRadius: 4, height: 6, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ height: "100%", background: `linear-gradient(90deg,${color},${color}88)`, borderRadius: 4 }}
        />
      </div>
    </div>
  );
}

/* ─── Resource Bar ──────────────────────────────────────────── */
function ResourceBar({ item, color, maxVal }) {
  const pct = Math.min((item.value / maxVal) * 100, 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between font-mono text-xs mb-1" style={{ color: "#94a3b8" }}>
        <span>{item.label}</span>
        <span style={{ color }}>
          {item.value} {item.unit}
        </span>
      </div>
      <div style={{ background: "#1a1a1a", borderRadius: 4, height: 8, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ height: "100%", background: `linear-gradient(90deg,${color},${color}55)`, borderRadius: 4 }}
        />
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function Artifact3() {
  const [activeStep, setActiveStep] = useState(PIPELINE_STEPS[0]);
  const [activeModel, setActiveModel] = useState(MODELS[0]);

  return (
    <div style={{ background: "#050505", minHeight: "100vh", color: "#e2e8f0" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ paddingTop: 120, paddingBottom: 60 }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="font-mono text-xs mb-3" style={{ color: "#334155" }}>
              // artifact_03 · interactive infographic
            </div>
            <h1
              className="font-mono font-black text-4xl md:text-5xl leading-tight mb-4"
              style={{
                background: "linear-gradient(135deg,#00d4ff 0%,#a855f7 50%,#ff79c6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Training Generative AI
              <br />
              Large Language Models
            </h1>
            <p className="text-sm md:text-base leading-relaxed max-w-2xl" style={{ color: "#64748b" }}>
              A visual deep-dive into the end-to-end pipeline that turns raw internet text into
              frontier AI systems — from data collection through deployment — with real resource
              figures for GPT-4, Claude, LLaMA, and Gemini.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { label: "Training tokens", value: "15T+", color: "#00d4ff" },
                { label: "GPU cluster (est.)", value: "25K A100s", color: "#a855f7" },
                { label: "Energy (est.)", value: "50K MWh", color: "#febc2e" },
                { label: "Pipeline stages", value: "7 steps", color: "#4ade80" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "#0d0d0d",
                    border: "1px solid #1a1a1a",
                    borderRadius: 10,
                    padding: "12px 18px",
                  }}
                >
                  <div className="font-mono font-black text-xl" style={{ color: s.color }}>
                    {s.value}
                  </div>
                  <div className="font-mono text-xs" style={{ color: "#475569" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Pipeline Section ── */}
      <section style={{ padding: "60px 0" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel number="01" title="training_pipeline" />

          {/* Flow arrow strip */}
          <div
            className="hidden md:flex items-center justify-between mb-8 overflow-x-auto"
            style={{ gap: 4, paddingBottom: 8 }}
          >
            {PIPELINE_STEPS.map((s, i) => (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => setActiveStep(s)}
                  style={{
                    background: activeStep.id === s.id ? `${s.color}22` : "#0d0d0d",
                    border: `1px solid ${activeStep.id === s.id ? s.color : "#1a1a1a"}`,
                    borderRadius: 8,
                    padding: "8px 12px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    minWidth: 80,
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <span className="font-mono text-xs" style={{ color: activeStep.id === s.id ? s.color : "#475569" }}>
                    {s.step}
                  </span>
                </button>
                {i < PIPELINE_STEPS.length - 1 && (
                  <div style={{ color: "#1e293b", fontSize: 20, flexShrink: 0 }}>›</div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Step list */}
            <div className="md:col-span-1 space-y-3">
              {PIPELINE_STEPS.map((s, i) => (
                <PipelineCard
                  key={s.id}
                  step={s}
                  index={i}
                  active={activeStep.id === s.id}
                  onClick={() => setActiveStep(s)}
                />
              ))}
            </div>

            {/* Detail panel */}
            <div className="md:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    background: "#0d0d0d",
                    border: `1px solid ${activeStep.color}44`,
                    borderRadius: 16,
                    padding: 32,
                    boxShadow: `0 0 40px ${activeStep.color}18`,
                    position: "sticky",
                    top: 88,
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="font-mono text-xs mb-1" style={{ color: activeStep.color, opacity: 0.7 }}>
                        STEP {activeStep.step} OF 07
                      </div>
                      <div className="font-mono font-black text-2xl" style={{ color: activeStep.color }}>
                        {activeStep.icon} {activeStep.title}
                      </div>
                    </div>
                    <div
                      style={{
                        background: `${activeStep.color}18`,
                        border: `1px solid ${activeStep.color}55`,
                        borderRadius: 10,
                        padding: "10px 16px",
                        textAlign: "center",
                      }}
                    >
                      <div className="font-mono font-black text-xl" style={{ color: activeStep.color }}>
                        {activeStep.stat}
                      </div>
                      <div className="font-mono text-xs" style={{ color: "#475569" }}>
                        {activeStep.statLabel}
                      </div>
                    </div>
                  </div>

                  {/* Color rule */}
                  <div
                    style={{
                      height: 2,
                      background: `linear-gradient(90deg,${activeStep.color},transparent)`,
                      marginBottom: 20,
                      borderRadius: 2,
                    }}
                  />

                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#94a3b8" }}>
                    {activeStep.description}
                  </p>

                  <div className="font-mono text-xs mb-3" style={{ color: "#334155" }}>
                    // key_details
                  </div>
                  <div className="space-y-2">
                    {activeStep.details.map((d) => (
                      <div key={d} className="flex items-start gap-3 text-sm">
                        <span style={{ color: activeStep.color, marginTop: 2, flexShrink: 0 }}>▸</span>
                        <span style={{ color: "#64748b" }}>{d}</span>
                      </div>
                    ))}
                  </div>

                  {/* Duration badge */}
                  <div className="mt-6 flex items-center gap-2">
                    <span className="font-mono text-xs" style={{ color: "#334155" }}>Typical duration:</span>
                    <span
                      className="font-mono text-xs px-3 py-1 rounded"
                      style={{
                        background: `${activeStep.color}15`,
                        border: `1px solid ${activeStep.color}44`,
                        color: activeStep.color,
                      }}
                    >
                      {activeStep.duration}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── Model Comparison ── */}
      <section style={{ padding: "60px 0" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel number="02" title="model_comparison" />

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {MODELS.map((m, i) => (
              <ModelCard
                key={m.id}
                model={m}
                index={i}
                active={activeModel.id === m.id}
                onClick={() => setActiveModel(m)}
              />
            ))}
          </div>

          {/* Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              style={{
                background: "#0d0d0d",
                border: `1px solid ${activeModel.color}44`,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: `0 0 40px ${activeModel.color}18`,
              }}
            >
              <div style={{ height: 3, background: `linear-gradient(90deg,${activeModel.color},transparent)` }} />
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left */}
                <div style={{ padding: 32, borderRight: "1px solid #1a1a1a" }}>
                  <div className="flex items-center gap-3 mb-5">
                    <span style={{ fontSize: 32 }}>{activeModel.icon}</span>
                    <div>
                      <div className="font-mono font-black text-xl" style={{ color: activeModel.color }}>
                        {activeModel.name}
                      </div>
                      <div className="font-mono text-xs" style={{ color: "#475569" }}>
                        {activeModel.org} · Released {activeModel.released}
                      </div>
                    </div>
                  </div>

                  <div className="font-mono text-xs mb-3" style={{ color: "#334155" }}>// training_resources</div>

                  <div className="space-y-3">
                    {[
                      { label: "Parameters", value: activeModel.params },
                      { label: "Training Tokens", value: activeModel.tokens },
                      { label: "GPU / TPU Time", value: activeModel.gpuTime },
                      { label: "Energy (est.)", value: activeModel.energyMWh },
                      { label: "Cost (est.)", value: activeModel.costUSD },
                      { label: "Context Window", value: activeModel.contextWindow },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex justify-between items-center font-mono text-xs"
                        style={{ borderBottom: "1px solid #111", paddingBottom: 6 }}
                      >
                        <span style={{ color: "#475569" }}>{row.label}</span>
                        <span style={{ color: "#94a3b8" }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right */}
                <div style={{ padding: 32 }}>
                  <div className="font-mono text-xs mb-4" style={{ color: "#334155" }}>// benchmark_scores</div>
                  <BenchBar label="MMLU (knowledge)" value={activeModel.benchmarks.mmlu} color={activeModel.color} />
                  <BenchBar label="HumanEval (coding)" value={activeModel.benchmarks.humaneval} color={activeModel.color} />
                  <BenchBar label="GSM8K (math)" value={activeModel.benchmarks.gsm8k} color={activeModel.color} />

                  <div
                    className="mt-6 text-xs leading-relaxed font-mono"
                    style={{
                      background: `${activeModel.color}0d`,
                      border: `1px solid ${activeModel.color}33`,
                      borderRadius: 10,
                      padding: "14px 16px",
                      color: "#64748b",
                    }}
                  >
                    <span style={{ color: activeModel.color }}>💡 Key Insight: </span>
                    {activeModel.keyFact}
                  </div>

                  {/* Cost per token callout */}
                  <div
                    className="mt-4 text-xs font-mono"
                    style={{
                      background: "#111",
                      border: "1px solid #1e1e1e",
                      borderRadius: 10,
                      padding: "14px 16px",
                      color: "#475569",
                    }}
                  >
                    <span style={{ color: "#334155" }}>⚠ Note: </span>
                    Parameter counts and training costs for closed models are community estimates based
                    on published hints and third-party analyses. Official figures have not been disclosed.
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Resources Section ── */}
      <section style={{ padding: "60px 0" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel number="03" title="resource_breakdown" />
          <div className="grid md:grid-cols-2 gap-6">
            {RESOURCES.map((r, i) => (
              <motion.div
                key={r.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid #1a1a1a",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <div style={{ height: 2, background: `linear-gradient(90deg,${r.color},transparent)` }} />
                <div style={{ padding: 24 }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span style={{ fontSize: 22 }}>{r.icon}</span>
                    <div className="font-mono font-bold text-base" style={{ color: r.color }}>
                      {r.title}
                    </div>
                  </div>
                  {r.items.map((item) => (
                    <ResourceBar
                      key={item.label}
                      item={item}
                      color={r.color}
                      maxVal={Math.max(...r.items.map((x) => x.value))}
                    />
                  ))}
                  <div
                    className="mt-4 text-xs leading-relaxed"
                    style={{
                      background: `${r.color}0d`,
                      border: `1px solid ${r.color}22`,
                      borderRadius: 8,
                      padding: "10px 12px",
                      color: "#64748b",
                    }}
                  >
                    <span style={{ color: r.color }}>▸ </span>
                    {r.insight}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Rationale ── */}
      <section style={{ padding: "60px 0 100px" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel number="04" title="design_rationale" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎨",
                title: "Visual Hierarchy",
                color: "#00d4ff",
                body: "Each training stage uses a unique color to create visual continuity between the pipeline strip, step cards, and the detail panel — so the eye naturally tracks left-to-right flow.",
              },
              {
                icon: "📊",
                title: "Data Integrity",
                color: "#a855f7",
                body: "All resource figures cite publicly available research papers, model cards, and third-party analyses. Estimates are clearly labeled to avoid misleading audiences unfamiliar with the domain.",
              },
              {
                icon: "♿",
                title: "Accessibility",
                color: "#4ade80",
                body: "Color is never used as the sole differentiator — icons, labels, and text accompany every visual element. High-contrast ratios (>4.5:1) are maintained throughout.",
              },
              {
                icon: "🖱️",
                title: "Interactivity",
                color: "#febc2e",
                body: "Click-to-expand cards reduce cognitive load by progressive disclosure. Users can explore any single stage or model in depth without being overwhelmed by simultaneous information.",
              },
              {
                icon: "📐",
                title: "Consistency",
                color: "#ff79c6",
                body: "This artifact shares the same dark-terminal aesthetic, font mono system, and motion timing as Artifacts 1 & 2 — demonstrating a coherent design system across the portfolio.",
              },
              {
                icon: "🔬",
                title: "Audience Range",
                color: "#fb923c",
                body: "Pipeline labels are plain English; technical details are surfaced only on interaction. This supports both a general public audience and a technical reviewer without compromising either experience.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid #1a1a1a",
                  borderRadius: 14,
                  padding: 22,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ fontSize: 18 }}>{card.icon}</span>
                  <span className="font-mono font-bold text-sm" style={{ color: card.color }}>
                    {card.title}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#64748b" }}>
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid #0f0f0f",
          padding: "24px 0",
          textAlign: "center",
          color: "#1e293b",
          fontFamily: "monospace",
          fontSize: "0.75rem",
        }}
      >
        artifact_03 · LLM Training Infographic · Sai Kaushik Surampudi
      </div>
    </div>
  );
}
