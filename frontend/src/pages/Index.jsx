import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Cpu,
  Globe,
  Shield,
  ChevronRight,
  Rocket,
  Layers,
  Target,
  Box,
  Cloud,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import whyImage from "@/assets/why-attractify.webp";
import imgNDT from "@/assets/ndt.jpg";
import imgARVR from "@/assets/arvr.jpg";
import imgIoT from "@/assets/iot.jpg";
import imgAI from "@/assets/ai.avif";
import imgAI1 from "@/assets/ai2.webp";
import imgiot1 from "@/assets/iot2.jpg";
import imgarvr1 from "@/assets/arvr2.jpg";
import imgndt1 from "@/assets/ndt2.webp";

/* ═══════════════════════════════════════════════════════════════
   ANIMATIONS
═══════════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

/* ═══════════════════════════════════════════════════════════════
   COUNT-UP
═══════════════════════════════════════════════════════════════ */
const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = null;
    const tick = (time) => {
      if (!start) start = time;
      const p = Math.min((time - start) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, duration]);
  return <span>{count}</span>;
};

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const services = [
  {
    icon: Brain,
    title: "AR/VR",
    slug: "ar-vr-applications",
    description:
      "Transform complex data into intelligent decisions using advanced ML models.",
  },
  {
    icon: Cpu,
    title: "AI Development",
    slug: "ai-development",
    description: "Build intelligent systems that learn and adapt.",
  },
  {
    icon: Globe,
    title: "IoT Solutions",
    slug: "iot-solutions",
    description: "Connected systems for real-time monitoring and automation.",
  },
  {
    icon: Shield,
    title: "Non-Destructive Testing",
    slug: "non-destructive-testing",
    description: "AI-powered inspection ensuring safety and reliability.",
  },
];

const stats = [
  { value: "53+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "13+", label: "AI Solutions Built" },
];

/**
 * VIDEO PANELS
 * Place your videos in /public/videos/ and update src paths below.
 * Each panel has a `fallbackGradient` that shows while video loads
 * — so the hero always looks great even without videos.
 */
const VIDEO_PANELS = [
  {
    src: imgARVR,
    label: "AR / VR",
    fallbackGradient:
      "linear-gradient(160deg, #1a0533 0%, #2d0b5e 50%, #0f0320 100%)",
  },
  {
    src: imgAI,
    label: "AI / ML",
    fallbackGradient:
      "linear-gradient(160deg, #001a33 0%, #003366 50%, #000d1a 100%)",
  },
  {
    src: imgIoT,
    label: "IoT",
    fallbackGradient:
      "linear-gradient(160deg, #003322 0%, #005540 50%, #001a11 100%)",
  },
  {
    src: imgNDT,
    label: "NDT",
    fallbackGradient:
      "linear-gradient(160deg, #0f2027 0%, #1a3a4a 50%, #0d1f2d 100%)",
  },
];

/* ═══════════════════════════════════════════════════════════════
   SINGLE DIAGONAL VIDEO PANEL
═══════════════════════════════════════════════════════════════ */
const VideoPanel = ({ src, label, index, total, fallbackGradient }) => {
  const [loaded, setLoaded] = useState(false);
  const SKEW = -7;

  return (
    <div
      className="relative flex-1 overflow-hidden"
      style={{
        transform: `skewX(${SKEW}deg)`,
        marginLeft: index === 0 ? "0" : "-20px",
        marginRight: index === total - 1 ? "0" : "-20px",
        background: fallbackGradient,
      }}
    >
      <img
        src={src}
        alt={label}
        onLoad={() => setLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{
          transform: `skewX(${-SKEW}deg) scale(1.18)`,
          opacity: loaded ? 1 : 0,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(5,7,12,0.92) 0%, rgba(5,7,12,0.45) 35%, rgba(5,7,12,0.15) 75%, rgba(5,7,12,0.35) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)",
          transform: `skewX(${-SKEW}deg) scale(1.18)`,
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(99,179,237,0.8), transparent)",
          transform: `skewX(${-SKEW}deg) scale(1.18)`,
        }}
      />
      <div
        className="absolute bottom-6 left-1/2 flex flex-col items-center gap-1"
        style={{ transform: `translateX(-50%) skewX(${-SKEW}deg)` }}
      >
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40">
          {label}
        </span>
        <div className="w-4 h-px bg-white/20" />
      </div>
    </div>
  );
};



/* ═══════════════════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const panelsOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const panelsX = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.38], [0, -32]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  /* the ONE dark bg color used everywhere — matches a typical dark Tailwind theme */
  const BG = "#05070c";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: BG }}
    >
      {/* ── subtle radial glow behind text ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 15% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ── diagonal video panels ── */}
      <motion.div
        className="absolute inset-y-0 right-0 flex"
        style={{
          width: "65%",
          opacity: panelsOpacity,
          x: panelsX,
        }}
      >
        {VIDEO_PANELS.map((panel, i) => (
          <VideoPanel
            key={i}
            {...panel}
            index={i}
            total={VIDEO_PANELS.length}
          />
        ))}

        {/* left-edge bleed into dark bg */}
        <div
          className="absolute inset-y-0 left-0 w-[45%] pointer-events-none z-10"
          style={{
            background: `linear-gradient(to right, ${BG} 0%, transparent 100%)`,
          }}
        />

        {/* right-edge vignette */}
        <div
          className="absolute inset-y-0 right-0 w-[12%] pointer-events-none z-10"
          style={{
            background: `linear-gradient(to left, ${BG} 0%, transparent 100%)`,
          }}
        />
      </motion.div>

      {/* top edge */}
      <div
        className="absolute top-0 inset-x-0 h-32 pointer-events-none z-20"
        style={{
          background: `linear-gradient(to bottom, ${BG} 0%, transparent 100%)`,
        }}
      />
      {/* bottom edge */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-20"
        style={{
          background: `linear-gradient(to top, ${BG} 0%, transparent 100%)`,
        }}
      />

      {/* ── hero text ── */}
      <motion.div
        className="relative z-30 w-full pt-28 pb-20"
        style={{ opacity: textOpacity, y: textY }}
      >
        <div className="section-container">
          <div className="max-w-[560px] space-y-8">
            {/* badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            ></motion.div>

            {/* heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-white font-bold leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)" }}
            >
              Empowering Industries
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #60a5fa 0%, #34d399 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                with Advanced Digital Solutions
              </span>
            </motion.h1>

            {/* description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-white/55 text-base md:text-lg leading-relaxed"
            >
              Pioneering solutions in NDT, AR/VR, IoT, AI/ML, and Custom SaaS to
              transform your vision into reality.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="flex flex-wrap gap-4"
            >
              {/* primary */}
              <Link
                to="/services"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-lg font-semibold text-sm text-white transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  boxShadow: "0 0 24px rgba(37,99,235,0.35)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 36px rgba(37,99,235,0.6)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 24px rgba(37,99,235,0.35)")
                }
              >
                Explore Our Universe
                <ChevronRight size={16} />
              </Link>

              {/* secondary */}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-lg font-semibold text-sm text-white/80 border border-white/15 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                Get Started
              </Link>
            </motion.div>

            {/* mini stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex gap-8 pt-4 border-t border-white/8"
            >
              {[
                { val: "53+", lbl: "Projects" },
                { val: "30+", lbl: "Clients" },
                { val: "5+", lbl: "Years" },
                { val: "13+", lbl: "AI Builds" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col pt-4 gap-0.5">
                  <span
                    className="text-2xl font-bold"
                    style={{
                      background: "linear-gradient(90deg, #60a5fa, #34d399)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.val}
                  </span>
                  <span className="text-[10px] text-white/35 tracking-widest uppercase">
                    {s.lbl}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        style={{ opacity: hintOpacity }}
      >
        <span className="text-[9px] tracking-[0.22em] uppercase text-white/30">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   3D SERVICE CARD
═══════════════════════════════════════════════════════════════ */
const ServiceCard = ({ service, Icon }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
  );
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotX = (-dy * 14).toFixed(2);
    const rotY = (dx * 14).toFixed(2);
    setTransform(
      `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`,
    );
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
    setHovered(false);
  };

  return (
    <Link
      ref={cardRef}
      to={`/services/${service.slug}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        overflow: "hidden",
        textDecoration: "none",
        position: "relative",
        height: "100%",
        transform: transform,
        transition: hovered
          ? "transform 0.08s ease-out"
          : "transform 0.45s ease",
        transformStyle: "preserve-3d",
        boxShadow: hovered
          ? `0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px ${service.accent}55`
          : "0 4px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)",
        willChange: "transform",
      }}
    >
      {/* ── image (revealed on hover) ── */}
      <div
        style={{
          position: "relative",
          height: hovered ? "160px" : "0px",
          overflow: "hidden",
          transition: "height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          flexShrink: 0,
        }}
      >
        <img
          src={service.image}
          alt={service.title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            transform: hovered ? "scale(1.08)" : "scale(1.15)",
            transition: "transform 0.6s ease",
            marginTop: "-20px",
          }}
        />
        {/* gradient over image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent 40%, rgba(5,7,12,0.9) 100%)`,
          }}
        />
        {/* accent glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 50% 0%, ${service.accent}33 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s",
          }}
        />
      </div>

      {/* ── card body ── */}
      <div
        style={{
          padding: "20px",
          background: hovered
            ? `linear-gradient(135deg, ${service.accent}18 0%, rgba(5,7,12,0.95) 100%)`
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? service.accent + "44" : "rgba(255,255,255,0.07)"}`,
          borderTop: hovered ? "none" : undefined,
          borderRadius: hovered ? "0 0 16px 16px" : "16px",
          transition: "all 0.4s ease",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* icon */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: `${service.accent}22`,
            border: `1px solid ${service.accent}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
            boxShadow: hovered ? `0 0 16px ${service.accent}44` : "none",
          }}
        >
          <Icon size={20} style={{ color: service.accent }} />
        </div>

        <h3
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#fff",
            margin: 0,
          }}
        >
          {service.title}
        </h3>

        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {service.description}
        </p>

        {/* learn more */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "12px",
            fontWeight: 600,
            color: service.accent,
            marginTop: "auto",
            paddingTop: "8px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-8px)",
            transition: "all 0.3s ease",
          }}
        >
          Learn more <ChevronRight size={13} />
        </div>
      </div>

      {/* shimmer highlight on top edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${service.accent}88, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s",
        }}
      />
    </Link>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
const Index = () => (
  <div className="min-h-screen bg-background overflow-hidden">
    {/* ── HERO ── */}
    <HeroSection />

    {/* ── SERVICES ── */}
    <section className="py-24 overflow-hidden">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-primary mb-14"
        >
          What We Do
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: "NDT Inspection",
              slug: "non-destructive-testing",
              description:
                "AI-powered inspection ensuring safety and reliability without damage.",
              image: imgndt1,
              accent: "#0891b2",
            },
            {
              icon: Globe,
              title: "AR / VR",
              slug: "ar-vr-applications",
              description:
                "Immersive experiences that transform training, design, and remote collaboration.",
              image: imgarvr1,
              accent: "#7c3aed",
            },
            {
              icon: Brain,
              title: "AI Development",
              slug: "ai-development",
              description:
                "Build intelligent systems that learn, adapt, and make smarter decisions.",
              image: imgAI1,
              accent: "#2563eb",
            },
            {
              icon: Cpu,
              title: "IoT Solutions",
              slug: "iot-solutions",
              description:
                "Connected systems for real-time monitoring and automation at scale.",
              image: imgiot1,
              accent: "#059669",
            },
          ].map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <ServiceCard service={service} Icon={Icon} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── TECHNOLOGIES ── */}
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="section-container">
        {/* ───── HEADER ───── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Technologies & Process That Power Innovation
          </h2>

          <p className="text-muted-foreground">
            At Attractify Technologies, we combine advanced technologies with a
            structured engineering approach to build scalable, intelligent and
            future-ready solutions for modern industries.
          </p>
        </div>

        {/* ───── TECHNOLOGIES GRID ───── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {[
            { name: "Artificial Intelligence", icon: Brain, color: "#22d3ee" },
            { name: "AR / VR", icon: Box, color: "#a78bfa" },
            { name: "IoT Systems", icon: Cpu, color: "#60a5fa" },
            { name: "Geospatial Tech", icon: Globe, color: "#34d399" },
            { name: "NDT", icon: Shield, color: "#38bdf8" },
            { name: "Custom SaaS", icon: Layers, color: "#10b981" },
          ].map((tech, i) => {
            const Icon = tech.icon;

            return (
              <div
                key={i}
                className="
          relative rounded-xl p-[1.5px]
          bg-gradient-to-r
          from-cyan-400 via-blue-500 to-emerald-400
        "
              >
                {/* INNER CARD */}
                <div
                  className="
            h-[150px]
            rounded-xl
            bg-[#05070c]
            border border-white/5
            flex flex-col items-center justify-center
            text-center
          "
                >
                  {/* ICON */}
                  <Icon
                    size={30}
                    style={{
                      color: tech.color,
                      filter: `drop-shadow(0 0 10px ${tech.color})`,
                    }}
                    className="mb-3"
                  />

                  {/* TEXT */}
                  <p className="text-sm font-medium text-white/90 leading-tight px-2">
                    {tech.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ───── PROCESS FLOW ───── */}
        <div className="grid md:grid-cols-3 gap-8 text-center relative">
          {/* subtle background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/4 top-1/2 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />
            <div className="absolute right-1/4 top-1/2 w-72 h-72 bg-emerald-500/10 blur-[120px] rounded-full" />
          </div>

          {[
            {
              title: "Understand",
              desc: "We deeply analyze business challenges, workflows, and opportunities to define the right technological direction.",
              icon: Target,
              color: "#60a5fa",
            },
            {
              title: "Design",
              desc: "Our team architects scalable systems and intelligent experiences using modern frameworks and technologies.",
              icon: Layers,
              color: "#34d399",
            },
            {
              title: "Build & Scale",
              desc: "We develop, deploy, and continuously optimize solutions that grow with your business and users.",
              icon: Rocket,
              color: "#22c55e",
            },
          ].map((step, i) => {
            const Icon = step.icon;

            return (
              <div
                key={i}
                className="
          relative z-10
          p-8 rounded-xl
          bg-card border border-border
        "
              >
                {/* glowing icon container */}
                <div
                  className="mx-auto mb-4 w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{
                    background: `${step.color}15`,
                    boxShadow: `0 0 22px ${step.color}35`,
                  }}
                >
                  <Icon size={30} style={{ color: step.color }} />
                </div>

                <h3 className="font-semibold mb-2">{step.title}</h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── WHY CHOOSE US ── */}
    <section className="py-24">
      <div className="section-container grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why Choose <span className="text-primary">Attractify</span>?
          </h2>
          <p className="text-muted-foreground">
            We combine deep technical expertise with industry understanding to
            deliver intelligent solutions that solve real-world problems.
          </p>
          <ul className="space-y-4">
            {[
              "AI-driven innovation approach",
              "Industry-focused solutions",
              "Scalable and future-ready architecture",
              "Fast development and deployment",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <ChevronRight className="text-primary mt-1" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="h-[360px] rounded-2xl border border-border overflow-hidden bg-card shadow-xl">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/whychossevid.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
          <div className="absolute -z-10 inset-0 blur-[120px] bg-primary/20 rounded-full" />
        </div>
      </div>
    </section>

    {/* ── FEATURED SOLUTIONS ── */}
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="section-container">
        {/* heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Solutions
          </h2>
          <p className="text-muted-foreground">
            Intelligent platforms designed to enhance efficiency, automate
            workflows, and enable smarter industrial decision-making.
          </p>
        </div>

        {/* cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "AI Inspection Systems",
              desc: "AI-powered inspection and defect detection for industrial safety and accuracy.",
              icon: Brain,
              color: "#60a5fa",
            },
            {
              title: "Industrial AR Training",
              desc: "Immersive AR environments for workforce training and remote assistance.",
              icon: Box,
              color: "#a855f7",
            },
            {
              title: "IoT Monitoring Platform",
              desc: "Real-time monitoring and predictive maintenance using connected devices.",
              icon: Cpu,
              color: "#22c55e",
            },
            {
              title: "Predictive Analytics",
              desc: "Data-driven insights that help industries forecast and optimize performance.",
              icon: Globe,
              color: "#f59e0b",
            },
          ].map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="
              relative p-6 rounded-xl
              bg-card border border-border
              h-full flex flex-col
            "
              >
                {/* glow background */}
                <div
                  className="absolute inset-0 rounded-xl opacity-40 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 20% 10%, ${item.color}22, transparent 70%)`,
                  }}
                />

                {/* icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    background: `${item.color}15`,
                    boxShadow: `0 0 18px ${item.color}40`,
                  }}
                >
                  <Icon size={24} style={{ color: item.color }} />
                </div>

                {/* title */}
                <h3 className="font-semibold mb-2">{item.title}</h3>

                {/* description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── STATS ── */}
    <section className="py-16 border-y border-border/40">
      <div className="section-container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, i) => (
          <div key={i}>
            <h3 className="text-3xl font-bold text-primary">
              <CountUp end={parseInt(stat.value)} />
              {stat.value.includes("+") && "+"}
            </h3>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="py-24 text-center">
      <h2 className="text-3xl font-semibold mb-4">
        Ready to Build the Future?
      </h2>
      <p className="text-muted-foreground mb-8">
        Let's transform your ideas into intelligent digital solutions.
      </p>
      <Button size="lg" asChild>
        <Link to="/contact">
          Start Your Project <ChevronRight className="ml-2" />
        </Link>
      </Button>
    </section>

    {/* FLOATING CONTACT BUTTON */}
    {/* FLOATING CONTACT BUTTON — Glassmorphic */}
    {/* FLOATING CONTACT BUTTON — Apple Liquid Glass */}
    <Link
      to="/contact"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2 text-xs font-semibold"
      style={{
        borderRadius: "980px",
        color: "rgba(255,255,255,0.92)",
        textDecoration: "none",
        letterSpacing: "0.01em",
        // layered liquid glass
        background: `
  radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.30) 0%, transparent 60%),
  radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.12) 0%, transparent 50%),
  linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.18) 100%)
`,
        backdropFilter: "blur(28px) saturate(180%) brightness(1.1)",
        WebkitBackdropFilter: "blur(28px) saturate(180%) brightness(1.1)",
        border: "1px solid rgba(255,255,255,0.28)",
        boxShadow: `
  0 1.5px 0 0 rgba(255,255,255,0.5) inset,
  0 -1px 0 0 rgba(0,0,0,0.08) inset,
  0 4px 16px rgba(0,0,0,0.12),
  0 1px 4px rgba(0,0,0,0.08),
  0 0 0 0.5px rgba(255,255,255,0.15)
`,
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.06) translateY(-2px)";
        e.currentTarget.style.boxShadow = `
      0 2px 0 0 rgba(255,255,255,0.45) inset,
      0 -1px 0 0 rgba(0,0,0,0.15) inset,
      0 16px 48px rgba(0,0,0,0.3),
      0 4px 16px rgba(0,0,0,0.2),
      0 0 0 0.5px rgba(255,255,255,0.2),
      0 0 32px rgba(96,165,250,0.2)
    `;
        e.currentTarget.style.background = `
      radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.30) 0%, transparent 60%),
      radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.12) 0%, transparent 50%),
      linear-gradient(135deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.18) 100%)
    `;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1) translateY(0)";
        e.currentTarget.style.boxShadow = `
      0 2px 0 0 rgba(255,255,255,0.35) inset,
      0 -1px 0 0 rgba(0,0,0,0.15) inset,
      0 8px 32px rgba(0,0,0,0.25),
      0 2px 8px rgba(0,0,0,0.15),
      0 0 0 0.5px rgba(255,255,255,0.1)
    `;
        e.currentTarget.style.background = `
      radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.22) 0%, transparent 60%),
      radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
      linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.12) 100%)
    `;
      }}
      onMouseDown={(e) =>
        (e.currentTarget.style.transform = "scale(0.97) translateY(0px)")
      }
      onMouseUp={(e) =>
        (e.currentTarget.style.transform = "scale(1.06) translateY(-2px)")
      }
    >
      {/* liquid inner highlight bubble */}
      <span
        style={{
          position: "absolute",
          top: "2px",
          left: "12%",
          right: "12%",
          height: "40%",
          borderRadius: "0 0 50% 50%",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, transparent 100%)",
          pointerEvents: "none",
          filter: "blur(1px)",
        }}
      />
      Contact Us
      <ChevronRight size={12} style={{ opacity: 0.6 }} />
    </Link>
  </div>
);

export default Index;
