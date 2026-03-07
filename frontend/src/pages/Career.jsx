import { useState, useEffect, useRef } from "react";
import { ArrowRight, MapPin, Clock, ChevronRight } from "lucide-react";

const jobs = [
  {
    title: "Frontend Developer (React)",
    category: "Frontend",
    location: "Remote / India",
    type: "Full Time",
  },
  {
    title: "Node.js Backend Developer",
    category: "Backend",
    location: "Remote",
    type: "Full Time",
  },
  {
    title: "AR/VR Developer",
    category: "AR/VR",
    location: "Hybrid",
    type: "Contract",
  },
];

const perks = [
  { emoji: "🚀", text: "Work on advanced technologies" },
  { emoji: "📈", text: "Fast growth & learning environment" },
  { emoji: "🌍", text: "Flexible remote-friendly culture" },
];

const hiringSteps = [
  "Apply Online",
  "Initial Screening",
  "Technical Interview",
  "Final Offer",
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

function Reveal({ children, delay = 0 }) {
  const [ref, v] = useReveal(delay);
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : "translateY(22px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Form ─── */
function ApplicationForm({ formData, setFormData }) {
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    const data = new FormData();
    Object.keys(formData).forEach((k) => data.append(k, formData[k]));
    if (resume) data.append("resume", resume);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/mail/career`, {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
    setLoading(false);
  };

  const inputStyle = (name) => ({
    width: "100%",
    background:
      focused === name ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
    border: `1px solid ${focused === name ? "rgba(129,140,248,0.5)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 10,
    padding: "12px 16px",
    color: "#fff",
    fontSize: "0.88rem",
    fontFamily: "'Oxanium', sans-serif",
    outline: "none",
    transition: "all 0.25s",
    boxShadow: focused === name ? "0 0 0 3px rgba(129,140,248,0.1)" : "none",
  });

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused("")}
          required
          style={inputStyle("name")}
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused("")}
          required
          style={inputStyle("email")}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          onFocus={() => setFocused("phone")}
          onBlur={() => setFocused("")}
          style={inputStyle("phone")}
        />
        <input
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          onFocus={() => setFocused("position")}
          onBlur={() => setFocused("")}
          style={inputStyle("position")}
        />
      </div>
      <textarea
        name="message"
        placeholder="Tell us about yourself..."
        rows={4}
        value={formData.message}
        onChange={handleChange}
        onFocus={() => setFocused("message")}
        onBlur={() => setFocused("")}
        style={{ ...inputStyle("message"), resize: "vertical", minHeight: 110 }}
      />

      {/* File upload */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "rgba(255,255,255,0.02)",
          border: "1px dashed rgba(255,255,255,0.12)",
          borderRadius: 10,
          padding: "12px 16px",
          cursor: "pointer",
          color: "rgba(255,255,255,0.35)",
          fontSize: "0.83rem",
          fontFamily: "'Oxanium',sans-serif",
          transition: "border-color 0.25s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.borderColor = "rgba(129,140,248,0.4)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")
        }
      >
        <span style={{ color: "#818cf8", fontSize: "0.8rem" }}>📎</span>
        {resume ? (
          <span style={{ color: "rgba(255,255,255,0.6)" }}>{resume.name}</span>
        ) : (
          "Attach Resume (PDF, DOC)"
        )}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          style={{ display: "none" }}
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          background: loading
            ? "rgba(129,140,248,0.4)"
            : "linear-gradient(135deg, #818cf8, #c084fc)",
          color: "#fff",
          border: "none",
          borderRadius: 50,
          padding: "13px 32px",
          marginTop: 4,
          fontFamily: "'Oxanium',sans-serif",
          fontWeight: 700,
          fontSize: "0.85rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 4px 20px rgba(129,140,248,0.3)",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 8px 28px rgba(129,140,248,0.45)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(129,140,248,0.3)";
        }}
      >
        {loading ? (
          "Submitting…"
        ) : (
          <>
            <ArrowRight size={14} /> Submit Application
          </>
        )}
      </button>

      {status === "success" && (
        <p
          style={{
            color: "#34d399",
            fontSize: "0.83rem",
            textAlign: "center",
            background: "rgba(52,211,153,0.08)",
            border: "1px solid rgba(52,211,153,0.2)",
            borderRadius: 8,
            padding: 10,
          }}
        >
          ✓ Application submitted successfully!
        </p>
      )}
      {status === "error" && (
        <p
          style={{
            color: "#fb923c",
            fontSize: "0.83rem",
            textAlign: "center",
            background: "rgba(251,146,60,0.08)",
            border: "1px solid rgba(251,146,60,0.2)",
            borderRadius: 8,
            padding: 10,
          }}
        >
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

/* ─── Main ─── */
const Career = () => {
  const [filter, setFilter] = useState("All");
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  });
  const formRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setMounted(true), 60);
  }, []);

  const handleApplyClick = (jobTitle) => {
    setFormData((prev) => ({ ...prev, position: jobTitle }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredJobs = jobs.filter(
    (j) => filter === "All" || j.category === filter,
  );

  return (
    <div className="cr-root">

      {/* ════ HERO ════ */}
      <section
        style={{
          position: "relative",
          padding: "130px 24px 80px",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div className="cr-grid" />
        <div
          style={{
            position: "absolute",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: 500,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(129,140,248,0.14) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 640,
            margin: "0 auto",
          }}
        >
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
              transform: mounted ? "none" : "translateY(-10px)",
              transition: "all 0.7s ease",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#818cf8",
                boxShadow: "0 0 8px #818cf8",
              }}
            />
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#a5b4fc",
              }}
            >
              We're Hiring
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Oxanium',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.06,
              color: "#fff",
              marginBottom: 20,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(20px)",
              transition: "all 0.85s ease 0.1s",
            }}
          >
            Build the Future with{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Attractify
            </span>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.42)",
              fontSize: "0.97rem",
              lineHeight: 1.85,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(14px)",
              transition: "all 0.85s ease 0.2s",
            }}
          >
            Join a team building cutting-edge solutions in AI, AR/VR, IoT, and
            SaaS platforms.
          </p>
        </div>
      </section>

      {/* ════ WHY JOIN ════ */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 36 }}>
              <span className="cr-label">Benefits</span>
              <h2
                style={{
                  fontFamily: "'Oxanium',sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Why Join Attractify?
              </h2>
            </div>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
              gap: 14,
            }}
          >
            {perks.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="cr-perk">
                  <span style={{ fontSize: "1.4rem" }}>{p.emoji}</span>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════ DIVIDER ════ */}
      <div style={{ padding: "0 24px", marginBottom: 72 }}>
        <div
          className="cr-divider"
          style={{ maxWidth: 1000, margin: "0 auto" }}
        />
      </div>

      {/* ════ OPEN POSITIONS ════ */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: 16,
                marginBottom: 28,
              }}
            >
              <div>
                <span className="cr-label">Opportunities</span>
                <h2
                  style={{
                    fontFamily: "'Oxanium',sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Open Positions
                </h2>
              </div>
              {/* Filters */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["All", "Frontend", "Backend", "AR/VR"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`cr-filter-btn${filter === f ? " active" : ""}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filteredJobs.map((job, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="cr-job-card">
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Oxanium',sans-serif",
                        fontWeight: 700,
                        fontSize: "0.98rem",
                        color: "#fff",
                        marginBottom: 6,
                      }}
                    >
                      {job.title}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          color: "rgba(255,255,255,0.35)",
                          fontSize: "0.78rem",
                        }}
                      >
                        <MapPin size={11} /> {job.location}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          color: "rgba(255,255,255,0.35)",
                          fontSize: "0.78rem",
                        }}
                      >
                        <Clock size={11} /> {job.type}
                      </span>
                      <span
                        style={{
                          background: "rgba(129,140,248,0.1)",
                          border: "1px solid rgba(129,140,248,0.2)",
                          borderRadius: 50,
                          padding: "2px 10px",
                          fontSize: "0.7rem",
                          color: "#a5b4fc",
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {job.category}
                      </span>
                    </div>
                  </div>
                  <button
                    className="cr-apply-btn"
                    onClick={() => handleApplyClick(job.title)}
                  >
                    Apply <ChevronRight size={13} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════ DIVIDER ════ */}
      <div style={{ padding: "0 24px", marginBottom: 72 }}>
        <div
          className="cr-divider"
          style={{ maxWidth: 1000, margin: "0 auto" }}
        />
      </div>

      {/* ════ HIRING PROCESS ════ */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 36, textAlign: "center" }}>
              <span className="cr-label">Process</span>
              <h2
                style={{
                  fontFamily: "'Oxanium',sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Hiring Process
              </h2>
            </div>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
              gap: 14,
              alignItems: "stretch",
            }}
          >
            {hiringSteps.map((step, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="cr-step">
                  <div
                    style={{
                      fontFamily: "'Oxanium',sans-serif",
                      fontSize: "2.2rem",
                      fontWeight: 800,
                      color: "rgba(129,140,248,0.15)",
                      lineHeight: 1,
                      marginBottom: 10,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                    }}
                  >
                    {step}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════ DIVIDER ════ */}
      <div style={{ padding: "0 24px", marginBottom: 72 }}>
        <div
          className="cr-divider"
          style={{ maxWidth: 1000, margin: "0 auto" }}
        />
      </div>

      {/* ════ APPLICATION FORM ════ */}
      <section ref={formRef} style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 32 }}>
              <span className="cr-label">Applications</span>
              <h2
                style={{
                  fontFamily: "'Oxanium',sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Apply Now
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                padding: "36px 32px",
              }}
            >
              <ApplicationForm formData={formData} setFormData={setFormData} />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Career;
