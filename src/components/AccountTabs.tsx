import { AccountType } from '../App';

interface AccountTabsProps {
  activeAccount: AccountType;
  setActiveAccount: (account: AccountType) => void;
}

export default function AccountTabs({ activeAccount, setActiveAccount }: AccountTabsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 md:mb-10">
      <div className="flex bg-white/[0.03] p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-white/[0.06] w-full sm:w-auto">
        <button
          onClick={() => setActiveAccount('roth')}
          className={`flex-1 sm:flex-none relative px-4 sm:px-6 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-sm font-medium transition-all duration-300 min-h-[44px] ${
            activeAccount === 'roth'
              ? 'text-white'
              : 'text-white/40 hover:text-white/60'
          }`}
        >
          {activeAccount === 'roth' && (
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/10 rounded-lg sm:rounded-xl border border-amber-500/30" />
          )}
          <span className="relative flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden sm:inline">Roth IRA</span>
            <span className="sm:hidden">Roth</span>
            {activeAccount === 'roth' && (
              <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-amber-500/20 text-amber-300 rounded-full">
                Preferred
              </span>
            )}
          </span>
        </button>

        <button
          onClick={() => setActiveAccount('personal')}
          className={`flex-1 sm:flex-none relative px-4 sm:px-6 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-sm font-medium transition-all duration-300 min-h-[44px] ${
            activeAccount === 'personal'
              ? 'text-white'
              : 'text-white/40 hover:text-white/60'
          }`}
        >
          {activeAccount === 'personal' && (
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 rounded-lg sm:rounded-xl border border-emerald-500/30" />
          )}
          <span className="relative flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
            Personal
            {activeAccount === 'personal' && (
              <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded-full">
                Mixed
              </span>
            )}
          </span>
        </button>
      </div>

      {/* Account info badge */}
      <div className="flex items-center gap-2 text-xs text-white/30">
        <div className="hidden sm:block w-px h-6 bg-white/10" />
        <span className="flex items-center gap-1.5">
          {activeAccount === 'roth' ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Tax-advantaged retirement account
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Individual taxable brokerage
            </>
          )}
        </span>
      </div>
    </div>
  );
}