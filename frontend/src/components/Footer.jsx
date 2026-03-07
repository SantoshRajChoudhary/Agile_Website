import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo1.png";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    { name: "Business Intelligence", path: "/services/business-intelligence" },
    { name: "Predictive Analysis", path: "/services/predictive-analysis" },
    { name: "Microsoft Services", path: "/services/microsoft-services" },
    { name: "Axial Core Motors", path: "/services/axial-core-motors" },
    { name: "Electronic Modules", path: "/services/electronic-controlled-module" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "#1877f2" },
    { icon: Twitter, href: "#", label: "Twitter", color: "#1da1f2" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "#0077b5" },
    { icon: Instagram, href: "#", label: "Instagram", color: "#e1306c" },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer style={{ position: "relative", background: "#f8fafc", overflow: "hidden" }}>

      {/* ── top glow bar (matches screenshot) ── */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "70%",
        height: "1px",
        background: "linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.8) 30%, rgba(139,92,246,0.8) 60%, rgba(52,211,153,0.5) 85%, transparent 100%)",
      }} />

      {/* top glow bloom */}
      <div style={{
        position: "absolute",
        top: "-60px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "120px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, rgba(96,165,250,0.10) 40%, transparent 70%)",
        filter: "blur(20px)",
        pointerEvents: "none",
      }} />

      {/* ambient corner glows */}
      <div style={{ position: "absolute", bottom: "20%", left: "-100px", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "30%", right: "-80px", width: "250px", height: "250px", background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* ── main grid ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "64px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "48px 40px" }}>

          {/* Brand column */}
          <div style={{ gridColumn: "span 1", display: "flex", flexDirection: "column", gap: "20px" }}>
            <Link to="/" style={{ display: "inline-flex", textDecoration: "none", marginBotton: "8px" }}>
              <img src={logo} alt="Agile ICO" style={{ height: "45px", width: "auto", objectFit: "contain" }} />
            </Link>

            <p style={{ fontSize: "13px", lineHeight: 1.75, color: "rgba(0,0,0,0.5)", maxWidth: "240px" }}>
              Empowering operations with advanced Business Intelligence, predictive insights, and high-performance engineering solutions.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "8px" }}>
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href} aria-label={s.label}
                    style={{
                      width: "34px", height: "34px", borderRadius: "8px",
                      background: "rgba(0,0,0,0.05)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "rgba(0,0,0,0.4)",
                      textDecoration: "none", transition: "all 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${s.color}22`;
                      e.currentTarget.style.border = `1px solid ${s.color}55`;
                      e.currentTarget.style.color = s.color;
                      e.currentTarget.style.boxShadow = `0 0 12px ${s.color}33`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(0,0,0,0.05)";
                      e.currentTarget.style.border = "1px solid rgba(0,0,0,0.08)";
                      e.currentTarget.style.color = "rgba(0,0,0,0.4)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "20px" }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    fontSize: "13.5px", color: "rgba(0,0,0,0.55)",
                    textDecoration: "none", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#60a5fa"; e.currentTarget.style.paddingLeft = "4px"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(0,0,0,0.55)"; e.currentTarget.style.paddingLeft = "0"; }}
                  >
                    <ChevronRight size={12} style={{ opacity: 0.4 }} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "20px" }}>
              Services
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {services.map((s) => (
                <li key={s.name}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    fontSize: "13.5px", color: "rgba(0,0,0,0.55)",
                    transition: "all 0.2s",
                    cursor: "default"
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#34d399"; e.currentTarget.style.paddingLeft = "4px"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(0,0,0,0.55)"; e.currentTarget.style.paddingLeft = "0"; }}
                  >
                    <ChevronRight size={12} style={{ opacity: 0.4 }} />
                    {s.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Contact */}
            <div>
              <h4 style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "20px" }}>
                Contact
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { icon: Mail, text: "bsdas@aicopl.com", href: "mailto:info@agileico.com" },
                  { icon: Phone, text: "7008532672", href: "tel:+917008532672" },
                  { icon: MapPin, text: "Bhubaneswar, OD, India", href: null },
                ].map(({ icon: Icon, text, href }) => (
                  <li key={text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{
                      width: "26px", height: "26px", borderRadius: "6px", flexShrink: 0,
                      background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={13} style={{ color: "#60a5fa" }} />
                    </span>
                    {href
                      ? <a href={href} style={{ fontSize: "13px", color: "rgba(0,0,0,0.55)", textDecoration: "none", lineHeight: 1.5 }}
                        onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(0,0,0,0.55)"}>{text}</a>
                      : <span style={{ fontSize: "13px", color: "rgba(0,0,0,0.55)", lineHeight: 1.5 }}>{text}</span>
                    }
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "14px" }}>
                Newsletter
              </h4>
              {subscribed ? (
                <div style={{
                  padding: "12px 16px", borderRadius: "10px",
                  background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.25)",
                  fontSize: "13px", color: "#34d399",
                }}>
                  ✓ You're subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "0" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Type your email..."
                    style={{
                      flex: 1, padding: "10px 14px",
                      background: "rgba(0,0,0,0.03)",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRight: "none",
                      borderRadius: "8px 0 0 8px",
                      color: "#000", fontSize: "13px", outline: "none",
                    }}
                  />
                  <button type="submit" style={{
                    padding: "10px 14px",
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    border: "1px solid rgba(96,165,250,0.3)",
                    borderLeft: "none",
                    borderRadius: "0 8px 8px 0",
                    color: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center",
                    transition: "opacity 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
              <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.3)", marginTop: "8px" }}>
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          marginTop: "48px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}>
          <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.35)" }}>
            © {new Date().getFullYear()} Agile ICO Pvt. Ltd. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
              <a key={t} href="#" style={{
                fontSize: "12px", color: "rgba(0,0,0,0.35)",
                textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(0,0,0,0.6)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(0,0,0,0.35)"}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;