import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname = window.location.pathname;
  const isHome = pathname === "/";
  const isArtifact = pathname === "/artifact";
  const isArtifact2 = pathname === "/artifact2";
  const isArtifact3 = pathname === "/artifact3";
  const navItems = [
    { label: "home", href: "/", active: isHome, color: "#00d4ff", index: "01." },
    { label: "artifact", href: "/artifact", active: isArtifact, color: "#a855f7", index: "02." },
    { label: "artifact 2", href: "/artifact2", active: isArtifact2, color: "#ff79c6", index: "03." },
    { label: "artifact 3", href: "/artifact3", active: isArtifact3, color: "#4ade80", index: "04." },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(5,5,5,0.92)" : "transparent",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href={isHome ? "#hero" : "/"}
          className="font-mono text-lg font-bold tracking-tight"
          style={{ color: "#00d4ff", textShadow: "0 0 20px rgba(0,212,255,0.6)" }}
        >
          {"<SK />"}
        </a>

        <div className="hidden md:flex items-center gap-7 text-sm font-mono">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative group"
              style={{
                color: item.active ? item.color : "#64748b",
                transition: "color 0.2s",
                textDecoration: "none",
                textShadow: item.active ? `0 0 12px ${item.color}55` : "none",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = item.color)}
              onMouseLeave={e => (e.currentTarget.style.color = item.active ? item.color : "#64748b")}
            >
              <span style={{ color: item.color, opacity: 0.5, marginRight: 2, fontSize: "0.7rem" }}>
                {item.index}
              </span>
              {item.label}
              <span
                style={{
                  position: "absolute", bottom: -2, left: 0,
                  height: 1, width: item.active ? "100%" : 0, background: item.color,
                  transition: "width 0.3s ease",
                }}
                className="group-hover:w-full"
              />
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden font-mono text-base font-bold"
          style={{ color: "#00d4ff" }}
        >
          {open ? "[x]" : "[=]"}
        </button>
      </div>

      {open && (
        <div style={{ background: "#080808", borderBottom: "1px solid #1a1a1a" }} className="md:hidden px-6 pb-5 pt-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-mono"
              style={{
                color: item.active ? item.color : "#64748b",
                borderBottom: "1px solid #111",
                textDecoration: "none",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = item.color)}
              onMouseLeave={e => (e.currentTarget.style.color = item.active ? item.color : "#64748b")}
            >
              <span style={{ color: item.color, opacity: 0.5, marginRight: 8, fontSize: "0.7rem" }}>
                {item.index}
              </span>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
