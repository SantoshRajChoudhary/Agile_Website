import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Search, Menu, X } from "lucide-react";
import logo1 from "@/assets/logo1.png";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const navLinks = [
    { name: "What We Do", path: "/WhatWeDoBest" },
    { name: "Who We Serve", path: "/products" },
    { name: "Our Thinking", path: "/services" },
    { name: "About Us", path: "/about" },
  ];

  const navItemStyle = (active, path) => {
    const isHovered = hoveredPath === path;
    return {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      padding: "8px 14px",
      borderRadius: "8px",
      fontSize: "13.5px",
      fontWeight: 500,
      letterSpacing: "0.01em",
      color: active ? "#93c5fd" : isHovered ? "#fff" : "rgba(255,255,255,0.6)",
      textDecoration: "none",
      background: active
        ? "rgba(255,255,255,0.08)"
        : isHovered
        ? "rgba(255,255,255,0.06)"
        : "transparent",
      border: active
        ? "1px solid rgba(255,255,255,0.1)"
        : isHovered
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid transparent",
      transition: "all 0.2s ease",
      position: "relative",
      whiteSpace: "nowrap",
      textShadow: isHovered ? "0 0 10px rgba(96,165,250,0.9)" : "none",
    };
  };

  return (
    <>
      {/* ── CSS ── */}
      <style>{`
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0%;
          height: 2px;
          border-radius: 2px;
          background: #60a5fa;
          box-shadow:
            0 0 6px 1px rgba(96,165,250,0.9),
            0 0 14px 3px rgba(96,165,250,0.6),
            0 0 28px 6px rgba(96,165,250,0.3);
          transition: width 0.25s ease;
        }
        .nav-link-item:hover::after {
          width: 70%;
        }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hide-mobile { display: flex !important; }
        }
      `}</style>

      {/* ── TOP ACCENT LINE ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #3b82f6, #60a5fa, transparent)",
          zIndex: 1000,
        }}
      />

      {/* ── HEADER WRAPPER ── */}
      <header
        style={{
          position: "fixed",
          top: "2px",
          left: 0,
          right: 0,
          zIndex: 999,
          padding: "0 24px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled
            ? "rgba(10,10,20,0.85)"
            : "rgba(10,10,20,0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        {/* ── LOGO ── */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <img
            src={logo1}
            alt="Attractify Logo"
            style={{ height: "40px", width: "auto" }}
          />
          <div
  style={{
    display: "flex",
    flexDirection: "column",
    lineHeight: "1.1",
  }}
>
  {/* ATTRACTIFY */}
  <span
    style={{
      fontSize: "25px",
      fontWeight: 700,
      letterSpacing: "0.02em",
      background: "linear-gradient(90deg, #60a5fa, #22d3ee)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    Attractify
  </span>

  {/* TECHNOLOGY */}
  <span
    style={{
      fontSize: "15px",
      fontWeight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      background: "linear-gradient(90deg, #34d399, #60a5fa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      opacity: 0.9,
    }}
  >
    Technology
  </span>
</div>


        </Link>

        {/* ── NAV + CAREERS (desktop) ── */}
        <nav
          className="hide-mobile"
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="nav-link-item"
                style={navItemStyle(isActive, item.path)}
                onMouseEnter={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {item.name}
                {/* {isActive && <ChevronDown size={13} />} */}
              </Link>
            );
          })}

          {/* divider */}
          <div
            style={{
              width: "1px",
              height: "18px",
              background: "rgba(255,255,255,0.12)",
              margin: "0 6px",
            }}
          />

          {/* Careers */}
          <Link
            to="/career"
            className="nav-link-item"
            style={navItemStyle(location.pathname === "/career", "/career")}
            onMouseEnter={() => setHoveredPath("/career")}
            onMouseLeave={() => setHoveredPath(null)}
          >
            Careers
          </Link>
        </nav>

        {/* ── SEARCH ── */}
        {/* ── SEARCH ── */}
<div
  className="hide-mobile"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "8px",
    padding: "5px 6px 5px 10px",
    transition: "all 0.2s ease",
  }}
  onFocusCapture={(e) => {
    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.18)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(96,165,250,0.08)";
  }}
  onBlurCapture={(e) => {
    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.09)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
  {/* INPUT (no placeholder text) */}
  <input
  type="text"
  placeholder="Search"
  style={{
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "13px",
    width: "130px",
    caretColor: "#60a5fa",
  }}
/>


  {/* SEARCH ICON RIGHT SIDE */}
  <button
    style={{
      background: "rgba(255,255,255,0.07)",
      border: "none",
      borderRadius: "5px",
      padding: "4px",
      color: "rgba(255,255,255,0.45)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      transition: "all 0.2s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "rgba(255,255,255,0.14)";
      e.currentTarget.style.color = "#fff";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "rgba(255,255,255,0.07)";
      e.currentTarget.style.color = "rgba(255,255,255,0.45)";
    }}
  >
    <Search size={15} />
  </button>
</div>

        {/* ── MOBILE HAMBURGER ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="show-mobile"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.06)",
            color: "#fff",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* ── MOBILE MENU ── */}
      <div
        className="show-mobile"
        style={{
          position: "fixed",
          top: "62px",
          left: 0,
          right: 0,
          zIndex: 998,
          background: "rgba(10,10,20,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: mobileOpen ? "16px 20px 20px" : "0 20px",
          maxHeight: mobileOpen ? "400px" : "0px",
          overflow: "hidden",
          transition: "all 0.3s ease",
          display: "none",
        }}
      >
        {/* mobile search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "8px",
            padding: "8px 12px",
            marginBottom: "12px",
          }}
        >
          <Search size={15} style={{ color: "rgba(255,255,255,0.4)" }} />
          <input
            type="text"
            placeholder="Search..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: "13px",
              width: "100%",
              caretColor: "#60a5fa",
            }}
          />
        </div>

        {/* nav links + careers */}
        {[...navLinks, { name: "Careers", path: "/career" }].map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="nav-link-item"
              style={{
                display: "block",
                padding: "11px 14px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                color: isActive ? "#93c5fd" : "rgba(255,255,255,0.65)",
                textDecoration: "none",
                background: isActive ? "rgba(255,255,255,0.07)" : "transparent",
                marginBottom: "4px",
                transition: "all 0.2s ease",
                position: "relative",
              }}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Header;