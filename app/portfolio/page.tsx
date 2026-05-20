"use client";

import { MOCK_MARKETS, getYesPercent, formatVolume, type Market } from "@/lib/mockData";
import Link from "next/link";

const MOCK_POSITIONS = [
  { market_id: "apple-ai-glasses-2026", position: "YES", shares: 250, claimed: false },
  { market_id: "bitcoin-200k-2026", position: "YES", shares: 500, claimed: false },
  { market_id: "gta6-delay-2026", position: "NO", shares: 100, claimed: false },
  { market_id: "ethereum-pos-resolved", position: "YES", shares: 200, claimed: true },
];

function PnLCard({ position }: { position: typeof MOCK_POSITIONS[0] }) {
  const market = MOCK_MARKETS.find((m) => m.id === position.market_id);
  if (!market) return null;

  const yesPercent = getYesPercent(market);
  const currentOdds = position.position === "YES" ? yesPercent / 100 : (100 - yesPercent) / 100;
  const currentValue = Math.round(position.shares * currentOdds);
  const pnl = currentValue - position.shares;
  const isWinning = pnl >= 0;
  const isResolved = market.status === "RESOLVED";
  const won = isResolved && market.resolved_outcome === position.position;

  return (
    <div className="market-card" style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {/* Position badge */}
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 14,
        background: position.position === "YES" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
        border: `1px solid ${position.position === "YES" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        fontSize: 12,
        fontWeight: 800,
      }}>
        <span style={{ color: position.position === "YES" ? "#10b981" : "#ef4444", fontSize: 16 }}>
          {position.position === "YES" ? "👍" : "👎"}
        </span>
        <span style={{ color: position.position === "YES" ? "#10b981" : "#ef4444" }}>
          {position.position}
        </span>
      </div>

      {/* Market info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Link href={`/markets/${market.id}`} style={{ textDecoration: "none" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {market.title}
          </div>
        </Link>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
          {position.shares} shares · {isResolved ? "✓ Resolved" : "● Active"}
        </div>
      </div>

      {/* PnL */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        {isResolved ? (
          won ? (
            position.claimed ? (
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Đã nhận thưởng</div>
            ) : (
              <button className="btn-yes" style={{ padding: "8px 16px", fontSize: 13 }}>
                💰 Claim
              </button>
            )
          ) : (
            <div style={{ color: "#ef4444", fontSize: 13, fontWeight: 600 }}>Thua</div>
          )
        ) : (
          <>
            <div style={{ fontSize: 16, fontWeight: 700, color: isWinning ? "#10b981" : "#ef4444" }}>
              {isWinning ? "+" : ""}{pnl}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
              Hiện tại: {currentValue} shares
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const activePositions = MOCK_POSITIONS.filter((p) => {
    const market = MOCK_MARKETS.find((m) => m.id === p.market_id);
    return market?.status === "ACTIVE";
  });

  const resolvedPositions = MOCK_POSITIONS.filter((p) => {
    const market = MOCK_MARKETS.find((m) => m.id === p.market_id);
    return market?.status === "RESOLVED";
  });

  const totalInvested = MOCK_POSITIONS.reduce((sum, p) => sum + p.shares, 0);
  const unrealizedPnL = activePositions.reduce((sum, p) => {
    const market = MOCK_MARKETS.find((m) => m.id === p.market_id);
    if (!market) return sum;
    const yesPercent = getYesPercent(market);
    const currentOdds = p.position === "YES" ? yesPercent / 100 : (100 - yesPercent) / 100;
    return sum + Math.round(p.shares * currentOdds) - p.shares;
  }, 0);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80, background: "var(--bg-primary)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: "white", marginBottom: 8 }}>
            💼 Portfolio
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)" }}>
            Theo dõi các vị thế và lợi nhuận của bạn
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 40 }}>
          {[
            { label: "Tổng đã đầu tư", value: formatVolume(totalInvested), icon: "💰" },
            { label: "PnL chưa thực hiện", value: `${unrealizedPnL >= 0 ? "+" : ""}${unrealizedPnL}`, icon: unrealizedPnL >= 0 ? "📈" : "📉", color: unrealizedPnL >= 0 ? "#10b981" : "#ef4444" },
            { label: "Vị thế đang mở", value: activePositions.length.toString(), icon: "⏳" },
            { label: "Đã giải quyết", value: resolvedPositions.length.toString(), icon: "✅" },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color || "white" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Wallet notice */}
        <div className="ai-box" style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24 }}>🔌</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 4 }}>
                Demo Portfolio (Wallet chưa kết nối)
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                Kết nối ví MetaMask để xem portfolio thực của bạn trên GenLayer testnet.
              </div>
            </div>
            <button className="btn-primary" style={{ padding: "8px 20px", fontSize: 13, whiteSpace: "nowrap", marginLeft: "auto" }}>
              Kết nối ví
            </button>
          </div>
        </div>

        {/* Active positions */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 16 }}>
            ⏳ Đang hoạt động ({activePositions.length})
          </h2>
          {activePositions.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {activePositions.map((p, i) => (
                <PnLCard key={i} position={p} />
              ))}
            </div>
          ) : (
            <div className="glass" style={{ padding: 40, textAlign: "center", color: "rgba(255,255,255,0.3)" }}>
              Chưa có vị thế nào. <Link href="/markets" style={{ color: "#8b5cf6" }}>Khám phá markets</Link>
            </div>
          )}
        </div>

        {/* Resolved positions */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 16 }}>
            ✅ Đã giải quyết ({resolvedPositions.length})
          </h2>
          {resolvedPositions.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {resolvedPositions.map((p, i) => (
                <PnLCard key={i} position={p} />
              ))}
            </div>
          ) : (
            <div className="glass" style={{ padding: 40, textAlign: "center", color: "rgba(255,255,255,0.3)" }}>
              Chưa có market nào được resolve.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
