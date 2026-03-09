import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Target,
  Eye,
  Zap,
  Shield,
  Award,
} from "lucide-react";

/* ─── Data ─── */
const stats = [
  { end: 53, suffix: "+", label: "Projects Delivered" },
  { end: 30, suffix: "+", label: "Happy Clients" },
  { end: 5, suffix: "+", label: "Years Experience" },
  { end: 13, suffix: "+", label: "AI Solutions Built" },
];

const values = [
  {
    icon: Zap,
    title: "Innovation",
    desc: "We continuously explore emerging technologies to stay ahead of what's possible.",
    color: "#818cf8",
  },
  {
    icon: Shield,
    title: "Integrity",
    desc: "Transparency and trust guide every decision we make with our clients.",
    color: "#34d399",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "We deliver quality work and measurable results — nothing less.",
    color: "#fb923c",
  },
];

const techNames = [
  "Business Intelligence",
  "Predictive Analysis",
  "Microsoft Services",
  "Axial Core Motors",
  "Bi-Polar Switching Induction Motor",
  "Electronic Controlled Module",
  "Mobile App development",
];

/* ─── Hooks ─── */
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

function CountUp({ end, suffix = "", delay = 0 }) {
  const [count, setCount] = useState(0);
  const [ref, v] = useReveal(delay);
  useEffect(() => {
    if (!v) return;
    let start = null;
    const duration = 1600;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(ease * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [v]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Form ─── */
function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [focused, setFocused] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    // DEMO MODE: Simulate a successful submission
    setTimeout(() => {
      setStatus("success");
      setForm({ firstName: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1200);
  };

  const inputStyle = (name) => ({
    width: "100%",
    background:
      focused === name ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.02)",
    border: `1px solid ${focused === name ? "rgba(129,140,248,0.5)" : "rgba(0,0,0,0.08)"}`,
    borderRadius: 10,
    padding: "13px 16px",
    color: "#000",
    fontSize: "0.9rem",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "all 0.25s",
    boxShadow: focused === name ? "0 0 0 3px rgba(129,140,248,0.1)" : "none",
  });

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: 14 }}>
        <input
          name="firstName"
          placeholder="Your Name"
          value={form.firstName}
          onChange={handleChange}
          onFocus={() => setFocused("firstName")}
          onBlur={() => setFocused("")}
          required
          style={inputStyle("firstName")}
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused("")}
          required
          style={inputStyle("email")}
        />
      </div>
      <input
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
        onFocus={() => setFocused("subject")}
        onBlur={() => setFocused("")}
        style={inputStyle("subject")}
      />
      <textarea
        name="message"
        placeholder="Your message..."
        rows={5}
        value={form.message}
        onChange={handleChange}
        onFocus={() => setFocused("message")}
        onBlur={() => setFocused("")}
        required
        style={{ ...inputStyle("message"), resize: "vertical", minHeight: 130 }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading
            ? "rgba(129,140,248,0.5)"
            : "linear-gradient(135deg, #818cf8, #c084fc)",
          color: "#0f172a",
          border: "none",
          borderRadius: 50,
          padding: "13px 32px",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "0.88rem",
          letterSpacing: "0.04em",
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          justifyContent: "center",
          transition: "all 0.3s",
          boxShadow: "0 4px 20px rgba(129,140,248,0.3)",
          transform: loading ? "none" : undefined,
        }}
        onMouseEnter={(e) => {
          if (!loading) e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 28px rgba(129,140,248,0.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(129,140,248,0.3)";
        }}
      >
        {loading ? (
          "Sending…"
        ) : (
          <>
            <ArrowRight size={15} /> Send Message
          </>
        )}
      </button>

      {status === "success" && (
        <p
          style={{
            color: "#34d399",
            fontSize: "0.85rem",
            textAlign: "center",
            background: "rgba(52,211,153,0.08)",
            border: "1px solid rgba(52,211,153,0.2)",
            borderRadius: 8,
            padding: "10px",
          }}
        >
          ✓ Message sent successfully!
        </p>
      )}
      {status === "error" && (
        <p
          style={{
            color: "#fb923c",
            fontSize: "0.85rem",
            textAlign: "center",
            background: "rgba(251,146,60,0.08)",
            border: "1px solid rgba(251,146,60,0.2)",
            borderRadius: 8,
            padding: "10px",
          }}
        >
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

/* ─── Main ─── */
const About = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 60);
  }, []);

  return (
    <div className="abt">

      {/* ════ HERO ════ */}
      <section
        style={{
          position: "relative",
          padding: "130px 24px 80px",
          overflow: "hidden",
        }}
      >
        <div className="abt-grid" />
        <div
          className="orb-a"
          style={{
            position: "absolute",
            top: -120,
            left: "15%",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(129,140,248,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        <div
          className="orb-b"
          style={{
            position: "absolute",
            top: -60,
            right: "10%",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            width: "90%", maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(129,140,248,0.1)",
                border: "1px solid rgba(129,140,248,0.25)",
                borderRadius: 50,
                padding: "5px 16px",
                marginBottom: 28,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "none" : "translateY(-12px)",
                transition: "all 0.7s ease",
              }}
            >
              <Sparkles size={12} color="#818cf8" />
              <span
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#6366f1",
                }}
              >
                About Us
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#0f172a",
                marginBottom: 22,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "none" : "translateY(20px)",
                transition: "all 0.8s ease 0.1s",
              }}
            >
              Building{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Intelligent
              </span>
              <br />
              Digital Experiences
            </h1>

            <p
              style={{
                color: "#475569",
                fontSize: "1rem",
                lineHeight: 1.8,
                width: "100%", maxWidth: "440px",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "none" : "translateY(16px)",
                transition: "all 0.8s ease 0.22s",
              }}
            >
              Agile ICO helps businesses innovate using Artificial
              Intelligence, Machine Learning, AR/VR, IoT and advanced digital
              solutions.
            </p>
          </div>

          {/* Right — decorative card stack */}
          <Reveal delay={200} y={30}>
            <div style={{ position: "relative", height: 340 }}>
              {/* Background card */}
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  right: -20,
                  bottom: -20,
                  background: "rgba(129,140,248,0.06)",
                  border: "1px solid rgba(129,140,248,0.12)",
                  borderRadius: 24,
                }}
              />
              {/* Main card */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 22,
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "rgba(0,0,0,0.3)",
                      fontSize: "0.72rem",
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    Our Focus
                  </p>
                  {[
                    { text: "Business Intelligence", color: "#818cf8" },
                    { text: "Predictive Analytics", color: "#34d399" },
                    { text: "Microsoft Services", color: "#c084fc" },
                    { text: "Axial Core Motors", color: "#38bdf8" },
                    { text: "Bi-Polar Switching Induction Motor", color: "#f87171" }, // 🔥 red glow
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 0",
                        borderBottom: "1px solid rgba(0,0,0,0.05)",
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: item.color,
                          boxShadow: `0 0 8px ${item.color}`,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          color: "#334155",
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12 }}>
                  <span
                    style={{
                      color: "rgba(0,0,0,0.35)",
                      fontSize: "0.75rem",
                    }}
                  >
                    Agile ICO
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>



      {/* ════ MISSION & VISION ════ */}
      <section style={{ padding: "90px 24px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
            gap: 24,
          }}
        >
          {[
            {
              icon: Target,
              label: "Mission",
              title: "Our Mission",
              color: "#818cf8",
              text: "Our mission is to empower businesses through intelligent technology solutions that improve efficiency, enhance decision-making, and accelerate innovation.",
            },
            {
              icon: Eye,
              label: "Vision",
              title: "Our Vision",
              color: "#c084fc",
              text: "We envision a future where AI, IoT, and immersive technologies seamlessly integrate into everyday business operations — enabling smarter industries and sustainable growth.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={i} delay={i * 100}>
                <div
                  style={{
                    background: "rgba(0,0,0,0.02)",
                    border: "1px solid rgba(0,0,0,0.07)",
                    borderRadius: 20,
                    padding: "36px 32px",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 13,
                      background: `${item.color}14`,
                      border: `1px solid ${item.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    <Icon size={22} color={item.color} strokeWidth={1.5} />
                  </div>
                  <span className="abt-section-label">{item.label}</span>
                  <h2
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 800,
                      fontSize: "1.5rem",
                      color: "#0f172a",
                      marginBottom: 14,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.title}
                  </h2>
                  <p
                    style={{
                      color: "#475569",
                      lineHeight: 1.8,
                      fontSize: "0.92rem",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ════ CORE VALUES ════ */}
      <section style={{ padding: "0 24px 90px" }}>
        <div style={{ width: "90%", maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 48 }}>
              <span className="abt-section-label">What We Stand For</span>
              <h2 className="abt-section-title">Our Core Values</h2>
            </div>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
              gap: 18,
            }}
          >
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={i} delay={i * 90}>
                  <div className="abt-value-card">
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 12,
                        background: `${v.color}14`,
                        border: `1px solid ${v.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 18,
                      }}
                    >
                      <Icon size={20} color={v.color} strokeWidth={1.5} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "#0f172a",
                        marginBottom: 10,
                      }}
                    >
                      {v.title}
                    </h3>
                    <p
                      style={{
                        color: "#64748b",
                        fontSize: "0.85rem",
                        lineHeight: 1.75,
                      }}
                    >
                      {v.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ TECH MARQUEE ════ */}
      <section
        style={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "16px 0" }}>
          <div className="abt-marquee">
            {[...techNames, ...techNames].map((name, i) => (
              <div
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "0 30px",
                  color: "rgba(0,0,0,0.35)",
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {name}{" "}
                <span
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: "rgba(129,140,248,0.5)",
                    display: "inline-block",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CONTACT ════ */}
      <section style={{ padding: "90px 24px" }}>
        <div
          style={{
            width: "90%", maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* Left info */}
          <Reveal>
            <div>
              <span className="abt-section-label">Get In Touch</span>
              <h2 className="abt-section-title" style={{ marginBottom: 20 }}>
                Let's Build Something
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #818cf8, #c084fc)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Together
                </span>
              </h2>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.93rem",
                  lineHeight: 1.8,
                  marginBottom: 36,
                  width: "100%", maxWidth: "380px",
                }}
              >
                Have an idea or project in mind? We'd love to hear from you.
                Fill out the form and we'll get back to you shortly.
              </p>

              {/* Info pills */}
              {["hello@agileico.com", "Available Mon–Fri, 9am–6pm IST"].map(
                (text, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#818cf8",
                        boxShadow: "0 0 8px #818cf8",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        color: "#64748b",
                        fontSize: "0.85rem",
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ),
              )}
            </div>
          </Reveal>

          {/* Right form */}
          <Reveal delay={100}>
            <div
              style={{
                background: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: 22,
                padding: "36px 32px",
              }}
            >
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════ BOTTOM CTA ════ */}
      <section
        style={{
          padding: "80px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(129,140,248,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <Reveal>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
                color: "#0f172a",
                letterSpacing: "-0.02em",
                marginBottom: 14,
              }}
            >
              Ready to get started?
            </h2>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.95rem",
                marginBottom: 36,
              }}
            >
              Let's turn your idea into an intelligent solution.
            </p>
            <Link to="/contact" className="abt-cta-btn">
              Schedule a Call <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default About;
