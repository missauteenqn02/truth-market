// Mock data for TruthMarket
// Replace with real GenLayer contract calls after deployment

export const MOCK_MARKETS = [
  {
    id: "apple-ai-glasses-2026",
    title: "Apple sẽ ra mắt AI Glasses trước 31/12/2026?",
    description:
      "Dự đoán liệu Apple có chính thức công bố hoặc ra mắt sản phẩm kính AR/AI trong năm 2026 hay không.",
    resolve_criteria:
      "Market sẽ resolve YES nếu Apple chính thức công bố hoặc ra mắt AI Glasses công khai trước ngày 31/12/2026 dựa trên nguồn Apple chính thức hoặc các trang tin uy tín như Reuters, Bloomberg.",
    resolve_url: "https://www.apple.com/newsroom/",
    category: "tech",
    end_date: "2026-12-31",
    status: "ACTIVE",
    yes_shares: 7823,
    no_shares: 2177,
    total_volume: 10000,
    resolved_outcome: "",
    ai_reasoning: "",
    ai_confidence: "",
    creator: "0x1234...5678",
    created_at: "2026-01-15",
  },
  {
    id: "gta6-delay-2026",
    title: "GTA 6 có tiếp tục bị delay sang 2027 không?",
    description:
      "Rockstar Games đã công bố GTA 6 ra mắt năm 2026. Liệu game có bị hoãn thêm một lần nữa không?",
    resolve_criteria:
      "Market resolve YES nếu Rockstar Games chính thức thông báo hoãn ngày phát hành GTA 6 sang sau năm 2026. Nguồn: Trang web chính thức hoặc thông cáo báo chí của Rockstar/Take-Two Interactive.",
    resolve_url: "https://www.rockstargames.com/",
    category: "entertainment",
    end_date: "2026-12-31",
    status: "ACTIVE",
    yes_shares: 5420,
    no_shares: 4580,
    total_volume: 10000,
    resolved_outcome: "",
    ai_reasoning: "",
    ai_confidence: "",
    creator: "0xabcd...efgh",
    created_at: "2026-02-01",
  },
  {
    id: "openai-gpt6-2026",
    title: "OpenAI có ra mắt GPT-6 trong năm 2026 không?",
    description:
      "Sau sự thành công của GPT-4 và GPT-4o, liệu OpenAI có công bố GPT-6 trong năm nay không?",
    resolve_criteria:
      "Market resolve YES nếu OpenAI chính thức ra mắt hoặc công bố GPT-6 (không phải GPT-4.5 hay các bản cập nhật nhỏ) trước ngày 31/12/2026. Nguồn: Blog OpenAI chính thức.",
    resolve_url: "https://openai.com/blog",
    category: "tech",
    end_date: "2026-12-31",
    status: "ACTIVE",
    yes_shares: 3200,
    no_shares: 6800,
    total_volume: 10000,
    resolved_outcome: "",
    ai_reasoning: "",
    ai_confidence: "",
    creator: "0x9876...5432",
    created_at: "2026-01-20",
  },
  {
    id: "bitcoin-200k-2026",
    title: "Bitcoin có vượt $200,000 trong năm 2026 không?",
    description:
      "Với chu kỳ halving 2024 và dòng tiền từ ETF, liệu BTC có đạt mốc lịch sử $200K trong năm nay?",
    resolve_criteria:
      "Market resolve YES nếu giá Bitcoin đạt hoặc vượt $200,000 USD tại bất kỳ thời điểm nào trong năm 2026 theo dữ liệu CoinGecko, CoinMarketCap hoặc Binance.",
    resolve_url: "https://www.coingecko.com/en/coins/bitcoin",
    category: "crypto",
    end_date: "2026-12-31",
    status: "ACTIVE",
    yes_shares: 6100,
    no_shares: 3900,
    total_volume: 15000,
    resolved_outcome: "",
    ai_reasoning: "",
    ai_confidence: "",
    creator: "0x5555...6666",
    created_at: "2026-01-10",
  },
  {
    id: "trump-impeachment-2026",
    title: "Trump có bị luận tội lần 3 trong năm 2026 không?",
    description:
      "Chính trường Mỹ đang nóng bỏng. Liệu có làn sóng luận tội mới nào nhắm vào cựu Tổng thống Trump không?",
    resolve_criteria:
      "Market resolve YES nếu Hạ viện Mỹ thông qua nghị quyết luận tội Donald Trump trước ngày 31/12/2026. Nguồn: Congress.gov, Reuters, AP News.",
    resolve_url: "https://www.congress.gov/",
    category: "politics",
    end_date: "2026-12-31",
    status: "ACTIVE",
    yes_shares: 1500,
    no_shares: 8500,
    total_volume: 10000,
    resolved_outcome: "",
    ai_reasoning: "",
    ai_confidence: "",
    creator: "0x7777...8888",
    created_at: "2026-03-01",
  },
  {
    id: "avengers-5-1billion",
    title: "Avengers: Doomsday có đạt 1 tỷ USD doanh thu không?",
    description:
      "Avengers: Doomsday với sự trở lại của Robert Downey Jr. Liệu phim có đạt mốc 1 tỷ USD phòng vé?",
    resolve_criteria:
      "Market resolve YES nếu Avengers: Doomsday đạt tổng doanh thu phòng vé toàn cầu 1 tỷ USD trong vòng 3 tháng đầu sau khi ra mắt. Nguồn: Box Office Mojo.",
    resolve_url: "https://www.boxofficemojo.com/",
    category: "entertainment",
    end_date: "2026-09-30",
    status: "ACTIVE",
    yes_shares: 8200,
    no_shares: 1800,
    total_volume: 10000,
    resolved_outcome: "",
    ai_reasoning: "",
    ai_confidence: "",
    creator: "0xaaaa...bbbb",
    created_at: "2026-04-01",
  },
  {
    id: "ethereum-pos-resolved",
    title: "Ethereum 2.0 đã chuyển sang PoS thành công?",
    description: "The Merge đã hoàn thành vào tháng 9/2022.",
    resolve_criteria: "Ethereum đã chuyển sang Proof-of-Stake.",
    resolve_url: "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/",
    category: "crypto",
    end_date: "2022-12-31",
    status: "RESOLVED",
    yes_shares: 9500,
    no_shares: 500,
    total_volume: 10000,
    resolved_outcome: "YES",
    ai_reasoning:
      "Ethereum đã hoàn thành The Merge vào ngày 15/9/2022, chuyển từ Proof-of-Work sang Proof-of-Stake. Thông tin được xác nhận bởi Ethereum Foundation chính thức và nhiều nguồn tin tức uy tín. Việc tiêu thụ năng lượng giảm 99.95%.",
    ai_confidence: "0.99",
    creator: "0xcccc...dddd",
    created_at: "2022-01-01",
  },
];

export const MOCK_STATS = {
  tvl: "$2.4M",
  totalMarkets: 127,
  totalVolume: "$8.9M",
  activeMarkets: 89,
  resolvedByAI: 38,
  avgConfidence: "91.2%",
};

export const CATEGORIES = [
  { id: "all", label: "Tất cả", icon: "🌐" },
  { id: "tech", label: "Công nghệ", icon: "💻" },
  { id: "crypto", label: "Crypto", icon: "₿" },
  { id: "politics", label: "Chính trị", icon: "🏛️" },
  { id: "entertainment", label: "Giải trí", icon: "🎬" },
  { id: "sports", label: "Thể thao", icon: "⚽" },
];

export type Market = (typeof MOCK_MARKETS)[0];

export function getYesPercent(market: Market): number {
  const total = market.yes_shares + market.no_shares;
  if (total === 0) return 50;
  return Math.round((market.yes_shares / total) * 100);
}

export function formatVolume(volume: number): string {
  if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`;
  if (volume >= 1000) return `$${(volume / 1000).toFixed(0)}K`;
  return `$${volume}`;
}
