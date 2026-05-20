# 🔮 TruthMarket — AI-Powered Prediction Markets on GenLayer

> The world's first prediction market where **AI Validators autonomously browse the web**, analyze data, and deliver final verdicts — no oracles, no human intervention.

![Built on GenLayer](https://img.shields.io/badge/Built%20on-GenLayer-8b5cf6?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)

## ✨ Features

- **🌐 Autonomous Web Browsing** — Intelligent Contracts call `gl.nondet.web.render()` to fetch real-world data from the internet
- **🧠 AI-Powered Analysis** — `gl.exec_prompt()` sends data to AI for deep analysis and reasoning
- **⚖️ Validator Consensus** — Multiple AI Validators reach independent consensus using `gl.eq_principle_strict_eq()`
- **💸 Auto Settlement** — Results are recorded on-chain, winners are paid automatically
- **📊 Real-time Market Data** — Live probability tracking with interactive charts
- **🎨 Premium Glassmorphism UI** — Modern dark theme with smooth animations

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 + React 19 + TypeScript |
| Styling | TailwindCSS 4 + Custom CSS |
| Animations | Framer Motion |
| Charts | Recharts |
| Blockchain | GenLayer Intelligent Contracts |
| Smart Contract | Python (GenLayer SDK) |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
truth-market/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage with hero, stats, trending markets
│   ├── markets/           # Markets listing & detail pages
│   ├── create/            # Create new market page
│   ├── portfolio/         # User portfolio page
│   └── globals.css        # Global styles & design system
├── components/            # Reusable React components
│   └── Navbar.tsx         # Navigation bar
├── contracts/             # GenLayer Intelligent Contracts
│   └── truth_market.py   # Core prediction market contract
├── lib/                   # Utilities & mock data
└── public/                # Static assets
```

## 🤖 How AI Resolution Works

```
1. Market End Date Reached
        ↓
2. AI Validators browse trusted sources (gl.nondet.web.render)
        ↓
3. AI analyzes collected data (gl.exec_prompt)
        ↓
4. Multiple validators reach consensus (gl.eq_principle_strict_eq)
        ↓
5. Result recorded on-chain → Winners paid automatically
```

## 📜 Smart Contract

The core Intelligent Contract (`contracts/truth_market.py`) handles:
- Market creation with configurable parameters
- Bet placement (YES/NO positions)
- AI-powered resolution using web data + LLM analysis
- Automatic payout distribution

## 🌐 Deployment

- **Frontend**: Deployed on [Vercel](https://vercel.com)
- **Smart Contract**: Deployed on GenLayer Testnet

## 📄 License

MIT License — Built with ❤️ on [GenLayer](https://genlayer.com)
