import { useState, useMemo } from 'react';
import { AccountType } from '../App';

interface PerformanceChartProps {
  accountType: AccountType;
}

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

export default function PerformanceChart({ accountType }: PerformanceChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const generateData = useMemo(() => {
    const baseValue = accountType === 'roth' ? 12500 : 45000;
    const points: number[] = [];
    const pointCount = timeRange === '1D' ? 24 : timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : timeRange === '3M' ? 90 : timeRange === '1Y' ? 52 : 156;

    let currentValue = baseValue * 0.85;
    for (let i = 0; i < pointCount; i++) {
      const trend = accountType === 'roth' ? 0.002 : 0.003;
      const volatility = accountType === 'roth' ? 0.008 : 0.015;
      const change = (Math.random() - 0.45) * volatility + trend;
      currentValue = currentValue * (1 + change);
      points.push(currentValue);
    }
    return points;
  }, [accountType, timeRange]);

  const minValue = Math.min(...generateData);
  const maxValue = Math.max(...generateData);
  const range = maxValue - minValue;

  const normalizeValue = (value: number) => {
    return ((value - minValue) / range) * 100;
  };

  const currentValue = generateData[hoveredPoint ?? generateData.length - 1];
  const startValue = generateData[0];
  const totalChange = currentValue - startValue;
  const totalChangePercent = (totalChange / startValue) * 100;
  const isPositive = totalChange >= 0;

  const pathD = generateData
    .map((value, index) => {
      const x = (index / (generateData.length - 1)) * 100;
      const y = 100 - normalizeValue(value);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const areaD = `${pathD} L 100 100 L 0 100 Z`;

  return (
    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 md:mb-8">
        <div>
          <p className="text-xs md:text-sm text-white/40 uppercase tracking-wider mb-1">
            {accountType === 'roth' ? 'Roth IRA Performance' : 'Personal Account Performance'}
          </p>
          <div className="flex flex-wrap items-baseline gap-2 md:gap-3">
            <span className="text-2xl md:text-4xl font-bold text-white">
              ${currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`text-sm md:text-lg font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}${totalChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-xs md:text-sm ml-1">
                ({isPositive ? '+' : ''}{totalChangePercent.toFixed(2)}%)
              </span>
            </span>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex bg-white/[0.03] p-1 rounded-xl border border-white/[0.06] overflow-x-auto">
          {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2.5 md:px-4 py-1.5 md:py-2 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap min-h-[36px] ${
                timeRange === range
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div
        className="relative h-48 md:h-64 lg:h-80"
        onMouseLeave={() => setHoveredPoint(null)}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const index = Math.round(x * (generateData.length - 1));
            setHoveredPoint(Math.max(0, Math.min(generateData.length - 1, index)));
          }}
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`chartGradient-${accountType}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`lineGradient-${accountType}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0.5" />
              <stop offset="50%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="1" />
              <stop offset="100%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="0.3"
            />
          ))}

          {/* Area fill */}
          <path
            d={areaD}
            fill={`url(#chartGradient-${accountType})`}
            className="transition-all duration-300"
          />

          {/* Main line */}
          <path
            d={pathD}
            fill="none"
            stroke={`url(#lineGradient-${accountType})`}
            strokeWidth="0.5"
            className="transition-all duration-300"
            vectorEffect="non-scaling-stroke"
            style={{ strokeWidth: '2px' }}
          />

          {/* Hover line */}
          {hoveredPoint !== null && (
            <>
              <line
                x1={(hoveredPoint / (generateData.length - 1)) * 100}
                y1="0"
                x2={(hoveredPoint / (generateData.length - 1)) * 100}
                y2="100"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.2"
                strokeDasharray="2"
              />
              <circle
                cx={(hoveredPoint / (generateData.length - 1)) * 100}
                cy={100 - normalizeValue(generateData[hoveredPoint])}
                r="1.5"
                fill={isPositive ? '#10b981' : '#ef4444'}
                className="drop-shadow-lg"
              />
            </>
          )}
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-white/30 pointer-events-none">
          <span>${(maxValue / 1000).toFixed(1)}k</span>
          <span>${((maxValue + minValue) / 2 / 1000).toFixed(1)}k</span>
          <span>${(minValue / 1000).toFixed(1)}k</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-4 md:gap-6 text-xs text-white/40">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isPositive ? 'bg-emerald-400' : 'bg-red-400'}`} />
            <span>Portfolio Value</span>
          </div>
          {accountType === 'roth' && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Dividend Income</span>
            </div>
          )}
        </div>
        <p className="text-xs text-white/30">
          {hoveredPoint !== null ? `Point ${hoveredPoint + 1} of ${generateData.length}` : `${timeRange} performance`}
        </p>
      </div>
    </div>
  );
}