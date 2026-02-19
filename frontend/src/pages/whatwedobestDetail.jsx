import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Brain, Cpu, Workflow, Cloud, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI & Intelligent Automation",
    slug: "ai-intelligent-automation",
    accent: "#818cf8",
    glow: "rgba(129,140,248,0.5)",
    longDescription:
      "Our AI and intelligent automation solutions help organizations automate workflows, improve decision-making, and unlock operational efficiency. We combine artificial intelligence and machine learning to build systems that learn, adapt, and scale with business needs.",
    features: [
      "Machine learning & predictive analytics",
      "AI-driven workflow automation",
      "Computer vision & NLP solutions",
      "Decision intelligence systems",
    ],
  },
  {
    icon: Cpu,
    title: "Custom Software Development",
    slug: "custom-software-development",
    accent: "#38bdf8",
    glow: "rgba(56,189,248,0.5)",
    longDescription:
      "We design and develop scalable custom software tailored to business requirements. Our engineering approach focuses on performance, scalability, and long-term maintainability using modern technologies and best practices.",
    features: [
      "Web & mobile application development",
      "Enterprise software solutions",
      "API & system integrations",
      "Modern UI/UX engineering",
    ],
  },
  {
    icon: Workflow,
    title: "Process Optimization",
    slug: "process-optimization",
    accent: "#34d399",
    glow: "rgba(52,211,153,0.5)",
    longDescription:
      "We help businesses optimize operations by identifying inefficiencies and implementing intelligent systems that streamline workflows and improve productivity.",
    features: [
      "Workflow automation",
      "Business process analysis",
      "Operational efficiency improvements",
      "Data-driven optimization",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Scalable Solutions",
    slug: "cloud-scalable-solutions",
    accent: "#fb923c",
    glow: "rgba(251,146,60,0.5)",
    longDescription:
      "Our cloud solutions provide secure, scalable infrastructure designed for modern applications. We help organizations migrate, optimize, and scale systems while ensuring reliability and performance.",
    features: [
      "Cloud architecture design",
      "Migration & deployment",
      "DevOps & CI/CD pipelines",
      "Scalable infrastructure",
    ],
  },
];

/* ─── Hook ─── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setV(true), delay); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0 }) {
  const [ref, v] = useReveal(delay);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(22px)", transition: "opacity 0.65s ease, transform 0.65s ease" }}>
      {children}
    </div>
  );
}

function FeatureCard({ text, accent, index }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={index * 80}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex", alignItems: "center", gap: 14,
          background: hov ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${hov ? `${accent}45` : "rgba(255,255,255,0.07)"}`,
          borderRadius: 14,
          padding: "20px 22px",
          transform: hov ? "translateY(-3px)" : "none",
          boxShadow: hov ? `0 10px 30px rgba(0,0,0,0.3), 0 0 0 0.5px ${accent}20` : "none",
          transition: "all 0.3s ease",
          cursor: "default",
        }}
      >
        <CheckCircle size={18} color={accent} strokeWidth={2} style={{ flexShrink: 0 }} />
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", fontFamily: "'Oxanium',sans-serif" }}>
          {text}
        </p>
      </div>
    </Reveal>
  );
}

const WhatWeDoBestDetail = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  const [mounted, setMounted] = useState(false);
  const [iconHov, setIconHov] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const css = `
    @import url("https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;500;600;700;800&display=swap");

    .wwbd-root *, .wwbd-root *::before, .wwbd-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .wwbd-root {
      font-family: 'Oxanium', sans-serif;
      background: #05050f;
      color: #fff;
      min-height: 100vh;
    }

    .wwbd-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent);
      pointer-events: none;
    }

    .wwbd-label {
      font-size: 0.65rem; font-weight: 700;
      letter-spacing: 0.32em; text-transform: uppercase;
      display: block; margin-bottom: 10px;
    }

    .wwbd-back {
      display: inline-flex; align-items: center; gap: 7px;
      color: rgba(255,255,255,0.35);
      font-size: 0.78rem; font-weight: 600;
      letter-spacing: 0.06em; text-transform: uppercase;
      text-decoration: none;
      transition: color 0.25s, gap 0.25s;
    }
    .wwbd-back:hover { color: rgba(255,255,255,0.7); gap: 10px; }

    .wwbd-cta-btn {
      display: inline-flex; align-items: center; gap: 10px;
      background: linear-gradient(135deg, var(--accent-color), #c084fc);
      color: #fff; text-decoration: none;
      font-family: 'Oxanium', sans-serif; font-weight: 700; font-size: 0.85rem;
      letter-spacing: 0.06em; text-transform: uppercase;
      padding: 13px 30px; border-radius: 50px;
      box-shadow: 0 4px 20px var(--accent-glow);
      transition: all 0.3s;
    }
    .wwbd-cta-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 32px var(--accent-glow);
    }

    @keyframes icon-pulse {
      0%, 100% { transform: scale(1); opacity: 0.4; }
      50%       { transform: scale(1.3); opacity: 0; }
    }
    .wwbd-icon-pulse {
      position: absolute; inset: -8px;
      border-radius: 20px;
      border: 1.5px solid var(--accent-color);
      animation: icon-pulse 2.4s ease-in-out infinite;
    }

    .wwbd-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
    }
  `;

  if (!service) return (
    <div style={{ background: "#05050f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{css}</style>
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Oxanium',sans-serif", marginBottom: 16 }}>Service not found</p>
        <Link to="/whatwedobest" style={{ color: "#818cf8", fontFamily: "'Oxanium',sans-serif", fontSize: "0.85rem" }}>← Back to Services</Link>
      </div>
    </div>
  );

  const Icon = service.icon;

  return (
    <div className="wwbd-root" style={{ "--accent-color": service.accent, "--accent-glow": service.glow }}>
      <style>{css}</style>

      {/* ════ HERO ════ */}
      <section style={{ position: "relative", padding: "120px 24px 80px", overflow: "hidden" }}>
        <div className="wwbd-grid" />

        {/* Orb */}
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 500, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${service.glow.replace("0.5", "0.12")} 0%, transparent 70%)`, filter: "blur(50px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Back link */}
          <div style={{ marginBottom: 40, opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease" }}>
            <Link to="/whatwedobest" className="wwbd-back">
              <ArrowLeft size={13} /> Back to Services
            </Link>
          </div>

          {/* Icon + title */}
          <div style={{
            display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", marginBottom: 28,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
            transition: "all 0.8s ease 0.1s",
          }}>
            {/* Glowing icon */}
            <div
              onMouseEnter={() => setIconHov(true)}
              onMouseLeave={() => setIconHov(false)}
              style={{ position: "relative", width: 72, height: 72, flexShrink: 0, cursor: "default" }}
            >
              {iconHov && <div className="wwbd-icon-pulse" />}
              <div style={{
                position: "absolute", inset: 0,
                borderRadius: 18,
                background: `${service.accent}12`,
                border: `1px solid ${iconHov ? service.accent : `${service.accent}35`}`,
                boxShadow: iconHov ? `0 0 0 1px ${service.accent}, 0 0 30px ${service.glow}, 0 0 80px ${service.glow}` : `0 0 20px ${service.glow.replace("0.5","0.2")}`,
                transition: "all 0.4s ease",
              }} />
              <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={30} color={service.accent} strokeWidth={1.5} />
              </div>
            </div>

            <div>
              <span className="wwbd-label" style={{ color: service.accent }}>Service Detail</span>
              <h1 style={{
                fontFamily: "'Oxanium',sans-serif", fontWeight: 800,
                fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                letterSpacing: "-0.02em", lineHeight: 1.05, color: "#fff",
              }}>
                {service.title}
              </h1>
            </div>
          </div>

          {/* Description */}
          <div style={{
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(14px)",
            transition: "all 0.85s ease 0.22s",
          }}>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", lineHeight: 1.9, maxWidth: 660 }}>
              {service.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ════ FEATURES ════ */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 36 }}>
              <span className="wwbd-label" style={{ color: service.accent }}>What's Included</span>
              <h2 style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", color: "#fff", letterSpacing: "-0.01em" }}>
                Key Capabilities
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 14 }}>
            {service.features.map((feat, i) => (
              <FeatureCard key={i} text={feat} accent={service.accent} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════ DIVIDER ════ */}
      <div style={{ padding: "0 24px", marginBottom: 72 }}>
        <div className="wwbd-divider" style={{ maxWidth: 1000, margin: "0 auto" }} />
      </div>

      {/* ════ OTHER SERVICES ════ */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 28 }}>
              <span className="wwbd-label" style={{ color: service.accent }}>Explore More</span>
              <h2 style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#fff", letterSpacing: "-0.01em" }}>
                Other Services
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {services.filter((s) => s.slug !== service.slug).map((s, i) => {
              const SIcon = s.icon;
              return (
                <Reveal key={i} delay={i * 70}>
                  <Link to={`/whatwedobest/${s.slug}`} style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 50,
                    padding: "9px 18px",
                    textDecoration: "none",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.82rem",
                    fontFamily: "'Oxanium',sans-serif",
                    fontWeight: 600,
                    transition: "all 0.25s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.accent}50`; e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                  >
                    <SIcon size={14} color={s.accent} strokeWidth={1.8} />
                    {s.title}
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${service.accent}25`,
              borderRadius: 20,
              padding: "52px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* bg glow */}
              <div style={{ position: "absolute", bottom: -60, left: "50%", transform: "translateX(-50%)", width: 400, height: 200, background: `radial-gradient(ellipse, ${service.glow.replace("0.5","0.12")} 0%, transparent 70%)`, pointerEvents: "none" }} />

              <span className="wwbd-label" style={{ color: service.accent }}>Get Started</span>
              <h3 style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", color: "#fff", letterSpacing: "-0.01em", marginBottom: 14 }}>
                Interested in {service.title}?
              </h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.93rem", lineHeight: 1.8, marginBottom: 36, maxWidth: 460, margin: "0 auto 36px" }}>
                Let Attractify Technologies help you build scalable, intelligent solutions tailored to your business.
              </p>
              <Link to="/contact" className="wwbd-cta-btn">
                Contact Us <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default WhatWeDoBestDetail;