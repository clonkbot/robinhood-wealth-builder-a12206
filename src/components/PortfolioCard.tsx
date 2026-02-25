interface PortfolioCardProps {
  title: string;
  value: string;
  subtitle: string;
  accent: 'emerald' | 'green' | 'red' | 'amber';
}

export default function PortfolioCard({ title, value, subtitle, accent }: PortfolioCardProps) {
  const accentColors = {
    emerald: {
      border: 'border-emerald-500/20',
      glow: 'shadow-emerald-500/5',
      text: 'text-emerald-400',
      dot: 'bg-emerald-400'
    },
    green: {
      border: 'border-emerald-500/20',
      glow: 'shadow-emerald-500/5',
      text: 'text-emerald-400',
      dot: 'bg-emerald-400'
    },
    red: {
      border: 'border-red-500/20',
      glow: 'shadow-red-500/5',
      text: 'text-red-400',
      dot: 'bg-red-400'
    },
    amber: {
      border: 'border-amber-500/20',
      glow: 'shadow-amber-500/5',
      text: 'text-amber-400',
      dot: 'bg-amber-400'
    }
  };

  const colors = accentColors[accent];

  return (
    <div
      className={`group relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] ${colors.border} rounded-2xl md:rounded-3xl p-4 md:p-6 overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.1] shadow-2xl ${colors.glow}`}
      style={{
        animation: 'fadeInUp 0.6s ease-out forwards',
        opacity: 0,
        transform: 'translateY(20px)'
      }}
    >
      {/* Decorative gradient */}
      <div className={`absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 rounded-full blur-3xl opacity-10 transition-opacity duration-500 group-hover:opacity-20 ${
        accent === 'amber' ? 'bg-amber-500' : accent === 'red' ? 'bg-red-500' : 'bg-emerald-500'
      }`} />

      <div className="relative">
        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
          <p className="text-xs md:text-sm text-white/50 font-medium uppercase tracking-wider">{title}</p>
        </div>
        <p className={`text-2xl md:text-4xl font-bold tracking-tight ${accent === 'red' ? colors.text : 'text-white'} mb-1 md:mb-2`}>
          {value}
        </p>
        <p className={`text-xs md:text-sm ${accent === 'green' || accent === 'red' ? colors.text : 'text-white/40'}`}>
          {subtitle}
        </p>
      </div>

      <style>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}