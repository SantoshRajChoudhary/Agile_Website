import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Factory,
  Cpu,
  Globe,
  ArrowRight,
  Target,
  Layers,
  Rocket,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

import img1 from "@/assets/Build-ALML-Based-Custom-Trading-Platform.webp";
import img2 from "@/assets/illustration-generative-ai-homepage.webp";
import img3 from "@/assets/futuristic-digital-dashboard-illustrating-iot-internet-things-technology-central-smartphone-icon-surrounded-circular-392171365.webp";
import img4 from "@/assets/architecture-blueprint.webp";

/* ─── Data ─── */
const industries = [
  {
    icon: Factory,
    title: "Manufacturing & Industrial",
    accent: "#818cf8",
    description:
      "Predictive maintenance, AI inspection, and automation solutions improving efficiency and operational safety.",
    image: img1,
  },
  {
    icon: Cpu,
    title: "AI & Digital Startups",
    accent: "#c084fc",
    description:
      "Helping startups build scalable AI platforms and intelligent products ready for rapid growth.",
    image: img2,
  },
  {
    icon: Globe,
    title: "Smart Cities & IoT",
    accent: "#34d399",
    description:
      "Connected infrastructure solutions enabling real-time monitoring and intelligent decision-making.",
    image: img3,
  },
];

const journey = [
  {
    icon: Target,
    step: "01",
    title: "Understand the Challenge",
    desc: "We analyze business problems and identify technology opportunities.",
  },
  {
    icon: Layers,
    step: "02",
    title: "Design the Solution",
    desc: "Architecture and strategy aligned with long-term scalability.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Build & Deploy",
    desc: "Engineering intelligent systems ready for real-world usage.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Scale & Optimize",
    desc: "Continuous improvements for performance and growth.",
  },
];

const impacts = [
  "Faster decision-making through AI insights",
  "Improved operational efficiency",
  "Scalable cloud-native architecture",
  "Secure and reliable enterprise systems",
];

/* ─── Hook ─── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setV(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, y = 24 }) {
  const [ref, v] = useReveal(delay);
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : `translateY(${y}px)`,
        transition: "opacity 0.65s ease, transform 0.65s ease",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Industry Card ─── */
function IndustryCard({ industry, index }) {
  const [hov, setHov] = useState(false);
  const Icon = industry.icon;
  return (
    <Reveal delay={index * 100}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: "rgba(0,0,0,0.02)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${hov ? `${industry.accent}45` : "rgba(0,0,0,0.07)"}`,
          borderRadius: 18,
          overflow: "hidden",
          transform: hov ? "translateY(-6px)" : "none",
          boxShadow: hov
            ? `0 20px 50px rgba(0,0,0,0.4), 0 0 0 0.5px ${industry.accent}25`
            : "none",
          transition: "all 0.35s cubic-bezier(.25,.8,.25,1)",
        }}
      >
        {/* Image */}
        <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
          <img
            src={industry.image}
            alt={industry.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hov ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.6s ease",
            }}
          />
          {/* Overlay gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to top, rgba(5,5,16,0.85) 0%, rgba(5,5,16,0.1) 60%)`,
            }}
          />
          {/* Icon badge */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 20,
              width: 40,
              height: 40,
              borderRadius: 10,
              background: `${industry.accent}20`,
              border: `1px solid ${industry.accent}50`,
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={18} color={industry.accent} strokeWidth={1.6} />
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "22px 24px 26px" }}>
          <h3
            style={{
              fontFamily: "'Oxanium', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#0f172a",
              marginBottom: 10,
              letterSpacing: "0.01em",
            }}
          >
            {industry.title}
          </h3>
          <p
            style={{
              color: "#64748b",
              fontSize: "0.85rem",
              lineHeight: 1.75,
            }}
          >
            {industry.description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Main ─── */
const Products = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 60);
  }, []);

  return (
    <div className="prd-root">

      {/* ════ HERO ════ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh", // full screen height
          display: "flex",
          alignItems: "center", // vertical center
          justifyContent: "center", // horizontal center (optional)
          padding: "0 24px",
          overflow: "hidden",
        }}
      >
        <div className="prd-grid" />

        {/* Orbs */}
        <div
          className="prd-orb"
          style={{
            position: "absolute",
            top: -100,
            left: "12%",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(129,140,248,0.14) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -60,
            right: "14%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
            animation: "float-slow 12s ease-in-out infinite 3s",
          }}
        />

        <div
          style={{
            width: "95%", maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "100%", maxWidth: "680px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(24px)",
              transition: "all 0.85s ease",
            }}
          >
            <span className="prd-label">Industries We Serve</span>

            <h1
              style={{
                fontFamily: "'Oxanium', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                color: "#0f172a",
                marginBottom: 24,
              }}
            >
              Empowering Industries Through{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Intelligent Technology
              </span>
            </h1>

            <p
              style={{
                color: "#64748b",
                fontSize: "1rem",
                lineHeight: 1.85,
                width: "100%", maxWidth: "520px",
              }}
            >
              We partner with organizations that aim to innovate, automate, and
              scale using artificial intelligence, IoT, and modern digital
              engineering practices.
            </p>
          </div>
        </div>
      </section>

      {/* ════ INDUSTRIES ════ */}
      <section style={{ padding: "0 24px 90px" }}>
        <div style={{ width: "95%", maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 48 }}>
              <span className="prd-label">Who We Work With</span>
              <h2 className="prd-section-title">Industries We Work With</h2>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
              alignItems: "stretch",
            }}
          >
            {industries.map((ind, i) => (
              <IndustryCard key={i} industry={ind} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════ DIVIDER ════ */}
      <div style={{ padding: "0 24px", marginBottom: 80 }}>
        <div className="prd-divider" style={{ width: "95%", maxWidth: "1100px" }} />
      </div>

      {/* ════ CLIENT JOURNEY ════ */}
      <section style={{ padding: "0 24px 90px" }}>
        <div style={{ width: "95%", maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 48, textAlign: "center" }}>
              <span className="prd-label">How We Work</span>
              <h2 className="prd-section-title">Our Client Journey</h2>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
              gap: 16,
            }}
          >
            {journey.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={i} delay={i * 90}>
                  <div className="prd-journey-card">
                    <span className="prd-step-num">{step.step}</span>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 11,
                        background: "rgba(129,140,248,0.1)",
                        border: "1px solid rgba(129,140,248,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 18,
                      }}
                    >
                      <Icon size={19} color="#818cf8" strokeWidth={1.6} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Oxanium',sans-serif",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "#0f172a",
                        marginBottom: 8,
                        letterSpacing: "0.01em",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        color: "#64748b",
                        fontSize: "0.83rem",
                        lineHeight: 1.75,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ DIVIDER ════ */}
      <div style={{ padding: "0 24px", marginBottom: 80 }}>
        <div className="prd-divider" style={{ width: "95%", maxWidth: "1100px" }} />
      </div>

      {/* ════ IMPACT ════ */}
      <section style={{ padding: "0 24px 110px" }}>
        <div
          style={{
            width: "95%", maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* Left */}
          <Reveal>
            <div>
              <span className="prd-label">Why Choose Us</span>
              <h2 className="prd-section-title" style={{ marginBottom: 20 }}>
                Delivering{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #818cf8, #c084fc)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Measurable Impact
                </span>
              </h2>

              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.93rem",
                  lineHeight: 1.85,
                  marginBottom: 32,
                  width: "100%", maxWidth: "420px",
                }}
              >
                Our solutions are designed to create long-term value — reducing
                operational complexity, improving efficiency, and unlocking new
                growth opportunities.
              </p>

              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  marginBottom: 40,
                }}
              >
                {impacts.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      color: "#475569",
                      fontSize: "0.9rem",
                    }}
                  >
                    <CheckCircle
                      size={16}
                      color="#818cf8"
                      strokeWidth={2}
                      style={{ flexShrink: 0 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Link to="/contact" className="prd-cta-btn">
                Start a Project <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>

          {/* Right — image */}
          <Reveal delay={120}>
            <div style={{ position: "relative" }}>
              {/* Decorative border */}
              <div
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: 22,
                  background:
                    "linear-gradient(135deg, rgba(129,140,248,0.3), rgba(192,132,252,0.15), transparent)",
                  padding: 1,
                }}
              >
                <div
                  style={{
                    borderRadius: 21,
                    background: "#05050f",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <img
                src={img4}
                alt="Impact"
                style={{
                  position: "relative",
                  width: "100%",
                  borderRadius: 20,
                  display: "block",
                  filter: "brightness(0.88)",
                }}
              />
              {/* Glow under */}
              <div
                style={{
                  position: "absolute",
                  bottom: -30,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "70%",
                  height: 60,
                  background: "rgba(129,140,248,0.15)",
                  filter: "blur(30px)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Products;
