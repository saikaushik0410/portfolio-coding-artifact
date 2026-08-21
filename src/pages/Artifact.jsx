import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

/* ────────────────────────────────────────────────────────────
   PORTFOLIO ARTIFACT
   Multi-Modal AI Strategy Builder — From Vision to Implementation
   Source: "Multimodal AI Opportunity Assessment and Tool Evaluation"
   AIML 505: Large Language / Gen AI Models
   ──────────────────────────────────────────────────────────── */

const OPPORTUNITIES = [
  {
    id: "creative",
    icon: "🎨",
    color: "#00d4ff",
    title: "Creative Asset Generation & Testing",
    tag: "Generation",
    short:
      "Generate and A/B test many variations of headlines, social graphics, short video clips and CTAs from a single brief.",
    detail:
      "Using multimodal AI it becomes possible to generate many variations of headlines, graphics for social networks, short video clips, and calls to action based on campaign briefs, product images, and information about previous ad performance.",
  },
  {
    id: "voc",
    icon: "🎧",
    color: "#00ff87",
    title: "Voice of the Customer Intelligence",
    tag: "Insight",
    short:
      "Combine support calls, interviews, webinars, user videos and text reviews into one signal — robust even when a modality is missing.",
    detail:
      "Marketing needs to analyze feedback from support-line calls, interviews, webinars, user-generated videos and text reviews. These signals don't always go hand in hand — multimodal AI combines different inputs and stays relevant even when one type of input is unavailable.",
  },
  {
    id: "repurpose",
    icon: "♻️",
    color: "#a855f7",
    title: "Content Repurposing & Localization",
    tag: "Transform",
    short:
      "Turn one long video into a blog post, quotes, captions and audio snippets — transforming content across modalities.",
    detail:
      "A single video can be repurposed into a blog post, quotes, captions, audio snippets and more. Multimodal technology takes one kind of content and transforms it into other types — for example converting video or pictures into text, and localizing captions across markets.",
  },
  {
    id: "governance",
    icon: "🛡️",
    color: "#ff79c6",
    title: "Brand Governance & Compliance",
    tag: "Review",
    short:
      "Automatically check logos, disclaimers and message alignment across static images, video and their text — at publication scale.",
    detail:
      "Using multimodal AI, teams can check whether a logo, image, disclaimer or message alignment is correct across static images, videos and the associated text. This becomes very handy when marketing teams work on the massive publication of creative assets.",
  },
];

const TASKS = [
  "Sentiment analysis on reviews, call & feedback recordings",
  "Create campaign materials from product images, brand guidelines & prompts",
  "Cut long webinars & demos into short social snippets",
  "Analyze competitors by visual style, message tone & video strategy",
  "Personalize content from customer preferences in text, images & video",
];

const METRICS = [
  { label: "Production time", desc: "Brief → first draft asset set", color: "#00d4ff" },
  { label: "Content reuse rate", desc: "Ready-to-use assets per webinar / demo / interview", color: "#00ff87" },
  { label: "Engagement lift", desc: "CTR, watch time, conversion & qualified-lead rate", color: "#a855f7" },
  { label: "Personalization quality", desc: "Response to segmented campaigns", color: "#ff79c6" },
  { label: "Review efficiency", desc: "Reduced manual brand / compliance time", color: "#febc2e" },
  { label: "Model operations", desc: "Latency, cost per asset, failure rate, integration", color: "#00d4ff" },
];

const CRITERIA = [
  { icon: "⚡", label: "Effectiveness", desc: "Campaign generation, customer insight, personalization & media analysis." },
  { icon: "🧭", label: "Ease of Use", desc: "Usable by marketers and engineers — UI quality and workflow simplicity." },
  { icon: "🔌", label: "Integration", desc: "Cloud platforms, APIs, creative & content-management systems, enterprise software." },
  { icon: "💰", label: "Cost", desc: "Subscription vs pay-as-you-go, scaling costs and licensing complexity." },
  { icon: "⚖️", label: "Ethical Concerns", desc: "Privacy, consent, brand safety, governance and enterprise security." },
];

const TOOLS = [
  {
    id: "vertex",
    name: "Google Vertex AI / Gemini",
    color: "#00d4ff",
    badge: "Best Core Platform",
    recommended: true,
    overview:
      "Gemini is multimodal by nature and reasons across text, images, video, audio and code. Google's enterprise platform builds secure apps with data residency and technical support — great for campaign analysis, media analysis, workflow automation and content transformation.",
    strengths: [
      "Excellent multimodal coverage across text, images, audio, video & code workflows",
      "Ideal for custom marketing automation — summaries, clips, captions, campaigns from webinar videos",
      "Enterprise-level features including security and deployment options",
      "Perfect fit for teams with engineering capability operating API-first",
    ],
    weaknesses: [
      "More technical than design-centric tools — non-technical marketers need assistance",
      "Cloud setup, governance and workflow development required to reach full potential",
      "Usage costs can rise rapidly as content-generation volume grows",
    ],
    suitability:
      "The most suitable primary solution for a marketing team that needs both multimodal insight and production-level automation — especially with a Generative AI Engineer on the team.",
  },
  {
    id: "firefly",
    name: "Adobe Firefly Enterprise",
    color: "#ff79c6",
    badge: "Best Specialized",
    recommended: true,
    overview:
      "A generative AI solution tailored to creative and marketing teams needing mass generation of high-quality, brand-safe content. Highly applicable to campaigns where images must be generated and fast output is needed inside existing design processes.",
    strengths: [
      "Great fit for creative production and brand-safe marketing materials",
      "Easier for designers & marketers already using Adobe tools",
      "Applicable to campaign content scaling, image generation & creative experimentation",
      "Focused on enterprise use and business-oriented creative processes",
    ],
    weaknesses: [
      "Less flexible than a platform for building your own analytics & workflow orchestration",
      "Better for content creation than for customer audio, transcripts, ops data & workflow integration",
      "Benefits from other tools to handle marketing intelligence or backend automation",
    ],
    suitability:
      "A great specialized tool for content creation in marketing. It works best when the challenge is content scaling rather than multimodal applications.",
  },
  {
    id: "azure",
    name: "Azure OpenAI / AI Foundry",
    color: "#febc2e",
    badge: "Microsoft Ecosystem",
    recommended: false,
    overview:
      "Suited to businesses embedding AI into existing Microsoft infrastructure and corporate governance frameworks. Makes sense for marketing functions already running campaigns on Microsoft tooling.",
    strengths: [
      "Excellent fit for organizations already on Microsoft infrastructure",
      "Enterprise governance & controls ease adoption in regulated industries",
      "Great for internal copilots, marketing knowledge assistants & Microsoft-platform workflows",
    ],
    weaknesses: [
      "Fit is very dependent on current cloud & software commitments",
      "Not as natural as Vertex AI for Google Cloud or other ecosystems",
      "Cost estimation at scale is often tricky on enterprise AI platforms",
    ],
    suitability:
      "An excellent choice for marketing teams in Microsoft-based companies — scalable and pragmatic, but not the natural fit for a highly customizable, multimodal platform.",
  },
];

const PIPELINE = [
  { label: "User Input", detail: "Video / Image / Audio / Text", color: "#00d4ff" },
  { label: "Multi-Modal Embedding Model", detail: "Unifies every modality into shared vectors", color: "#00ff87" },
  { label: "Vector DB  +  Frontier Multi-Modal LLM", detail: "Retrieval (Pinecone / Milvus) meets reasoning", color: "#a855f7" },
  { label: "Downstream Generation", detail: "Text / Audio / Edited Video", color: "#ff79c6" },
];

const CHALLENGES = [
  {
    icon: "⏱️",
    title: "Inference Latency",
    desc: "Video & audio processing needs heavy compute — use frame-sampling (every 5th–10th frame) and audio-chunking to keep response times down.",
  },
  {
    icon: "🚧",
    title: "Brand Safety & Alignment",
    desc: "Generation introduces new hallucination vectors (e.g. a deformed logo). Enforce multimodal guardrails and classify generated media before it ships.",
  },
  {
    icon: "💾",
    title: "Cost Management",
    desc: "Tokenizing images & audio is far pricier than text. Smart caching of frequently used visual assets keeps API bills sustainable.",
  },
];

const ARTIFACT_INFO = [
  {
    key: "title",
    icon: "📌",
    color: "#00d4ff",
    label: "Title",
    q: "What is it?",
    body:
      "Multimodal AI Opportunity Assessment & Tool Evaluation — a strategy report and interactive infographic that plans how a marketing department, working alongside a Generative AI Engineer, should adopt multimodal AI.",
  },
  {
    key: "objective",
    icon: "🎯",
    color: "#00ff87",
    label: "Objective",
    q: "Why did I create it?",
    body:
      "To assess where multimodal AI creates real value in marketing, define measurable success metrics, and evaluate enterprise generative-AI platforms against clear criteria to reach a defensible tooling recommendation. Produced for AIML 505: Large Language / Gen AI Models.",
  },
  {
    key: "process",
    icon: "⚙️",
    color: "#a855f7",
    label: "Process",
    q: "How did I make it?",
    body:
      "I framed multimodal AI opportunities in marketing, brainstormed four high-value applications, defined business + operations KPIs, established six evaluation criteria, and benchmarked three enterprise platforms against them. I then designed a reference data pipeline, mapped the key engineering challenges, and synthesized a final verdict — drawing on vendor research from Google Cloud, IBM, Adobe and Microsoft.",
  },
  {
    key: "tools",
    icon: "🧰",
    color: "#febc2e",
    label: "Tools",
    q: "What did I use?",
    body:
      "Platforms evaluated: Google Vertex AI / Gemini, Adobe Firefly Enterprise, and Azure OpenAI / AI Foundry. Built as a live interactive artifact with React, Vite, Tailwind CSS and Framer Motion, deployed on Vercel.",
  },
  {
    key: "value",
    icon: "💎",
    color: "#ff79c6",
    label: "Value Proposition",
    q: "Why is it important?",
    body:
      "It demonstrates the ability to translate a business problem into an AI strategy: spotting multimodal opportunities, defining measurable outcomes, critically weighing enterprise platforms on effectiveness, cost and ethics, and communicating a clear recommendation. It reflects both technical competency in generative AI and the leadership to guide tooling decisions.",
  },
];

/* ── Small helpers ─────────────────────────────────── */
function pill(color) {
  return {
    border: `1px solid ${color}44`,
    background: `${color}12`,
    color,
    borderRadius: 999,
    padding: "5px 11px",
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "0.62rem",
    letterSpacing: 0.5,
  };
}

const mono = "JetBrains Mono, monospace";

function SectionLabel({ children }) {
  return (
    <div style={{ fontFamily: mono, color: "#334155", fontSize: "0.7rem", letterSpacing: 3, marginBottom: 20 }}>
      {children}
    </div>
  );
}

/* ── Opportunity card (expand on click) ────────────── */
function OpportunityCard({ item, open, onToggle }) {
  return (
    <motion.div
      layout
      onClick={onToggle}
      className="card-hover"
      style={{
        cursor: "pointer",
        background: "#0d0d0d",
        border: `1px solid ${item.color}33`,
        borderRadius: 16,
        padding: 22,
        boxShadow: `0 0 30px ${item.color}10`,
      }}
    >
      <motion.div layout="position" style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ fontSize: "1.7rem", lineHeight: 1 }}>{item.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <h3 style={{ fontFamily: mono, fontSize: "0.98rem", fontWeight: 700, color: item.color, margin: 0 }}>
              {item.title}
            </h3>
            <span style={pill(item.color)}>{item.tag}</span>
          </div>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: "0.85rem", margin: "10px 0 0" }}>{item.short}</p>
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                color: "#cbd5e1",
                lineHeight: 1.75,
                fontSize: "0.86rem",
                margin: "16px 0 0",
                paddingTop: 16,
                borderTop: `1px solid ${item.color}22`,
              }}
            >
              {item.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginTop: 14, fontFamily: mono, color: "#475569", fontSize: "0.62rem" }}>
        {open ? "click_to_collapse()" : "click_to_expand()"}
      </div>
    </motion.div>
  );
}

/* ── Tool card (tabbed) ────────────────────────────── */
function ToolCard({ tool, index }) {
  const [tab, setTab] = useState("strengths");
  const tabs = [
    { key: "strengths", label: "strengths", color: "#00ff87" },
    { key: "weaknesses", label: "weaknesses", color: "#ff6b6b" },
    { key: "suitability", label: "suitability", color: "#00d4ff" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card-hover"
      style={{
        background: "#0d0d0d",
        border: `1px solid ${tool.recommended ? tool.color + "55" : "#1a1a1a"}`,
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: tool.recommended ? `0 0 40px ${tool.color}12` : "none",
      }}
    >
      <div style={{ height: 3, background: `linear-gradient(90deg, ${tool.color}, transparent)` }} />
      <div style={{ padding: 22, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
          <span style={pill(tool.color)}>{tool.badge}</span>
          {tool.recommended && (
            <span style={{ ...pill("#00ff87"), display: "flex", alignItems: "center", gap: 4 }}>★ recommended</span>
          )}
        </div>
        <h3 style={{ fontFamily: mono, fontSize: "1.05rem", fontWeight: 700, color: tool.color, margin: "6px 0 10px" }}>
          {tool.name}
        </h3>
        <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: "0.83rem", margin: "0 0 18px", flex: 1 }}>
          {tool.overview}
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                flex: 1,
                borderRadius: 8,
                border: `1px solid ${tab === t.key ? t.color : "#1a1a1a"}`,
                background: tab === t.key ? `${t.color}14` : "#0a0a0a",
                color: tab === t.key ? t.color : "#64748b",
                padding: "7px 4px",
                fontFamily: mono,
                fontSize: "0.6rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ minHeight: 132 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {tab === "suitability" ? (
                <p style={{ color: "#cbd5e1", lineHeight: 1.7, fontSize: "0.82rem", margin: 0 }}>{tool.suitability}</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {(tab === "strengths" ? tool.strengths : tool.weaknesses).map((line) => (
                    <div key={line} style={{ display: "flex", gap: 8, fontSize: "0.8rem", color: "#cbd5e1", lineHeight: 1.55 }}>
                      <span style={{ color: tab === "strengths" ? "#00ff87" : "#ff6b6b" }}>
                        {tab === "strengths" ? "▸" : "▹"}
                      </span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function Artifact() {
  const [openId, setOpenId] = useState("creative");

  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "#f8fafc" }}>
      <Navbar />

      {/* ── HERO ──────────────────────────────────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "110px 2rem 48px", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: "0 auto auto 8%",
            width: 440,
            height: 440,
            background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 72%)",
            filter: "blur(70px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "40px 12% auto auto",
            width: 360,
            height: 360,
            background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 72%)",
            filter: "blur(70px)",
            pointerEvents: "none",
          }}
        />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div style={{ fontFamily: mono, color: "#334155", fontSize: "0.72rem", letterSpacing: 3, marginBottom: 14 }}>
            {"// PORTFOLIO ARTIFACT — MULTI-MODAL AI STRATEGY BUILDER"}
          </div>
          <h1 style={{ fontFamily: mono, fontSize: "clamp(2rem, 5vw, 3.7rem)", lineHeight: 1.1, margin: "0 0 14px" }}>
            Multi-Modal AI{" "}
            <span style={{ color: "#00d4ff", textShadow: "0 0 24px rgba(0,212,255,0.45)" }}>Strategy Builder</span>
          </h1>
          <div style={{ fontFamily: mono, fontSize: "0.78rem", color: "#00ff87", marginBottom: 16 }}>
            strategy.build(opportunities, criteria, tools, verdict)
          </div>
          <p style={{ maxWidth: 820, color: "#94a3b8", lineHeight: 1.8, fontSize: "1rem", margin: 0 }}>
            An opportunity assessment and tool evaluation for bringing multimodal AI — systems that reason across text,
            images, audio and video — into a marketing department working alongside a Generative AI Engineer. From vision
            and use cases through evaluation criteria to a production-ready tool verdict.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
            {["AIML 505 · Gen AI Models", "Marketing", "Multimodal", "Tool Evaluation"].map((t) => (
              <span key={t} style={pill("#64748b")}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── ARTIFACT INFORMATION ──────────────────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 2rem 20px" }}>
        <SectionLabel>{"// ARTIFACT INFORMATION — SHOWING THE WORK"}</SectionLabel>
        <div style={{ display: "grid", gap: 12 }}>
          {ARTIFACT_INFO.map((info, i) => (
            <motion.div
              key={info.key}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="card-hover"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 220px) 1fr",
                gap: 20,
                alignItems: "start",
                background: "#0d0d0d",
                border: `1px solid ${info.color}2e`,
                borderRadius: 14,
                padding: "20px 22px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: "1.5rem", lineHeight: 1 }}>{info.icon}</div>
                <div>
                  <div style={{ fontFamily: mono, fontSize: "0.98rem", fontWeight: 700, color: info.color }}>
                    {info.label}
                  </div>
                  <div style={{ fontFamily: mono, fontSize: "0.68rem", color: "#475569", marginTop: 3 }}>{info.q}</div>
                </div>
              </div>
              <p style={{ color: "#cbd5e1", lineHeight: 1.75, fontSize: "0.88rem", margin: 0 }}>{info.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STEP ONE: OPPORTUNITIES ───────────────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 2rem 20px" }}>
        <SectionLabel>{"// STEP ONE — MULTIMODAL AI OPPORTUNITIES IN MARKETING"}</SectionLabel>
        <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: "0.92rem", maxWidth: 820, margin: "0 0 26px" }}>
          A single campaign encompasses a creative brief, product images, ad videos, influencer clips, reviews and
          feedback — all of which multimodal AI can analyze at once. Four applications stand out where several media types
          and repetitive manual work collide. <span style={{ color: "#64748b" }}>Click a card to expand.</span>
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
          {OPPORTUNITIES.map((item) => (
            <OpportunityCard
              key={item.id}
              item={item}
              open={openId === item.id}
              onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
            />
          ))}
        </div>
      </section>

      {/* ── TASKS TICKER ──────────────────────────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "22px 2rem" }}>
        <div
          style={{
            border: "1px solid #1a1a1a",
            borderRadius: 14,
            background: "linear-gradient(180deg, #0b0b0b, #080808)",
            padding: "20px 22px",
          }}
        >
          <div style={{ fontFamily: mono, fontSize: "0.66rem", color: "#475569", letterSpacing: 2, marginBottom: 14 }}>
            {"// TASKS MULTIMODAL AI UNLOCKS"}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {TASKS.map((task, i) => (
              <div
                key={task}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1px solid #1a1a1a",
                  borderRadius: 10,
                  background: "#0d0d0d",
                  padding: "9px 13px",
                }}
              >
                <span style={{ fontFamily: mono, fontSize: "0.62rem", color: "#00d4ff" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{task}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUCCESS METRICS ───────────────────────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 2rem 20px" }}>
        <SectionLabel>{"// SUCCESS METRICS — BUSINESS + OPERATIONS KPIs"}</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16 }}>
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="card-hover"
              style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 14, padding: 18 }}
            >
              <div style={{ width: 26, height: 3, borderRadius: 2, background: m.color, marginBottom: 12 }} />
              <div style={{ fontFamily: mono, fontSize: "0.86rem", fontWeight: 700, color: m.color, marginBottom: 6 }}>
                {m.label}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", lineHeight: 1.6 }}>{m.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STEP TWO: EVALUATION CRITERIA ─────────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 2rem 20px" }}>
        <SectionLabel>{"// STEP TWO — TOOL EVALUATION CRITERIA"}</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16 }}>
          {CRITERIA.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="card-hover"
              style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 14, padding: 20 }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontFamily: mono, fontSize: "0.9rem", fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>
                {c.label}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", lineHeight: 1.6 }}>{c.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TOOL EVALUATION ───────────────────────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 2rem 20px" }}>
        <SectionLabel>{"// TOOL EVALUATION & COMPARISON"}</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </section>

      {/* ── ARCHITECTURE PIPELINE ─────────────────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 2rem 20px" }}>
        <SectionLabel>{"// TECHNICAL ARCHITECTURE — MULTIMODAL DATA PIPELINE"}</SectionLabel>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            alignItems: "stretch",
          }}
        >
          {PIPELINE.map((step, i) => (
            <React.Fragment key={step.label}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                style={{
                  position: "relative",
                  background: "#0d0d0d",
                  border: `1px solid ${step.color}33`,
                  borderRadius: 14,
                  padding: "18px 18px",
                  boxShadow: `0 0 26px ${step.color}0e`,
                }}
              >
                <div style={{ fontFamily: mono, fontSize: "0.62rem", color: step.color, marginBottom: 8 }}>
                  {"stage_" + String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontFamily: mono, fontSize: "0.84rem", fontWeight: 700, color: "#e2e8f0", marginBottom: 8, lineHeight: 1.35 }}>
                  {step.label}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.55 }}>{step.detail}</div>
              </motion.div>
            </React.Fragment>
          ))}
        </div>

        {/* Engineering challenges */}
        <div style={{ marginTop: 30 }}>
          <div style={{ fontFamily: mono, fontSize: "0.66rem", color: "#475569", letterSpacing: 2, marginBottom: 16 }}>
            {"// KEY ENGINEERING CHALLENGES TO TACKLE"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {CHALLENGES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 14, padding: 18 }}
              >
                <div style={{ fontSize: "1.4rem", marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontFamily: mono, fontSize: "0.85rem", fontWeight: 700, color: "#febc2e", marginBottom: 8 }}>
                  {c.title}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.65 }}>{c.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONCLUSION / VERDICT ──────────────────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 2rem 96px" }}>
        <SectionLabel>{"// CONCLUSION — THE VERDICT"}</SectionLabel>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, #0d0d0d 0%, #0a0a12 100%)",
            border: "1px solid #1a1a1a",
            borderRadius: 18,
            padding: "34px 30px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "auto -60px -80px auto",
              width: 300,
              height: 300,
              background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />
          <p style={{ color: "#cbd5e1", lineHeight: 1.85, fontSize: "0.95rem", margin: "0 0 22px", maxWidth: 860 }}>
            Multimodal AI can boost marketing efficiency through richer customer insight, faster workflows and scalable
            content creation. Working alongside a Generative AI Engineer, the highest-benefit applications are{" "}
            <span style={{ color: "#00d4ff" }}>creative asset production</span>,{" "}
            <span style={{ color: "#00ff87" }}>voice-of-the-customer analytics</span>,{" "}
            <span style={{ color: "#a855f7" }}>content repurposing</span> and{" "}
            <span style={{ color: "#ff79c6" }}>brand governance</span> — the areas demanding several content types and
            repeatable work.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            <div style={{ border: "1px solid #00d4ff44", background: "#00d4ff0d", borderRadius: 14, padding: 18 }}>
              <div style={{ fontFamily: mono, fontSize: "0.62rem", color: "#00d4ff", letterSpacing: 1, marginBottom: 8 }}>
                BEST CORE PLATFORM
              </div>
              <div style={{ fontFamily: mono, fontSize: "1rem", fontWeight: 700, color: "#e2e8f0" }}>
                Google Vertex AI / Gemini
              </div>
              <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: 8, lineHeight: 1.6 }}>
                Multimodal insight generation plus production-level automation, all under enterprise security.
              </div>
            </div>
            <div style={{ border: "1px solid #ff79c644", background: "#ff79c60d", borderRadius: 14, padding: 18 }}>
              <div style={{ fontFamily: mono, fontSize: "0.62rem", color: "#ff79c6", letterSpacing: 1, marginBottom: 8 }}>
                BEST SPECIALIZED
              </div>
              <div style={{ fontFamily: mono, fontSize: "1rem", fontWeight: 700, color: "#e2e8f0" }}>
                Adobe Firefly Enterprise
              </div>
              <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: 8, lineHeight: 1.6 }}>
                Brand-safe, high-volume creative generation slotted into existing design processes.
              </div>
            </div>
          </div>
          <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: "0.88rem", margin: "22px 0 0", maxWidth: 860 }}>
            Used together, the two let the department increase efficiency, consistency, personalization and performance
            measurement across campaigns — while retaining corporate control over security and ethics.
          </p>
        </motion.div>

        <div style={{ marginTop: 34, textAlign: "center", fontFamily: mono, fontSize: "0.66rem", color: "#334155" }}>
          Sai Kaushik Surampudi · AIML 505: Large Language / Gen AI Models · July 2026
        </div>
      </section>
    </div>
  );
}
