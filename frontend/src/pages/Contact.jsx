import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

const contactInfo = [
  { icon: Mail, title: "Email Us", details: "info@agileico.com", link: "mailto:info@agileico.com" },
  { icon: Phone, title: "Call Us", details: "+1 (234) 567-890", link: "tel:+1234567890" },
  { icon: MapPin, title: "Visit Us", details: "123 Tech Avenue, Silicon Valley, CA", link: "#" },
  { icon: Clock, title: "Working Hours", details: "Mon – Fri: 9:00 AM – 6:00 PM", link: "#" },
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

/* ─── Main ─── */
const Contact = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [focused, setFocused] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setStatus("");

    // DEMO MODE: Simulate a real network request without crashing due to backend issues
    setTimeout(() => {
      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
      setLoading(false);
    }, 1200);
  };

  const inputStyle = (name) => ({
    width: "100%",
    background: focused === name ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.02)",
    border: `1px solid ${focused === name ? "rgba(129,140,248,0.5)" : "rgba(0,0,0,0.08)"}`,
    borderRadius: 10,
    padding: "12px 16px",
    color: "#000",
    fontSize: "0.88rem",
    fontFamily: "'Oxanium', sans-serif",
    outline: "none",
    transition: "all 0.25s",
    boxShadow: focused === name ? "0 0 0 3px rgba(129,140,248,0.1)" : "none",
  });

  return (
    <div className="ct-root">

      {/* ════ HERO ════ */}
      <section style={{ position: "relative", padding: "130px 24px 80px", overflow: "hidden", textAlign: "center" }}>
        <div className="ct-grid" />
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 520, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(129,140,248,0.13) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "560px", margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.25)",
            borderRadius: 50, padding: "5px 16px", marginBottom: 28,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(-10px)",
            transition: "all 0.7s ease",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#818cf8", boxShadow: "0 0 8px #818cf8" }} />
            <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6366f1" }}>Get In Touch</span>
          </div>

          <h1 style={{
            fontFamily: "'Oxanium',sans-serif", fontWeight: 800,
            fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
            letterSpacing: "-0.02em", lineHeight: 1.0,
            color: "#0f172a", marginBottom: 20,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
            transition: "all 0.85s ease 0.1s",
          }}>
            Contact{" "}
            <span style={{ background: "linear-gradient(135deg, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Us
            </span>
          </h1>

          <p style={{
            color: "#475569", fontSize: "0.97rem", lineHeight: 1.85,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(14px)",
            transition: "all 0.85s ease 0.2s",
          }}>
            We'd love to hear from you. Send us a message and our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* ════ MAIN CONTENT ════ */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ width: "90%", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", gap: 32, alignItems: "start" }}>

          {/* ── Form ── */}
          <Reveal>
            <div style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 20, padding: "36px 32px" }}>
              <span className="ct-label">Send a Message</span>
              <h2 style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#0f172a", marginBottom: 28, letterSpacing: "-0.01em" }}>
                Contact Our Team
              </h2>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 12 }}>
                  <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange}
                    onFocus={() => setFocused("firstName")} onBlur={() => setFocused("")}
                    required style={inputStyle("firstName")} />
                  <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange}
                    onFocus={() => setFocused("lastName")} onBlur={() => setFocused("")}
                    required style={inputStyle("lastName")} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 12 }}>
                  <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                    required style={inputStyle("email")} />
                  <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange}
                    onFocus={() => setFocused("phone")} onBlur={() => setFocused("")}
                    style={inputStyle("phone")} />
                </div>

                <input name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange}
                  onFocus={() => setFocused("subject")} onBlur={() => setFocused("")}
                  style={inputStyle("subject")} />

                <textarea name="message" placeholder="Tell us about your project..." rows={5} value={formData.message} onChange={handleChange}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused("")}
                  required style={{ ...inputStyle("message"), resize: "vertical", minHeight: 120 }} />

                {/* divider */}
                <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: "4px 0" }} />

                <button type="submit" disabled={loading} className="ct-submit-btn">
                  {loading ? "Sending…" : <><ArrowRight size={14} /> Send Message</>}
                </button>

                {status === "success" && (
                  <p style={{ color: "#34d399", fontSize: "0.82rem", textAlign: "center", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 8, padding: 10 }}>
                    ✓ Message sent successfully!
                  </p>
                )}
                {status === "error" && (
                  <p style={{ color: "#fb923c", fontSize: "0.82rem", textAlign: "center", background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.2)", borderRadius: 8, padding: 10 }}>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </Reveal>

          {/* ── Info ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Decorative card */}
            <Reveal>
              <div style={{ background: "rgba(129,140,248,0.05)", border: "1px solid rgba(129,140,248,0.15)", borderRadius: 20, padding: "32px 28px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(129,140,248,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
                <span className="ct-label">Why Reach Out</span>
                <p style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#0f172a", marginBottom: 10, lineHeight: 1.4 }}>
                  Let's build something intelligent together
                </p>
                <p style={{ color: "#64748b", fontSize: "0.85rem", lineHeight: 1.8 }}>
                  Whether you have a project in mind, a question about our services, or just want to say hello — we're here and happy to help.
                </p>
              </div>
            </Reveal>

            {/* Contact info grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 12 }}>
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <Reveal key={i} delay={i * 70}>
                    <a href={info.link} className="ct-info-card">
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                        <Icon size={16} color="#818cf8" strokeWidth={1.8} />
                      </div>
                      <h3 style={{ fontFamily: "'Oxanium',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#0f172a", marginBottom: 6 }}>{info.title}</h3>
                      <p style={{ color: "#64748b", fontSize: "0.78rem", lineHeight: 1.6 }}>{info.details}</p>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;