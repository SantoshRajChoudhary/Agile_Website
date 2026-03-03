import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Cpu,
  Globe,
  Smartphone,
  Cloud,
  Shield,
  Lightbulb,
  Workflow,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import geospatialVideo from "@/assets/videos/Geospatial.mp4";

/* ─── Data ─── */
const services = [
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    slug: "ai-machine-learning",
    accent: "#818cf8",
    description: "Build intelligent systems that learn from data, automate decisions, and improve business efficiency.",
    points: ["Predictive analytics & automation", "Computer vision & NLP solutions", "Custom ML model development"],
  },
  {
    icon: Globe,
    title: "IoT Solutions",
    slug: "iot-solutions",
    accent: "#34d399",
    description: "Connect devices and systems for real-time monitoring, automation, and intelligent insights.",
    points: ["Real-time device monitoring", "Sensor data analytics", "Smart automation systems"],
  },
  {
    icon: Smartphone,
    title: "AR/VR Applications",
    slug: "ar-vr-applications",
    accent: "#c084fc",
    description: "Create immersive digital experiences for training, visualization, and engagement.",
    points: ["Virtual training simulations", "3D visualization", "Interactive AR experiences"],
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    slug: "cloud-infrastructure",
    accent: "#38bdf8",
    description: "Scalable and secure cloud architecture designed for performance and reliability.",
    points: ["Cloud migration & deployment", "Scalable architecture", "DevOps & CI/CD pipelines"],
  },
  {
    icon: Shield,
    title: "Non-Destructive Testing",
    slug: "non-destructive-testing",
    accent: "#fb923c",
    description: "AI-powered inspection solutions ensuring safety and quality without damaging materials.",
    points: ["AI-based defect detection", "Automated inspection", "Industrial safety monitoring"],
  },
  {
    icon: Globe,
    title: "Geospatial Intelligence",
    slug: "geospatial-intelligence",
    video: geospatialVideo,
    accent: "#10b981",
    description: "AI-powered geospatial analytics for mapping, monitoring, and decision-making.",
    points: ["AI-based spatial analysis", "Real-time mapping", "Environmental monitoring"],
  },
];

const pillars = [
  { icon: Lightbulb, title: "Innovation Driven", desc: "Exploring emerging technologies to create future-ready solutions." },
  { icon: Workflow, title: "Engineering Excellence", desc: "Scalable architecture and clean engineering practices." },
  { icon: TrendingUp, title: "Business Impact", desc: "Solutions designed to deliver measurable, lasting growth." },
];

const techNames = ["Kubernetes", "React Native", "AWS", "Firebase", "TensorFlow", "PyTorch", "Docker", "Next.js"];

/* ─── Hook ─── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setV(true), delay); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, y = 28 }) {
  const [ref, v] = useReveal(delay);
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.65s ease, transform 0.65s ease`,
    }}>
      {children}
    </div>
  );
}

/* ─── Service Card ─── */
function ServiceCard({ service, index }) {
  const [hov, setHov] = useState(false);
  const Icon = service.icon;
  return (
    <Reveal delay={index * 80}>
      <Link
        to={`/services/${service.slug}`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          background: hov ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${hov ? `${service.accent}50` : "rgba(255,255,255,0.07)"}`,
          borderRadius: 18,
          padding: "28px 26px",
          textDecoration: "none",
          position: "relative",
          overflow: "hidden",
          transform: hov ? "translateY(-5px)" : "none",
          boxShadow: hov ? `0 16px 48px rgba(0,0,0,0.35), 0 0 0 0.5px ${service.accent}30` : "none",
          transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
          height: "100%",
        }}
      >
        {/* Subtle corner glow */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: 120, height: 120,
          background: `radial-gradient(circle at top right, ${service.accent}18, transparent 70%)`,
          opacity: hov ? 1 : 0.5,
          transition: "opacity 0.4s",
          pointerEvents: "none",
        }} />

        {/* Icon */}
        <div style={{
          width: 44, height: 44,
          borderRadius: 12,
          background: `${service.accent}14`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 18,
          transition: "transform 0.3s",
          transform: hov ? "scale(1.08)" : "scale(1)",
        }}>
          <Icon size={20} color={service.accent} strokeWidth={1.6} />
        </div>

        <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: 10, lineHeight: 1.3 }}>
          {service.title}
        </h3>

        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.75, marginBottom: 20, flex: 1 }}>
          {service.description}
        </p>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, marginBottom: 22 }}>
          {service.points.map((pt, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.4)", fontSize: "0.78rem" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: service.accent, flexShrink: 0, boxShadow: `0 0 6px ${service.accent}` }} />
              {pt}
            </li>
          ))}
        </ul>

        {/* Footer link */}
        <div style={{
          display: "flex", alignItems: "center",
          color: service.accent,
          fontFamily: "'Syne',sans-serif",
          fontWeight: 700,
          fontSize: "0.75rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          opacity: hov ? 1 : 0.5,
          transition: "opacity 0.3s, gap 0.3s",
          gap: hov ? 8 : 4,
        }}>
          Explore <ArrowUpRight size={13} />
        </div>
      </Link>
    </Reveal>
  );
}

/* ─── Main ─── */
const Services = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  return (
    <div className="srv-root">

      {/* ════ HERO ════ */}
      <section style={{ position: "relative", padding: "130px 24px 100px", textAlign: "center", overflow: "hidden" }}>
        <div className="srv-grid" />

        {/* Orb */}
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(129,140,248,0.15) 0%, transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
          {/* Label */}
          <Reveal>
            <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#818cf8", marginBottom: 24 }}>
              Our Thinking
            </p>
          </Reveal>

          {/* Headline */}
          <Reveal delay={80}>
            <h1 style={{
              fontFamily: "'Oxanium',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.6rem, 6vw, 5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fff",
              marginBottom: 24,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(20px)",
              transition: "all 0.8s ease 0.1s",
            }}>
              Your Ideas,{" "}
              <span style={{ background: "linear-gradient(135deg, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                powered by technology
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
              We combine engineering excellence, artificial intelligence, and industry insight to build solutions that create measurable business impact.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════ PILLARS ════ */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 16 }}>
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={i} delay={i * 90}>
                <div className="srv-pillar">
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(129,140,248,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon size={18} color="#818cf8" strokeWidth={1.6} />
                  </div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.83rem", lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ════ THIN DIVIDER ════ */}
      <div style={{ maxWidth: 1100, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
      </div>

      {/* ════ SERVICES ════ */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#818cf8", marginBottom: 10 }}>Services</p>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 3vw, 2.4rem)", color: "#fff", letterSpacing: "-0.02em" }}>
                What We Build
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
            {services.map((s, i) => <ServiceCard key={i} service={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ════ TECH MARQUEE ════ */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0", overflow: "hidden" }}>
        <div style={{ padding: "18px 0" }}>
          <div className="srv-marquee">
            {[...techNames, ...techNames].map((name, i) => (
              <div key={i} style={{
                display: "inline-flex", alignItems: "center", gap: 16,
                padding: "0 32px",
                color: "rgba(255,255,255,0.25)",
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}>
                {name}
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(129,140,248,0.5)", display: "inline-block" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section style={{ padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(129,140,248,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

        <Reveal>
          <div style={{ position: "relative", zIndex: 1, maxWidth: 540, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 16 }}>
              Want to transform your idea into a success story?
            </h2>

            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", marginBottom: 40, lineHeight: 1.7 }}>
              Let's build scalable, intelligent solutions together.
            </p>

            <Link to="/contact" className="srv-cta-btn">
              Schedule a Call <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Services;