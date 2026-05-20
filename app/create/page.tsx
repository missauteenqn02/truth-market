"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { id: "tech", label: "💻 Công nghệ" },
  { id: "crypto", label: "₿ Crypto & DeFi" },
  { id: "politics", label: "🏛️ Chính trị" },
  { id: "entertainment", label: "🎬 Giải trí" },
  { id: "sports", label: "⚽ Thể thao" },
  { id: "science", label: "🔬 Khoa học" },
];

const TEMPLATE_MARKETS = [
  {
    title: "Bitcoin có vượt $_____ trong năm 2026 không?",
    resolve_url: "https://www.coingecko.com/en/coins/bitcoin",
    category: "crypto",
  },
  {
    title: "_____ có ra mắt sản phẩm AI mới trước Q4 2026 không?",
    resolve_url: "https://openai.com/blog",
    category: "tech",
  },
  {
    title: "Ethereum có vượt $_____ vào cuối năm 2026 không?",
    resolve_url: "https://www.coingecko.com/en/coins/ethereum",
    category: "crypto",
  },
];

export default function CreateMarketPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    resolve_criteria: "",
    resolve_url: "",
    category: "tech",
    end_date: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setSubmitted(true);
    await new Promise((r) => setTimeout(r, 2000));
    router.push("/markets");
  };

  const isStep1Valid = form.title && form.description && form.category;
  const isStep2Valid = form.resolve_criteria && form.resolve_url && form.end_date;

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80, background: "var(--bg-primary)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: "white", marginBottom: 8 }}>
            + Tạo Prediction Market
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
            Tạo market và để AI tự động resolve kết quả bằng cách đọc web và suy luận.
          </p>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", gap: 0, marginBottom: 40 }}>
          {[
            { n: 1, label: "Thông tin cơ bản" },
            { n: 2, label: "AI Resolution" },
            { n: 3, label: "Review & Deploy" },
          ].map((s, i) => (
            <div key={s.n} style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: step >= s.n ? "linear-gradient(135deg, #8b5cf6, #6d28d9)" : "rgba(255,255,255,0.06)",
                  border: step === s.n ? "2px solid #a78bfa" : "2px solid transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: step >= s.n ? "white" : "rgba(255,255,255,0.3)",
                }}>
                  {step > s.n ? "✓" : s.n}
                </div>
                <div style={{ fontSize: 11, color: step === s.n ? "white" : "rgba(255,255,255,0.3)", fontWeight: step === s.n ? 600 : 400, textAlign: "center" }}>
                  {s.label}
                </div>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)", margin: "0 8px", marginBottom: 22 }} />}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="glass" style={{ padding: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 24 }}>
              📝 Thông tin cơ bản
            </h2>

            {/* Templates */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>
                📋 Chọn template nhanh:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {TEMPLATE_MARKETS.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setForm((prev) => ({ ...prev, title: t.title, resolve_url: t.resolve_url, category: t.category }))}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      padding: "10px 14px",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.6)",
                      transition: "all 0.2s",
                    }}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 8 }}>
                  Tiêu đề market *
                </label>
                <input
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Ví dụ: Apple có ra mắt AI Glasses trước năm 2026 không?"
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 8 }}>
                  Mô tả chi tiết *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Cung cấp thêm bối cảnh về sự kiện này..."
                  rows={4}
                  style={{ resize: "vertical" }}
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 8 }}>
                  Danh mục *
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => update("category", cat.id)}
                      style={{
                        padding: "10px 8px",
                        borderRadius: 10,
                        border: "1px solid",
                        borderColor: form.category === cat.id ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.08)",
                        background: form.category === cat.id ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.03)",
                        color: form.category === cat.id ? "#a78bfa" : "rgba(255,255,255,0.5)",
                        fontSize: 13,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={() => setStep(2)}
              disabled={!isStep1Valid}
              style={{ marginTop: 28, width: "100%", padding: 14, fontSize: 15, opacity: isStep1Valid ? 1 : 0.5 }}
            >
              Tiếp theo →
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="glass" style={{ padding: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 8 }}>
              🤖 AI Resolution Setup
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>
              Định nghĩa cách AI sẽ resolve market của bạn. Đây là phần quan trọng nhất!
            </p>

            {/* AI Info Box */}
            <div className="ai-box" style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#a78bfa", marginBottom: 8 }}>
                ⚡ GenLayer AI sẽ làm gì?
              </div>
              <ol style={{ margin: 0, padding: "0 0 0 20px", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                <li>Gọi <code style={{ color: "#a78bfa" }}>gl.get_webpage(resolve_url)</code> để đọc trang web bạn chỉ định</li>
                <li>Dùng <code style={{ color: "#a78bfa" }}>gl.exec_prompt()</code> để phân tích tiêu chí</li>
                <li>Validators đồng thuận qua <code style={{ color: "#a78bfa" }}>gl.eq_principle_strict_eq()</code></li>
                <li>Kết quả YES/NO/INCONCLUSIVE được ghi on-chain</li>
              </ol>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 8 }}>
                  Tiêu chí resolve (rõ ràng, cụ thể) *
                </label>
                <textarea
                  value={form.resolve_criteria}
                  onChange={(e) => update("resolve_criteria", e.target.value)}
                  placeholder="Ví dụ: Market resolve YES nếu Apple chính thức công bố hoặc ra mắt AI Glasses tại sự kiện WWDC hoặc qua thông cáo báo chí trước ngày 31/12/2026. Nguồn: apple.com/newsroom hoặc Reuters/Bloomberg."
                  rows={5}
                  style={{ resize: "vertical" }}
                />
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
                  💡 Hãy viết rõ ràng và có thể xác minh được. AI sẽ dùng tiêu chí này để đánh giá.
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 8 }}>
                  URL nguồn dữ liệu chính *
                </label>
                <input
                  value={form.resolve_url}
                  onChange={(e) => update("resolve_url", e.target.value)}
                  placeholder="https://www.reuters.com/ hoặc https://example.com/official-page"
                />
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
                  💡 AI sẽ đọc trang này để tìm bằng chứng. Chọn nguồn uy tín và có thể truy cập công khai.
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 8 }}>
                  Ngày kết thúc *
                </label>
                <input
                  type="date"
                  value={form.end_date}
                  onChange={(e) => update("end_date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <button
                className="btn-secondary"
                onClick={() => setStep(1)}
                style={{ flex: 1, padding: 14 }}
              >
                ← Quay lại
              </button>
              <button
                className="btn-primary"
                onClick={() => setStep(3)}
                disabled={!isStep2Valid}
                style={{ flex: 2, padding: 14, fontSize: 15, opacity: isStep2Valid ? 1 : 0.5 }}
              >
                Review →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Review */}
        {step === 3 && (
          <div className="glass" style={{ padding: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 24 }}>
              ✅ Review & Deploy
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
              {[
                { label: "Tiêu đề", value: form.title },
                { label: "Danh mục", value: form.category },
                { label: "Tiêu chí resolve", value: form.resolve_criteria },
                { label: "Nguồn dữ liệu AI", value: form.resolve_url },
                { label: "Ngày kết thúc", value: new Date(form.end_date).toLocaleDateString("vi-VN") },
              ].map((item) => (
                <div key={item.label} style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 10,
                  padding: 14,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", marginBottom: 4, letterSpacing: "0.05em" }}>
                    {item.label.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 14, color: "white" }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Cost estimate */}
            <div className="ai-box" style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#a78bfa", marginBottom: 8 }}>
                ⛽ Chi phí ước tính
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                <span>Phí tạo market</span>
                <span style={{ color: "white", fontWeight: 600 }}>~0.001 GEN</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
                <span>Phí AI Resolver (khi resolve)</span>
                <span style={{ color: "white", fontWeight: 600 }}>~0.005 GEN</span>
              </div>
            </div>

            {submitted ? (
              <div style={{ textAlign: "center", padding: 24 }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🚀</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 8 }}>
                  Đang deploy lên GenLayer...
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                  AI Validators đang xác nhận transaction
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  className="btn-secondary"
                  onClick={() => setStep(2)}
                  style={{ flex: 1, padding: 14 }}
                >
                  ← Sửa
                </button>
                <button
                  className="btn-primary"
                  onClick={handleSubmit}
                  style={{ flex: 2, padding: 14, fontSize: 15 }}
                >
                  🚀 Deploy Market lên GenLayer
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
