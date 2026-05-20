"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { MOCK_MARKETS, getYesPercent, formatVolume, type Market } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

// Mock probability history
function generateProbHistory(yesPercent: number) {
  const data = [];
  let current = 50;
  const target = yesPercent;
  for (let i = 30; i >= 0; i--) {
    const noise = (Math.random() - 0.5) * 6;
    const drift = ((target - current) / (i + 1)) * 0.3;
    current = Math.max(5, Math.min(95, current + drift + noise));
    data.push({
      day: `T-${i}`,
      yes: Math.round(current),
      no: Math.round(100 - current),
    });
  }
  return data;
}

function AIResolutionCard({ market }: { market: Market }) {
  const [isResolving, setIsResolving] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [mockResult, setMockResult] = useState<{ decision: string; confidence: number; reasoning: string } | null>(null);

  const handleResolve = async () => {
    setIsResolving(true);
    await new Promise((r) => setTimeout(r, 3000));
    setMockResult({
      decision: getYesPercent(market) >= 50 ? "YES" : "NO",
      confidence: 0.85 + Math.random() * 0.14,
      reasoning: `Sau khi phân tích dữ liệu từ ${market.resolve_url}, AI Validators đã đạt đồng thuận. Bằng chứng cho thấy sự kiện ${getYesPercent(market) >= 50 ? "ĐÃ" : "CHƯA"} xảy ra theo tiêu chí đã được định nghĩa.`,
    });
    setIsResolving(false);
    setResolved(true);
  };

  return (
    <div className="glass" style={{ padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        🤖 AI Resolution Engine
      </h3>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
        {[
          { step: 1, icon: "🌐", label: "gl.get_webpage()", desc: `Đọc dữ liệu từ ${market.resolve_url}` },
          { step: 2, icon: "🧠", label: "gl.exec_prompt()", desc: "AI phân tích bằng chứng" },
          { step: 3, icon: "⚖️", label: "gl.eq_principle_strict_eq()", desc: "Validators đạt đồng thuận" },
        ].map((s) => (
          <div key={s.step} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "rgba(139, 92, 246, 0.15)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              flexShrink: 0,
            }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontSize: 12, fontFamily: "monospace", color: "#a78bfa", fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Resolve Criteria */}
      <div style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: 6, letterSpacing: "0.05em" }}>
          TIÊU CHÍ RESOLVE
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
          {market.resolve_criteria}
        </p>
      </div>

      {/* Result or Button */}
      {market.status === "RESOLVED" || resolved ? (
        <div style={{
          background: mockResult?.decision === "YES" || market.resolved_outcome === "YES"
            ? "rgba(16, 185, 129, 0.1)"
            : "rgba(239, 68, 68, 0.1)",
          border: `1px solid ${mockResult?.decision === "YES" || market.resolved_outcome === "YES"
            ? "rgba(16,185,129,0.3)"
            : "rgba(239,68,68,0.3)"}`,
          borderRadius: 12,
          padding: 16,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>AI Verdict:</span>
            <span style={{
              fontSize: 24,
              fontWeight: 900,
              color: (mockResult?.decision || market.resolved_outcome) === "YES" ? "#10b981" : "#ef4444",
            }}>
              {mockResult?.decision || market.resolved_outcome}
            </span>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
            Confidence: {((mockResult?.confidence || parseFloat(market.ai_confidence)) * 100).toFixed(1)}%
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
            {mockResult?.reasoning || market.ai_reasoning}
          </p>
        </div>
      ) : isResolving ? (
        <div style={{ textAlign: "center", padding: 24 }}>
          <div style={{ fontSize: 32, marginBottom: 12, animation: "spin 1s linear infinite" }}>⚙️</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 8 }}>
            AI đang phân tích...
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            Đọc web → Reasoning → Validator Consensus
          </div>
        </div>
      ) : (
        <button
          className="btn-primary"
          onClick={handleResolve}
          style={{ width: "100%", padding: 14, fontSize: 14 }}
        >
          🤖 Resolve bằng AI (Demo)
        </button>
      )}
    </div>
  );
}

export default function MarketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const market = MOCK_MARKETS.find((m) => m.id === id);

  const [betAmount, setBetAmount] = useState("100");
  const [betPosition, setBetPosition] = useState<"YES" | "NO" | null>(null);
  const [betPlaced, setBetPlaced] = useState(false);

  if (!market) {
    return (
      <div style={{ minHeight: "100vh", paddingTop: 120, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 48 }}>😕</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "white" }}>Market không tồn tại</div>
        <button className="btn-primary" onClick={() => router.push("/markets")}>
          Quay lại Markets
        </button>
      </div>
    );
  }

  const yesPercent = getYesPercent(market);
  const chartData = generateProbHistory(yesPercent);
  const isResolved = market.status === "RESOLVED";

  const handlePlaceBet = async () => {
    if (!betPosition) return;
    setBetPlaced(true);
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80, background: "var(--bg-primary)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px" }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>
          <a href="/markets" style={{ color: "#8b5cf6", textDecoration: "none" }}>Markets</a>
          {" "}/&nbsp;{market.title.substring(0, 40)}...
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }}>
          {/* Left column */}
          <div>
            {/* Title card */}
            <div className="glass" style={{ padding: 28, marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                <span className={`badge badge-${market.category}`}>
                  {market.category}
                </span>
                <span className={`badge ${isResolved ? "badge-resolved" : "badge-active"}`}>
                  {isResolved ? "✓ AI Resolved" : "● Active"}
                </span>
              </div>

              <h1 style={{ fontSize: 24, fontWeight: 800, color: "white", lineHeight: 1.3, marginBottom: 16 }}>
                {market.title}
              </h1>

              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 24 }}>
                {market.description}
              </p>

              {/* Stats row */}
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[
                  { label: "Volume", value: formatVolume(market.total_volume) },
                  { label: "YES Shares", value: market.yes_shares.toLocaleString() },
                  { label: "NO Shares", value: market.no_shares.toLocaleString() },
                  { label: "Kết thúc", value: new Date(market.end_date).toLocaleDateString("vi-VN") },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{s.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "white" }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Probability Chart */}
            <div className="glass" style={{ padding: 24, marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 20 }}>
                📈 Lịch sử xác suất
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="yesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 10 }} interval={6} />
                  <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ background: "#0f1729", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                    formatter={(v) => [`${v}%`, "YES"]}
                  />
                  <Area type="monotone" dataKey="yes" stroke="#10b981" strokeWidth={2} fill="url(#yesGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* AI Resolution Engine */}
            <AIResolutionCard market={market} />
          </div>

          {/* Right column — Bet Panel */}
          <div style={{ position: "sticky", top: 80 }}>
            <div className="glass" style={{ padding: 24, marginBottom: 16 }}>
              {/* Probability display */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: "#10b981" }}>{yesPercent}%</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>YES</div>
                  </div>
                  <div style={{ width: 1, background: "rgba(255,255,255,0.08)" }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: "#ef4444" }}>{100 - yesPercent}%</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>NO</div>
                  </div>
                </div>
                <div className="progress-bar" style={{ height: 10 }}>
                  <div style={{
                    height: "100%",
                    borderRadius: "100px",
                    background: `linear-gradient(90deg, #10b981 ${yesPercent}%, #ef4444 ${yesPercent}%)`,
                    width: "100%",
                  }} />
                </div>
              </div>

              {/* Bet form */}
              {!isResolved && !betPlaced ? (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                    <button
                      className="btn-yes"
                      onClick={() => setBetPosition("YES")}
                      style={{
                        opacity: betPosition === "NO" ? 0.5 : 1,
                        border: betPosition === "YES" ? "2px solid #10b981" : "2px solid transparent",
                      }}
                    >
                      YES 👍
                    </button>
                    <button
                      className="btn-no"
                      onClick={() => setBetPosition("NO")}
                      style={{
                        opacity: betPosition === "YES" ? 0.5 : 1,
                        border: betPosition === "NO" ? "2px solid #ef4444" : "2px solid transparent",
                      }}
                    >
                      NO 👎
                    </button>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8, display: "block" }}>
                      Số cổ phần muốn mua
                    </label>
                    <input
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(e.target.value)}
                      placeholder="100"
                    />
                  </div>

                  {/* Quick amount buttons */}
                  <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                    {["50", "100", "250", "500"].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setBetAmount(amt)}
                        style={{
                          flex: 1,
                          padding: "6px 4px",
                          borderRadius: 8,
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: betAmount === amt ? "rgba(139,92,246,0.15)" : "transparent",
                          color: betAmount === amt ? "#a78bfa" : "rgba(255,255,255,0.5)",
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>

                  {betPosition && (
                    <div style={{
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: 10,
                      padding: 12,
                      marginBottom: 16,
                      fontSize: 13,
                      color: "rgba(255,255,255,0.6)",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span>Vị thế:</span>
                        <span style={{ color: betPosition === "YES" ? "#10b981" : "#ef4444", fontWeight: 700 }}>
                          {betPosition}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Lợi nhuận tiềm năng:</span>
                        <span style={{ color: "white", fontWeight: 700 }}>
                          +{(parseInt(betAmount || "0") * (betPosition === "YES" ? (100 / yesPercent) : (100 / (100 - yesPercent)))).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  )}

                  <button
                    className="btn-primary"
                    onClick={handlePlaceBet}
                    disabled={!betPosition}
                    style={{ width: "100%", padding: 14, fontSize: 15, opacity: betPosition ? 1 : 0.5 }}
                  >
                    {betPosition ? `Mua ${betPosition} ${betAmount} shares` : "Chọn vị thế"}
                  </button>
                </>
              ) : betPlaced ? (
                <div style={{ textAlign: "center", padding: 20 }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 8 }}>
                    Đặt lệnh thành công!
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                    {betAmount} cổ phần {betPosition} đã được ghi lại on-chain
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: 20 }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: market.resolved_outcome === "YES" ? "#10b981" : "#ef4444", marginBottom: 8 }}>
                    {market.resolved_outcome}
                  </div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
                    AI Confidence: {(parseFloat(market.ai_confidence) * 100).toFixed(0)}%
                  </div>
                  <button className="btn-primary" style={{ marginTop: 16, width: "100%", padding: 12 }}>
                    💰 Claim Reward
                  </button>
                </div>
              )}
            </div>

            {/* Market Info */}
            <div className="glass" style={{ padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
                THÔNG TIN MARKET
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Creator", value: market.creator },
                  { label: "Nguồn resolve", value: market.resolve_url.replace("https://", ""), isLink: true, href: market.resolve_url },
                  { label: "Ngày tạo", value: new Date(market.created_at).toLocaleDateString("vi-VN") },
                ].map((info) => (
                  <div key={info.label} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{info.label}</span>
                    {info.isLink ? (
                      <a href={info.href} target="_blank" rel="noopener noreferrer" style={{
                        fontSize: 13,
                        color: "#8b5cf6",
                        textDecoration: "none",
                        textAlign: "right",
                        maxWidth: "70%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {info.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: 13, color: "white", textAlign: "right", maxWidth: "70%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {info.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
