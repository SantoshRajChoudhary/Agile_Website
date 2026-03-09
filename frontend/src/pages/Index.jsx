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
  Settings,
  Zap,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import imgNDT from "@/assets/ndt.jpg";
import imgARVR from "@/assets/arvr.jpg";
import imgIoT from "@/assets/iot.png";
import imgAI from "@/assets/ai.jpg";
import imgAI1 from "@/assets/ai2.jpg";
import imgiot1 from "@/assets/iot2.webp";
import imgarvr1 from "@/assets/arvr2.png";
import imgndt1 from "@/assets/ndt2.png";

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
    icon: TrendingUp,
    title: "Business Intelligence",
    description: "Harness the power of data to drive informed business decisions and strategic planning.",
    accent: "#818cf8",
    image: imgAI,
    points: ["Data Visualization & Reporting", "Operational Strategy Planning", "Actionable Insight Generation"],
  },
  {
    icon: Brain,
    title: "Predictive Analysis",
    description: "Leverage historical data and machine learning to forecast trends and optimize performance.",
    accent: "#34d399",
    image: imgAI1,
    points: ["Statistical Modeling", "Machine Learning Trends", "Performance Optimization"],
  },
  {
    icon: Cloud,
    title: "Microsoft Services",
    description: "Unlock the full potential of your data with tailored Microsoft solutions for the 'big picture'.",
    accent: "#c084fc",
    image: imgiot1,
    points: ["Power BI Dashboards", "Azure Cloud Solutions", "Enterprise Data Management"],
  },
  {
    icon: Settings,
    title: "Axial Core Motors",
    description: "High-torque, compact motors engineered for next-gen mobility in EVs and Drones.",
    accent: "#38bdf8",
    image: imgndt1,
    points: ["140kg Load Output", "Aerospace & Automotive Grade", "High Power Density"],
  },
  {
    icon: Zap,
    title: "Bi-Polar Switching Induction Motor",
    description: "Innovative module delivering immediate energy savings for induction systems with zero infrastructure changes.",
    accent: "#fb923c",
    image: imgarvr1,
    points: ["Zero Infrastructure Change", "Immediate Energy Savings", "Performance Upgrades"],
  },
  {
    icon: Cpu,
    title: "Electronic Controlled Module",
    description: "Smart retrofit solution reducing wattage consumption of induction ceiling fans by 40-50%.",
    accent: "#10b981",
    image: imgIoT,
    points: ["40-50% Watts Reduction", "Smart Retrofit Design", "Cost-Effective Upgrades"],
  },
];

const stats = [
  { value: "53+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "13+", label: "AI Solutions Built" },
];


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
  const BG = "#ffffff";

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
        className="relative z-30 w-full pt-12 pb-20 flex justify-center items-center"
        style={{ opacity: textOpacity, y: textY, minHeight: "80vh" }}
      >
        <div className="section-container w-full flex justify-center">
          <div className="max-w-[760px] space-y-8 text-center">
            {/* badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            ></motion.div>

            {/* heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-black font-extrabold leading-tight tracking-tight text-center"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.6rem, 6vw, 4.2rem)" }}
            >
              Driving Digital India{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                With Precision & Intelligence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-black/60 text-base md:text-lg leading-relaxed"
            >
              Empowering operations with advanced Business Intelligence, predictive insights, and high-performance engineering solutions to drive your success.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="flex justify-center flex-wrap gap-4"
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
                className="inline-flex items-center gap-2 h-12 px-8 rounded-lg font-semibold text-sm text-black/80 border border-black/15 bg-black/5 hover:bg-black/10 hover:text-black hover:border-black/30 transition-all duration-200"
              >
                Get Started
              </Link>
            </motion.div>

            {/* mini stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex justify-center flex-wrap gap-6 sm:gap-8 md:gap-12 pt-8 border-t border-black/10 mt-8"
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
                  <span className="text-[10px] text-black/40 tracking-widest uppercase">
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
        className="hide-mobile absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-2"
        style={{ opacity: hintOpacity }}
      >
        <span className="text-[9px] tracking-[0.22em] uppercase text-black/40">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-black/30 to-transparent animate-pulse" />
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
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
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
        transition: "transform 0.45s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
        boxShadow: `0 24px 48px #64748b, 0 0 0 1px ${service.accent}55`,
      }}
    >
      {/* ── image (always revealed) ── */}
      <div
        style={{
          position: "relative",
          height: "160px",
          overflow: "hidden",
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
            transform: "scale(1.08)",
            marginTop: "-20px",
          }}
        />
        {/* gradient over image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.9) 100%)`,
          }}
        />
        {/* accent glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 50% 0%, ${service.accent}33 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* ── card body ── */}
      <div
        style={{
          padding: "20px",
          background: `linear-gradient(135deg, ${service.accent}18 0%, rgba(255,255,255,0.95) 100%)`,
          border: `1px solid ${service.accent}44`,
          borderTop: "none",
          borderRadius: "0 0 16px 16px",
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
            boxShadow: `0 0 16px ${service.accent}44`,
          }}
        >
          <Icon size={20} style={{ color: service.accent }} />
        </div>

        <h3
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#000",
            margin: 0,
          }}
        >
          {service.title}
        </h3>

        <p
          style={{
            fontSize: "13px",
            color: "#475569",
            lineHeight: 1.65,
            margin: "0 0 15px 0",
          }}
        >
          {service.description}
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
          {service.points.map((pt, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#64748b", fontSize: "0.78rem" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: service.accent, flexShrink: 0, boxShadow: `0 0 6px ${service.accent}` }} />
              {pt}
            </li>
          ))}
        </ul>

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
        }}
      />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
const Index = () => {
  useEffect(() => {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/667e55aeeaf3bd8d4d1549ec/1i1entdhe';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else {
      document.head.appendChild(s1);
    }
  }, []);

  return (
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
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
              At Agile ICO, we combine advanced technologies with a
              structured engineering approach to build scalable, intelligent and
              future-ready solutions for modern industries.
            </p>
          </div>

          {/* ───── TECHNOLOGIES GRID ───── */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
            {[
              { name: "Business Intelligence", icon: Brain, color: "#22d3ee" },
              { name: "Predictive Analysis", icon: Box, color: "#a78bfa" },
              { name: "Microsoft Services", icon: Cpu, color: "#60a5fa" },
              { name: "Axial Core Motors", icon: Globe, color: "#34d399" },
              { name: "Bi-Polar Switching Induction Motor", icon: Shield, color: "#38bdf8" },
              { name: "Electronic Controlled Module", icon: Layers, color: "#10b981" },
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
            bg-white
            border border-black/5
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
                    <p className="text-sm font-semibold text-black/80 leading-tight px-2">
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
              Why Choose <span className="text-primary">Agile ICO</span>?
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
              What We Build
            </h2>
            <p className="text-muted-foreground">
              Explore our cutting-edge technologies and specialized services.
            </p>
          </div>

          {/* cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, i) => {
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
                      background: `radial-gradient(circle at 20% 10%, ${item.accent}22, transparent 70%)`,
                    }}
                  />

                  {/* icon */}
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      background: `${item.accent}15`,
                      boxShadow: `0 0 18px ${item.accent}40`,
                    }}
                  >
                    <Icon size={24} style={{ color: item.accent }} />
                  </div>

                  {/* title */}
                  <h2 className="font-semibold mb-3">{item.title}</h2>

                  {/* description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* points */}
                  <ul className="space-y-2 mt-auto">
                    {item.points.map((pt, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[0.78rem] text-muted-foreground">
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: item.accent, boxShadow: `0 0 6px ${item.accent}` }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
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
    </div>
  );
};

export default Index;
