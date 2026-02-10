
'use client';
import { useState, useEffect } from 'react';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { 
  Target, 
  Wallet, 
  ArrowUpRight, 
  CheckCircle, 
  Lock, 
  Unlock,
  TrendingUp,
  CircleDollarSign
} from 'lucide-react';

export default function Home() {
  const { connected } = useWallet();
  const [target, setTarget] = useState(2500);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const progress = Math.min((balance / target) * 100, 100);
  const isGoalMet = balance >= target;
  const remaining = Math.max(0, target - balance);

  const simulateDeposit = () => {
    if (!connected || isGoalMet) return;
    setLoading(true);
    setTimeout(() => {
      setBalance(prev => Math.min(prev + 250, target));
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto p-6 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Target className="text-white" size={24} />
          </div>
          <span className="text-xl font-extrabold tracking-tight">ADAVault</span>
        </div>
        <CardanoWallet />
      </nav>

      <main className="max-w-6xl mx-auto p-6 md:p-12">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Main Dashboard */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Target size={120} />
              </div>
              
              <h2 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Vault Balance</h2>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-7xl font-black">{balance.toLocaleString()}</span>
                <span className="text-2xl font-bold text-accent">ADA</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-semibold text-gray-500">Progress to Goal</span>
                  <span className="text-xl font-bold">{progress.toFixed(1)}%</span>
                </div>
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-1 shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(0,51,173,0.5)] ${isGoalMet ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-accent'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass p-8 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-accent">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Remaining</p>
                  <p className="text-2xl font-black">{remaining.toLocaleString()} ADA</p>
                </div>
              </div>
              <div className="glass p-8 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-500">
                  <Unlock size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Status</p>
                  <p className="text-2xl font-black">{isGoalMet ? 'UNLOCKED' : 'LOCKED'}</p>
                </div>
              </div>
            </div>

            {isGoalMet && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-3xl flex gap-6 items-center animate-in fade-in slide-in-from-bottom-5 duration-500">
                <CheckCircle className="text-emerald-500" size={48} />
                <div>
                  <h3 className="text-xl font-bold text-emerald-400">Target Goal Achieved!</h3>
                  <p className="text-emerald-400/70">Your ADA is now unlocked and ready for withdrawal.</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                <CircleDollarSign size={20} className="text-accent" />
                Savings Configuration
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-2">My Target Goal (ADA)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={target}
                      disabled={balance > 0}
                      onChange={(e) => setTarget(Number(e.target.value))}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-2xl font-black focus:ring-2 ring-accent outline-none transition-all disabled:opacity-50" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold">ADA</span>
                  </div>
                  {balance > 0 && <p className="text-[10px] text-accent mt-2 font-bold uppercase">Goal locked during active savings</p>}
                </div>

                <div className="pt-6 space-y-4">
                  <button 
                    onClick={simulateDeposit}
                    disabled={!connected || isGoalMet || loading}
                    className="w-full py-5 bg-accent hover:bg-blue-700 disabled:bg-white/5 disabled:text-gray-600 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-accent/20"
                  >
                    {loading ? 'Processing...' : isGoalMet ? 'Target Reached' : 'Deposit ADA'}
                    {!loading && !isGoalMet && <ArrowUpRight size={20} />}
                  </button>

                  <button 
                    disabled={!isGoalMet || !connected}
                    className={`w-full py-5 rounded-2xl font-black text-xl transition-all border-2 flex items-center justify-center gap-3 ${isGoalMet ? 'bg-white text-black border-white hover:bg-gray-200' : 'border-white/5 text-gray-800 cursor-not-allowed'}`}
                  >
                    Withdraw All Funds
                    <Wallet size={20} />
                  </button>
                </div>
                
                {!connected && (
                  <div className="text-center p-4 bg-white/5 rounded-2xl">
                    <p className="text-sm text-gray-400">Connect wallet to start saving</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 text-center">
              <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.3em]">Cardano Plutus Protocol v2</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}