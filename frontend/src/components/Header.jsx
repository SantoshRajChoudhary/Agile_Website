import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, FileText, Layers, Users, Info, Briefcase, Mail, Home } from "lucide-react";
import logo1 from "@/assets/logo1.png";

/* ─── Searchable site-wide data ─── */
const SEARCH_DATA = [
  // Pages
  { title: "Home", category: "Page", path: "/", keywords: "home landing welcome attractify", Icon: Home },
  { title: "What We Do Best", category: "Page", path: "/whatwedobest", keywords: "what we do services solutions overview", Icon: Layers },
  { title: "Who We Serve", category: "Page", path: "/who-we-serve", keywords: "industries clients manufacturing iot ai digital", Icon: Users },
  { title: "Our Thinking", category: "Page", path: "/services", keywords: "thinking services offerings technology", Icon: FileText },
  { title: "Our Products", category: "Page", path: "/products", keywords: "products platforms dashboard analytics iot ai", Icon: Layers },
  { title: "About Us", category: "Page", path: "/about", keywords: "about company team mission vision story", Icon: Info },
  { title: "Careers", category: "Page", path: "/career", keywords: "careers jobs hiring work join team", Icon: Briefcase },
  { title: "Contact", category: "Page", path: "/contact", keywords: "contact get in touch reach us email phone", Icon: Mail },

  // What We Do Best entries
  { title: "AI & Intelligent Automation", category: "What We Do", path: "/whatwedobest/ai-intelligent-automation", keywords: "ai artificial intelligence automation workflow machine learning smart operations", Icon: Layers },
  { title: "Custom Software Development", category: "What We Do", path: "/whatwedobest/custom-software-development", keywords: "software development web mobile app scalable engineering", Icon: Layers },
  { title: "Process Optimization", category: "What We Do", path: "/whatwedobest/process-optimization", keywords: "process optimization efficiency cost reduction streamline", Icon: Layers },
  { title: "Cloud & Scalable Solutions", category: "What We Do", path: "/whatwedobest/cloud-scalable-solutions", keywords: "cloud architecture aws scalable secure infrastructure", Icon: Layers },

  // Services
  { title: "AI Development", category: "Service", path: "/services/ai-development", keywords: "ai development machine learning ml predictive analytics computer vision nlp model artificial intelligence", Icon: FileText },
  { title: "IoT Solutions", category: "Service", path: "/services/iot-solutions", keywords: "iot internet of things devices monitoring sensors smart automation", Icon: FileText },
  { title: "AR/VR Applications", category: "Service", path: "/services/ar-vr-applications", keywords: "ar vr augmented virtual reality immersive training visualization", Icon: FileText },
  { title: "Cloud Infrastructure", category: "Service", path: "/services/cloud-infrastructure", keywords: "cloud infrastructure devops ci cd deployment migration", Icon: FileText },
  { title: "Non-Destructive Testing", category: "Service", path: "/services/non-destructive-testing", keywords: "ndt non destructive testing inspection safety quality defect detection", Icon: FileText },
  { title: "Geospatial Intelligence", category: "Service", path: "/services/geospatial-intelligence", keywords: "geospatial mapping gis spatial analysis monitoring environment", Icon: FileText },

  // Industries
  { title: "Manufacturing & Industrial", category: "Industry", path: "/who-we-serve", keywords: "manufacturing industrial predictive maintenance inspection factory automation", Icon: Users },
  { title: "AI & Digital Startups", category: "Industry", path: "/who-we-serve", keywords: "startups digital ai platform growth scalable product", Icon: Users },
  { title: "Smart Cities & IoT", category: "Industry", path: "/who-we-serve", keywords: "smart cities iot infrastructure connected real time decision", Icon: Users },
];

function matchScore(item, query) {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  const haystack = `${item.title} ${item.keywords} ${item.category}`.toLowerCase();
  if (item.title.toLowerCase().startsWith(q)) return 3;
  if (item.title.toLowerCase().includes(q)) return 2;
  if (haystack.includes(q)) return 1;
  return 0;
}

function filterResults(query) {
  if (!query.trim()) return [];
  return SEARCH_DATA
    .map((item) => ({ ...item, score: matchScore(item, query) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 7);
}

/* ─── Component ─── */
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);

  // Search state
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchWrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Reset search when navigating
  useEffect(() => {
    setQuery("");
    setResults([]);
    setDropdownOpen(false);
    setActiveIndex(-1);
  }, [location.pathname]);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    const filtered = filterResults(val);
    setResults(filtered);
    setDropdownOpen(filtered.length > 0 || val.trim().length > 0);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!dropdownOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = activeIndex >= 0 ? results[activeIndex] : results[0];
      if (target) {
        navigate(target.path);
        setDropdownOpen(false);
        setQuery("");
      }
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
      setQuery("");
      setActiveIndex(-1);
      inputRef.current?.blur();
    }
  };

  const handleResultClick = (path) => {
    navigate(path);
    setDropdownOpen(false);
    setQuery("");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "What We Do", path: "/whatwedobest" },
    { name: "Who We Serve", path: "/who-we-serve" },
    { name: "Our Thinking", path: "/services" },
    { name: "Our Products", path: "/products" },
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

  const CATEGORY_COLORS = {
    Page: "#60a5fa",
    "What We Do": "#a78bfa",
    Service: "#34d399",
    Industry: "#fb923c",
  };

  return (
    <>
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
          <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.1" }}>
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

        {/* ── SEARCH (desktop) ── */}
        <div
          ref={searchWrapperRef}
          className="hide-mobile"
          style={{ position: "relative" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: dropdownOpen
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.05)",
              border: dropdownOpen
                ? "1px solid rgba(255,255,255,0.18)"
                : "1px solid rgba(255,255,255,0.09)",
              borderRadius: dropdownOpen && results.length > 0 ? "8px 8px 0 0" : "8px",
              padding: "5px 6px 5px 10px",
              transition: "all 0.2s ease",
              boxShadow: dropdownOpen ? "0 0 0 3px rgba(96,165,250,0.08)" : "none",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Search…"
              value={query}
              onChange={handleQueryChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (query.trim()) setDropdownOpen(true);
              }}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: "13px",
                width: "150px",
                caretColor: "#60a5fa",
              }}
            />
            <button
              onClick={() => {
                if (results.length > 0) {
                  navigate(results[0].path);
                  setDropdownOpen(false);
                  setQuery("");
                } else {
                  inputRef.current?.focus();
                }
              }}
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

          {/* ── SEARCH DROPDOWN ── */}
          {dropdownOpen && (
            <div className="search-dropdown">
              {results.length > 0 ? (
                results.map((item, i) => {
                  const Icon = item.Icon;
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={`${item.path}-${i}`}
                      className={`search-result-row${isActive ? " active" : ""}`}
                      onMouseEnter={() => setActiveIndex(i)}
                      onMouseLeave={() => setActiveIndex(-1)}
                      onClick={() => handleResultClick(item.path)}
                    >
                      <span
                        className="search-result-icon"
                        style={{ color: CATEGORY_COLORS[item.category] || "#60a5fa" }}
                      >
                        <Icon size={14} />
                      </span>
                      <span className="search-result-title">{item.title}</span>
                      <span
                        className="search-result-category"
                        style={{ color: CATEGORY_COLORS[item.category] || "#60a5fa" }}
                      >
                        {item.category}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="search-no-results">
                  No results for "<strong>{query}</strong>"
                </div>
              )}
            </div>
          )}
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
          maxHeight: mobileOpen ? "500px" : "0px",
          overflow: "hidden",
          transition: "all 0.3s ease",
          display: "none",
        }}
      >
        {/* Mobile search */}
        <MobileSearch navigate={navigate} />

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

/* ─── Mobile Search sub-component ─── */
function MobileSearch({ navigate }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    const filtered = filterResults(val);
    setResults(filtered);
    setOpen(val.trim().length > 0);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      navigate(results[0].path);
      setQuery("");
      setOpen(false);
    } else if (e.key === "Escape") {
      setQuery("");
      setOpen(false);
    }
  };

  return (
    <div style={{ marginBottom: "12px", position: "relative" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: open && results.length > 0 ? "8px 8px 0 0" : "8px",
          padding: "8px 12px",
        }}
      >
        <Search size={15} style={{ color: "rgba(255,255,255,0.4)" }} />
        <input
          type="text"
          placeholder="Search…"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKey}
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

      {open && (
        <div className="search-dropdown search-dropdown--mobile">
          {results.length > 0 ? (
            results.map((item, i) => {
              const Icon = item.Icon;
              return (
                <button
                  key={i}
                  className="search-result-row"
                  onClick={() => {
                    navigate(item.path);
                    setQuery("");
                    setOpen(false);
                  }}
                >
                  <span className="search-result-icon" style={{ color: "#60a5fa" }}>
                    <Icon size={14} />
                  </span>
                  <span className="search-result-title">{item.title}</span>
                  <span className="search-result-category">{item.category}</span>
                </button>
              );
            })
          ) : (
            <div className="search-no-results">
              No results for "<strong>{query}</strong>"
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
