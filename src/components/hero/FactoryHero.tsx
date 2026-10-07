import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroBg from "@/assets/images/facility-entrance.jpg";

const stages = [
  {
    label: "Welcome",
    title: "Welcome to Kolli Graphics",
    machine: "Hyderabad - Since 2009",
    copy: "We are a fully committed, service-oriented premier finishing company providing high-quality craftsmanship and service in a timely manner. We work tirelessly to meet your deadlines & deliver products that exceed customers' expectations. Our motto is Quality & Customer Service First.",
  },
  {
    label: "Pre-press & feeding",
    title: "Quality begins with pre-press",
    machine: "Experienced pre-press team - FBB, SCB & Greyback boards",
    copy: "Our pre-press experts prepare meticulous colour separation and generate accurate plates for printing.",
  },
  {
    label: "Offset printing",
    title: "Colours printed perfectly",
    machine: "Heidelberg CD 102 5 XL - Komori Lithrone 40 6-colour + UV",
    copy: "Offset printing with colour clarity and consistency printing.",
  },
  {
    label: "Coating & varnish",
    title: "A premium finish",
    machine: "Online aqueous coater - Full UV coating",
    copy: "Aqua, matt, satin, UV and textured UV varnishes protect every carton and help to embellished",
  },
  {
    label: "Die cutting & foil",
    title: "Cut, creased & embossing",
    machine: "BOBST die cutters - BOBST foil stamping",
    copy: "Precision die cutting shapes every sheet into accurate carton blanks, then foil and embossing add luxury.",
  },
  {
    label: "Folding & inspection",
    title: "Folded, glued, verified",
    machine: "DGM Media folder-gluer with - Online inspection system · Focus FS – SHARK 500 - offline inspection",
    copy: "High-speed folding and gluing with cold and hot melt, with every carton checked by an online / offline inspection systems before finishing.",
  },
  {
    label: "Packed & delivered",
    title: "Ready to exceed expectations",
    machine: "Handypack to collate cartons and ATS banding for paper banding and Automatic box sealing",
    copy: "Finished cartons are collected, banded and sealed, then delivered on time.",
  },
];

const STAGE_DURATION = 3500; // ms per stage

export function FactoryHero() {
  const [stage, setStage] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToStage = (idx: number) => {
    if (idx === stage) return;
    // fade out → change → fade in
    setVisible(false);
    setTimeout(() => {
      setStage(idx);
      setVisible(true);
    }, 380);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setStage((prev) => {
          const next = (prev + 1) % stages.length;
          return next;
        });
        setVisible(true);
      }, 380);
    }, STAGE_DURATION);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const current = stages[stage]!;

  return (
    <div className="factory-hero-scroll-wrapper" style={{ height: "100vh" }}>
      <div className="factory-hero-sticky" style={{ position: "relative" }}>
        <section className="factory-hero-section">

          {/* ── Background: facility photo ── */}
          <div className="factory-hero-canvas">
            <img
              src={heroBg}
              alt="Kolli Graphics Hyderabad facility"
              className="factory-hero-img"
            />
          </div>
          <div className="factory-vignette" />

          {/* ── Stage nav (right side) ── */}
          <nav className="factory-stage-nav" aria-label="Manufacturing stages">
            {stages.map((s, i) => (
              <button
                key={s.label}
                onClick={() => {
                  goToStage(i);
                  // restart the auto-timer from this point
                  startTimer();
                }}
                className={`factory-stage-btn ${i === stage ? "active" : ""}`}
              >
                <span className="factory-stage-label">{s.label}</span>
                <span className="factory-stage-line" />
              </button>
            ))}
          </nav>

          {/* ── Text content ── */}
          <div className="factory-hero-content">
            <div
              key={stage}
              className="factory-welcome-box"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.38s ease, transform 0.38s ease",
              }}
            >
              {stage === 0 ? (
                <>
                  <div className="factory-stage-badge">
                    <span className="factory-badge-line" />
                    Welcome
                  </div>
                  <h1 className="factory-hero-title">
                    Welcome to <span className="factory-title-highlight">Kolli</span> Graphics
                  </h1>
                  <p className="factory-hero-copy">{current.copy}</p>
                  <p className="factory-founders">Ranga Reddy Kolli - Parasurami Reddy Kolli — Founders</p>
                </>
              ) : (
                <>
                  <div className="factory-stage-badge">
                    <span>0{stage}</span>
                    <span className="factory-badge-line" />
                    {current.label}
                  </div>
                  <h2 className="factory-hero-title">{current.title}</h2>
                  <div className="factory-machine-tag">{current.machine}</div>
                  <p className="factory-hero-copy">{current.copy}</p>
                </>
              )}
            </div>

            {/* ── Progress pills + scroll hint ── */}
            <div className="factory-footer-controls">
              <div className="factory-progress-bar-container">
                {stages.map((s, i) => (
                  <button
                    key={s.label}
                    aria-label={s.label}
                    onClick={() => {
                      goToStage(i);
                      startTimer();
                    }}
                    className={`factory-progress-step ${i === stage ? "active" : i < stage ? "completed" : ""}`}
                  >
                    <span className="factory-progress-track">
                      <span
                        className="factory-progress-fill"
                        style={{ width: i < stage ? "100%" : i === stage ? "100%" : "0%" }}
                      />
                    </span>
                  </button>
                ))}
              </div>

              <button
                className="factory-scroll-btn"
                aria-label="Scroll to explore"
                onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
              >
                <ChevronDown size={16} className="factory-scroll-arrow" />
                <span>Explore Website</span>
              </button>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
