import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Cpu,
  Globe,
  Smartphone,
  Cloud,
  Shield,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
} from "lucide-react";
import arvrVideo from "@/assets/videos/ARVR.mp4";
import aiVideo from "@/assets/videos/AIML.mp4";
import iotVideo from "@/assets/videos/IOT.mp4";
import ndtVideo from "@/assets/videos/NDT.mp4";
import geospatialVideo from "@/assets/videos/Geospatial.mp4";


const services = [
  {
    icon: Smartphone,
    title: "AR/VR Applications",
    slug: "ar-vr-applications",
    video: arvrVideo,
    accentColor: "#7c3aed",
    glowColor: "rgba(124, 58, 237, 0.6)",
    videoKeyword: "augmented reality technology",
    longDescription:
      "We build immersive Augmented Reality and Virtual Reality applications that enhance visualization, training, and user interaction. Our AR/VR solutions help businesses create realistic simulations, interactive environments, and next-generation digital experiences.",
    features: [
      "Immersive training simulations",
      "3D visualization & digital twins",
      "Interactive AR experiences",
      "Virtual product demonstrations",
    ],
    useCases: [
      "Industrial training",
      "Virtual tours & real estate",
      "Education & simulations",
      "Product visualization",
    ],
  },
  {
    icon: Cpu,
    title: "AI Development",
    slug: "ai-development",
    video: aiVideo,
    accentColor: "#0ea5e9",
    glowColor: "rgba(14, 165, 233, 0.6)",
    videoKeyword: "artificial intelligence data",
    longDescription:
      "We develop intelligent AI systems powered by Machine Learning and advanced data models that enable automation, prediction, and smarter decision-making.",
    features: [
      "Machine Learning model development",
      "Predictive analytics & forecasting",
      "Computer vision solutions",
      "Natural language processing",
      "AI-powered automation",
    ],
    useCases: [
      "Smart chatbots & assistants",
      "Fraud detection systems",
      "Customer behavior prediction",
      "Process automation",
    ],
  },
  {
    icon: Globe,
    title: "IoT Solutions",
    slug: "iot-solutions",
    video: iotVideo,
    accentColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.6)",
    videoKeyword: "internet of things smart city",
    longDescription:
      "Our IoT solutions enable real-time monitoring, automation, and intelligent decision-making by connecting devices, sensors, and data platforms.",
    features: [
      "Real-time device monitoring",
      "Edge computing integration",
      "Sensor data analytics",
      "Remote automation",
    ],
    useCases: [
      "Smart manufacturing",
      "Energy monitoring",
      "Asset tracking",
      "Smart cities",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    slug: "cloud-infrastructure",
    accentColor: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.6)",
    videoKeyword: "cloud computing data center",
    longDescription:
      "We design secure and scalable cloud infrastructures that support modern digital applications and ensure high availability and performance.",
    features: [
      "Cloud migration & deployment",
      "Scalable architecture design",
      "DevOps & CI/CD integration",
      "High availability systems",
    ],
    useCases: [
      "SaaS platforms",
      "Enterprise applications",
      "Data storage & analytics",
      "Microservices deployment",
    ],
  },
  {
    icon: Shield,
    title: "Non-Destructive Testing",
    slug: "non-destructive-testing",
    video: ndtVideo,
    accentColor: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.6)",
    videoKeyword: "industrial inspection quality control",
    longDescription:
      "Our AI-powered Non-Destructive Testing solutions ensure safety and quality inspection without damaging materials.",
    features: [
      "AI-based defect detection",
      "Automated inspection systems",
      "Quality assurance analytics",
      "Industrial safety monitoring",
    ],
    useCases: [
      "Manufacturing inspection",
      "Infrastructure monitoring",
      "Pipeline inspection",
      "Aerospace testing",
    ],
  },
  {
  icon: Globe,
  title: "Geospatial Intelligence",
  slug: "geospatial-intelligence",
  video: geospatialVideo, // make sure you import this
  accentColor: "#06b6d4", // cyan-blue (map / satellite vibe)
  glowColor: "rgba(6, 182, 212, 0.6)",
  videoKeyword: "satellite mapping gis analytics",
  longDescription:
    "Our AI-powered Geospatial Intelligence solutions transform satellite imagery, GIS data, and spatial analytics into actionable insights. We help organizations monitor assets, optimize operations, and make smarter location-based decisions.",
  features: [
    "Satellite image analysis",
    "GIS & spatial data modeling",
    "AI-based terrain & object detection",
    "Real-time geospatial dashboards",
  ],
  useCases: [
    "Urban planning & smart cities",
    "Agriculture monitoring",
    "Disaster response & risk analysis",
    "Defense & strategic intelligence",
  ],
},

];

/* ── tiny hook: stagger-reveal on scroll ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealCard({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug) || services[1]; // fallback for preview
  const videoRef = useRef(null);
  const [videoPaused, setVideoPaused] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoPaused) { videoRef.current.play(); setVideoPaused(false); }
    else { videoRef.current.pause(); setVideoPaused(true); }
  };

  if (!service) return <div className="pt-32 text-center text-white">Service not found</div>;

  const Icon = service.icon;
  const accent = service.accentColor;
  const glow = service.glowColor;

  /* ─── inline styles using CSS variables ─── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;1,9..40,300&display=swap');

    :root {
      --accent: ${accent};
      --glow: ${glow};
    }

    .sd-root * { box-sizing: border-box; }
    .sd-root { font-family: 'DM Sans', sans-serif; }

    /* ── video bg ── */
    .sd-hero {
      position: relative;
      overflow: hidden;
      min-height: 520px;
      display: flex;
      align-items: flex-end;
    }
    .sd-video-wrap {
      position: absolute; inset: 0;
      z-index: 0;
    }
    .sd-video-wrap video {
      width: 100%; height: 100%; object-fit: cover;
    }
    .sd-video-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(5,5,15,0.55) 0%,
        rgba(5,5,15,0.85) 70%,
        rgba(5,5,15,1) 100%
      );
    }

    /* ── glowing icon ── */
    .sd-icon-wrap {
      position: relative;
      width: 88px; height: 88px;
      flex-shrink: 0;
      cursor: pointer;
      transition: transform 0.4s cubic-bezier(.34,1.56,.64,1);
    }
    .sd-icon-wrap:hover { transform: scale(1.12) rotate(-6deg); }
    .sd-icon-bg {
      position: absolute; inset: 0;
      border-radius: 22px;
      background: linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
      border: 1px solid rgba(255,255,255,0.12);
      backdrop-filter: blur(10px);
      transition: box-shadow 0.4s ease;
    }
    .sd-icon-bg.glowing {
      box-shadow:
        0 0 0 1px var(--accent),
        0 0 20px var(--glow),
        0 0 60px var(--glow),
        0 0 120px var(--glow);
    }
    .sd-icon-bg.idle {
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.08),
        0 0 30px var(--glow);
    }
    .sd-icon-inner {
      position: relative; z-index: 1;
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
    }
    .sd-icon-ring {
      position: absolute; inset: -12px;
      border-radius: 30px;
      border: 1.5px solid var(--accent);
      opacity: 0;
      transition: opacity 0.4s, transform 0.4s;
      transform: scale(0.88);
    }
    .sd-icon-wrap:hover .sd-icon-ring {
      opacity: 0.4;
      transform: scale(1);
    }
    /* pulse animation */
    @keyframes pulse-ring {
      0%   { transform: scale(1);    opacity: 0.4; }
      100% { transform: scale(1.35); opacity: 0; }
    }
    .sd-icon-pulse {
      position: absolute; inset: -8px;
      border-radius: 28px;
      border: 1.5px solid var(--accent);
      animation: pulse-ring 2.2s cubic-bezier(.4,0,.6,1) infinite;
    }

    /* ── heading ── */
    .sd-title {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(2.4rem, 5vw, 4.2rem);
      line-height: 1.05;
      letter-spacing: -0.02em;
      color: #fff;
    }
    .sd-title span {
      background: linear-gradient(90deg, #fff 0%, var(--accent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* ── body bg ── */
    .sd-body {
      background: #05050f;
      position: relative;
      overflow: hidden;
    }
    .sd-body::before {
      content: '';
      position: fixed; inset: 0;
      background: radial-gradient(ellipse 70% 60% at 50% -10%, var(--glow) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    /* ── section heading ── */
    .sd-section-label {
      font-family: 'Syne', sans-serif;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 8px;
    }
    .sd-section-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.7rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 28px;
    }

    /* ── feature card ── */
    .sd-feature-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px;
      padding: 22px 24px;
      display: flex;
      align-items: center;
      gap: 14px;
      height: 100%;
      cursor: default;
      transition: background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s;
    }
    .sd-feature-card:hover {
      background: rgba(255,255,255,0.06);
      border-color: var(--accent);
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 20px var(--glow);
    }
    .sd-feature-card p {
      color: rgba(255,255,255,0.75);
      font-size: 0.95rem;
      line-height: 1.5;
    }

    /* ── use case chip ── */
    .sd-use-chip {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 18px 22px;
      color: rgba(255,255,255,0.65);
      font-size: 0.92rem;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.3s;
      cursor: default;
    }
    .sd-use-chip:hover {
      background: rgba(255,255,255,0.07);
      color: #fff;
      border-color: rgba(255,255,255,0.2);
      transform: translateX(6px);
    }
    .sd-use-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--accent);
      flex-shrink: 0;
      box-shadow: 0 0 8px var(--accent);
    }

    /* ── CTA ── */
    .sd-cta-section {
      position: relative;
      border-top: 1px solid rgba(255,255,255,0.06);
      text-align: center;
      padding: 80px 24px;
      overflow: hidden;
    }
    .sd-cta-section::before {
      content: '';
      position: absolute;
      bottom: -60px; left: 50%; transform: translateX(-50%);
      width: 500px; height: 300px;
      background: radial-gradient(ellipse, var(--glow) 0%, transparent 70%);
      pointer-events: none;
    }
    .sd-cta-title {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.6rem, 3vw, 2.4rem);
      font-weight: 800;
      color: #fff;
      margin-bottom: 12px;
    }
    .sd-cta-sub {
      color: rgba(255,255,255,0.5);
      font-size: 1rem;
      margin-bottom: 32px;
      max-width: 480px;
      margin-left: auto;
      margin-right: auto;
    }
    .sd-cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--accent);
      color: #fff;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 0.95rem;
      letter-spacing: 0.04em;
      padding: 14px 32px;
      border-radius: 50px;
      text-decoration: none;
      position: relative;
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
      box-shadow: 0 4px 20px var(--glow);
    }
    .sd-cta-btn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
      transform: translateX(-100%);
      transition: transform 0.6s;
    }
    .sd-cta-btn:hover::before { transform: translateX(100%); }
    .sd-cta-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 32px var(--glow);
    }

    /* ── video toggle btn ── */
    .sd-vid-toggle {
      position: absolute;
      bottom: 24px; right: 24px;
      z-index: 10;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 50%;
      width: 40px; height: 40px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      color: #fff;
      transition: background 0.3s;
    }
    .sd-vid-toggle:hover { background: rgba(255,255,255,0.2); }

    /* ── divider line ── */
    .sd-divider {
      width: 48px; height: 2px;
      background: var(--accent);
      margin-bottom: 24px;
      border-radius: 2px;
    }

    /* ── description text ── */
    .sd-desc {
      color: rgba(255,255,255,0.6);
      font-size: 1.05rem;
      line-height: 1.8;
      max-width: 680px;
    }

    /* ── grid ── */
    .sd-grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
      align-items: stretch;
    }
  `;

  const heroOpacity = mounted ? 1 : 0;
  const heroY = mounted ? 0 : 40;

  /* ─── Render ─── */
  return (
    <div className="sd-root sd-body min-h-screen">
      <style>{css}</style>

      {/* ════ HERO with video background ════ */}
      <div className="sd-hero">
        {/* Video background — using an abstract tech video from Pexels (free) */}
        <div className="sd-video-wrap">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260"
          >
            {/* Pexels free stock video – tech / abstract */}
            <source
              src={service.video}
              type="video/mp4"
            />
          </video>
          <div className="sd-video-overlay" />
        </div>

        {/* Video toggle button */}
        <button className="sd-vid-toggle" onClick={toggleVideo} aria-label="Toggle video">
          {videoPaused ? <Play size={16} /> : <Pause size={16} />}
        </button>

        {/* Hero content */}
        <div
          style={{
            position: "relative", zIndex: 2,
            width: "100%", maxWidth: "1200px",
            margin: "0 auto", padding: "120px 32px 64px",
            opacity: heroOpacity,
            transform: `translateY(${heroY}px)`,
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          {/* Breadcrumb */}
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginBottom: 32, letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif" }}>
            Services &nbsp;/&nbsp; <span style={{ color: accent }}>{service.title}</span>
          </p>

          {/* Icon + title row */}
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", marginBottom: 28 }}>
            {/* Glowing icon */}
            <div
              className="sd-icon-wrap"
              onMouseEnter={() => setIconHovered(true)}
              onMouseLeave={() => setIconHovered(false)}
            >
              <div className={`sd-icon-bg ${iconHovered ? "glowing" : "idle"}`} />
              {iconHovered && <div className="sd-icon-pulse" />}
              <div className="sd-icon-ring" />
              <div className="sd-icon-inner">
                <Icon color={accent} size={36} strokeWidth={1.5} />
              </div>
            </div>

            <h1 className="sd-title">
              {service.title.split(" ").map((word, i, arr) =>
                i === arr.length - 1 ? <span key={i}>{word}</span> : word + " "
              )}
            </h1>
          </div>

          <p className="sd-desc">{service.longDescription}</p>
        </div>
      </div>

      {/* ════ BODY CONTENT ════ */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 32px 0" }}>

          {/* ── Features ── */}
          <RevealCard>
            <div style={{ marginBottom: 64 }}>
              <p className="sd-section-label">What we offer</p>
              <h2 className="sd-section-title">Key Features &amp; Capabilities</h2>
              <div className="sd-divider" />
              <div className="sd-grid-2">
                {service.features.map((feature, i) => (
                  <RevealCard key={i} delay={i * 80}>
                    <div className="sd-feature-card">
                      <CheckCircle color={accent} size={18} style={{ flexShrink: 0 }} />
                      <p>{feature}</p>
                    </div>
                  </RevealCard>
                ))}
              </div>
            </div>
          </RevealCard>

          {/* ── Use Cases ── */}
          <RevealCard delay={100}>
            <div style={{ marginBottom: 64 }}>
              <p className="sd-section-label">Real-world impact</p>
              <h2 className="sd-section-title">Industry Use Cases</h2>
              <div className="sd-divider" />
              <div className="sd-grid-2">
                {service.useCases.map((use, i) => (
                  <RevealCard key={i} delay={i * 80}>
                    <div className="sd-use-chip">
                      <div className="sd-use-dot" />
                      {use}
                    </div>
                  </RevealCard>
                ))}
              </div>
            </div>
          </RevealCard>

        </div>

        {/* ── CTA ── */}
        <RevealCard>
          <div className="sd-cta-section">
            <p className="sd-section-label">Let's work together</p>
            <h3 className="sd-cta-title">Ready to build with {service.title}?</h3>
            <p className="sd-cta-sub">
              Let Attractify Technologies help you transform your ideas into scalable, intelligent solutions.
            </p>
            <Link to="/contact" className="sd-cta-btn">
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </RevealCard>

      </div>
    </div>
  );
};

export default ServiceDetail;