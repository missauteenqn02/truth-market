"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_MARKETS, CATEGORIES, getYesPercent, formatVolume, type Market } from "@/lib/mockData";

function MarketCard({ market }: { market: Market }) {
  const yesPercent = getYesPercent(market);
  const isResolved = market.status === "RESOLVED";

  const categoryColors: Record<string, string> = {
    tech: "badge-tech",
    crypto: "badge-crypto",
    politics: "badge-politics",
    entertainment: "badge-entertainment",
    sports: "badge-sports",
  };

  return (
    <Link href={`/markets/${market.id}`} style={{ textDecoration: "none" }}>
      <div className="market-card" style={{ height: "100%" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, gap: 8 }}>
          <span className={`badge ${categoryColors[market.category] || "badge-tech"}`}>
            {market.category === "tech" && "💻 "}
            {market.category === "crypto" && "₿ "}
            {market.category === "politics" && "🏛️ "}
            {market.category === "entertainment" && "🎬 "}
            {market.category === "sports" && "⚽ "}
            {market.category}
          </span>
          <span className={`badge ${isResolved ? "badge-resolved" : "badge-active"}`}>
            {isResolved ? "✓ Resolved" : "● Active"}
          </span>
        </div>

        <h3 style={{ fontSize: 15, fontWeight: 600, color: "white", lineHeight: 1.4, marginBottom: 16, minHeight: 44 }}>
          {market.title}
        </h3>

        {/* Probability */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#10b981" }}>YES {yesPercent}%</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#ef4444" }}>NO {100 - yesPercent}%</span>
          </div>
          <div className="progress-bar">
            <div style={{
              height: "100%",
              borderRadius: "100px",
              background: `linear-gradient(90deg, #10b981 ${yesPercent}%, #ef4444 ${yesPercent}%)`,
              width: "100%",
            }} />
          </div>
        </div>

        {/* Footer stats */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>VOLUME</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{formatVolume(market.total_volume)}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{isResolved ? "AI VERDICT" : "KẾT THÚC"}</div>
            {isResolved ? (
              <div style={{ fontSize: 14, fontWeight: 800, color: market.resolved_outcome === "YES" ? "#10b981" : "#ef4444" }}>
                {market.resolved_outcome}
              </div>
            ) : (
              <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
                {new Date(market.end_date).toLocaleDateString("vi-VN")}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function MarketsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("volume");
  const [showResolved, setShowResolved] = useState(true);

  const filtered = MOCK_MARKETS.filter((m) => {
    const matchCat = activeCategory === "all" || m.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchResolved = showResolved || m.status !== "RESOLVED";
    return matchCat && matchSearch && matchResolved;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "volume") return b.total_volume - a.total_volume;
    if (sortBy === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    if (sortBy === "endDate") return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
    return 0;
  });

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80, background: "var(--bg-primary)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: "white", marginBottom: 8 }}>
            📊 Prediction Markets
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }}>
            Mỗi market được resolve hoàn toàn tự động bởi AI Consensus trên GenLayer
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div style={{
          display: "flex",
          gap: 12,
          marginBottom: 24,
          flexWrap: "wrap",
          alignItems: "center",
        }}>
          <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
            <span style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255,255,255,0.4)",
              pointerEvents: "none",
            }}>🔍</span>
            <input
              placeholder="Tìm kiếm market..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "36px !important" }}
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ maxWidth: 160 }}
          >
            <option value="volume">Volume cao nhất</option>
            <option value="newest">Mới nhất</option>
            <option value="endDate">Sắp hết hạn</option>
          </select>

          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
            <input
              type="checkbox"
              checked={showResolved}
              onChange={(e) => setShowResolved(e.target.checked)}
              style={{ width: "auto !important", cursor: "pointer" }}
            />
            Hiện đã resolve
          </label>

          <Link href="/create">
            <button className="btn-primary" style={{ fontSize: 14, padding: "10px 20px", whiteSpace: "nowrap" }}>
              + Tạo Market
            </button>
          </Link>
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32, overflowX: "auto", paddingBottom: 4 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "8px 16px",
                borderRadius: 100,
                border: "1px solid",
                borderColor: activeCategory === cat.id ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.1)",
                background: activeCategory === cat.id ? "rgba(139,92,246,0.15)" : "transparent",
                color: activeCategory === cat.id ? "#a78bfa" : "rgba(255,255,255,0.5)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Market Count */}
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
          {sorted.length} markets tìm thấy
        </div>

        {/* Market Grid */}
        {sorted.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20,
          }}>
            {sorted.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.3)" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Không tìm thấy market nào</div>
            <div style={{ fontSize: 14 }}>Thử tìm kiếm với từ khóa khác hoặc tạo market mới</div>
          </div>
        )}
      </div>
    </div>
  );
}
