import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Brain,
  Cpu,
  Workflow,
  Cloud,
  ArrowRight,
  Target,
  Layers,
  Rocket,
} from "lucide-react";

/* ─── Data ─── */
const services = [
  {
    icon: Brain,
    title: "AI & Intelligent Automation",
    slug: "ai-intelligent-automation",
    accent: "#7c3aed",
    glow: "rgba(124,58,237,0.5)",
    description:
      "AI-powered solutions that automate workflows, improve decision-making, and unlock smarter business operations.",
    stat: "3× faster operations",
  },
  {
    icon: Cpu,
    title: "Custom Software Development",
    slug: "custom-software-development",
    accent: "#0ea5e9",
    glow: "rgba(14,165,233,0.5)",
    description:
      "Scalable web and mobile applications engineered with modern technologies for performance and growth.",
    stat: "99.9% uptime SLA",
  },
  {
    icon: Workflow,
    title: "Process Optimization",
    slug: "process-optimization",
    accent: "#10b981",
    glow: "rgba(16,185,129,0.5)",
    description:
      "Streamline business processes with intelligent systems designed to improve efficiency.",
    stat: "40% cost reduction",
  },
  {
    icon: Cloud,
    title: "Cloud & Scalable Solutions",
    slug: "cloud-scalable-solutions",
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.5)",
    description:
      "Secure cloud architectures built to support growing businesses and future innovation.",
    stat: "Infinite scale",
  },
];

const approach = [
  {
    icon: Target,
    step: "01",
    title: "Understand the Problem",
    desc: "We analyze business challenges and identify opportunities where technology creates real, measurable impact.",
  },
  {
    icon: Layers,
    step: "02",
    title: "Design Intelligent Systems",
    desc: "Architecting scalable and efficient solutions aligned with long-term business goals and future growth.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Build & Scale",
    desc: "Delivering reliable systems that evolve as your business grows — from MVP to enterprise scale.",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Coverage" },
];

/* ─── Hooks ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useCountUp(target, visible, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const num = parseInt(target.replace(/\D/g, "")) || 0;
    const suffix = target.replace(/[0-9]/g, "");
    if (!num) {
      setVal(target);
      return;
    }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(ease * num) + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible]);
  return val;
}

/* ─── Sub-components ─── */
function RevealCard({ children, delay = 0, style = {}, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function StatCard({ value, label, delay }) {
  const [ref, visible] = useReveal();
  const displayed = useCountUp(value, visible);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(24px) scale(0.95)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "28px 20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: "2.4rem",
          fontWeight: 800,
          color: "#fff",
          lineHeight: 1,
        }}
      >
        {displayed || value}
      </div>
      <div
        style={{
          color: "rgba(255,255,255,0.45)",
          fontSize: "0.82rem",
          marginTop: 8,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;
  return (
    <RevealCard delay={index * 100}>
      <Link
        to={`/whatwedobest/${service.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          background: hovered
            ? `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`
            : "rgba(255,255,255,0.02)",
          border: `1px solid ${hovered ? service.accent : "rgba(255,255,255,0.07)"}`,
          borderRadius: 20,
          padding: "32px 28px",
          textDecoration: "none",
          position: "relative",
          overflow: "hidden",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${service.glow}`
            : "none",
          transition: "all 0.35s cubic-bezier(.34,1.2,.64,1)",
        }}
      >
        {/* Glow bg blob */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: service.glow,
            filter: "blur(50px)",
            opacity: hovered ? 0.5 : 0.15,
            transition: "opacity 0.4s",
            pointerEvents: "none",
          }}
        />

        {/* Icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: `${service.accent}18`,
            border: `1px solid ${service.accent}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
            boxShadow: hovered ? `0 0 20px ${service.glow}` : "none",
            transition: "box-shadow 0.4s",
          }}
        >
          <Icon color={service.accent} size={26} strokeWidth={1.5} />
        </div>

        {/* Stat badge */}
        <div
          style={{
            display: "inline-block",
            background: `${service.accent}20`,
            border: `1px solid ${service.accent}40`,
            borderRadius: 50,
            padding: "3px 12px",
            fontSize: "0.72rem",
            color: service.accent,
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            letterSpacing: "0.06em",
            marginBottom: 14,
          }}
        >
          {service.stat}
        </div>

        <h3
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#fff",
            marginBottom: 10,
            lineHeight: 1.3,
          }}
        >
          {service.title}
        </h3>

        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.88rem",
            lineHeight: 1.7,
            marginBottom: 20,
          }}
        >
          {service.description}
        </p>

        {/* Arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: service.accent,
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: "0.8rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            transform: hovered ? "translateX(6px)" : "translateX(0)",
            transition: "transform 0.3s",
            marginTop: "auto",
          }}
        >
          Learn more <ArrowRight size={14} />
        </div>
      </Link>
    </RevealCard>
  );
}

/* ─── Main Component ─── */
const WhatWeDoBest = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => setMounted(true), 60);
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const css = `
@import url("https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap");

    .wwdb-root * { box-sizing: border-box; margin: 0; padding: 0; }
    .wwdb-root {
      font-family: 'DM Sans', sans-serif;
      background: #04040e;
      color: #fff;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* ── cursor follower ── */
    .wwdb-cursor {
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      width: 320px; height: 320px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: left 0.12s ease, top 0.12s ease;
    }

    /* ── hero grid bg ── */
    .wwdb-grid-bg {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
    }

    /* ── approach card ── */
    .wwdb-approach-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px;
      padding: 36px 28px;
      position: relative;
      overflow: hidden;
      transition: all 0.35s ease;
      cursor: default;
    }
    .wwdb-approach-card:hover {
      background: rgba(255,255,255,0.05);
      border-color: rgba(255,255,255,0.15);
      transform: translateY(-6px);
    }
    .wwdb-approach-card .step-num {
      font-family: 'Oxanium', sans-serif;
      font-size: 4rem;
      font-weight: 800;
      color: rgba(255,255,255,0.04);
      line-height: 1;
      position: absolute;
      top: 16px; right: 20px;
      letter-spacing: -0.04em;
      user-select: none;
    }
    .wwdb-approach-card:hover .step-num { color: rgba(255,255,255,0.07); }

    /* ── CTA button ── */
    .wwdb-cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: linear-gradient(135deg, #7c3aed, #0ea5e9);
      color: #fff;
      font-family: 'Oxanium', sans-serif;
      font-weight: 700;
      font-size: 0.95rem;
      letter-spacing: 0.04em;
      padding: 15px 36px;
      border-radius: 50px;
      text-decoration: none;
      position: relative;
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
      box-shadow: 0 4px 24px rgba(124,58,237,0.4);
    }
    .wwdb-cta-btn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
      transform: translateX(-100%);
      transition: transform 0.55s;
    }
    .wwdb-cta-btn:hover::before { transform: translateX(100%); }
    .wwdb-cta-btn:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(124,58,237,0.5), 0 0 0 1px rgba(255,255,255,0.1);
    }

    /* ── label ── */
    .wwdb-label {
      font-family: 'Oxanium', sans-serif;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #7c3aed;
      margin-bottom: 12px;
      display: block;
    }

    /* ── section title ── */
    .wwdb-section-title {
      font-family: 'Oxanium', sans-serif;
      font-size: clamp(1.8rem, 3vw, 2.6rem);
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    /* ── divider ── */
    .wwdb-divider {
      width: 1px;
      background: rgba(255,255,255,0.08);
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50%       { transform: translateY(-18px) rotate(3deg); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes marquee {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .wwdb-marquee-track {
      display: flex;
      width: max-content;
      animation: marquee 22s linear infinite;
    }
    .wwdb-marquee-track:hover { animation-play-state: paused; }
  `;

  return (
    <div className="wwdb-root">
      <style>{css}</style>

      {/* Cursor follower */}
      <div
        className="wwdb-cursor"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* ════ HERO ════ */}
      <section
        style={{
          position: "relative",
          padding: "140px 24px 100px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div className="wwdb-grid-bg" />

        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: "10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "float 7s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -80,
            right: "8%",
            width: 380,
            height: 380,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(14,165,233,0.14) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "float 9s ease-in-out infinite 2s",
            pointerEvents: "none",
          }}
        />

        {/* Rotating ring decoration */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 680,
            height: 680,
            borderRadius: "50%",
            border: "1px dashed rgba(255,255,255,0.04)",
            animation: "spin-slow 40s linear infinite",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: 50,
              padding: "6px 18px",
              marginBottom: 36,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(-16px)",
              transition: "all 0.7s ease",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#7c3aed",
                boxShadow: "0 0 8px #7c3aed",
              }}
            />
            <span
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#a78bfa",
              }}
            >
              Attractify Technologies
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Oxanium', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.0,
              marginBottom: 28,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease 0.1s",
            }}
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.5))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Intelligent Solutions
            </span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #7c3aed, #0ea5e9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              That Drive Growth
            </span>
          </h1>

          {/* Sub */}
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              maxWidth: 580,
              margin: "0 auto 48px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.25s",
            }}
          >
            We design and build intelligent digital solutions that help
            organizations automate operations, scale efficiently, and innovate
            with confidence.
          </p>

          {/*  */}
        </div>
      </section>

      {/* ════ MARQUEE ════ */}
      {/* <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "14px 0", overflow: "hidden", marginBottom: 0 }}>
        <div className="wwdb-marquee-track">
          {[...Array(2)].map((_, ri) =>
            ["AI Automation", "Cloud Architecture", "Machine Learning", "IoT Solutions", "AR/VR", "Process Optimization", "Smart Systems", "DevOps", "Data Analytics"].map((t, i) => (
              <span key={`${ri}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: 20, padding: "0 28px", color: "rgba(255,255,255,0.25)", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                {t} <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(124,58,237,0.6)", display: "inline-block", flexShrink: 0 }} />
              </span>
            ))
          )}
        </div>
      </div> */}

      {/* ════ STATS ════ */}
      {/* <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {stats.map((s, i) => <StatCard key={i} {...s} delay={i * 100} />)}
          </div>
        </div>
      </section> */}

      {/* ════ INTRO ════ */}
      <section style={{ padding: "0 24px 80px" }}>
        <RevealCard>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <span className="wwdb-label">Our Mission</span>
            <h2 className="wwdb-section-title" style={{ marginBottom: 20 }}>
              Building Technology That Solves Real Problems
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.9,
                fontSize: "1rem",
              }}
            >
              At Attractify Technologies, we focus on creating meaningful
              solutions rather than just software. Our expertise spans
              artificial intelligence, cloud engineering, and intelligent
              automation, enabling businesses to operate faster, smarter, and
              more efficiently.
            </p>
          </div>
        </RevealCard>
      </section>

      {/* ════ MARQUEE ════ */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "14px 0",
          overflow: "hidden",
          margin: "40px 0 20px",
        }}
      >
        <div className="wwdb-marquee-track">
          {[...Array(2)].map((_, ri) =>
            [
              "AI Automation",
              "Cloud Architecture",
              "Machine Learning",
              "IoT Solutions",
              "AR/VR",
              "Process Optimization",
              "Smart Systems",
              "DevOps",
              "Data Analytics",
            ].map((t, i) => (
              <span
                key={`${ri}-${i}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "0 28px",
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {t}
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "rgba(124,58,237,0.6)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
              </span>
            )),
          )}
        </div>
      </div>

      {/* ════ SERVICES GRID ════ */}
      <section id="services" style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <RevealCard style={{ marginBottom: 56, textAlign: "center" }}>
            <span className="wwdb-label">What We Do</span>
            <h2 className="wwdb-section-title">Our Core Services</h2>
          </RevealCard>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
              alignItems: "stretch",
            }}
          >
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════ HOW WE DELIVER ════ */}
      <section
        style={{
          padding: "80px 24px",
          background: "rgba(255,255,255,0.01)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          height: "fit-content",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <RevealCard style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="wwdb-label">Our Process</span>
            <h2 className="wwdb-section-title">How We Deliver Value</h2>
          </RevealCard>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              alignItems: "stretch",
            }}
          >
            {approach.map((item, i) => {
              const Icon = item.icon;
              return (
                <RevealCard key={i} delay={i * 120}>
                  <div
                    className="wwdb-approach-card"
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span className="step-num">{item.step}</span>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        background: "rgba(124,58,237,0.12)",
                        border: "1px solid rgba(124,58,237,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 20,
                      }}
                    >
                      <Icon color="#a78bfa" size={24} strokeWidth={1.5} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: "#fff",
                        marginBottom: 10,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.45)",
                        fontSize: "0.88rem",
                        lineHeight: 1.75,
                      }}
                    >
                      {item.desc}
                    </p>
                    {/* connector line for non-last cards */}
                    {i < approach.length - 1 && (
                      <div
                        style={{
                          position: "absolute",
                          top: 62,
                          right: -12,
                          width: 24,
                          height: 1,
                          background:
                            "linear-gradient(90deg, rgba(124,58,237,0.4), transparent)",
                          display: "none", // show via media query if needed
                        }}
                      />
                    )}
                  </div>
                </RevealCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section
        style={{
          padding: "120px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* bg glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(124,58,237,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <RevealCard style={{ position: "relative", zIndex: 1 }}>
          <span className="wwdb-label">Get Started</span>
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              letterSpacing: "-0.03em",
              color: "#fff",
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            Let's Build Something
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #7c3aed, #0ea5e9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Intelligent Together
            </span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "1rem",
              marginBottom: 44,
              maxWidth: 440,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Partner with Attractify Technologies to transform ideas into
            scalable, intelligent solutions.
          </p>
          <Link to="/contact" className="wwdb-cta-btn">
            Start a Project <ArrowRight size={16} />
          </Link>
        </RevealCard>
      </section>
    </div>
  );
};

export default WhatWeDoBest;
