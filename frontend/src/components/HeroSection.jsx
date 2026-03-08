import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import imgNDT from "@/assets/ndt.jpg";
import imgARVR from "@/assets/arvr.jpg";
import imgIoT from "@/assets/IOT.jpg"; // ← uppercase IOT, not iot
import imgAI from "@/assets/ai.jpg";


const panels = [
  {
    src: imgNDT,
    label: "NDT",
    fallback: "linear-gradient(135deg, #0d1117 0%, #1a2744 100%)",
  },
  {
    src: imgARVR,
    label: "AR / VR",
    fallback: "linear-gradient(135deg, #0d1117 0%, #1a1a3e 100%)",
  },
  {
    src: imgIoT,
    label: "IoT",
    fallback: "linear-gradient(135deg, #0d1117 0%, #0f2a2a 100%)",
  },
  {
    src: imgAI,
    label: "AI / ML",
    fallback: "linear-gradient(135deg, #0d1117 0%, #1a0d2e 100%)",
  },
];
/* ─── individual diagonal image panel ─── */
const ImagePanel = ({ src, label, fallback, index, total }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const skew = -6; // degrees — keeps diagonal edges

  return (
    <div
      className="relative flex-1 overflow-hidden"
      style={{
        transform: `skewX(${skew}deg)`,
        marginLeft: index === 0 ? "0" : "-18px",
        marginRight: index === total - 1 ? "0" : "-18px",
        // show gradient fallback until image is ready
        background: error || !loaded ? fallback : undefined,
      }}
    >
      {/* image — un-skewed so it stays straight */}
      {!error && (
        <img
          src={src}
          alt={label}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{
            transform: `skewX(${-skew}deg) scale(1.15)`,
            opacity: loaded ? 1 : 0,
          }}
        />
      )}

      {/* dark tint + left-edge gradient fade */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to right,
            rgba(255,255,255,0.85) 0%,
            rgba(255,255,255,0.30) 35%,
            rgba(255,255,255,0.10) 100%
          )`,
        }}
      />

      {/* subtle color accent overlay per panel for visual variety */}
      <div
        className="absolute inset-0 mix-blend-color"
        style={{
          background: [
            "rgba(0,120,255,0.12)", // NDT   — blue
            "rgba(120,0,255,0.12)", // AR/VR — purple
            "rgba(0,200,180,0.12)", // IoT   — teal
            "rgba(200,80,255,0.12)", // AI/ML — violet
          ][index],
          opacity: 0.6,
        }}
      />

      {/* bottom label */}
      <div
        className="absolute bottom-5 left-1/2 text-xs font-semibold tracking-widest uppercase text-black/60 whitespace-nowrap"
        style={{ transform: `translateX(-50%) skewX(${-skew}deg)` }}
      >
        {label}
      </div>
    </div>
  );
};

/* ─── main export ─── */
const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const panelsOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const panelsTranslate = useTransform(scrollYProgress, [0, 0.55], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textTranslate = useTransform(scrollYProgress, [0, 0.4], [0, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* ── diagonal image panels (right 68%) ── */}
      <motion.div
        className="absolute inset-y-0 right-0 flex"
        style={{
          width: "68%",
          opacity: panelsOpacity,
          x: panelsTranslate,
        }}
      >
        {panels.map((p, i) => (
          <ImagePanel key={i} {...p} index={i} total={panels.length} />
        ))}

        {/* left gradient — panels bleed into dark bg */}
        <div
          className="absolute inset-y-0 left-0 w-2/5 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, hsl(var(--background)) 0%, transparent 100%)",
          }}
        />

        {/* right vignette */}
        <div
          className="absolute inset-y-0 right-0 w-1/5 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* top fade */}
      <div
        className="absolute top-0 inset-x-0 h-28 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)",
        }}
      />
      {/* bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-28 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)",
        }}
      />

      {/* ── hero text ── */}
      <motion.div
        className="relative z-20 w-full"
        style={{ opacity: textOpacity, y: textTranslate }}
      >
        <div className="section-container">
          <div className="max-w-xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wide">
                Pioneering AI Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight"
            >
              Future-Proof Your Business
              <br />
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                with Intelligent Innovation
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md"
            >
              Pioneering solutions in NDT, AR/VR, IoT, AI/ML, and Custom SaaS to
              transform your vision into reality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="flex flex-wrap gap-4"
            >
              <Button className="h-12 px-8 text-base" asChild>
                <Link to="/services">Explore Our Universe</Link>
              </Button>
              <Button variant="outline" className="h-12 px-8 text-base" asChild>
                <Link to="/contact">Get Started</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex gap-8 pt-2"
            >
              {[
                { val: "52+", lbl: "Projects" },
                { val: "30+", lbl: "Clients" },
                { val: "5+", lbl: "Years" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-bold text-primary">
                    {s.val}
                  </span>
                  <span className="text-xs text-muted-foreground tracking-wider uppercase">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [0.4, 0]) }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-muted-foreground to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
