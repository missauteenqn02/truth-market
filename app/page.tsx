"use client";

import Link from "next/link";
import { MOCK_MARKETS, MOCK_STATS, getYesPercent, formatVolume, type Market } from "@/lib/mockData";

function MarketCard({ market, delay = 0 }: { market: Market; delay?: number }) {
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
      <div className="market-card animate-fade-up" style={{ animationDelay: `${delay}ms`, height: "100%" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, gap: 8 }}>
          <span className={`badge ${categoryColors[market.category] || "badge-tech"}`}>
            {market.category === "tech" && "💻"}
            {market.category === "crypto" && "₿"}
            {market.category === "politics" && "🏛️"}
            {market.category === "entertainment" && "🎬"}
            {market.category === "sports" && "⚽"}
            {" "}{market.category}
          </span>
          <span className={`badge ${isResolved ? "badge-resolved" : "badge-active"}`}>
            {isResolved ? "✓ Resolved" : "● Active"}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "white", lineHeight: 1.4, marginBottom: 16 }}>
          {market.title}
        </h3>

        {/* Probability Bar */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#10b981" }}>YES {yesPercent}%</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#ef4444" }}>NO {100 - yesPercent}%</span>
          </div>
          <div className="progress-bar">
            <div
              style={{
                height: "100%",
                borderRadius: "100px",
                background: `linear-gradient(90deg, #10b981 ${yesPercent}%, #ef4444 ${yesPercent}%)`,
                width: "100%",
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>VOLUME</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{formatVolume(market.total_volume)}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>KẾT THÚC</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
              {new Date(market.end_date).toLocaleDateString("vi-VN")}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            {isResolved ? (
              <>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>AI VERDICT</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: market.resolved_outcome === "YES" ? "#10b981" : "#ef4444" }}>
                  {market.resolved_outcome}
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>NGƯỜI CHƠI</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>
                  {Math.floor(Math.random() * 500 + 50)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function StatCard({ label, value, icon, sub }: { label: string; value: string; icon: string; sub?: string }) {
  return (
    <div className="stat-card animate-pulse-glow">
      <div style={{ fontSize: 28, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "white" }}>{value}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{sub}</div>}
    </div>
  );
}

export default function HomePage() {
  const trendingMarkets = MOCK_MARKETS.slice(0, 6);
  const resolvedMarkets = MOCK_MARKETS.filter((m) => m.status === "RESOLVED");

  return (
    <div className="hero-bg" style={{ minHeight: "100vh", paddingTop: 80 }}>
      {/* Ticker */}
      <div style={{
        background: "rgba(139, 92, 246, 0.08)",
        borderBottom: "1px solid rgba(139, 92, 246, 0.15)",
        padding: "10px 0",
        overflow: "hidden",
      }}>
        <div className="ticker-wrap">
          <div className="ticker-content" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", gap: 48, display: "flex" }}>
            {[...MOCK_MARKETS, ...MOCK_MARKETS].map((m, i) => (
              <span key={i} style={{ padding: "0 32px", whiteSpace: "nowrap" }}>
                🔮 {m.title.substring(0, 50)} &nbsp;
                <span style={{ color: "#10b981", fontWeight: 700 }}>YES {getYesPercent(m)}%</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          {/* Tag */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 100,
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            marginBottom: 24,
            fontSize: 13,
            fontWeight: 600,
            color: "#a78bfa",
          }}>
            <span>⚡</span>
            Powered by GenLayer Intelligent Contracts
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, color: "white" }}>
            Prediction Markets
            <br />
            <span className="gradient-text">Resolved by AI Consensus</span>
          </h1>

          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 40 }}>
            Lần đầu tiên trên thế giới — thị trường dự đoán nơi{" "}
            <strong style={{ color: "white" }}>AI Validators tự động duyệt web</strong>,{" "}
            phân tích dữ liệu và đưa ra phán quyết cuối cùng. Không oracle. Không human.
          </p>

          {/* CTA */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/markets">
              <button className="btn-primary" style={{ padding: "14px 32px", fontSize: 16 }}>
                Khám phá Markets →
              </button>
            </Link>
            <Link href="/create">
              <button className="btn-secondary" style={{ padding: "14px 32px", fontSize: 16 }}>
                + Tạo Market
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 60px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
        }}>
          <StatCard icon="💰" label="Total Value Locked" value={MOCK_STATS.tvl} />
          <StatCard icon="📊" label="Tổng thị trường" value={MOCK_STATS.totalMarkets.toString()} />
          <StatCard icon="🔥" label="Volume giao dịch" value={MOCK_STATS.totalVolume} />
          <StatCard icon="✅" label="Đang hoạt động" value={MOCK_STATS.activeMarkets.toString()} />
          <StatCard icon="🤖" label="AI Resolved" value={MOCK_STATS.resolvedByAI.toString()} sub="markets" />
          <StatCard icon="📈" label="AI Confidence TB" value={MOCK_STATS.avgConfidence} />
        </div>
      </section>

      {/* How It Works */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 60px" }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: "white", marginBottom: 8 }}>
          Tại sao TruthMarket khác biệt?
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 40 }}>
          Đây là điều mà Ethereum/Solidity không thể làm được.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {[
            {
              step: "01",
              icon: "🌐",
              title: "Duyệt Web Tự động",
              desc: "Intelligent Contract gọi gl.get_webpage() để đọc dữ liệu thực từ Internet — báo chí, SEC filings, official announcements.",
            },
            {
              step: "02",
              icon: "🧠",
              title: "AI Phân tích",
              desc: "gl.exec_prompt() gửi dữ liệu cho AI phân tích chuyên sâu: sự kiện có xảy ra không? Nguồn có đáng tin không?",
            },
            {
              step: "03",
              icon: "⚖️",
              title: "Validator Consensus",
              desc: "gl.eq_principle_strict_eq() đảm bảo nhiều AI Validators đồng thuận độc lập. Thiểu số bị slashed.",
            },
            {
              step: "04",
              icon: "💸",
              title: "Auto Settlement",
              desc: "Kết quả được ghi on-chain. Người thắng nhận thưởng tự động, không cần ai can thiệp.",
            },
          ].map((item) => (
            <div key={item.step} className="glass" style={{ padding: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
              <div style={{
                fontSize: 11,
                fontWeight: 800,
                color: "#8b5cf6",
                letterSpacing: "0.1em",
                marginBottom: 8,
              }}>
                BƯỚC {item.step}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Markets */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "white", marginBottom: 4 }}>
              🔥 Trending Markets
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Các thị trường dự đoán đang hot nhất</p>
          </div>
          <Link href="/markets">
            <button className="btn-secondary" style={{ fontSize: 14, padding: "8px 20px" }}>
              Xem tất cả →
            </button>
          </Link>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20,
        }}>
          {trendingMarkets.map((market, i) => (
            <MarketCard key={market.id} market={market} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* AI Resolution Showcase */}
      {resolvedMarkets.length > 0 && (
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 60px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "white", marginBottom: 8 }}>
            🤖 AI Đã Phán Quyết
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 32 }}>
            Các market đã được giải quyết hoàn toàn tự động bởi AI Validators
          </p>

          {resolvedMarkets.map((market) => (
            <div key={market.id} className="ai-box" style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "white", marginBottom: 8 }}>
                    {market.title}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                    🧠 <strong>AI Reasoning:</strong> {market.ai_reasoning}
                  </div>
                </div>
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <div style={{
                    padding: "12px 20px",
                    borderRadius: 12,
                    background: market.resolved_outcome === "YES"
                      ? "rgba(16, 185, 129, 0.15)"
                      : "rgba(239, 68, 68, 0.15)",
                    border: `1px solid ${market.resolved_outcome === "YES" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                  }}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: market.resolved_outcome === "YES" ? "#10b981" : "#ef4444" }}>
                      {market.resolved_outcome}
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                      AI Confidence: {(parseFloat(market.ai_confidence) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "40px 24px",
        textAlign: "center",
        color: "rgba(255,255,255,0.3)",
        fontSize: 14,
      }}>
        <div style={{ marginBottom: 8 }}>
          Built with <span style={{ color: "#ef4444" }}>❤️</span> on{" "}
          <a href="https://genlayer.com" target="_blank" rel="noopener noreferrer" style={{ color: "#8b5cf6", textDecoration: "none" }}>
            GenLayer
          </a>{" "}
          — The AI-Native Blockchain
        </div>
        <div>© 2026 TruthMarket. AI-powered. Community-driven. Fully autonomous.</div>
      </footer>
    </div>
  );
}
