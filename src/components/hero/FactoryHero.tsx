import { Canvas } from "@react-three/fiber";
import { ChevronDown, Mouse } from "lucide-react";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FactoryScene } from "./FactoryScene";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { label: "Welcome", title: "Welcome to Kolli Graphics", machine: "Hyderabad · Since 2009", copy: "" },
  { label: "Pre-press & feeding", title: "Quality begins with pre-press", machine: "Experienced pre-press team · FBB, SCB & Greyback boards", copy: "Our pre-press experts prepare colour-accurate plates while premium paperboard is fed into the line sheet by sheet." },
  { label: "Offset printing", title: "Colour, printed perfectly", machine: "Heidelberg CD 102 5 XL · Komori Lithrone 40 6-colour + UV", copy: "Offset printing with automatic colour sensing means there is zero chance of uneven colour." },
  { label: "Coating & varnish", title: "A premium finish", machine: "Online aqueous coater · Full UV", copy: "Aqua, matt, satin, UV and textured UV varnishes protect every carton and help it stand out on the shelf." },
  { label: "Die cutting & foil", title: "Cut, creased & embellished", machine: "BOBST die cutters · BOBST foil stamping", copy: "Precision die cutting shapes every sheet into accurate carton blanks, then foil and embossing add luxury." },
  { label: "Folding & inspection", title: "Folded, glued, verified", machine: "BOBST Media folder-gluer · Online inspection system", copy: "High-speed folding and gluing with cold and hot melt, with every carton checked by an online inspection system." },
  { label: "Packed & delivered", title: "Ready to exceed expectations", machine: "Handypack · ATS banding · Automatic box sealing", copy: "Finished Kolli cartons are collected, banded and sealed, then delivered on time." },
];

const ANIMATION_END_RATIO = 0.90; // All 7 stages (0..6) reach 100% completion by 90% scroll; final 10% is hold buffer

export function FactoryHero() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [seek] = useState({ stage: 0, key: 0 });

  const current = stages[stage] ?? stages[0]!;
  const animProgress = Math.min(1, scrollProgress / ANIMATION_END_RATIO);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const st = ScrollTrigger.create({
      id: "factory-hero-trigger",
      trigger: triggerRef.current,
      start: "top top",
      end: "+=4000",
      pin: stickyRef.current,
      pinSpacing: true,
      scrub: 0.1,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        const currentAnimP = Math.min(1, p / ANIMATION_END_RATIO);
        const currentStage = Math.min(stages.length - 1, Math.floor(currentAnimP * stages.length));
        setStage(currentStage);
      },
    });

    return () => st.kill();
  }, []);

  const jumpToStage = useCallback((stageIndex: number) => {
    const st = ScrollTrigger.getById("factory-hero-trigger");
    if (st) {
      const targetP = (stageIndex / stages.length) * ANIMATION_END_RATIO;
      const targetScroll = st.start + targetP * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, []);

  const getFillWidth = (i: number) => {
    if (animProgress >= 1) return 100;
    if (i < stage) return 100;
    if (i === stage) {
      const frac = (animProgress * stages.length) % 1;
      return Math.min(100, Math.max(0, frac * 100));
    }
    return 0;
  };

  return (
    <div ref={triggerRef} className="factory-hero-scroll-wrapper">
      <div ref={stickyRef} className="factory-hero-sticky">
        <section className="factory-hero-section">
          <div className="factory-hero-canvas">
            <Canvas frameloop="always" dpr={[1, 1.6]} shadows camera={{ position: [4, 13, 27], fov: 40 }} gl={{ antialias: true }}>
              <Suspense fallback={null}>
                <FactoryScene onStageChange={setStage} seek={seek} scrollProgress={scrollProgress} />
              </Suspense>
            </Canvas>
          </div>
          <div className="factory-vignette" />

          {/* Stage navigator */}
          <nav className="factory-stage-nav" aria-label="Manufacturing stages">
            {stages.map((s, i) => (
              <button
                key={s.label}
                onClick={() => jumpToStage(i)}
                className={`factory-stage-btn ${i === stage ? "active" : ""}`}
              >
                <span className="factory-stage-label">{s.label}</span>
                <span className="factory-stage-line" />
              </button>
            ))}
          </nav>

          <div className="factory-hero-content">
            {stage === 0 ? (
              <div key="welcome" className="factory-welcome-box">
                <div className="factory-stage-badge">
                  <span className="factory-badge-line" />
                  Welcome
                </div>
                <h1 className="factory-hero-title">
                  Welcome to <span className="factory-title-highlight">Kolli</span> Graphics
                </h1>
                <p className="factory-hero-copy">
                  We are a fully committed, service-oriented premier finishing company providing high-quality craftsmanship and service in a timely manner. We work tirelessly to meet your <strong>deadlines & deliver</strong> products that <strong>exceed customers' expectations</strong>. Our motto is Quality & Customer Service First.
                </p>
                <p className="factory-founders">Ranga Reddy Kolli · Parasurami Reddy Kolli — Founders</p>
                <div>
                  <button className="factory-action-btn" onClick={() => jumpToStage(1)}>
                    Watch our process →
                  </button>
                </div>
              </div>
            ) : (
              <div key={stage} className="factory-welcome-box">
                <div className="factory-stage-badge">
                  <span>0{stage}</span>
                  <span className="factory-badge-line" />
                  {current.label}
                </div>
                <h2 className="factory-hero-title">{current.title}</h2>
                <div className="factory-machine-tag">{current.machine}</div>
                <p className="factory-hero-copy">{current.copy}</p>
              </div>
            )}

            <div className="factory-footer-controls">
              <div className="factory-progress-bar-container">
                {stages.map((s, i) => (
                  <button
                    key={s.label}
                    aria-label={s.label}
                    onClick={() => jumpToStage(i)}
                    className={`factory-progress-step ${i === stage ? "active" : i < stage ? "completed" : ""}`}
                  >
                    <span className="factory-progress-track">
                      <span className="factory-progress-fill" style={{ width: `${getFillWidth(i)}%` }} />
                    </span>
                  </button>
                ))}
              </div>

              <button
                className="factory-scroll-btn"
                aria-label="Scroll to explore next stage"
                onClick={() => {
                  if (stage < stages.length - 1) {
                    jumpToStage(stage + 1);
                  } else {
                    const st = ScrollTrigger.getById("factory-hero-trigger");
                    if (st) {
                      window.scrollTo({ top: st.end + 10, behavior: "smooth" });
                    }
                  }
                }}
              >
                <Mouse size={15} />
                <span>{animProgress < 1 ? "Scroll down to play" : "Explore Website"}</span>
                <ChevronDown size={16} className="factory-scroll-arrow" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
