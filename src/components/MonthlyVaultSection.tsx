import React, { useState, useEffect, useMemo, useCallback } from "react"
import mediaManifest from "../data/media_manifest.json"

export interface MediaItem {
  id: string
  telegramId: number
  type: "photo" | "video"
  src: string
  thumb: string
  width: number
  height: number
  aspect: "portrait" | "landscape"
  month: string
  monthKey: string
  title: string
  caption: string
  duration?: number
}

const MONTH_QUOTES: Record<string, string> = {
  "September 2025":
    "September 23, 2025 at KFC — before this, we didn't know each other. Then we met, started making fun of each other, and everything began.",
  "October 2025":
    "Exploring the city, endless laughs, and days we wished wouldn't end.",
  "December 2025":
    "Winter breezes, ocean talks, and memories that didn't need words.",
  "January 2026":
    "Stomach-hurting laughter, silly chaos, and the best kind of memories.",
  "March 2026":
    "Through arguments, silence, and drama — we always came right back.",
  "June 2026":
    "More roads, more cities, more reasons to be grateful you're here.",
  "August 2026":
    "Chasing waterfalls, fresh air, and unforgettable road trip moments.",
  "September 2026":
    "Another year, countless stories, and a friendship still being written.",
}

export function MediaModal({
  item,
  items,
  onClose,
  onSelect,
}: {
  item: MediaItem | null
  items: MediaItem[]
  onClose: () => void
  onSelect: (item: MediaItem) => void
}) {
  const currentIndex = useMemo(() => {
    if (!item) return -1
    return items.findIndex((i) => i.id === item.id)
  }, [item, items])

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelect(items[currentIndex - 1])
    } else if (items.length > 0) {
      onSelect(items[items.length - 1])
    }
  }, [currentIndex, items, onSelect])

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onSelect(items[currentIndex + 1])
    } else if (items.length > 0) {
      onSelect(items[0])
    }
  }, [currentIndex, items, onSelect])

  useEffect(() => {
    if (!item) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [item, onClose, handlePrev, handleNext])

  if (!item) return null

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          handlePrev()
        }}
        aria-label="Previous Memory"
        style={{
          position: "fixed",
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(18, 16, 26, 0.85)",
          border: "1px solid rgba(201, 168, 76, 0.4)",
          color: "var(--primary)",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1010,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--primary)"
          e.currentTarget.style.color = "#09080e"
          e.currentTarget.style.boxShadow = "0 0 20px rgba(201,168,76,0.6)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(18, 16, 26, 0.85)"
          e.currentTarget.style.color = "var(--primary)"
          e.currentTarget.style.boxShadow = "none"
        }}
      >
        <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>‹</span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          handleNext()
        }}
        aria-label="Next Memory"
        style={{
          position: "fixed",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(18, 16, 26, 0.85)",
          border: "1px solid rgba(201, 168, 76, 0.4)",
          color: "var(--primary)",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1010,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--primary)"
          e.currentTarget.style.color = "#09080e"
          e.currentTarget.style.boxShadow = "0 0 20px rgba(201,168,76,0.6)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(18, 16, 26, 0.85)"
          e.currentTarget.style.color = "var(--primary)"
          e.currentTarget.style.boxShadow = "none"
        }}
      >
        <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>›</span>
      </button>

      {/* Main Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "92vw",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 1005,
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "800px",
            marginBottom: "14px",
            padding: "0 8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                padding: "3px 8px",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "1px solid rgba(201,168,76,0.4)",
                color: "var(--primary)",
                borderRadius: "3px",
              }}
            >
              {item.type === "video" ? "🎥 VIDEO" : "📷 PHOTO"}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                color: "var(--muted-foreground)",
                letterSpacing: "0.1em",
              }}
            >
              {item.month}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                color: "rgba(201,168,76,0.6)",
                letterSpacing: "0.1em",
              }}
            >
              {currentIndex + 1} of {items.length}
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#fff",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Media Preview Box */}
        <div
          style={{
            position: "relative",
            maxHeight: "72vh",
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "6px",
            overflow: "hidden",
            boxShadow:
              "0 25px 80px rgba(0,0,0,0.95), 0 0 40px rgba(201,168,76,0.15)",
          }}
        >
          {item.type === "video" ? (
            <video
              key={item.src}
              src={item.src}
              poster={item.thumb}
              controls
              autoPlay
              playsInline
              loop
              style={{
                maxHeight: "72vh",
                maxWidth: "88vw",
                objectFit: "contain",
                borderRadius: "6px",
                background: "#000",
              }}
            />
          ) : (
            <img
              src={item.src}
              alt={item.title}
              style={{
                maxHeight: "72vh",
                maxWidth: "88vw",
                objectFit: "contain",
                borderRadius: "6px",
              }}
            />
          )}
        </div>

        {/* Footer Info */}
        <div
          style={{
            textAlign: "center",
            marginTop: "16px",
            maxWidth: "600px",
            padding: "0 16px",
          }}
        >
          <h4
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--foreground)",
              margin: "0 0 6px",
            }}
          >
            {item.title}
          </h4>
          <p
            style={{
              fontFamily: "var(--font-hand)",
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              color: "var(--primary)",
              margin: "0 0 6px",
            }}
          >
            "{item.caption}"
          </p>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
            }}
          >
            ← / → Keys to navigate · ESC to close
          </span>
        </div>
      </div>
    </div>
  )
}

export default function MonthlyVaultSection() {
  const allMedia = mediaManifest as MediaItem[]
  const [selectedMonth, setSelectedMonth] = useState<string>("all")
  const [filterType, setFilterType] = useState<"all" | "photo" | "video">("all")
  const [activeModalItem, setActiveModalItem] = useState<MediaItem | null>(null)

  // Collect distinct months in chronological order
  const monthGroups = useMemo(() => {
    const map = new Map<string, {
      month: string
      monthKey: string
      items: MediaItem[]
    }>()
    for (const item of allMedia) {
      if (!map.has(item.monthKey)) {
        map.set(item.monthKey, {
          month: item.month,
          monthKey: item.monthKey,
          items: [],
        })
      }
      map.get(item.monthKey)!.items.push(item)
    }
    return Array.from(map.values()).sort((a, b) =>
      a.monthKey.localeCompare(b.monthKey),
    )
  }, [allMedia])

  // Filtered items based on month & type
  const filteredItems = useMemo(() => {
    return allMedia.filter((item) => {
      const matchMonth =
        selectedMonth === "all" || item.monthKey === selectedMonth
      const matchType = filterType === "all" || item.type === filterType
      return matchMonth && matchType
    })
  }, [allMedia, selectedMonth, filterType])

  const photoCount = useMemo(
    () => allMedia.filter((i) => i.type === "photo").length,
    [allMedia],
  )
  const videoCount = useMemo(
    () => allMedia.filter((i) => i.type === "video").length,
    [allMedia],
  )

  return (
    <section
      id="monthly-vault"
      style={{
        padding: "clamp(80px, 12vw, 150px) clamp(16px, 6vw, 80px)",
        background:
          "linear-gradient(180deg, #09080e 0%, #0d0a14 50%, #09080e 100%)",
        position: "relative",
      }}
    >
      {/* Lightbox / Video Modal */}
      {activeModalItem && (
        <MediaModal
          item={activeModalItem}
          items={filteredItems}
          onClose={() => setActiveModalItem(null)}
          onSelect={(item) => setActiveModalItem(item)}
        />
      )}

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--primary)",
              display: "block",
              marginBottom: "12px",
            }}
          >
            Chronological Archive · 2025 — 2026
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 7vw, 5rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--foreground)",
              margin: "0 0 18px",
              lineHeight: 1.1,
            }}
          >
            The Monthly Memory Vault
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--secondary-foreground)",
              maxWidth: "680px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Every picture and video ordered from the very beginning to today,
            grouped month by month. Deduplicated, curated, and preserved just
            for you.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            marginBottom: "50px",
          }}
        >
          {/* Type Filter Buttons */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              className={`filter-btn ${filterType === "all" ? "active" : ""}`}
              onClick={() => setFilterType("all")}
            >
              <span>✦ All Memories</span>
              <span
                style={{
                  fontSize: "0.7rem",
                  padding: "2px 6px",
                  borderRadius: "10px",
                  background:
                    filterType === "all"
                      ? "var(--primary)"
                      : "rgba(255,255,255,0.1)",
                  color: filterType === "all" ? "#09080e" : "inherit",
                }}
              >
                {allMedia.length}
              </span>
            </button>

            <button
              className={`filter-btn ${filterType === "photo" ? "active" : ""}`}
              onClick={() => setFilterType("photo")}
            >
              <span>📷 Photos</span>
              <span
                style={{
                  fontSize: "0.7rem",
                  padding: "2px 6px",
                  borderRadius: "10px",
                  background:
                    filterType === "photo"
                      ? "var(--primary)"
                      : "rgba(255,255,255,0.1)",
                  color: filterType === "photo" ? "#09080e" : "inherit",
                }}
              >
                {photoCount}
              </span>
            </button>

            <button
              className={`filter-btn ${filterType === "video" ? "active" : ""}`}
              onClick={() => setFilterType("video")}
            >
              <span>🎥 Videos</span>
              <span
                style={{
                  fontSize: "0.7rem",
                  padding: "2px 6px",
                  borderRadius: "10px",
                  background:
                    filterType === "video"
                      ? "var(--primary)"
                      : "rgba(255,255,255,0.1)",
                  color: filterType === "video" ? "#09080e" : "inherit",
                }}
              >
                {videoCount}
              </span>
            </button>
          </div>

          {/* Month Pills Navigation */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              maxWidth: "100%",
              padding: "8px 12px",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <button
              className={`month-pill ${
                selectedMonth === "all" ? "active" : ""
              }`}
              onClick={() => setSelectedMonth("all")}
            >
              All Months
            </button>
            {monthGroups.map((g) => (
              <button
                key={g.monthKey}
                className={`month-pill ${
                  selectedMonth === g.monthKey ? "active" : ""
                }`}
                onClick={() => setSelectedMonth(g.monthKey)}
              >
                {g.month} ({g.items.length})
              </button>
            ))}
          </div>
        </div>

        {/* Month by Month Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
          {monthGroups
            .filter(
              (g) => selectedMonth === "all" || g.monthKey === selectedMonth,
            )
            .map((group) => {
              const groupItems = group.items.filter(
                (i) => filterType === "all" || i.type === filterType,
              )

              if (groupItems.length === 0) return null

              return (
                <div
                  key={group.monthKey}
                  style={{
                    background: "rgba(18, 16, 26, 0.5)",
                    border: "1px solid rgba(201, 168, 76, 0.12)",
                    borderRadius: "8px",
                    padding: "clamp(24px, 4vw, 40px)",
                    position: "relative",
                  }}
                >
                  {/* Month Header Banner */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      flexWrap: "wrap",
                      gap: "12px",
                      borderBottom: "1px solid rgba(201, 168, 76, 0.15)",
                      paddingBottom: "20px",
                      marginBottom: "32px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.7rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "var(--primary)",
                        }}
                      >
                        Chapter Timeline · {group.monthKey}
                      </span>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)",
                          fontWeight: 400,
                          fontStyle: "italic",
                          color: "var(--foreground)",
                          margin: "4px 0 6px",
                        }}
                      >
                        {group.month}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-hand)",
                          fontSize: "1.15rem",
                          color: "var(--muted-foreground)",
                          margin: 0,
                        }}
                      >
                        "
                        {MONTH_QUOTES[group.month] ||
                          "Memories that stayed with us forever."}
                        "
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          letterSpacing: "0.08em",
                          background: "rgba(201, 168, 76, 0.1)",
                          border: "1px solid rgba(201, 168, 76, 0.25)",
                          color: "var(--primary)",
                        }}
                      >
                        {groupItems.length}{" "}
                        {groupItems.length === 1 ? "memory" : "memories"}
                      </span>
                    </div>
                  </div>

                  {/* Media Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(clamp(150px, 22vw, 240px), 1fr))",
                      gap: "clamp(16px, 2.5vw, 28px)",
                      alignItems: "start",
                    }}
                  >
                    {groupItems.map((item, idx) => {
                      if (item.type === "photo") {
                        // Polaroid Photo Card
                        const rot = ((idx % 5) - 2) * 1.5
                        return (
                          <div
                            key={item.id}
                            className="polaroid-card cursor-pointer"
                            onClick={() => setActiveModalItem(item)}
                            style={{
                              position: "relative",
                              transform: `rotate(${rot}deg)`,
                              transition:
                                "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            }}
                          >
                            <div className="polaroid" style={{ width: "100%" }}>
                              <div
                                style={{
                                  position: "relative",
                                  aspectRatio:
                                    item.aspect === "portrait" ? "3/4" : "4/3",
                                  overflow: "hidden",
                                  background: "#1a1825",
                                }}
                              >
                                <img
                                  src={item.thumb}
                                  alt={item.title}
                                  loading="lazy"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                    transition: "transform 0.4s ease",
                                  }}
                                />
                                <span className="type-chip">📷 Photo</span>
                              </div>
                              <p
                                style={{
                                  fontFamily: "var(--font-hand)",
                                  fontSize: "1rem",
                                  color: "#3a2a10",
                                  marginTop: "10px",
                                  textAlign: "center",
                                  lineHeight: 1.2,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {item.caption}
                              </p>
                            </div>
                          </div>
                        )
                      } else {
                        // Video Card
                        return (
                          <div
                            key={item.id}
                            className="video-card cursor-pointer"
                            onClick={() => setActiveModalItem(item)}
                            style={{
                              aspectRatio:
                                item.aspect === "portrait" ? "9/16" : "16/9",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <img
                              src={item.thumb}
                              alt={item.title}
                              loading="lazy"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                            <span className="type-chip">🎥 Video</span>
                            {item.duration && (
                              <span className="duration-chip">
                                {item.duration}s
                              </span>
                            )}
                            <div className="play-icon-glow">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                inset: "auto 0 0 0",
                                padding: "16px 12px 8px",
                                background:
                                  "linear-gradient(to top, rgba(9,8,14,0.95) 0%, transparent 100%)",
                                pointerEvents: "none",
                              }}
                            >
                              <p
                                style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: "0.75rem",
                                  color: "var(--foreground)",
                                  margin: 0,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  opacity: 0.9,
                                }}
                              >
                                {item.title}
                              </p>
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
