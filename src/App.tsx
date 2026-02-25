import { useState } from 'react';
import PortfolioCard from './components/PortfolioCard';
import StockRow from './components/StockRow';
import AccountTabs from './components/AccountTabs';
import Header from './components/Header';
import PerformanceChart from './components/PerformanceChart';

export type AccountType = 'roth' | 'personal';

export interface Stock {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  change: number;
  changePercent: number;
  type: 'stock' | 'etf' | 'preferred';
  dividendYield?: number;
}

const rothPortfolio: Stock[] = [
  { symbol: 'PSA-H', name: 'Public Storage Pref H', shares: 50, price: 25.42, change: 0.18, changePercent: 0.71, type: 'preferred', dividendYield: 5.85 },
  { symbol: 'WFC-L', name: 'Wells Fargo Pref L', shares: 75, price: 24.89, change: -0.12, changePercent: -0.48, type: 'preferred', dividendYield: 6.12 },
  { symbol: 'JPM-D', name: 'JPMorgan Chase Pref D', shares: 60, price: 26.15, change: 0.34, changePercent: 1.32, type: 'preferred', dividendYield: 5.45 },
  { symbol: 'BAC-K', name: 'Bank of America Pref K', shares: 100, price: 23.78, change: 0.08, changePercent: 0.34, type: 'preferred', dividendYield: 5.92 },
  { symbol: 'USB-H', name: 'U.S. Bancorp Pref H', shares: 40, price: 24.56, change: -0.22, changePercent: -0.89, type: 'preferred', dividendYield: 5.68 },
  { symbol: 'PNC-P', name: 'PNC Financial Pref P', shares: 55, price: 25.88, change: 0.45, changePercent: 1.77, type: 'preferred', dividendYield: 5.35 },
  { symbol: 'MS-E', name: 'Morgan Stanley Pref E', shares: 80, price: 26.72, change: 0.29, changePercent: 1.10, type: 'preferred', dividendYield: 5.78 },
  { symbol: 'GS-D', name: 'Goldman Sachs Pref D', shares: 35, price: 25.34, change: -0.15, changePercent: -0.59, type: 'preferred', dividendYield: 5.55 },
  { symbol: 'SCHW-D', name: 'Charles Schwab Pref D', shares: 65, price: 24.12, change: 0.21, changePercent: 0.88, type: 'preferred', dividendYield: 5.98 },
  { symbol: 'C-N', name: 'Citigroup Pref N', shares: 90, price: 25.67, change: 0.38, changePercent: 1.50, type: 'preferred', dividendYield: 5.72 },
];

const personalPortfolio: Stock[] = [
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', shares: 25, price: 478.92, change: 4.56, changePercent: 0.96, type: 'etf' },
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 45, price: 182.63, change: 2.34, changePercent: 1.30, type: 'stock' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 30, price: 415.28, change: -1.87, changePercent: -0.45, type: 'stock' },
  { symbol: 'VTI', name: 'Vanguard Total Stock', shares: 40, price: 256.45, change: 1.92, changePercent: 0.75, type: 'etf' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 20, price: 175.84, change: 3.21, changePercent: 1.86, type: 'stock' },
  { symbol: 'SCHD', name: 'Schwab US Dividend ETF', shares: 60, price: 78.34, change: 0.45, changePercent: 0.58, type: 'etf' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 15, price: 225.67, change: 5.43, changePercent: 2.47, type: 'stock' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 12, price: 875.42, change: 18.76, changePercent: 2.19, type: 'stock' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', shares: 18, price: 512.89, change: 7.23, changePercent: 1.43, type: 'etf' },
  { symbol: 'JEPI', name: 'JPMorgan Equity Premium', shares: 85, price: 56.78, change: 0.32, changePercent: 0.57, type: 'etf' },
  { symbol: 'META', name: 'Meta Platforms Inc.', shares: 22, price: 582.34, change: 12.45, changePercent: 2.18, type: 'stock' },
  { symbol: 'VYM', name: 'Vanguard High Dividend', shares: 50, price: 118.92, change: 0.67, changePercent: 0.57, type: 'etf' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway B', shares: 8, price: 428.56, change: 2.18, changePercent: 0.51, type: 'stock' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', shares: 28, price: 198.45, change: 1.56, changePercent: 0.79, type: 'stock' },
  { symbol: 'V', name: 'Visa Inc.', shares: 16, price: 285.67, change: -0.89, changePercent: -0.31, type: 'stock' },
];

function App() {
  const [activeAccount, setActiveAccount] = useState<AccountType>('roth');

  const currentPortfolio = activeAccount === 'roth' ? rothPortfolio : personalPortfolio;

  const totalValue = currentPortfolio.reduce((sum, stock) => sum + (stock.shares * stock.price), 0);
  const totalChange = currentPortfolio.reduce((sum, stock) => sum + (stock.shares * stock.change), 0);
  const totalChangePercent = (totalChange / (totalValue - totalChange)) * 100;

  const avgDividendYield = activeAccount === 'roth'
    ? currentPortfolio.reduce((sum, s) => sum + (s.dividendYield || 0), 0) / currentPortfolio.length
    : null;

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-sans selection:bg-emerald-500/30">
      {/* Background texture */}
      <div className="fixed inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }} />

      {/* Gradient orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 pb-20">
        <Header />

        <AccountTabs activeAccount={activeAccount} setActiveAccount={setActiveAccount} />

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10">
          <PortfolioCard
            title="Portfolio Value"
            value={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtitle={activeAccount === 'roth' ? 'Roth IRA • Preferred Stocks' : 'Personal • Stocks & ETFs'}
            accent="emerald"
          />
          <PortfolioCard
            title="Today's Change"
            value={`${totalChange >= 0 ? '+' : ''}$${totalChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtitle={`${totalChangePercent >= 0 ? '+' : ''}${totalChangePercent.toFixed(2)}%`}
            accent={totalChange >= 0 ? 'green' : 'red'}
          />
          <PortfolioCard
            title={activeAccount === 'roth' ? 'Avg. Dividend Yield' : 'Holdings'}
            value={activeAccount === 'roth' ? `${avgDividendYield?.toFixed(2)}%` : `${currentPortfolio.length}`}
            subtitle={activeAccount === 'roth' ? 'Annual Income Focus' : 'Diversified Portfolio'}
            accent="amber"
          />
        </div>

        {/* Chart */}
        <div className="mb-6 md:mb-10">
          <PerformanceChart accountType={activeAccount} />
        </div>

        {/* Holdings Table */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl md:rounded-3xl overflow-hidden">
          <div className="px-4 md:px-8 py-4 md:py-6 border-b border-white/[0.06]">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">
              {activeAccount === 'roth' ? 'Preferred Stock Holdings' : 'Stock & ETF Holdings'}
            </h2>
            <p className="text-xs md:text-sm text-white/40 mt-1">
              {activeAccount === 'roth'
                ? 'High-yield preferred securities for tax-advantaged income'
                : 'Growth-focused diversified equity holdings'}
            </p>
          </div>

          {/* Table Header - Desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 text-xs text-white/40 uppercase tracking-wider border-b border-white/[0.04]">
            <div className="col-span-4">Asset</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">Change</div>
            <div className="col-span-2 text-right">Shares</div>
            <div className="col-span-2 text-right">Value</div>
          </div>

          {/* Stock Rows */}
          <div className="divide-y divide-white/[0.04]">
            {currentPortfolio.map((stock, index) => (
              <StockRow key={stock.symbol} stock={stock} index={index} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 md:mt-16 pt-6 border-t border-white/[0.06]">
          <p className="text-center text-white/25 text-xs tracking-wide">
            Requested by @Quincy · Built by @clonkbot
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;