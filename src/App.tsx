import { useState, useEffect, useRef, useCallback } from "react"

import MonthlyVaultSection from "./components/MonthlyVaultSection"

// ─── Scroll reveal hook ──────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current

    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible")

          obs.disconnect()
        }
      },

      { threshold: 0.12 },
    )

    obs.observe(el)

    return () => obs.disconnect()
  }, [])

  return ref
}

// ─── Particles ───────────────────────────────────────────────────────────────

function Particles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",

            left: `${Math.random() * 100}%`,

            bottom: `${Math.random() * 30}%`,

            width: i % 5 === 0 ? "3px" : "1.5px",

            height: i % 5 === 0 ? "3px" : "1.5px",

            borderRadius: "50%",

            background:
              i % 3 === 0 ? "rgba(201,168,76,0.6)" : "rgba(255,255,255,0.4)",

            animation: `float-up ${8 + Math.random() * 12}s linear ${Math.random() * 10}s infinite`,
          }}
        />
      ))}
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={`star-${i}`}
          style={{
            position: "absolute",

            left: `${Math.random() * 100}%`,

            top: `${Math.random() * 60}%`,

            width: Math.random() > 0.7 ? "2px" : "1px",

            height: Math.random() > 0.7 ? "2px" : "1px",

            borderRadius: "50%",

            background: "rgba(255,255,255,0.6)",

            animation: `twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 4}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

// ─── Polaroid frame ───────────────────────────────────────────────────────────

function Polaroid({
  src,

  caption,

  rotation = 0,

  delay = 0,

  onClick,
}: {
  src: string

  caption: string

  rotation?: number

  delay?: number

  onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current

    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.animation = `polaroid-drop 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards`
          }, delay)

          obs.disconnect()
        }
      },

      { threshold: 0.1 },
    )

    obs.observe(el)

    return () => obs.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className="polaroid-card cursor-pointer select-none"
      style={
        {
          "--rot": `${rotation}deg`,

          transform: `rotate(${rotation}deg)`,

          opacity: 0,
        } as React.CSSProperties
      }
      onClick={onClick}
    >
      <div className="polaroid" style={{ width: "clamp(160px, 20vw, 220px)" }}>
        <div
          style={{
            aspectRatio: "1/1",

            overflow: "hidden",

            background: "#1a1825",
          }}
        >
          <img
            src={src}
            alt={caption}
            style={{
              width: "100%",

              height: "100%",

              objectFit: "cover",

              display: "block",
            }}
          />
        </div>
        <p
          style={{
            fontFamily: "var(--font-hand)",

            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",

            color: "#3a2a10",

            marginTop: "10px",

            textAlign: "center",

            lineHeight: 1.3,
          }}
        >
          {caption}
        </p>
      </div>
    </div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  src,

  caption,

  onClose,
}: {
  src: string

  caption: string

  onClose: () => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handler)

    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "90vw", maxHeight: "90vh", textAlign: "center" }}
      >
        <img
          src={src}
          alt={caption}
          style={{
            maxWidth: "100%",

            maxHeight: "70vh",

            objectFit: "contain",

            boxShadow: "0 20px 80px rgba(0,0,0,0.9)",
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-hand)",

            fontSize: "1.4rem",

            color: "var(--foreground)",

            marginTop: "20px",

            opacity: 0.8,
          }}
        >
          {caption}
        </p>
        <button
          onClick={onClose}
          style={{
            marginTop: "16px",

            color: "rgba(255,255,255,0.4)",

            fontSize: "0.8rem",

            letterSpacing: "0.1em",

            background: "none",

            border: "none",

            cursor: "pointer",

            textTransform: "uppercase",
          }}
        >
          ESC to close
        </button>
      </div>
    </div>
  )
}

// ─── Section 01 — Landing ─────────────────────────────────────────────────────

function HeroSection({ onStart }: { onStart: () => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800),

      setTimeout(() => setStep(2), 2800),

      setTimeout(() => setStep(3), 4600),

      setTimeout(() => setStep(4), 6400),
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        justifyContent: "center",

        textAlign: "center",

        padding: "40px 24px",

        position: "relative",

        background:
          "radial-gradient(ellipse at 50% 40%, #1a1220 0%, #09080e 60%)",
      }}
    >
      <Particles />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "700px" }}>
        <div
          style={{
            marginBottom: "48px",

            minHeight: "200px",

            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            justifyContent: "center",

            gap: "28px",
          }}
        >
          {step >= 1 && (
            <p
              style={{
                fontFamily: "var(--font-display)",

                fontSize: "clamp(1.1rem, 3vw, 1.5rem)",

                fontStyle: "italic",

                fontWeight: 300,

                color: "rgba(240,234,214,0.7)",

                letterSpacing: "0.04em",

                animation: "fadeInUp 1s ease forwards",
              }}
            >
              Every story has a beginning.
            </p>
          )}
          {step >= 2 && (
            <h1
              style={{
                fontFamily: "var(--font-display)",

                fontSize: "clamp(1.6rem, 5vw, 3rem)",

                fontWeight: 600,

                color: "var(--foreground)",

                lineHeight: 1.2,

                animation: "fadeInUp 1s ease forwards",

                margin: 0,
              }}
            >
              Mine changed on{" "}
              <span style={{ color: "var(--primary)" }}>September 23.</span>
            </h1>
          )}
          {step >= 3 && (
            <p
              style={{
                fontFamily: "var(--font-display)",

                fontSize: "clamp(1rem, 2.5vw, 1.3rem)",

                fontStyle: "italic",

                fontWeight: 300,

                color: "rgba(240,234,214,0.6)",

                animation: "fadeInUp 1s ease forwards",
              }}
            >
              At a place I never thought would become a memory.
            </p>
          )}
        </div>

        {step >= 4 && (
          <div
            style={{
              animation: "fadeInUp 1.2s ease forwards",

              display: "flex",

              flexDirection: "column",

              alignItems: "center",

              gap: "20px",
            }}
          >
            <button
              className="btn-cinematic animate-glow-pulse"
              onClick={onStart}
            >
              Start Our Journey →
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("climax")
                  ?.scrollIntoView({ behavior: "smooth" })
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 22px",
                borderRadius: "9999px",
                background: "rgba(201, 168, 76, 0.14)",
                border: "1px solid rgba(201, 168, 76, 0.45)",
                color: "var(--primary)",
                fontFamily: "var(--font-display)",
                fontSize: "0.95rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201, 168, 76, 0.25)"
                e.currentTarget.style.transform = "scale(1.03)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(201, 168, 76, 0.14)"
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              <span>⏳</span>
              <span>12:00 AM Birthday Countdown →</span>
            </button>
            <p
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: "1.1rem",
                color: "var(--muted-foreground)",
                letterSpacing: "0.02em",
              }}
            >
              A little journey through the memories we created together.
            </p>
          </div>
        )}
      </div>

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",

          top: "30%",

          left: "50%",

          transform: "translate(-50%,-50%)",

          width: "600px",

          height: "600px",

          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",

          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",

          bottom: "40px",

          left: "50%",

          transform: "translateX(-50%)",

          animation: "fadeIn 2s ease 7s both",
        }}
      >
        <div
          style={{
            width: "1px",

            height: "60px",

            background:
              "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)",

            margin: "0 auto",
          }}
        />
      </div>
    </section>
  )
}

// ─── Section 02 — The Beginning ───────────────────────────────────────────────

function BeginningSection() {
  const ref = useReveal()

  const [lightbox, setLightbox] = useState<{
    src: string

    caption: string
  } | null>(null)

  return (
    <section
      ref={ref}
      className="reveal"
      style={{
        padding: "clamp(80px,12vw,140px) clamp(20px,8vw,120px)",

        position: "relative",

        background: "linear-gradient(180deg, #09080e 0%, #0d0b16 100%)",
      }}
    >
      {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} />}
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",

            flexDirection: "column",

            gap: "12px",

            marginBottom: "60px",
          }}
        >
          <span className="chapter-number">01</span>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{ height: "1px", flex: 1, background: "var(--border)" }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",

                fontSize: "0.75rem",

                letterSpacing: "0.2em",

                textTransform: "uppercase",

                color: "var(--muted-foreground)",
              }}
            >
              September 23, 2025 · KFC
            </span>
            <div
              style={{ height: "1px", flex: 1, background: "var(--border)" }}
            />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",

              fontSize: "clamp(2rem, 6vw, 4.5rem)",

              fontWeight: 400,

              fontStyle: "italic",

              color: "var(--foreground)",

              margin: 0,

              lineHeight: 1.1,
            }}
          >
            Where It All Started
          </h2>
        </div>

        <div
          style={{
            display: "grid",

            gridTemplateColumns: "1fr 1fr",

            gap: "clamp(30px, 6vw, 80px)",

            alignItems: "center",
          }}
          className="grid-responsive"
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",

                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",

                fontWeight: 300,

                lineHeight: 1.8,

                color: "rgba(240,234,214,0.8)",

                fontStyle: "italic",
              }}
            >
              "Every unexpected story begins somewhere.
              <br />
              <br />
              Ours began here.
              <br />
              <br />
              <strong
                style={{
                  color: "var(--primary)",

                  fontStyle: "normal",

                  fontWeight: 500,
                }}
              >
                September 23, 2025 · KFC.
              </strong>
              <br />
              <br />
              Before that day at KFC, we didn't even know each other.
              <br />
              <br />A normal afternoon, a table full of food, and two people who
              were complete strangers.
              <br />
              <br />
              But right from that early moment, something clicked. We started
              teasing, making fun of each other, and laughing until our stomachs
              hurt.
              <br />
              <br />
              Little did we know, this unexpected meeting was the beginning of
              something we would never want to forget."
            </p>
          </div>

          <div
            style={{
              display: "flex",

              flexDirection: "row",

              flexWrap: "wrap",

              justifyContent: "center",

              alignItems: "center",

              gap: "24px",

              position: "relative",
            }}
          >
            <Polaroid
              src="/media/pics/pic_first_kfc_sep23.jpg"
              caption="Our first picture · September 23, 2025, KFC"
              rotation={-3}
              delay={200}
              onClick={() =>
                setLightbox({
                  src: "/media/pics/pic_first_kfc_sep23.jpg",

                  caption:
                    "Our first picture · September 23, 2025, KFC — where it all started.",
                })
              }
            />
            <Polaroid
              src="/media/pics/pic_early_fun_college.jpg"
              caption="Where we made fun from that early"
              rotation={3}
              delay={350}
              onClick={() =>
                setLightbox({
                  src: "/media/pics/pic_early_fun_college.jpg",

                  caption:
                    "The early days · Teasing and making fun of each other right from the start.",
                })
              }
            />
            <div
              style={{
                position: "absolute",

                top: "-15px",

                right: "-10px",

                fontFamily: "var(--font-hand)",

                fontSize: "1rem",

                color: "var(--muted-foreground)",

                transform: "rotate(6deg)",
              }}
            >
              Before KFC, we were strangers.
            </div>
            <div
              style={{
                position: "absolute",

                bottom: "-24px",

                left: "10px",

                fontFamily: "var(--font-hand)",

                fontSize: "1.05rem",

                color: "var(--primary)",

                transform: "rotate(-4deg)",
              }}
            >
              Then the non-stop fun began. ✦
            </div>
          </div>
        </div>

        {/* Timeline start */}
        <div
          style={{
            display: "flex",

            justifyContent: "center",

            marginTop: "80px",
          }}
        >
          <div
            style={{
              width: "1px",

              height: "80px",

              background:
                "linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)",
            }}
          />
        </div>
      </div>

      <style>{`.grid-responsive { @media (max-width: 700px) { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

// ─── Timeline Chapter Card ────────────────────────────────────────────────────

interface Chapter {
  num: string

  date: string

  location: string

  title: string

  description: string

  handwritten: string

  img: string

  imgs?: string[]

  detail?: string
}

function ChapterCard({
  chapter,

  isLeft,
}: {
  chapter: Chapter

  isLeft: boolean
}) {
  const ref = useReveal()

  const [lightbox, setLightbox] = useState<{
    src: string

    caption: string
  } | null>(null)

  const isMobile = typeof window !== "undefined" && window.innerWidth < 700

  return (
    <div
      ref={ref}
      className={`reveal ${isLeft ? "reveal-delay-1" : "reveal-delay-2"}`}
      style={{
        position: "relative",

        display: "grid",

        gridTemplateColumns: isMobile ? "1fr" : "1fr 60px 1fr",

        alignItems: "start",

        gap: "0",
      }}
    >
      {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} />}

      {/* Left side */}
      <div
        style={{
          paddingRight: "40px",

          paddingBottom: "60px",

          ...(isLeft ? {} : { opacity: 0 }),
        }}
      >
        {isLeft && (
          <div
            style={{
              background: "var(--card)",

              border: "1px solid var(--border)",

              padding: "clamp(20px,4vw,36px)",

              position: "relative",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",

                fontSize: "3.5rem",

                fontWeight: 300,

                color: "transparent",

                WebkitTextStroke: "1px rgba(201,168,76,0.4)",

                lineHeight: 1,

                display: "block",
              }}
            >
              {chapter.num}
            </span>
            <div
              style={{
                display: "flex",

                gap: "16px",

                margin: "8px 0 16px",

                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",

                  fontSize: "0.7rem",

                  letterSpacing: "0.18em",

                  textTransform: "uppercase",

                  color: "var(--muted-foreground)",
                }}
              >
                {chapter.date}
              </span>
              <span style={{ color: "var(--border)" }}>·</span>
              <span
                style={{
                  fontFamily: "var(--font-body)",

                  fontSize: "0.7rem",

                  letterSpacing: "0.18em",

                  textTransform: "uppercase",

                  color: "var(--primary)",
                }}
              >
                {chapter.location}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",

                fontSize: "clamp(1.3rem, 3vw, 2rem)",

                fontWeight: 400,

                fontStyle: "italic",

                color: "var(--foreground)",

                margin: "0 0 16px",
              }}
            >
              {chapter.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",

                fontSize: "0.9rem",

                lineHeight: 1.75,

                color: "var(--secondary-foreground)",

                margin: "0 0 20px",
              }}
            >
              {chapter.description}
            </p>
            <p
              style={{
                fontFamily: "var(--font-hand)",

                fontSize: "1.1rem",

                color: "var(--primary)",

                margin: 0,
              }}
            >
              "{chapter.handwritten}"
            </p>
            {chapter.detail && (
              <p
                style={{
                  fontFamily: "var(--font-body)",

                  fontSize: "0.72rem",

                  letterSpacing: "0.1em",

                  color: "rgba(140,126,96,0.6)",

                  marginTop: "16px",
                }}
              >
                {chapter.detail}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Center line */}
      <div
        style={{
          display: "flex",

          flexDirection: "column",

          alignItems: "center",

          paddingTop: "20px",
        }}
      >
        <div className="glowing-dot" />
        <div
          style={{
            flex: 1,

            width: "1px",

            background:
              "linear-gradient(to bottom, rgba(201,168,76,0.4), rgba(201,168,76,0.1))",

            minHeight: "200px",
          }}
        />
      </div>

      {/* Right side */}
      <div
        style={{
          paddingLeft: "40px",

          paddingBottom: "60px",

          ...(!isLeft ? {} : { opacity: 0 }),
        }}
      >
        {!isLeft && (
          <div
            style={{
              background: "var(--card)",

              border: "1px solid var(--border)",

              padding: "clamp(20px,4vw,36px)",

              position: "relative",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",

                fontSize: "3.5rem",

                fontWeight: 300,

                color: "transparent",

                WebkitTextStroke: "1px rgba(201,168,76,0.4)",

                lineHeight: 1,

                display: "block",
              }}
            >
              {chapter.num}
            </span>
            <div
              style={{
                display: "flex",

                gap: "16px",

                margin: "8px 0 16px",

                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",

                  fontSize: "0.7rem",

                  letterSpacing: "0.18em",

                  textTransform: "uppercase",

                  color: "var(--muted-foreground)",
                }}
              >
                {chapter.date}
              </span>
              <span style={{ color: "var(--border)" }}>·</span>
              <span
                style={{
                  fontFamily: "var(--font-body)",

                  fontSize: "0.7rem",

                  letterSpacing: "0.18em",

                  textTransform: "uppercase",

                  color: "var(--primary)",
                }}
              >
                {chapter.location}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",

                fontSize: "clamp(1.3rem, 3vw, 2rem)",

                fontWeight: 400,

                fontStyle: "italic",

                color: "var(--foreground)",

                margin: "0 0 16px",
              }}
            >
              {chapter.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",

                fontSize: "0.9rem",

                lineHeight: 1.75,

                color: "var(--secondary-foreground)",

                margin: "0 0 20px",
              }}
            >
              {chapter.description}
            </p>
            <p
              style={{
                fontFamily: "var(--font-hand)",

                fontSize: "1.1rem",

                color: "var(--primary)",

                margin: 0,
              }}
            >
              "{chapter.handwritten}"
            </p>
            {chapter.detail && (
              <p
                style={{
                  fontFamily: "var(--font-body)",

                  fontSize: "0.72rem",

                  letterSpacing: "0.1em",

                  color: "rgba(140,126,96,0.6)",

                  marginTop: "16px",
                }}
              >
                {chapter.detail}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Photo — always on opposite side from text */}
      <div
        style={{
          gridColumn: isLeft ? "3" : "1",

          gridRow: "1",

          padding: isLeft ? "0 0 0 40px" : "0 40px 0 0",

          display: "flex",

          justifyContent: "center",

          alignItems: "flex-start",

          paddingTop: "20px",
        }}
      >
        <div
          className="polaroid-card"
          style={{
            transform: `rotate(${isLeft ? 2 : -2}deg)`,

            cursor: "pointer",
          }}
          onClick={() =>
            setLightbox({
              src: chapter.img.replace("w=400&h=400", "w=900&h=900"),

              caption: chapter.title,
            })
          }
        >
          <div
            className="polaroid"
            style={{ width: "clamp(140px,18vw,200px)" }}
          >
            <div
              style={{
                aspectRatio: "1/1",

                overflow: "hidden",

                background: "#1a1825",
              }}
            >
              <img
                src={chapter.img}
                alt={chapter.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-hand)",

                fontSize: "0.95rem",

                color: "#3a2a10",

                marginTop: "8px",

                textAlign: "center",
              }}
            >
              {chapter.date}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section 03 — Timeline ────────────────────────────────────────────────────

const chapters: Chapter[] = [
  {
    num: "02",

    date: "September 2025",

    location: "SIMATS Campus",

    title: "Where We Started Making Fun",

    description:
      "Right after that KFC day, the silence broke completely. We went straight into non-stop banter, pulling each other's leg, and sharing the kind of effortless laughter that made everyone wonder how long we had known each other.",

    handwritten: "From complete strangers to non-stop laughter and teasing.",

    img: "/media/pics/pic_early_fun_college.jpg",

    detail: "Where the teasing began",
  },

  {
    num: "03",

    date: "October 2025",

    location: "College Grounds",

    title: "Pure Chaos & Fence Laughs",

    description:
      "When ordinary college fences turn into comedy stages and everyday walks turn into uncontrollable fits of laughter. That was the moment we realized this friendship had absolutely zero filter.",

    handwritten: "No pretenses, no filters — just pure joy.",

    img: "/media/pics/pic_new_02_fence_laugh.jpg",

    detail: "Unfiltered Shenanigans",
  },

  {
    num: "04",

    date: "December 2025",

    location: "College Bus & Lake",

    title: "Bus Commutes & Lake Embankments",

    description:
      "Daily bus rides where we teased each other endlessly until our stomachs hurt, followed by quiet evenings sitting on the lake embankment with the squad, sharing dreams and stories.",

    handwritten: "Bus seat teasing and lake breeze talks.",

    img: "/media/pics/pic_new_05_bus_moments.jpg",

    detail: "Squad & Commute Banter",
  },

  {
    num: "05",

    date: "January 2026",

    location: "Midnight Highway",

    title: "Bridge Drives & Streetlight Escapes",

    description:
      "Night road trips across the bridge under glowing yellow streetlights, wet roads after the rain, and long conversations about life where time simply slipped away.",

    handwritten: "Cool wind, empty roads, and the best company.",

    img: "/media/pics/pic_new_01_highway_bridge.jpg",

    detail: "Night Bridge Drives",
  },

  {
    num: "06",

    date: "March 2026",

    location: "Rooftop Balcony",

    title: "Golden Hour Breeze & Matching Vibes",

    description:
      "Standing by the railing in matching tones, watching the sky change colors, and laughing at the most random things. Proof that with you, even quiet afternoons become golden.",

    handwritten: "When silence feels just as comfortable as laughter.",

    img: "/media/pics/pic_new_08_rooftop_breeze.jpg",

    detail: "Golden Hour Moments",
  },

  {
    num: "07",

    date: "June 2026",

    location: "Mahabalipuram",

    title: "Coastal Adventures & Cliff Heights",

    description:
      "Standing high on the Mahabalipuram rocks overlooking the lush trees and ocean horizon together. Wind blowing through our hair, shore waves below, and another chapter carved into our hearts.",

    handwritten: "Standing above the trees, looking out at the sea.",

    img: "/media/pics/pic_new_09_mahabalipuram_view.jpg",

    detail: "Mahabalipuram Heights",
  },

  {
    num: "08",

    date: "August 2026",

    location: "Everywhere",

    title: "Pop Comic Energy & Good Vibes",

    description:
      "Every single day with you feels like a lively comic strip filled with color, goofy smiles, inside jokes, and good energy that brightens up even the most exhausting days.",

    handwritten: "Living in our own vibrant comic strip.",

    img: "/media/pics/pic_new_11_pop_comic_duo.jpg",

    detail: "Endless Good Energy",
  },

  {
    num: "09",

    date: "September 2026",

    location: "Midnight 12:00",

    title: "Midnight Birthday Smiles",

    description:
      "The clock strikes 12:00. Dim lights, birthday cake, heartfelt wishes, and seeing you smile. Another year older, countless memories behind us, and a bond that only grows stronger.",

    handwritten: "Happy Birthday to my favorite person.",

    img: "/media/pics/pic_6138822513551677908.jpg",

    detail: "September Birthday Celebration",
  },

  {
    num: "10",

    date: "Today & Always",

    location: "In My Heart",

    title: "Muthe Mutharame · Still Us",

    description:
      "And here we are today. From complete strangers at KFC on September 23, 2025 to this very moment — you will forever be my precious pearl, my greatest comfort, and my favorite chapter.",

    handwritten: "Muthe Mutharame — today, tomorrow, forever ✦",

    img: "/media/pics/pic_muthe_mutharame.jpg",

    detail: "Muthe Mutharame ✦",
  },
]

function TimelineSection() {
  const headerRef = useReveal()

  return (
    <section
      id="timeline"
      style={{
        padding: "clamp(60px,10vw,120px) clamp(20px,8vw,100px)",

        position: "relative",

        background: "#09080e",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          ref={headerRef}
          className="reveal"
          style={{ textAlign: "center", marginBottom: "80px" }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",

              fontSize: "0.75rem",

              letterSpacing: "0.25em",

              textTransform: "uppercase",

              color: "var(--muted-foreground)",

              marginBottom: "16px",
            }}
          >
            The Journey
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",

              fontSize: "clamp(2.5rem, 7vw, 5rem)",

              fontWeight: 400,

              fontStyle: "italic",

              color: "var(--foreground)",

              margin: 0,
            }}
          >
            Every Chapter
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          {chapters.map((ch, i) => (
            <ChapterCard key={ch.num} chapter={ch} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 05 — Places ─────────────────────────────────────────────────────

const places = [
  {
    name: "KFC · The Beginning",

    shortName: "KFC",

    icon: "🍗",

    x: 63,

    y: 54,

    date: "Sep 23, 2025",

    memory:
      "Our very first photo, our first meal together, and where two complete strangers became best friends.",

    img: "/media/pics/pic_first_kfc_sep23.jpg",
  },

  {
    name: "SIMATS Campus",

    shortName: "SIMATS",

    icon: "🎓",

    x: 52,

    y: 56,

    date: "The Early Days",

    memory:
      "Campus walkways, breeze through the trees, teasing, and making fun of each other from that much early on.",

    img: "/media/pics/pic_early_fun_college.jpg",
  },

  {
    name: "VR Mall",

    shortName: "VR Mall",

    icon: "🛍️",

    x: 60,

    y: 48,

    date: "City Hangouts",

    memory:
      "Anna Nagar vibes, walking around every floor, grabbing food, and non-stop inside jokes.",

    img: "/media/pics/pic_6138822513551677800.jpg",
  },

  {
    name: "Phoenix Marketcity",

    shortName: "Phoenix Mall",

    icon: "✨",

    x: 64,

    y: 58,

    date: "Mall Adventures",

    memory:
      "Endless strolls through Phoenix, laughing at random things, and conversations we never wanted to end.",

    img: "/media/pics/pic_6138822513551677803.jpg",
  },

  {
    name: "Mahabalipuram",

    shortName: "Mahabalipuram",

    icon: "🌊",

    x: 68,

    y: 65,

    date: "Coastal Road Trip",

    memory:
      "Standing on the cliff rocks overlooking the coastal greenery and open sea together. Ocean breeze, ancient stone carvings, and timeless memories.",

    img: "/media/pics/pic_new_09_mahabalipuram_view.jpg",
  },

  {
    name: "Palakkad",

    shortName: "Palakkad",

    icon: "🌴",

    x: 35,

    y: 78,

    date: "Kerala Escapes",

    memory:
      "Scenic Western Ghats roads, lush green hills, fresh mountain air, and unforgettable road trip vibes.",

    img: "/media/pics/pic_6138822513551677802.jpg",
  },

  {
    name: "Waterfalls & Nature",

    shortName: "Waterfalls",

    icon: "💧",

    x: 40,

    y: 86,

    date: "Chasing Waterfalls",

    memory:
      "Cold rushing water, slippery rocks, shivering, getting completely soaked, and laughing with pure joy.",

    img: "/media/pics/pic_6138822513551677804.jpg",
  },

  {
    name: "Midnight Birthday",

    shortName: "Midnight 12:00",

    icon: "🎂",

    x: 58,

    y: 72,

    date: "12:00 AM Celebration",

    memory:
      "The birthday celebration, surprise moment, candles, smiles, and another year together in our story.",

    img: "/media/pics/pic_6138822513551677908.jpg",
  },
]

function PlacesSection() {
  const ref = useReveal()

  const [active, setActive] = useState<typeof places[0] | null>(null)

  return (
    <section
      id="places"
      style={{
        padding: "clamp(60px,10vw,120px) clamp(20px,8vw,80px)",

        background: "linear-gradient(180deg, #0d0b16 0%, #12101a 100%)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={ref} className="reveal" style={{ marginBottom: "60px" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",

              fontSize: "0.75rem",

              letterSpacing: "0.25em",

              textTransform: "uppercase",

              color: "var(--muted-foreground)",

              marginBottom: "12px",
            }}
          >
            Section 05
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",

              fontSize: "clamp(2rem, 6vw, 4rem)",

              fontWeight: 400,

              fontStyle: "italic",

              color: "var(--foreground)",

              margin: "0 0 16px",
            }}
          >
            Places That Became Memories
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",

              fontSize: "clamp(1rem, 2vw, 1.2rem)",

              fontStyle: "italic",

              fontWeight: 300,

              color: "var(--secondary-foreground)",

              maxWidth: "560px",
            }}
          >
            We travelled to places, but somehow the places became special
            because of who I was with.
          </p>
        </div>

        <div
          style={{
            display: "grid",

            gridTemplateColumns: "1fr 1fr",

            gap: "40px",

            alignItems: "start",
          }}
          className="places-grid"
        >
          {/* Map */}
          <div
            style={{
              position: "relative",

              aspectRatio: "4/5",

              background: "var(--card)",

              border: "1px solid var(--border)",

              overflow: "hidden",

              borderRadius: "8px",
            }}
          >
            {/* Stylized map background */}
            <div
              style={{
                position: "absolute",

                inset: 0,

                background:
                  "linear-gradient(135deg, #0d0b16 0%, #1a1528 50%, #0f0e18 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",

                inset: 0,

                opacity: 0.15,

                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(201,168,76,0.3) 1px, transparent 0)",

                backgroundSize: "30px 30px",
              }}
            />
            {/* India outline simplified */}
            <svg
              viewBox="0 0 100 120"
              style={{
                position: "absolute",

                inset: 0,

                width: "100%",

                height: "100%",

                pointerEvents: "none",
              }}
            >
              <path
                d="M35 5 L65 5 L75 20 L80 40 L75 55 L70 65 L72 80 L65 95 L55 110 L50 115 L45 110 L38 95 L30 80 L32 65 L25 55 L20 40 L25 20 Z"
                fill="rgba(201,168,76,0.04)"
                stroke="rgba(201,168,76,0.18)"
                strokeWidth="0.5"
              />
              {/* South India region highlight */}
              <path
                d="M28 50 L72 50 L72 65 L70 78 L66 92 L56 108 L50 115 L46 110 L36 96 L30 76 L28 62 Z"
                fill="rgba(201,168,76,0.07)"
                stroke="rgba(201,168,76,0.3)"
                strokeWidth="0.5"
              />
              {/* Decorative dashed travel route */}
              <polyline
                points="60,48 63,54 52,56 64,58 68,65 58,72 35,78 40,86"
                fill="none"
                stroke="rgba(201,168,76,0.22)"
                strokeWidth="0.7"
                strokeDasharray="1.5 2"
              />
            </svg>

            {places.map((p) => {
              const isAct = active?.name === p.name

              return (
                <button
                  key={p.name}
                  className="map-pin"
                  onClick={() => setActive(isAct ? null : p)}
                  style={{
                    position: "absolute",

                    left: `${p.x}%`,

                    top: `${p.y}%`,

                    transform: "translate(-50%, -50%)",

                    background: "none",

                    border: "none",

                    display: "flex",

                    flexDirection: "column",

                    alignItems: "center",

                    gap: "3px",

                    cursor: "pointer",

                    zIndex: isAct ? 10 : 2,

                    padding: "4px",
                  }}
                >
                  <div
                    style={{
                      width: isAct ? "14px" : "10px",

                      height: isAct ? "14px" : "10px",

                      borderRadius: "50%",

                      background: isAct
                        ? "var(--primary)"
                        : "rgba(201,168,76,0.7)",

                      boxShadow: isAct
                        ? "0 0 18px rgba(201,168,76,1), 0 0 30px rgba(201,168,76,0.6)"
                        : "0 0 8px rgba(201,168,76,0.5)",

                      border: isAct
                        ? "2px solid #fff"
                        : "1px solid rgba(255,255,255,0.4)",

                      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-hand)",

                      fontSize: "0.82rem",

                      color: isAct ? "var(--primary)" : "rgba(240,234,214,0.9)",

                      whiteSpace: "nowrap",

                      textShadow: "0 2px 6px rgba(0,0,0,0.95)",

                      fontWeight: isAct ? 700 : 500,

                      background: isAct ? "rgba(9,8,14,0.75)" : "transparent",

                      padding: isAct ? "1px 6px" : "0",

                      borderRadius: "6px",

                      transition: "all 0.2s",
                    }}
                  >
                    {p.shortName}
                  </span>
                </button>
              )
            })}

            <div
              style={{
                position: "absolute",

                bottom: "12px",

                right: "12px",

                fontFamily: "var(--font-hand)",

                fontSize: "0.8rem",

                color: "rgba(201,168,76,0.4)",
              }}
            >
              South India
            </div>
          </div>

          {/* Memory card / Places list */}
          <div>
            {active ? (
              <div
                style={{
                  background: "var(--card)",

                  border: "1px solid var(--border)",

                  overflow: "hidden",

                  borderRadius: "8px",

                  animation: "fadeInUp 0.4s ease",
                }}
              >
                <div
                  style={{
                    padding: "14px 22px",

                    borderBottom: "1px solid var(--border)",

                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    background: "rgba(255,255,255,0.01)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",

                      color: "var(--muted-foreground)",

                      fontFamily: "var(--font-body)",

                      letterSpacing: "0.15em",

                      textTransform: "uppercase",
                    }}
                  >
                    Selected Location
                  </span>
                  <button
                    onClick={() => setActive(null)}
                    style={{
                      background: "rgba(201,168,76,0.1)",

                      border: "1px solid rgba(201,168,76,0.3)",

                      color: "var(--primary)",

                      fontSize: "0.75rem",

                      padding: "6px 14px",

                      borderRadius: "14px",

                      cursor: "pointer",

                      fontFamily: "var(--font-body)",

                      fontWeight: 500,

                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--primary)"

                      e.currentTarget.style.color = "#09080e"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(201,168,76,0.1)"

                      e.currentTarget.style.color = "var(--primary)"
                    }}
                  >
                    ← View All Places
                  </button>
                </div>
                <div
                  style={{
                    aspectRatio: "16/10",

                    overflow: "hidden",

                    background: "#1a1825",
                  }}
                >
                  <img
                    src={active.img}
                    alt={active.name}
                    style={{
                      width: "100%",

                      height: "100%",

                      objectFit: "cover",

                      transition: "transform 0.6s ease",
                    }}
                  />
                </div>
                <div style={{ padding: "28px" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",

                      fontSize: "0.75rem",

                      letterSpacing: "0.2em",

                      textTransform: "uppercase",

                      color: "var(--primary)",

                      margin: "0 0 10px",
                    }}
                  >
                    {active.icon} {active.name} · {active.date}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",

                      fontSize: "1.2rem",

                      fontStyle: "italic",

                      color: "var(--foreground)",

                      lineHeight: 1.7,

                      margin: "0 0 16px",
                    }}
                  >
                    "{active.memory}"
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-hand)",

                      fontSize: "1rem",

                      color: "var(--muted-foreground)",

                      margin: 0,
                    }}
                  >
                    — a place that became a memory. ✦
                  </p>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",

                  gridTemplateColumns: "1fr",

                  gap: "12px",

                  maxHeight: "560px",

                  overflowY: "auto",

                  paddingRight: "8px",
                }}
              >
                {places.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setActive(p)}
                    style={{
                      background: "rgba(255,255,255,0.02)",

                      border: "1px solid var(--border)",

                      padding: "16px 20px",

                      textAlign: "left",

                      cursor: "pointer",

                      transition: "all 0.3s",

                      color: "inherit",

                      display: "flex",

                      alignItems: "center",

                      justifyContent: "space-between",

                      borderRadius: "6px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)"

                      e.currentTarget.style.background = "rgba(201,168,76,0.04)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)"

                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.02)"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",

                        alignItems: "center",

                        gap: "14px",
                      }}
                    >
                      <span style={{ fontSize: "1.3rem" }}>{p.icon}</span>
                      <div>
                        <p
                          style={{
                            fontFamily: "var(--font-display)",

                            fontSize: "1.05rem",

                            fontWeight: 500,

                            color: "var(--foreground)",

                            margin: "0 0 2px",
                          }}
                        >
                          {p.name}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-body)",

                            fontSize: "0.72rem",

                            color: "var(--muted-foreground)",

                            margin: 0,

                            letterSpacing: "0.1em",
                          }}
                        >
                          {p.date}
                        </p>
                      </div>
                    </div>
                    <span
                      style={{
                        color: "var(--primary)",

                        fontSize: "0.85rem",

                        opacity: 0.7,
                      }}
                    >
                      →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 700px) { .places-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

// ─── Section 06 — Photo Memory Wall ──────────────────────────────────────────

const memoryPhotos = [
  {
    src: "/media/pics/pic_first_kfc_sep23.jpg",

    caption: "Our first picture at KFC · Sep 23, 2025.",

    rot: -4,

    date: "Sep 23, 2025",
  },

  {
    src: "/media/pics/pic_early_fun_college.jpg",

    caption: "Where we made fun from that early.",

    rot: 3,

    date: "Early Days",
  },

  {
    src: "/media/pics/pic_new_02_fence_laugh.jpg",

    caption: "Campus fence chaos & pure laughter.",

    rot: -3,

    date: "Oct 2025",
  },

  {
    src: "/media/pics/pic_new_03_blue_kurta_selfie.jpg",

    caption: "Favorite smiles & daily banter.",

    rot: 4,

    date: "Oct 2025",
  },

  {
    src: "/media/pics/pic_new_05_bus_moments.jpg",

    caption: "College bus teasing non-stop.",

    rot: -2,

    date: "Dec 2025",
  },

  {
    src: "/media/pics/pic_new_04_lake_squad.jpg",

    caption: "Lake embankment squad chilling.",

    rot: 3,

    date: "Dec 2025",
  },

  {
    src: "/media/pics/pic_new_01_highway_bridge.jpg",

    caption: "Midnight highway bridge breeze.",

    rot: -4,

    date: "Jan 2026",
  },

  {
    src: "/media/pics/pic_new_06_night_rain_hangout.jpg",

    caption: "After-rain night walks & tea.",

    rot: 2,

    date: "Jan 2026",
  },

  {
    src: "/media/pics/pic_new_08_rooftop_breeze.jpg",

    caption: "Golden hour rooftop balcony breeze.",

    rot: -3,

    date: "Mar 2026",
  },

  {
    src: "/media/pics/pic_new_07_maroon_night.jpg",

    caption: "Matching vibes in maroon.",

    rot: 4,

    date: "Mar 2026",
  },

  {
    src: "/media/pics/pic_new_09_mahabalipuram_view.jpg",

    caption: "Mahabalipuram cliff overlooking the sea.",

    rot: -2,

    date: "Jun 2026",
  },

  {
    src: "/media/pics/pic_new_10_mahabalipuram_trio.jpg",

    caption: "Mahabalipuram scenic squad trip.",

    rot: 3,

    date: "Jun 2026",
  },

  {
    src: "/media/pics/pic_new_11_pop_comic_duo.jpg",

    caption: "Pop comic energy & smiles.",

    rot: -4,

    date: "Aug 2026",
  },

  {
    src: "/media/pics/pic_6138822513551677908.jpg",

    caption: "Midnight birthday celebration.",

    rot: 2,

    date: "Sep 2026",
  },

  {
    src: "/media/pics/pic_muthe_mutharame.jpg",

    caption: "Muthe Mutharame ✦ My pearl.",

    rot: 3,

    date: "Forever",
  },
]

function PhotoWallSection() {
  const ref = useReveal()

  const [lightbox, setLightbox] = useState<{
    src: string

    caption: string
  } | null>(null)

  return (
    <section
      id="photowall"
      style={{
        padding: "clamp(80px,12vw,140px) clamp(20px,6vw,80px)",

        background: "#09080e",
      }}
    >
      {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} />}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          ref={ref}
          className="reveal"
          style={{ textAlign: "center", marginBottom: "70px" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",

              fontSize: "clamp(2.5rem, 7vw, 5rem)",

              fontWeight: 400,

              fontStyle: "italic",

              color: "var(--foreground)",

              margin: "0 0 16px",
            }}
          >
            Pieces of Time
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",

              fontSize: "clamp(1rem, 2vw, 1.2rem)",

              fontStyle: "italic",

              fontWeight: 300,

              color: "var(--secondary-foreground)",
            }}
          >
            "Photos are strange. At the moment, they're just pictures. Years
            later, they're portals."
          </p>
        </div>

        <div
          style={{
            display: "flex",

            flexWrap: "wrap",

            gap: "clamp(20px,4vw,40px)",

            justifyContent: "center",

            alignItems: "flex-start",
          }}
        >
          {memoryPhotos.map((p, i) => (
            <Polaroid
              key={i}
              src={p.src}
              caption={p.caption}
              rotation={p.rot}
              delay={i * 120}
              onClick={() =>
                setLightbox({
                  src: p.src.replace("w=300&h=300", "w=800&h=800"),

                  caption: p.caption,
                })
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section 07 — The Fights ──────────────────────────────────────────────────

const fightStages = [
  { emoji: "💥", label: "Fight", color: "#c0392b" },

  { emoji: "😤", label: "Anger", color: "#e67e22" },

  { emoji: "🤐", label: "Silence", color: "#7f8c8d" },

  { emoji: "🙄", label: "Pretending not to care", color: "#8e44ad" },

  { emoji: "🥺", label: "Missing each other secretly", color: "#2980b9" },

  { emoji: "🙂", label: "Back to normal", color: "var(--primary)" },
]

function FightsSection() {
  const ref = useReveal()

  return (
    <section
      id="fights"
      style={{
        padding: "clamp(60px,8vw,100px) clamp(20px,8vw,100px)",

        background: "linear-gradient(180deg, #0d0b16 0%, #09080e 100%)",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          ref={ref}
          className="reveal"
          style={{ textAlign: "center", marginBottom: "28px" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",

              fontSize: "clamp(2rem, 6vw, 4.5rem)",

              fontWeight: 400,

              fontStyle: "italic",

              color: "var(--foreground)",

              margin: "0 0 8px",
            }}
          >
            The Part Where We Fight.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-hand)",

              fontSize: "1.25rem",

              color: "var(--muted-foreground)",

              margin: 0,
            }}
          >
            Every great story has one.
          </p>
        </div>

        {/* Fight sequence — sleek, visible without empty gaps */}
        <div
          style={{
            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            gap: "0",

            marginBottom: "36px",
          }}
        >
          {fightStages.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",

                flexDirection: "column",

                alignItems: "center",

                gap: "0",
              }}
            >
              <div
                style={{
                  display: "flex",

                  alignItems: "center",

                  gap: "18px",

                  padding: "14px 28px",

                  background: "rgba(22, 19, 32, 0.85)",

                  border: `1px solid ${s.color}44`,

                  borderRadius: "14px",

                  width: "clamp(270px, 50vw, 380px)",

                  boxShadow: `0 4px 16px ${s.color}15`,

                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)"

                  e.currentTarget.style.boxShadow = `0 6px 22px ${s.color}33`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)"

                  e.currentTarget.style.boxShadow = `0 4px 16px ${s.color}15`
                }}
              >
                <span style={{ fontSize: "1.8rem" }}>{s.emoji}</span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",

                    fontSize: "1.15rem",

                    fontStyle: "italic",

                    color: s.color,

                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </span>
              </div>
              {i < fightStages.length - 1 && (
                <div
                  style={{
                    width: "2px",

                    height: "20px",

                    background:
                      "linear-gradient(to bottom, rgba(201,168,76,0.4), rgba(201,168,76,0.1))",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            fontFamily: "var(--font-display)",

            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",

            fontStyle: "italic",

            fontWeight: 300,

            lineHeight: 1.9,

            color: "rgba(240,234,214,0.85)",

            textAlign: "center",
          }}
        >
          <p style={{ margin: 0 }}>
            "We fight.
            <br />
            Sometimes over silly small things, sometimes over misunderstandings.
            <br />
            Sometimes for reasons we don't even remember anymore.
            <br />
            <br />
            <strong style={{ color: "var(--primary)", fontStyle: "normal" }}>
              But somehow, no matter how stubborn we both get... we never really
              knew how to stay mad for long."
            </strong>
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Section 08 — What You Brought ───────────────────────────────────────────

const gifts = [
  { label: "JOY", desc: "You gave me some of my happiest moments.", icon: "✦" },

  {
    label: "CHAOS",

    desc: "You somehow made ordinary days unforgettable.",

    icon: "⚡",
  },

  {
    label: "ADVENTURE",

    desc: "We travelled, explored, and collected stories.",

    icon: "🧭",
  },

  {
    label: "FIGHTS",

    desc: "Because apparently peace was too boring.",

    icon: "🔥",
  },

  { label: "MEMORIES", desc: "Too many to fit into one lifetime.", icon: "📷" },

  {
    label: "EMOTION",

    desc: "You gave me happiness and sorrow at their absolute peak.",

    icon: "♾",
  },
]

function GiftsSection() {
  const ref = useReveal()

  return (
    <section
      id="gifts"
      style={{
        padding: "clamp(60px,10vw,120px) clamp(20px,6vw,80px)",

        background: "#09080e",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          ref={ref}
          className="reveal"
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",

              fontSize: "clamp(2rem, 6vw, 4.5rem)",

              fontWeight: 400,

              fontStyle: "italic",

              color: "var(--foreground)",

              margin: "0 0 10px",
            }}
          >
            You Brought A Little Bit Of Everything.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-hand)",

              fontSize: "1.2rem",

              color: "var(--muted-foreground)",

              margin: 0,
            }}
          >
            "Every shade of emotion, every unforgettable laugh."
          </p>
        </div>

        {/* ─── Golden Feature Box with Picture of Him & Her and Traits ─── */}
        <div
          style={{
            background:
              "radial-gradient(ellipse at 50% 20%, rgba(38, 30, 20, 0.95) 0%, rgba(16, 14, 22, 0.98) 100%)",

            border: "2px solid rgba(201, 168, 76, 0.45)",

            borderRadius: "24px",

            padding: "clamp(24px, 4vw, 44px)",

            boxShadow:
              "0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(201, 168, 76, 0.2)",

            marginBottom: "40px",
          }}
        >
          {/* Top: Centerpiece Photo of Him and Her together */}
          <div
            style={{
              display: "flex",

              flexDirection: "column",

              alignItems: "center",

              marginBottom: "36px",
            }}
          >
            <div
              style={{
                position: "relative",

                padding: "10px",

                background: "rgba(25, 21, 33, 0.9)",

                border: "1px solid rgba(201, 168, 76, 0.4)",

                borderRadius: "16px",

                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",

                maxWidth: "640px",

                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",

                  aspectRatio: "16/10",

                  maxHeight: "360px",

                  borderRadius: "10px",

                  overflow: "hidden",

                  background: "#09080e",
                }}
              >
                <img
                  src="/media/pics/pic_new_08_rooftop_breeze.jpg"
                  alt="Us Together"
                  style={{
                    width: "100%",

                    height: "100%",

                    objectFit: "cover",

                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-hand)",

                  fontSize: "1.3rem",

                  color: "var(--primary)",

                  margin: "12px 0 4px",

                  textAlign: "center",
                }}
              >
                Us Together ✦ Through Every Smile, Journey & Inside Joke
              </p>
            </div>
          </div>

          {/* Grid of the 6 Traits — fully visible, responsive, glowing */}
          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(clamp(240px, 30vw, 320px), 1fr))",

              gap: "16px",
            }}
          >
            {gifts.map((g) => (
              <div
                key={g.label}
                style={{
                  background: "rgba(22, 18, 30, 0.8)",

                  border: "1px solid rgba(201, 168, 76, 0.25)",

                  borderRadius: "14px",

                  padding: "24px 20px",

                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(35, 28, 42, 0.95)"

                  e.currentTarget.style.borderColor = "var(--primary)"

                  e.currentTarget.style.transform = "translateY(-3px)"

                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(201, 168, 76, 0.18)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(22, 18, 30, 0.8)"

                  e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.25)"

                  e.currentTarget.style.transform = "translateY(0)"

                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <div
                  style={{
                    fontSize: "1.6rem",

                    marginBottom: "10px",

                    color: "var(--primary)",
                  }}
                >
                  {g.icon}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",

                    fontSize: "0.75rem",

                    letterSpacing: "0.25em",

                    textTransform: "uppercase",

                    color: "var(--primary)",

                    margin: "0 0 8px",

                    fontWeight: 600,
                  }}
                >
                  {g.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",

                    fontSize: "1.05rem",

                    fontStyle: "italic",

                    fontWeight: 300,

                    color: "var(--secondary-foreground)",

                    lineHeight: 1.55,

                    margin: 0,
                  }}
                >
                  {g.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",

            marginTop: "30px",

            fontFamily: "var(--font-display)",

            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",

            fontStyle: "italic",

            color: "var(--foreground)",
          }}
        >
          "And somehow...{" "}
          <span style={{ color: "var(--primary)" }}>
            I wouldn't trade any of it for anything in this world.
          </span>
          "
        </div>
      </div>
    </section>
  )
}

// ─── Section 08.5 — Birthday Gift Treasure Hunt ──────────────────────────────

interface GiftClue {
  id: number

  giftNum: number

  title: string

  locationName: string

  hint: string

  roomHint: string

  defaultImg: string

  rewardTitle: string

  rewardMessage: string

  bonusNote?: string
}

const DEFAULT_GIFT_CLUES: GiftClue[] = [
  {
    id: 1,

    giftNum: 1,

    title: "Gift 01 · The Crisper 'Big Box' Secret",

    locationName: "Refrigerator · Lower 'Big Box' Drawer",

    hint: "Open the refrigerator door and glance down low into the fresh vegetable & fruit drawer...",

    roomHint:
      "Look right inside the 'Big Box' drawer where fresh fruits and green vegetables chill!",

    defaultImg: "/media/gifts/gift_fridge_bigbox.png",

    rewardTitle: "Gift #1 Discovered! 🍎",

    rewardMessage:
      "The quest has begun! You found the first treasure hidden in the fridge!",
  },

  {
    id: 2,

    giftNum: 2,

    title: "Gift 02 · The Sub-Zero Freezer Surprise",

    locationName: "Convertible Freezer · Movable Ice Maker Shelf",

    hint: "Brrr! It's getting even colder! Check inside the freezer compartment right near the ice maker...",

    roomHint:
      "Tucked right beside the movable ice maker and sweet treats... don't let your fingers freeze!",

    defaultImg: "/media/gifts/gift_freezer_ice.png",

    rewardTitle: "Gift #2 Unlocked! ❄️",

    rewardMessage:
      "Chilled to perfection! You're an incredible detective. Now for the grand finale!",
  },

  {
    id: 3,

    giftNum: 3,

    title: "Gift 03 · The Wardrobe Secret & The Gift Bag",

    locationName: "Wardrobe Shelf · The White Quilted Gift Bag",

    hint: "Head to your wardrobe where your favorite clothes rest. Look for the elegant white quilted bag tucked neatly among the clothes...",

    roomHint:
      "Tucked on the shelf right under the clothes... there sits the beautiful white gift bag!",

    defaultImg: "/media/gifts/gift_wardrobe_bag.png",

    rewardTitle: "Grand Gift Bag & Bonus Unlocked! 👑🎁",

    rewardMessage:
      "Happy Birthday, Muthe Mutharame! You found the gift bag! Open the zip for your bonus surprise!",

    bonusNote:
      "✨ BONUS INSIDE THE BAG: Don't forget to open the zipper and look inside the handbag for your secret surprise bonus!",
  },
]

function GiftHuntSection() {
  const ref = useReveal()

  const [foundList, setFoundList] = useState<boolean[]>(() => {
    try {
      const saved = localStorage.getItem("panda_gift_hunt_found")

      if (saved) {
        const parsed = JSON.parse(saved)

        if (
          Array.isArray(parsed) &&
          parsed.length === DEFAULT_GIFT_CLUES.length
        ) {
          return parsed
        }
      }
    } catch {}

    return new Array(DEFAULT_GIFT_CLUES.length).fill(false)
  })

  const [activeClueIndex, setActiveClueIndex] = useState<number>(() => {
    const firstUnfound = foundList.findIndex((f) => !f)

    return firstUnfound === -1 ? 0 : firstUnfound
  })

  const [customPhotos, setCustomPhotos] = useState<Record<number, string>>(
    () => {
      try {
        const saved = localStorage.getItem("panda_gift_hunt_custom_photos")

        if (saved) return JSON.parse(saved)
      } catch {}

      return {}
    },
  )

  const [lightboxImg, setLightboxImg] = useState<{
    src: string

    caption: string
  } | null>(null)

  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const [confettiBurst, setConfettiBurst] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [uploadTargetId, setUploadTargetId] = useState<number | null>(null)

  const foundCount = foundList.filter(Boolean).length

  const allFound = foundCount === DEFAULT_GIFT_CLUES.length

  const currentClue = DEFAULT_GIFT_CLUES[activeClueIndex]

  const currentImg = customPhotos[currentClue.id] || currentClue.defaultImg

  const handleMarkFound = (index: number) => {
    const updated = [...foundList]

    updated[index] = true

    setFoundList(updated)

    try {
      localStorage.setItem("panda_gift_hunt_found", JSON.stringify(updated))
    } catch {}

    setConfettiBurst(true)

    setTimeout(() => setConfettiBurst(false), 2500)

    const reward = DEFAULT_GIFT_CLUES[index].rewardTitle

    setToastMsg(`🎉 ${reward} Revealed!`)

    setTimeout(() => setToastMsg(null), 3500)

    // Advance to next unfound clue

    const nextIndex = updated.findIndex((f, idx) => !f && idx > index)

    if (nextIndex !== -1) {
      setTimeout(() => setActiveClueIndex(nextIndex), 600)
    } else {
      const anyUnfound = updated.findIndex((f) => !f)

      if (anyUnfound !== -1) {
        setTimeout(() => setActiveClueIndex(anyUnfound), 600)
      }
    }
  }

  const handleReset = () => {
    const reset = new Array(DEFAULT_GIFT_CLUES.length).fill(false)

    setFoundList(reset)

    setActiveClueIndex(0)

    try {
      localStorage.setItem("panda_gift_hunt_found", JSON.stringify(reset))
    } catch {}

    setToastMsg("Quest reset! Happy searching! 🕵️‍♀️")

    setTimeout(() => setToastMsg(null), 3000)
  }

  const triggerUploadFor = (clueId: number) => {
    setUploadTargetId(clueId)

    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file || uploadTargetId === null) return

    const reader = new FileReader()

    reader.onload = () => {
      const dataUrl = reader.result as string

      const updated = { ...customPhotos, [uploadTargetId]: dataUrl }

      setCustomPhotos(updated)

      try {
        localStorage.setItem(
          "panda_gift_hunt_custom_photos",

          JSON.stringify(updated),
        )
      } catch {}

      setToastMsg(`Location photo updated for Gift #${uploadTargetId}! 📸`)

      setTimeout(() => setToastMsg(null), 3000)
    }

    reader.readAsDataURL(file)
  }

  return (
    <section
      id="gift-hunt"
      style={{
        padding: "clamp(60px,10vw,120px) clamp(20px,6vw,80px)",

        background:
          "radial-gradient(ellipse at 50% 10%, #151122 0%, #09080e 100%)",

        position: "relative",
      }}
    >
      {lightboxImg && (
        <Lightbox {...lightboxImg} onClose={() => setLightboxImg(null)} />
      )}

      {/* Hidden file picker for custom location photos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Section Header */}
        <div
          ref={ref}
          className="reveal"
          style={{ textAlign: "center", marginBottom: "36px" }}
        >
          <div
            style={{
              display: "inline-flex",

              alignItems: "center",

              gap: "8px",

              padding: "6px 20px",

              borderRadius: "9999px",

              background: "rgba(201, 168, 76, 0.15)",

              border: "1px solid rgba(201, 168, 76, 0.4)",

              marginBottom: "16px",
            }}
          >
            <span>🎁</span>
            <span
              className="shimmer-text"
              style={{
                fontFamily: "var(--font-display)",

                fontSize: "1.1rem",

                fontWeight: 600,

                letterSpacing: "0.08em",
              }}
            >
              The Real-Life Birthday Treasure Hunt
            </span>
            <span>🕵️‍♀️</span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",

              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",

              fontWeight: 400,

              fontStyle: "italic",

              color: "var(--foreground)",

              margin: "0 0 10px",
            }}
          >
            Find Your Hidden Gifts
          </h2>
          <p
            style={{
              fontFamily: "var(--font-hand)",

              fontSize: "1.3rem",

              color: "var(--primary)",

              maxWidth: "680px",

              margin: "0 auto",

              lineHeight: 1.5,
            }}
          >
            "I hidden your gifts in special spots all around your home. Look at
            each location photo, follow the clues, and click 'I Found It' to
            reveal the next treasure!"
          </p>
        </div>

        {/* Floating Toast notification */}
        {toastMsg && (
          <div
            style={{
              position: "fixed",

              bottom: "30px",

              left: "50%",

              transform: "translateX(-50%)",

              background: "rgba(30, 24, 18, 0.95)",

              border: "1px solid var(--primary)",

              boxShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 25px var(--primary)",

              color: "#fff",

              padding: "12px 28px",

              borderRadius: "9999px",

              fontSize: "1rem",

              fontWeight: 500,

              zIndex: 1000,

              animation: "fadeIn 0.3s ease",
            }}
          >
            {toastMsg}
          </div>
        )}

        {/* Progress bar */}
        <div
          style={{
            background: "rgba(22, 18, 30, 0.8)",

            border: "1px solid rgba(201, 168, 76, 0.3)",

            borderRadius: "16px",

            padding: "20px 24px",

            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",

              marginBottom: "12px",

              flexWrap: "wrap",

              gap: "10px",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-display)",

                  fontSize: "1.3rem",

                  fontStyle: "italic",

                  color: "var(--primary)",

                  fontWeight: 600,
                }}
              >
                Hunt Progress: {foundCount} of {DEFAULT_GIFT_CLUES.length} Gifts
                Unlocked
              </span>
            </div>
            {foundCount > 0 && (
              <button
                onClick={handleReset}
                style={{
                  background: "none",

                  border: "1px solid rgba(201, 168, 76, 0.25)",

                  color: "var(--muted-foreground)",

                  borderRadius: "9999px",

                  padding: "4px 14px",

                  fontSize: "0.75rem",

                  cursor: "pointer",
                }}
                title="Restart treasure hunt"
              >
                Restart Quest 🔄
              </button>
            )}
          </div>

          {/* Progress Bar track */}
          <div
            style={{
              width: "100%",

              height: "10px",

              background: "rgba(255, 255, 255, 0.08)",

              borderRadius: "9999px",

              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(foundCount / DEFAULT_GIFT_CLUES.length) * 100}%`,

                height: "100%",

                background:
                  "linear-gradient(90deg, #c9a84c 0%, #fff0b3 50%, #c9a84c 100%)",

                borderRadius: "9999px",

                transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",

                boxShadow: "0 0 12px rgba(201, 168, 76, 0.5)",
              }}
            />
          </div>

          {/* Step Selector Pills */}
          <div
            style={{
              display: "flex",

              gap: "10px",

              marginTop: "18px",

              overflowX: "auto",

              paddingBottom: "4px",
            }}
          >
            {DEFAULT_GIFT_CLUES.map((c, i) => {
              const isFound = foundList[i]

              const isCurrent = activeClueIndex === i

              return (
                <button
                  key={c.id}
                  onClick={() => setActiveClueIndex(i)}
                  style={{
                    display: "inline-flex",

                    alignItems: "center",

                    gap: "6px",

                    padding: "8px 16px",

                    borderRadius: "9999px",

                    fontSize: "0.8rem",

                    fontWeight: 600,

                    letterSpacing: "0.05em",

                    textTransform: "uppercase",

                    cursor: "pointer",

                    transition: "all 0.25s ease",

                    whiteSpace: "nowrap",

                    background: isCurrent
                      ? "rgba(201, 168, 76, 0.25)"
                      : isFound
                        ? "rgba(46, 204, 113, 0.15)"
                        : "rgba(255, 255, 255, 0.05)",

                    border: `1px solid ${
                      isCurrent
                        ? "var(--primary)"
                        : isFound
                          ? "rgba(46, 204, 113, 0.4)"
                          : "rgba(255, 255, 255, 0.1)"
                    }`,

                    color: isCurrent
                      ? "var(--primary)"
                      : isFound
                        ? "#2ecc71"
                        : "var(--muted-foreground)",
                  }}
                >
                  <span>{isFound ? "✅" : isCurrent ? "🔍" : "🔒"}</span>
                  <span>Gift {c.giftNum}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ─── Active Clue Card ─── */}
        {!allFound ? (
          <div
            style={{
              background:
                "radial-gradient(circle at 50% 20%, rgba(32, 26, 18, 0.95) 0%, rgba(16, 14, 22, 0.98) 100%)",

              border: "2px solid rgba(201, 168, 76, 0.45)",

              borderRadius: "24px",

              padding: "clamp(24px, 4vw, 44px)",

              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(201, 168, 76, 0.2)",

              display: "grid",

              gridTemplateColumns: "1fr 1fr",

              gap: "clamp(24px, 4vw, 48px)",

              alignItems: "center",
            }}
            className="grid-responsive"
          >
            {/* Left: Location Photo Preview */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  position: "relative",

                  padding: "10px",

                  background: "rgba(25, 21, 33, 0.9)",

                  border: "1px solid rgba(201, 168, 76, 0.35)",

                  borderRadius: "16px",

                  boxShadow: "0 15px 35px rgba(0,0,0,0.6)",

                  cursor: "pointer",
                }}
                onClick={() =>
                  setLightboxImg({
                    src: currentImg,

                    caption: `${currentClue.title} · ${currentClue.locationName}`,
                  })
                }
              >
                <div
                  style={{
                    width: "100%",

                    aspectRatio: "4/3",

                    borderRadius: "10px",

                    overflow: "hidden",

                    background: "#09080e",
                  }}
                >
                  <img
                    src={currentImg}
                    alt={currentClue.title}
                    style={{
                      width: "100%",

                      height: "100%",

                      objectFit: "cover",

                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.04)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
                <div
                  style={{
                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    marginTop: "10px",

                    padding: "0 4px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-hand)",

                      fontSize: "1.15rem",

                      color: "var(--primary)",

                      margin: 0,
                    }}
                  >
                    📍 {currentClue.locationName} ✦ Tap to zoom
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()

                      triggerUploadFor(currentClue.id)
                    }}
                    style={{
                      background: "rgba(201, 168, 76, 0.15)",

                      border: "1px solid rgba(201, 168, 76, 0.35)",

                      color: "var(--primary)",

                      borderRadius: "6px",

                      padding: "3px 8px",

                      fontSize: "0.7rem",

                      cursor: "pointer",
                    }}
                    title="Upload the exact location photo from your home"
                  >
                    📸 Change Photo
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Clue details & 'I Found It!' action */}
            <div>
              <div
                style={{
                  display: "inline-flex",

                  alignItems: "center",

                  gap: "8px",

                  padding: "4px 14px",

                  borderRadius: "9999px",

                  background: "rgba(201, 168, 76, 0.15)",

                  border: "1px solid rgba(201, 168, 76, 0.35)",

                  color: "var(--primary)",

                  fontSize: "0.75rem",

                  fontWeight: 600,

                  letterSpacing: "0.1em",

                  textTransform: "uppercase",

                  marginBottom: "14px",
                }}
              >
                <span>🔎</span>
                <span>
                  Active Clue {activeClueIndex + 1} of{" "}
                  {DEFAULT_GIFT_CLUES.length}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",

                  fontSize: "clamp(1.8rem, 4vw, 2.6rem)",

                  fontWeight: 500,

                  fontStyle: "italic",

                  color: "var(--foreground)",

                  margin: "0 0 14px",

                  lineHeight: 1.2,
                }}
              >
                {currentClue.title}
              </h3>

              <div
                style={{
                  background: "rgba(255, 255, 255, 0.04)",

                  borderLeft: "3px solid var(--primary)",

                  padding: "16px 20px",

                  borderRadius: "0 12px 12px 0",

                  marginBottom: "16px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",

                    fontSize: "1.2rem",

                    fontStyle: "italic",

                    color: "#fff3cf",

                    lineHeight: 1.7,

                    margin: "0 0 8px",
                  }}
                >
                  "{currentClue.hint}"
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",

                    fontSize: "0.85rem",

                    color: "var(--muted-foreground)",

                    margin: 0,
                  }}
                >
                  💡 <em>Hint:</em> {currentClue.roomHint}
                </p>
              </div>

              {/* 🌟 Special Bonus Inside The Bag Notice 🌟 */}
              {currentClue.bonusNote && (
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(201, 168, 76, 0.22) 0%, rgba(232, 199, 107, 0.1) 100%)",

                    border: "1.5px solid var(--primary)",

                    borderRadius: "14px",

                    padding: "14px 18px",

                    marginBottom: "22px",

                    display: "flex",

                    alignItems: "center",

                    gap: "14px",

                    boxShadow:
                      "0 8px 24px rgba(201, 168, 76, 0.3), inset 0 0 15px rgba(201, 168, 76, 0.1)",
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>🎁</span>
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",

                        fontSize: "0.72rem",

                        letterSpacing: "0.2em",

                        textTransform: "uppercase",

                        color: "var(--primary)",

                        fontWeight: 700,

                        display: "block",

                        marginBottom: "4px",
                      }}
                    >
                      🌟 Secret Bonus Inside!
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-hand)",

                        fontSize: "1.15rem",

                        color: "#fff3cf",

                        margin: 0,

                        lineHeight: 1.45,

                        fontWeight: 600,
                      }}
                    >
                      {currentClue.bonusNote}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div
                style={{
                  display: "flex",

                  alignItems: "center",

                  gap: "14px",

                  flexWrap: "wrap",
                }}
              >
                {!foundList[activeClueIndex] ? (
                  <button
                    onClick={() => handleMarkFound(activeClueIndex)}
                    style={{
                      display: "inline-flex",

                      alignItems: "center",

                      gap: "10px",

                      padding: "14px 32px",

                      borderRadius: "9999px",

                      background:
                        "linear-gradient(135deg, #c9a84c 0%, #e8c76b 100%)",

                      color: "#09080e",

                      fontWeight: 700,

                      fontSize: "1rem",

                      letterSpacing: "0.05em",

                      border: "none",

                      cursor: "pointer",

                      boxShadow: "0 6px 24px rgba(201, 168, 76, 0.4)",

                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)"

                      e.currentTarget.style.boxShadow =
                        "0 8px 30px rgba(201, 168, 76, 0.6)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)"

                      e.currentTarget.style.boxShadow =
                        "0 6px 24px rgba(201, 168, 76, 0.4)"
                    }}
                  >
                    <span>🎉</span>
                    <span>I Found It! (Unlock Next Clue)</span>
                    <span>🎁</span>
                  </button>
                ) : (
                  <div
                    style={{
                      display: "inline-flex",

                      alignItems: "center",

                      gap: "10px",

                      padding: "12px 24px",

                      borderRadius: "9999px",

                      background: "rgba(46, 204, 113, 0.2)",

                      border: "1px solid #2ecc71",

                      color: "#2ecc71",

                      fontWeight: 600,

                      fontSize: "0.95rem",
                    }}
                  >
                    <span>✅</span>
                    <span>Found & Unlocked!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ─── Grand All-Gifts-Found Celebration Screen ─── */

          <div
            className="muthe-card"
            style={{
              textAlign: "center",

              padding: "clamp(36px, 6vw, 60px) clamp(20px, 5vw, 40px)",

              position: "relative",
            }}
          >
            <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>
              👑🎁✨
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",

                fontSize: "clamp(2.4rem, 6vw, 4rem)",

                fontWeight: 600,

                fontStyle: "italic",

                color: "#fff3cf",

                margin: "0 0 12px",

                textShadow: "0 0 30px rgba(201, 168, 76, 0.4)",
              }}
            >
              All {DEFAULT_GIFT_CLUES.length} Gifts Unlocked!
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",

                fontSize: "0.85rem",

                letterSpacing: "0.25em",

                textTransform: "uppercase",

                color: "var(--primary)",

                marginBottom: "20px",
              }}
            >
              Happy Birthday, Muthe Mutharame!
            </p>

            <div
              style={{
                display: "inline-flex",

                alignItems: "center",

                gap: "10px",

                padding: "10px 24px",

                background: "rgba(201, 168, 76, 0.18)",

                border: "1px solid var(--primary)",

                borderRadius: "9999px",

                color: "#fff3cf",

                fontFamily: "var(--font-hand)",

                fontSize: "1.25rem",

                marginBottom: "24px",
              }}
            >
              <span>🎁</span>
              <span>
                Reminder: Check inside the white gift bag for your bonus
                surprise!
              </span>
              <span>✨</span>
            </div>

            <p
              style={{
                fontFamily: "var(--font-display)",

                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",

                fontStyle: "italic",

                color: "rgba(240, 234, 214, 0.9)",

                maxWidth: "600px",

                margin: "0 auto 36px",

                lineHeight: 1.8,
              }}
            >
              "Every single gift was placed with so much love in your home. I
              hope you loved the search, loved every spot, and most of all,
              remember that having you in my life is the greatest gift I could
              ever ask for."
            </p>

            <div
              style={{
                display: "flex",

                justifyContent: "center",

                gap: "16px",

                flexWrap: "wrap",
              }}
            >
              <button
                onClick={handleReset}
                style={{
                  display: "inline-flex",

                  alignItems: "center",

                  gap: "8px",

                  padding: "12px 28px",

                  borderRadius: "9999px",

                  background:
                    "linear-gradient(135deg, #c9a84c 0%, #e8c76b 100%)",

                  color: "#09080e",

                  fontWeight: 600,

                  fontSize: "0.9rem",

                  border: "none",

                  cursor: "pointer",

                  boxShadow: "0 4px 20px rgba(201, 168, 76, 0.4)",
                }}
              >
                <span>🔄</span>
                <span>Play Quest Again</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Section 09 — Things I'll Never Forget ───────────────────────────────────

const neverForget = [
  "The random conversations.",

  "The unnecessary fights.",

  "The silent understanding.",

  "The travelling.",

  "The stupid jokes.",

  "The serious conversations.",

  "The places.",

  "The photos.",

  "The memories nobody else understands.",
]

function NeverForgetSection() {
  const ref = useReveal()

  const [visible, setVisible] = useState<number>(0)

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current

    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          neverForget.forEach((_, i) => {
            setTimeout(() => setVisible((v) => Math.max(v, i + 1)), i * 400)
          })

          obs.disconnect()
        }
      },

      { threshold: 0.2 },
    )

    obs.observe(el)

    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "clamp(80px,12vw,140px) clamp(20px,8vw,100px)",

        background:
          "radial-gradient(ellipse at 50% 30%, #1a1220 0%, #09080e 60%)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <div ref={ref} className="reveal" style={{ marginBottom: "70px" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",

              fontSize: "clamp(2rem, 6vw, 4.5rem)",

              fontWeight: 400,

              fontStyle: "italic",

              color: "var(--foreground)",

              margin: 0,
            }}
          >
            Things I'll Never Forget About Us
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {neverForget.map((line, i) => (
            <div
              key={i}
              style={{
                opacity: visible > i ? 1 : 0,

                transform: visible > i ? "translateY(0)" : "translateY(16px)",

                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",

                  fontSize: "clamp(1.2rem, 3vw, 1.8rem)",

                  fontStyle: "italic",

                  fontWeight: 300,

                  color: "rgba(240,234,214,0.85)",

                  margin: 0,

                  lineHeight: 1.4,
                }}
              >
                {line}
              </p>
              {i < neverForget.length - 1 && (
                <div
                  style={{
                    width: "40px",

                    height: "1px",

                    background: "var(--border)",

                    margin: "12px auto 0",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "60px",

            opacity: visible >= neverForget.length ? 1 : 0,

            transition: "opacity 1s ease 0.5s",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",

              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",

              fontStyle: "italic",

              color: "var(--secondary-foreground)",

              lineHeight: 1.8,
            }}
          >
            "And the fact that no matter what happened...
            <br />
            <br />
            <strong style={{ color: "var(--primary)", fontStyle: "normal" }}>
              we never truly left each other."
            </strong>
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Section 10 — The Letter ──────────────────────────────────────────────────

function LetterSection() {
  const ref = useReveal()

  return (
    <section
      id="letter"
      style={{
        padding: "clamp(80px,12vw,140px) clamp(20px,6vw,60px)",

        background: "linear-gradient(180deg, #09080e 0%, #0f0e18 100%)",
      }}
    >
      <div
        ref={ref}
        className="reveal"
        style={{ maxWidth: "720px", margin: "0 auto" }}
      >
        <div
          className="paper-texture"
          style={{
            padding: "clamp(36px,8vw,72px) clamp(30px,6vw,64px)",

            boxShadow:
              "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.1)",

            transform: "rotate(-0.3deg)",

            position: "relative",
          }}
        >
          {/* Paper lines */}
          <div
            style={{
              position: "absolute",

              inset: "60px 40px",

              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent, transparent 31px, rgba(100,80,40,0.08) 31px, rgba(100,80,40,0.08) 32px)",

              pointerEvents: "none",
            }}
          />

          <h2
            style={{
              fontFamily: "var(--font-display)",

              fontSize: "clamp(1.8rem, 5vw, 3rem)",

              fontWeight: 600,

              fontStyle: "italic",

              color: "#2a1f0e",

              margin: "0 0 40px",

              position: "relative",
            }}
          >
            To My Unexpected Person,
          </h2>

          <div
            style={{
              fontFamily: "var(--font-hand)",

              fontSize: "clamp(1.15rem, 2.5vw, 1.35rem)",

              lineHeight: 2,

              color: "#3a2a10",

              position: "relative",
            }}
          >
            <p>I don't know exactly when you became this important to me.</p>
            <p>You entered my life unexpectedly.</p>
            <p>
              There was no plan.
              <br />
              No warning.
              <br />
              No idea that you would eventually become someone I couldn't simply
              ignore.
            </p>
            <p>We've experienced happiness at its peak.</p>
            <p>We've experienced sadness at its peak.</p>
            <p>
              We've fought.
              <br />
              We've laughed.
              <br />
              We've travelled.
              <br />
              We've created memories without realizing they would someday become
              memories.
            </p>
            <p>And somehow, through everything...</p>
            <p style={{ fontSize: "1.4em", color: "#5a3a10" }}>
              <strong>we stayed.</strong>
            </p>
            <div
              style={{
                height: "1px",

                background: "rgba(100,80,40,0.2)",

                margin: "32px 0",
              }}
            />
            <p style={{ fontSize: "1.2em", fontStyle: "italic" }}>
              "You didn't just become a memory.
            </p>
            <p style={{ fontSize: "1.3em", color: "#5a3a10" }}>
              <strong>You became a chapter of my life."</strong>
            </p>
            <div
              style={{
                height: "1px",

                background: "rgba(100,80,40,0.2)",

                margin: "32px 0",
              }}
            />
            <p
              style={{
                fontSize: "1rem",

                color: "#6a4a20",

                fontStyle: "italic",
              }}
            >
              From the person who is still grateful that you unexpectedly walked
              into his life.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section 11 — The Final 12:00 AM Countdown & Celebration ──────────────────
function getNextMidnight(): number {
  const now = new Date()
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
    0,
  )
  return midnight.getTime()
}

function FinalSection() {
  const [targetTime] = useState<number>(() => getNextMidnight())

  // Inside the unlocked website, always show the grand birthday celebration
  const [revealed, setRevealed] = useState<boolean>(true)

  // Clear any stale localStorage keys on mount
  useEffect(() => {
    try {
      localStorage.removeItem("panda_bday_revealed")
      localStorage.removeItem("panda_bday_countdown_target")
    } catch {}
  }, [])

  const [blessingCount, setBlessingCount] = useState(365)
  const [floatingHearts, setFloatingHearts] = useState<Array<{
    id: number
    tx: number
    ty: number
    emoji: string
    left: number
  }>>([])

  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Live timer tick every 1000ms
  useEffect(() => {
    const timer = setInterval(() => {
      const diff = targetTime - Date.now()
      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isOver: true,
        })
        setRevealed(true)
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
          isOver: false,
        })
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [targetTime])

  // Autoplay Muthe Mutharame song when revealed
  useEffect(() => {
    if (revealed && audioRef.current) {
      audioRef.current.volume = 0.85
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log("Audio autoplay waiting for interaction:", err)
          })
      }
    }
  }, [revealed])

  const handleRevealNow = () => {
    setRevealed(true)
  }

  const handleShowCountdown = () => {
    setRevealed(false)
  }

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.volume = 0.85
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.error(e))
    }
  }

  const handleShowerLove = () => {
    setBlessingCount((prev) => prev + 1)
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.volume = 0.85
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {})
    }

    const emojis = ["💖", "❤️", "✨", "🌸", "⭐", "💎", "💐", "🐼", "🥂"]
    const newHearts = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      tx: (Math.random() - 0.5) * 280,
      ty: -140 - Math.random() * 200,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: 35 + Math.random() * 30,
    }))

    setFloatingHearts((prev) => [...prev, ...newHearts])
    setTimeout(() => {
      setFloatingHearts((prev) => prev.slice(newHearts.length))
    }, 2000)
  }

  return (
    <section
      id="climax"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(60px,10vw,120px) clamp(20px,8vw,80px)",
        background: revealed
          ? "radial-gradient(ellipse at 50% 35%, #22170d 0%, #0d0a14 50%, #07060a 100%)"
          : "radial-gradient(ellipse at 50% 35%, #151122 0%, #09080e 70%)",
        transition: "background 1.5s ease",
        position: "relative",
      }}
    >
      {/* Ambient background glow on reveal */}
      {revealed && (
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
            animation: "fadeIn 2.5s ease",
          }}
        />
      )}

      {/* Hidden audio element for Muthe Mutharame */}
      <audio
        ref={audioRef}
        src="/media/audio/song_muthe_mutharame.mp3"
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "840px" }}>
        {/* ─── STATE 1: Wonderful Live Countdown to 12:00 AM ─── */}
        {!revealed ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Top Pill Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 24px",
                borderRadius: "9999px",
                background: "rgba(201, 168, 76, 0.15)",
                border: "1px solid rgba(201, 168, 76, 0.4)",
                marginBottom: "24px",
              }}
            >
              <span>⏳</span>
              <span
                className="shimmer-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                }}
              >
                Countdown to 12:00 AM · Midnight Reveal
              </span>
              <span>✦</span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
                fontWeight: 500,
                fontStyle: "italic",
                color: "var(--foreground)",
                margin: "0 0 14px",
                lineHeight: 1.15,
              }}
            >
              Counting Down To Your Birthday
            </h2>

            <p
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
                color: "var(--primary)",
                maxWidth: "600px",
                margin: "0 auto 36px",
                lineHeight: 1.5,
              }}
            >
              "The clock is ticking towards 12:00 AM... A magical milestone is
              about to unlock for Panda."
            </p>

            {/* Countdown Grid (Days, Hours, Minutes, Seconds) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(10px, 3vw, 20px)",
                marginBottom: "40px",
                flexWrap: "wrap",
              }}
            >
              {/* Days (if > 0) */}
              {timeLeft.days > 0 && (
                <>
                  <div
                    style={{
                      background: "rgba(25, 20, 32, 0.85)",
                      border: "1.5px solid rgba(201, 168, 76, 0.4)",
                      borderRadius: "18px",
                      padding: "clamp(16px, 3vw, 28px) clamp(16px, 3vw, 24px)",
                      minWidth: "clamp(85px, 16vw, 120px)",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
                        fontWeight: 600,
                        color: "var(--primary)",
                        lineHeight: 1,
                      }}
                    >
                      {String(timeLeft.days).padStart(2, "0")}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--muted-foreground)",
                        marginTop: "8px",
                      }}
                    >
                      Days
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "2rem",
                      color: "rgba(201,168,76,0.6)",
                      fontWeight: 300,
                    }}
                  >
                    :
                  </span>
                </>
              )}

              {/* Hours */}
              <div
                style={{
                  background: "rgba(25, 20, 32, 0.85)",
                  border: "1.5px solid rgba(201, 168, 76, 0.4)",
                  borderRadius: "18px",
                  padding: "clamp(16px, 3vw, 28px) clamp(16px, 3vw, 24px)",
                  minWidth: "clamp(85px, 16vw, 120px)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
                    fontWeight: 600,
                    color: "var(--primary)",
                    lineHeight: 1,
                  }}
                >
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                    marginTop: "8px",
                  }}
                >
                  Hours
                </div>
              </div>

              <span
                style={{
                  fontSize: "2rem",
                  color: "rgba(201,168,76,0.6)",
                  fontWeight: 300,
                }}
              >
                :
              </span>

              {/* Minutes */}
              <div
                style={{
                  background: "rgba(25, 20, 32, 0.85)",
                  border: "1.5px solid rgba(201, 168, 76, 0.4)",
                  borderRadius: "18px",
                  padding: "clamp(16px, 3vw, 28px) clamp(16px, 3vw, 24px)",
                  minWidth: "clamp(85px, 16vw, 120px)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
                    fontWeight: 600,
                    color: "var(--primary)",
                    lineHeight: 1,
                  }}
                >
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                    marginTop: "8px",
                  }}
                >
                  Minutes
                </div>
              </div>

              <span
                style={{
                  fontSize: "2rem",
                  color: "rgba(201,168,76,0.6)",
                  fontWeight: 300,
                }}
              >
                :
              </span>

              {/* Seconds */}
              <div
                style={{
                  background: "rgba(25, 20, 32, 0.85)",
                  border: "1.5px solid rgba(201, 168, 76, 0.6)",
                  borderRadius: "18px",
                  padding: "clamp(16px, 3vw, 28px) clamp(16px, 3vw, 24px)",
                  minWidth: "clamp(85px, 16vw, 120px)",
                  boxShadow: "0 0 25px rgba(201, 168, 76, 0.25)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
                    fontWeight: 600,
                    color: "#fff3cf",
                    lineHeight: 1,
                  }}
                >
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--primary)",
                    marginTop: "8px",
                  }}
                >
                  Seconds
                </div>
              </div>
            </div>

            {/* Live locked status banner */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                marginBottom: "20px",
              }}
            >
              🕛 Automatically reveals when the clock strikes 12:00 AM
            </p>

            {/* Countdown Locked Status Badge - Displayed strictly until timer cools down */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 32px",
                borderRadius: "9999px",
                background: "rgba(201, 168, 76, 0.08)",
                border: "1.5px solid rgba(201, 168, 76, 0.35)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>🔒</span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--primary)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                }}
              >
                Locked · Unlocks Automatically at 12:00 AM Midnight
              </span>
              <span style={{ fontSize: "1.1rem" }}>✨</span>
            </div>
          </div>
        ) : (
          /* ─── STATE 2: The Grand 12:00 AM Birthday Reveal ─── */
          <div style={{ animation: "golden-reveal 1.8s ease forwards" }}>
            {/* Floating Hearts burst container */}
            {floatingHearts.map((h) => (
              <span
                key={h.id}
                style={{
                  position: "absolute",
                  bottom: "70px",
                  left: `${h.left}%`,
                  pointerEvents: "none",
                  fontSize: "1.8rem",
                  animation: "heart-burst 1.6s ease-out forwards",
                  transform: `translate(${h.tx}px, ${h.ty}px)`,
                  zIndex: 20,
                }}
              >
                {h.emoji}
              </span>
            ))}

            {/* Top Shimmer Milestone Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 24px",
                borderRadius: "9999px",
                background: "rgba(201, 168, 76, 0.18)",
                border: "1px solid rgba(201, 168, 76, 0.5)",
                marginBottom: "20px",
              }}
            >
              <span>🥂</span>
              <span
                className="shimmer-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                12:00 AM Midnight · Golden Milestone
              </span>
              <span>👑</span>
            </div>

            {/* Exact requested typography: "Happie Bday panda" */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                fontWeight: 700,
                fontStyle: "italic",
                background:
                  "linear-gradient(135deg, #fff3cf 0%, #c9a84c 50%, #f3d88b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: "0 0 10px",
                lineHeight: 1.05,
                filter: "drop-shadow(0 0 35px rgba(201, 168, 76, 0.45))",
              }}
            >
              Happie Bday panda 🐼✨
            </h1>

            {/* Exact requested typography: "cheers to Twenty" */}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
                fontWeight: 600,
                fontStyle: "italic",
                color: "#ffffff",
                margin: "0 0 24px",
                textShadow: "0 0 25px rgba(201, 168, 76, 0.5)",
                letterSpacing: "0.02em",
              }}
            >
              🥂 Cheers to Twenty! 👑
            </h2>

            <p
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
                color: "var(--primary)",
                margin: "0 0 36px",
              }}
            >
              "20 years of sunshine, laughter, fights, inside jokes, and being
              the most special person in my life."
            </p>

            {/* ─── Grand Finale "Muthe Mutharame" Birthday Card ─── */}
            <div
              className="muthe-card"
              style={{
                marginTop: "20px",
                marginBottom: "40px",
                padding: "clamp(28px, 5vw, 48px) clamp(18px, 4vw, 36px)",
                position: "relative",
              }}
            >
              {/* Floating Music Controller Bar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "22px",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px 22px",
                    borderRadius: "9999px",
                    background: isPlaying
                      ? "rgba(201, 168, 76, 0.22)"
                      : "rgba(255, 255, 255, 0.08)",
                    border: `1px solid ${
                      isPlaying ? "var(--primary)" : "rgba(201, 168, 76, 0.35)"
                    }`,
                    boxShadow: isPlaying
                      ? "0 0 25px rgba(201, 168, 76, 0.35)"
                      : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <button
                    onClick={toggleMusic}
                    style={{
                      background: "var(--primary)",
                      color: "#09080e",
                      border: "none",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                    title={
                      isPlaying
                        ? "Pause Muthe Mutharame Song"
                        : "Play Muthe Mutharame Song"
                    }
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </button>
                  <div style={{ textAlign: "left" }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: isPlaying
                          ? "var(--primary)"
                          : "var(--foreground)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {isPlaying
                        ? "Now Playing: Muthe Mutharame 🎵"
                        : "Song: Muthe Mutharame 🎵"}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.7rem",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {isPlaying
                        ? "Playing for our special moments"
                        : "Click to play song"}
                    </p>
                  </div>
                  {isPlaying && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "3px",
                        height: "16px",
                        marginLeft: "6px",
                      }}
                    >
                      <span
                        style={{
                          width: "3px",
                          height: "100%",
                          background: "var(--primary)",
                          borderRadius: "2px",
                          animation:
                            "equalizer-bar 0.8s ease-in-out infinite alternate",
                        }}
                      />
                      <span
                        style={{
                          width: "3px",
                          height: "60%",
                          background: "var(--primary)",
                          borderRadius: "2px",
                          animation:
                            "equalizer-bar 1.1s ease-in-out 0.2s infinite alternate",
                        }}
                      />
                      <span
                        style={{
                          width: "3px",
                          height: "85%",
                          background: "var(--primary)",
                          borderRadius: "2px",
                          animation:
                            "equalizer-bar 0.9s ease-in-out 0.4s infinite alternate",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Shimmer badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 24px",
                  borderRadius: "9999px",
                  background: "rgba(201, 168, 76, 0.15)",
                  border: "1px solid rgba(201, 168, 76, 0.4)",
                  marginBottom: "20px",
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>✨</span>
                <span
                  className="shimmer-text"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  മുത്തേ മുത്താരമേ · Muthe Mutharame
                </span>
                <span style={{ fontSize: "1.1rem" }}>✨</span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: "#fff3cf",
                  margin: "0 0 8px",
                  lineHeight: 1.15,
                  textShadow: "0 0 25px rgba(201, 168, 76, 0.3)",
                }}
              >
                To My Most Precious Pearl
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--primary)",
                  marginBottom: "28px",
                }}
              >
                September 23, 2025 to Today & Forever
              </p>

              {/* Centerpiece Photo: muthe muthaarame */}
              <div style={{ marginBottom: "30px" }}>
                <div
                  style={{
                    display: "inline-block",
                    position: "relative",
                    padding: "12px",
                    background:
                      "linear-gradient(145deg, #1d192a 0%, #120e1d 100%)",
                    borderRadius: "18px",
                    border: "1px solid rgba(201, 168, 76, 0.4)",
                    boxShadow:
                      "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(201, 168, 76, 0.2)",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(210px, 30vw, 280px)",
                      aspectRatio: "721/1280",
                      maxHeight: "420px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "#09080e",
                    }}
                  >
                    <img
                      src="/media/pics/pic_muthe_mutharame.jpg"
                      alt="Muthe Mutharame"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.04)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-hand)",
                      fontSize: "1.3rem",
                      color: "var(--primary)",
                      margin: "12px 0 4px",
                      textAlign: "center",
                    }}
                  >
                    Muthe Mutharame ✦ Always My Favorite Person
                  </p>
                </div>
              </div>

              {/* Touching Birthday Wishing Quote */}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 1.95,
                  color: "rgba(240, 234, 214, 0.9)",
                  textAlign: "center",
                  maxWidth: "600px",
                  margin: "0 auto 30px",
                }}
              >
                <p style={{ margin: "0 0 16px" }}>
                  "If someone told me back on September 23, 2025 at that KFC
                  table that the girl sitting across from me would become the
                  most irreplaceable blessing in my entire world, I wouldn't
                  have believed them."
                </p>
                <p style={{ margin: "0 0 16px" }}>
                  "You brought warmth into quiet days, turned everyday college
                  rides into stand-up comedy, and gave me a friendship that
                  feels like home. You are my pearl, my confidante, and my
                  greatest comfort."
                </p>
                <p
                  style={{
                    margin: "0 0 12px",
                    color: "#fff1bd",
                    fontWeight: 500,
                    fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)",
                  }}
                >
                  "Happy Birthday, Panda! Cheers to Twenty wonderful years, and
                  may your days always be filled with boundless joy, peace, and
                  uncontrollable laughter."
                </p>
                <p
                  style={{
                    margin: "0",
                    color: "var(--primary)",
                    fontSize: "1rem",
                  }}
                >
                  No matter where life takes us — you will always be my most
                  precious treasure. 💖
                </p>
              </div>

              {/* Interactive Heart Shower Button */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <button
                  onClick={handleShowerLove}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 28px",
                    borderRadius: "9999px",
                    background:
                      "linear-gradient(135deg, #c9a84c 0%, #e8c76b 100%)",
                    color: "#09080e",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    letterSpacing: "0.05em",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(201, 168, 76, 0.4)",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)"
                    e.currentTarget.style.boxShadow =
                      "0 6px 28px rgba(201, 168, 76, 0.6)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)"
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(201, 168, 76, 0.4)"
                  }}
                >
                  <span>💖</span>
                  <span>Shower Hearts & Blessings for Panda</span>
                  <span>✨</span>
                </button>

                {blessingCount > 0 && (
                  <p
                    style={{
                      fontFamily: "var(--font-hand)",
                      fontSize: "1.15rem",
                      color: "var(--primary)",
                      margin: 0,
                    }}
                  >
                    {blessingCount} blessings sent with love! 🌸
                  </p>
                )}
              </div>
            </div>

            {/* Toggle back to live countdown clock button */}
            <div style={{ marginTop: "24px" }}>
              <button
                onClick={handleShowCountdown}
                style={{
                  background: "none",
                  border: "1px solid rgba(201, 168, 76, 0.3)",
                  color: "var(--muted-foreground)",
                  borderRadius: "9999px",
                  padding: "8px 20px",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)"
                  e.currentTarget.style.color = "var(--primary)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.3)"
                  e.currentTarget.style.color = "var(--muted-foreground)"
                }}
              >
                ⏳ View Live Countdown Clock
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)

    window.addEventListener("scroll", handler)

    return () => window.removeEventListener("scroll", handler)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      style={{
        position: "fixed",

        top: 0,

        left: 0,

        right: 0,

        zIndex: 100,

        padding: "14px 28px",

        display: "flex",

        alignItems: "center",

        justifyContent: "space-between",

        background: scrolled ? "rgba(9,8,14,0.92)" : "rgba(9,8,14,0.4)",

        backdropFilter: "blur(14px)",

        borderBottom: scrolled
          ? "1px solid rgba(201,168,76,0.18)"
          : "1px solid transparent",

        transition: "all 0.4s ease",
      }}
    >
      <div
        style={{
          display: "flex",

          alignItems: "center",

          gap: "12px",

          cursor: "pointer",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",

            fontSize: "1.1rem",

            fontStyle: "italic",

            color: "var(--primary)",

            letterSpacing: "0.05em",
          }}
        >
          The Unexpected Chapter
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",

            fontSize: "0.65rem",

            letterSpacing: "0.2em",

            textTransform: "uppercase",

            color: "var(--muted-foreground)",

            borderLeft: "1px solid var(--border)",

            paddingLeft: "10px",
          }}
        >
          Sep 23
        </span>
      </div>

      <div
        style={{
          display: "flex",

          alignItems: "center",

          gap: "clamp(10px, 2vw, 24px)",

          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => scrollTo("beginning")}
          style={{
            background: "none",

            border: "none",

            color: "var(--muted-foreground)",

            fontSize: "0.75rem",

            letterSpacing: "0.1em",

            textTransform: "uppercase",

            cursor: "pointer",

            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--foreground)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--muted-foreground)")
          }
        >
          Story
        </button>
        <button
          onClick={() => scrollTo("timeline")}
          style={{
            background: "none",

            border: "none",

            color: "var(--muted-foreground)",

            fontSize: "0.75rem",

            letterSpacing: "0.1em",

            textTransform: "uppercase",

            cursor: "pointer",

            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--foreground)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--muted-foreground)")
          }
        >
          Timeline
        </button>
        <button
          onClick={() => scrollTo("monthly-vault")}
          style={{
            background: "rgba(201,168,76,0.12)",

            border: "1px solid rgba(201,168,76,0.4)",

            color: "var(--primary)",

            padding: "4px 12px",

            borderRadius: "9999px",

            fontSize: "0.75rem",

            letterSpacing: "0.1em",

            textTransform: "uppercase",

            cursor: "pointer",

            transition: "all 0.2s",

            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--primary)"

            e.currentTarget.style.color = "#09080e"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(201,168,76,0.12)"

            e.currentTarget.style.color = "var(--primary)"
          }}
        >
          Monthly Vault (135)
        </button>
        <button
          onClick={() => scrollTo("places")}
          style={{
            background: "none",

            border: "none",

            color: "var(--muted-foreground)",

            fontSize: "0.75rem",

            letterSpacing: "0.1em",

            textTransform: "uppercase",

            cursor: "pointer",

            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--foreground)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--muted-foreground)")
          }
        >
          Places
        </button>
        <button
          onClick={() => scrollTo("photowall")}
          style={{
            background: "none",

            border: "none",

            color: "var(--muted-foreground)",

            fontSize: "0.75rem",

            letterSpacing: "0.1em",

            textTransform: "uppercase",

            cursor: "pointer",

            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--foreground)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--muted-foreground)")
          }
        >
          Photos
        </button>
        <button
          onClick={() => scrollTo("gift-hunt")}
          style={{
            background: "rgba(201,168,76,0.18)",

            border: "1px solid rgba(201,168,76,0.5)",

            color: "var(--primary)",

            padding: "4px 12px",

            borderRadius: "9999px",

            fontSize: "0.75rem",

            letterSpacing: "0.1em",

            textTransform: "uppercase",

            cursor: "pointer",

            transition: "all 0.2s",

            fontWeight: 600,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--primary)"

            e.currentTarget.style.color = "#09080e"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(201,168,76,0.18)"

            e.currentTarget.style.color = "var(--primary)"
          }}
        >
          Gift Hunt 🎁
        </button>
        <button
          onClick={() => scrollTo("letter")}
          style={{
            background: "none",

            border: "none",

            color: "var(--muted-foreground)",

            fontSize: "0.75rem",

            letterSpacing: "0.1em",

            textTransform: "uppercase",

            cursor: "pointer",

            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--foreground)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--muted-foreground)")
          }
        >
          Letter
        </button>
        <button
          onClick={() => scrollTo("climax")}
          style={{
            background: "none",

            border: "none",

            color: "var(--primary)",

            fontSize: "0.75rem",

            letterSpacing: "0.1em",

            textTransform: "uppercase",

            cursor: "pointer",

            opacity: 0.9,
          }}
        >
          12:00 AM ✦
        </button>
      </div>
    </nav>
  )
}

// ─── Countdown Gate (Visible First · Sections Strictly Locked Until 12:00 AM) ───
function CountdownGate({ onUnlock }: { onUnlock: () => void }) {
  const targetTime = getNextMidnight()

  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = targetTime - Date.now()
    return {
      days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
      isOver: diff <= 0,
    }
  })

  const [cooledDown, setCooledDown] = useState(() => Date.now() >= targetTime)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = targetTime - Date.now()
      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isOver: true,
        })
        setCooledDown(true)
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
          isOver: false,
        })
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [targetTime])

  // Autoplay Muthe Mutharame song when midnight arrives
  useEffect(() => {
    if (cooledDown && audioRef.current) {
      audioRef.current.volume = 0.85
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log("Audio autoplay waiting for user interaction:", err)
          })
      }
    }
  }, [cooledDown])

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.volume = 0.85
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.error(e))
    }
  }

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(40px, 8vw, 80px) clamp(20px, 6vw, 60px)",
        background: cooledDown
          ? "radial-gradient(ellipse at 50% 35%, #24180d 0%, #0d0a14 55%, #07060a 100%)"
          : "radial-gradient(ellipse at 50% 35%, #1b1228 0%, #0b0914 60%, #06050a 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Particles />

      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "min(90vw, 750px)",
          height: "min(90vw, 750px)",
          borderRadius: "50%",
          background: cooledDown
            ? "radial-gradient(circle, rgba(201,168,76,0.25) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(147, 107, 214, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Audio element for Muthe Mutharame */}
      <audio
        ref={audioRef}
        src="/media/audio/song_muthe_mutharame.mp3"
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Secret dev preview trigger in top right corner */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 10,
        }}
      >
        <button
          onClick={onUnlock}
          title="Preview unlocked site"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(201, 168, 76, 0.2)",
            color: "rgba(240, 234, 214, 0.4)",
            borderRadius: "9999px",
            padding: "4px 12px",
            fontSize: "0.7rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--primary)"
            e.currentTarget.style.borderColor = "var(--primary)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(240, 234, 214, 0.4)"
            e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.2)"
          }}
        >
          Preview ✦
        </button>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "860px",
          width: "100%",
        }}
      >
        {!cooledDown ? (
          /* ─── STATE 1: Locked Countdown Gate (Strictly Before 12:00 AM) ─── */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              animation: "fadeIn 1s ease",
            }}
          >
            {/* Top Pill Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 24px",
                borderRadius: "9999px",
                background: "rgba(201, 168, 76, 0.12)",
                border: "1px solid rgba(201, 168, 76, 0.4)",
                marginBottom: "24px",
              }}
            >
              <span>⏳</span>
              <span
                className="shimmer-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(0.85rem, 2.5vw, 1.05rem)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                }}
              >
                Panda's 20th Birthday · 12:00 AM Midnight Countdown
              </span>
              <span>✦</span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 6vw, 4.4rem)",
                fontWeight: 500,
                fontStyle: "italic",
                color: "var(--foreground)",
                margin: "0 0 16px",
                lineHeight: 1.15,
              }}
            >
              Counting Down To Your Birthday
            </h1>

            <p
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                color: "var(--primary)",
                maxWidth: "640px",
                margin: "0 auto 36px",
                lineHeight: 1.45,
              }}
            >
              "The clock is ticking towards 12:00 AM... Hold your breath, Panda.
              A special journey is about to unlock for you."
            </p>

            {/* Countdown Grid (Days, Hours, Minutes, Seconds) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(8px, 2.5vw, 20px)",
                marginBottom: "36px",
                flexWrap: "wrap",
              }}
            >
              {timeLeft.days > 0 && (
                <>
                  <div
                    style={{
                      background: "rgba(25, 20, 34, 0.9)",
                      border: "1.5px solid rgba(201, 168, 76, 0.45)",
                      borderRadius: "18px",
                      padding: "clamp(16px, 3vw, 28px) clamp(14px, 3vw, 24px)",
                      minWidth: "clamp(80px, 16vw, 120px)",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
                        fontWeight: 600,
                        color: "var(--primary)",
                        lineHeight: 1,
                      }}
                    >
                      {String(timeLeft.days).padStart(2, "0")}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--muted-foreground)",
                        marginTop: "8px",
                      }}
                    >
                      Days
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "2rem",
                      color: "rgba(201,168,76,0.6)",
                      fontWeight: 300,
                    }}
                  >
                    :
                  </span>
                </>
              )}

              {/* Hours */}
              <div
                style={{
                  background: "rgba(25, 20, 34, 0.9)",
                  border: "1.5px solid rgba(201, 168, 76, 0.45)",
                  borderRadius: "18px",
                  padding: "clamp(16px, 3vw, 28px) clamp(14px, 3vw, 24px)",
                  minWidth: "clamp(80px, 16vw, 120px)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
                    fontWeight: 600,
                    color: "var(--primary)",
                    lineHeight: 1,
                  }}
                >
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                    marginTop: "8px",
                  }}
                >
                  Hours
                </div>
              </div>

              <span
                style={{
                  fontSize: "2rem",
                  color: "rgba(201,168,76,0.6)",
                  fontWeight: 300,
                }}
              >
                :
              </span>

              {/* Minutes */}
              <div
                style={{
                  background: "rgba(25, 20, 34, 0.9)",
                  border: "1.5px solid rgba(201, 168, 76, 0.45)",
                  borderRadius: "18px",
                  padding: "clamp(16px, 3vw, 28px) clamp(14px, 3vw, 24px)",
                  minWidth: "clamp(80px, 16vw, 120px)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
                    fontWeight: 600,
                    color: "var(--primary)",
                    lineHeight: 1,
                  }}
                >
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                    marginTop: "8px",
                  }}
                >
                  Minutes
                </div>
              </div>

              <span
                style={{
                  fontSize: "2rem",
                  color: "rgba(201,168,76,0.6)",
                  fontWeight: 300,
                }}
              >
                :
              </span>

              {/* Seconds */}
              <div
                style={{
                  background: "rgba(25, 20, 34, 0.9)",
                  border: "1.5px solid rgba(201, 168, 76, 0.65)",
                  borderRadius: "18px",
                  padding: "clamp(16px, 3vw, 28px) clamp(14px, 3vw, 24px)",
                  minWidth: "clamp(80px, 16vw, 120px)",
                  boxShadow: "0 0 30px rgba(201, 168, 76, 0.3)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
                    fontWeight: 600,
                    color: "#fff3cf",
                    lineHeight: 1,
                  }}
                >
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--primary)",
                    marginTop: "8px",
                  }}
                >
                  Seconds
                </div>
              </div>
            </div>

            {/* Locked Gate Card - Strictly blocks entry into sections */}
            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                padding: "20px 32px",
                borderRadius: "20px",
                background: "rgba(25, 20, 34, 0.8)",
                border: "1.5px solid rgba(201, 168, 76, 0.35)",
                maxWidth: "600px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "var(--primary)",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                <span style={{ fontSize: "1.3rem" }}>🔒</span>
                <span>Story Chapters & Surprises Locked Until 12:00 AM</span>
                <span>✨</span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "rgba(240, 234, 214, 0.7)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Patience, Panda 🐼 All your gifts, our story timeline, secret
                photos & birthday surprises are safely protected behind this
                door. The gates will open automatically when the clock strikes
                12:00 AM.
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "4px",
                  fontSize: "0.75rem",
                  color: "var(--muted-foreground)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                <span style={{ color: "#22c55e" }}>●</span>
                <span>
                  Live Synchronized Timer · Unlocks at 12:00 AM Midnight
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ─── STATE 2: Midnight Arrived! Reveal & Enter ─── */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              animation: "golden-reveal 1.5s ease forwards",
            }}
          >
            {/* Top Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 24px",
                borderRadius: "9999px",
                background: "rgba(201, 168, 76, 0.2)",
                border: "1px solid rgba(201, 168, 76, 0.6)",
                marginBottom: "20px",
              }}
            >
              <span>🎉</span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.95rem",
                  color: "var(--primary)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                The Clock Struck 12:00 AM · The Wait Is Over!
              </span>
              <span>👑</span>
            </div>

            <h1
              className="shimmer-text"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 8vw, 5.2rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                margin: "0 0 10px",
              }}
            >
              Happie Bday panda 🐼✨
            </h1>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
                fontStyle: "italic",
                color: "var(--primary)",
                fontWeight: 500,
                margin: "0 0 20px",
                textShadow: "0 0 35px rgba(201, 168, 76, 0.6)",
              }}
            >
              🥂 Cheers to Twenty! 👑
            </h2>

            <p
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
                color: "var(--foreground)",
                maxWidth: "680px",
                margin: "0 auto 32px",
                lineHeight: 1.5,
              }}
            >
              "20 years of sunshine, laughter, fights, inside jokes, and being
              the most special person in my life. Welcome to your birthday
              celebration, Panda."
            </p>

            {/* Music Control Chip */}
            <div
              onClick={toggleMusic}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 20px",
                borderRadius: "9999px",
                background: "rgba(201, 168, 76, 0.15)",
                border: "1px solid rgba(201, 168, 76, 0.4)",
                color: "var(--primary)",
                fontSize: "0.85rem",
                cursor: "pointer",
                marginBottom: "36px",
                transition: "all 0.2s ease",
              }}
            >
              <span>{isPlaying ? "⏸" : "▶"}</span>
              <span style={{ fontFamily: "var(--font-body)" }}>
                {isPlaying
                  ? "Playing: Muthe Mutharame 🎵"
                  : "Play: Muthe Mutharame 🎵"}
              </span>
            </div>

            {/* Enter Birthday Wonderland Button */}
            <button
              onClick={onUnlock}
              className="btn-cinematic animate-glow-pulse"
              style={{
                fontSize: "clamp(1.05rem, 2.5vw, 1.25rem)",
                padding: "20px 48px",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
              }}
            >
              <span>✨</span>
              <span>Enter Birthday Wonderland & Walk Our Story</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const targetTime = getNextMidnight()

  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search)
        if (
          params.get("preview") === "true" ||
          params.get("unlock") === "true"
        ) {
          return true
        }
      } catch {}
    }
    return Date.now() >= targetTime
  })

  const [, setStarted] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  const handleStart = useCallback(() => {
    setStarted(true)
    setTimeout(() => {
      document
        .getElementById("beginning")
        ?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [])

  // If before 12:00 AM, show ONLY the Countdown Gate!
  // Visitors strictly CANNOT enter the sections until 12:00 AM!
  if (!isUnlocked) {
    return (
      <div className="grain">
        <CountdownGate onUnlock={() => setIsUnlocked(true)} />
      </div>
    )
  }

  // Once 12:00 AM strikes (or unlocked): Render the full website!
  return (
    <div className="grain" ref={mainRef}>
      <Nav />
      <HeroSection onStart={handleStart} />
      <div id="beginning">
        <BeginningSection />
      </div>
      <TimelineSection />
      <MonthlyVaultSection />
      <PlacesSection />
      <PhotoWallSection />
      <FightsSection />
      <GiftsSection />
      <GiftHuntSection />
      <NeverForgetSection />
      <LetterSection />
      <FinalSection />
    </div>
  )
}
