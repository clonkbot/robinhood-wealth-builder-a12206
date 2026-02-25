import { Stock } from '../App';

interface StockRowProps {
  stock: Stock;
  index: number;
}

export default function StockRow({ stock, index }: StockRowProps) {
  const value = stock.shares * stock.price;
  const isPositive = stock.change >= 0;

  return (
    <div
      className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 md:px-8 py-4 md:py-5 hover:bg-white/[0.02] transition-all duration-200 cursor-pointer"
      style={{
        animation: `fadeIn 0.4s ease-out ${index * 0.05}s forwards`,
        opacity: 0
      }}
    >
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${
              stock.type === 'preferred'
                ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-amber-400 border border-amber-500/30'
                : stock.type === 'etf'
                ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-blue-400 border border-blue-500/30'
                : 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 text-emerald-400 border border-emerald-500/30'
            }`}>
              {stock.symbol.substring(0, 2)}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{stock.symbol}</p>
              <p className="text-xs text-white/40 truncate max-w-[150px]">{stock.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-white text-sm">
              ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className={`text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-white/40 pt-2 border-t border-white/[0.04]">
          <span>{stock.shares} shares @ ${stock.price.toFixed(2)}</span>
          {stock.dividendYield && (
            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-full">
              {stock.dividendYield}% yield
            </span>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:contents">
        {/* Asset info */}
        <div className="col-span-4 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-transform duration-200 group-hover:scale-105 ${
            stock.type === 'preferred'
              ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-amber-400 border border-amber-500/30'
              : stock.type === 'etf'
              ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-blue-400 border border-blue-500/30'
              : 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 text-emerald-400 border border-emerald-500/30'
          }`}>
            {stock.symbol.substring(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-white group-hover:text-emerald-400 transition-colors duration-200">
                {stock.symbol}
              </p>
              <span className={`px-1.5 py-0.5 text-[10px] rounded-md uppercase tracking-wide font-medium ${
                stock.type === 'preferred'
                  ? 'bg-amber-500/10 text-amber-400/80'
                  : stock.type === 'etf'
                  ? 'bg-blue-500/10 text-blue-400/80'
                  : 'bg-emerald-500/10 text-emerald-400/80'
              }`}>
                {stock.type}
              </span>
            </div>
            <p className="text-sm text-white/40 truncate max-w-[200px]">{stock.name}</p>
          </div>
        </div>

        {/* Price */}
        <div className="col-span-2 flex flex-col justify-center text-right">
          <p className="font-medium text-white">${stock.price.toFixed(2)}</p>
          {stock.dividendYield && (
            <p className="text-xs text-amber-400/70">{stock.dividendYield}% yield</p>
          )}
        </div>

        {/* Change */}
        <div className="col-span-2 flex flex-col justify-center text-right">
          <p className={`font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}${Math.abs(stock.change).toFixed(2)}
          </p>
          <p className={`text-xs ${isPositive ? 'text-emerald-400/70' : 'text-red-400/70'}`}>
            {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
          </p>
        </div>

        {/* Shares */}
        <div className="col-span-2 flex items-center justify-end">
          <p className="font-medium text-white/70">{stock.shares}</p>
        </div>

        {/* Value */}
        <div className="col-span-2 flex items-center justify-end">
          <p className="font-semibold text-white">
            ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}