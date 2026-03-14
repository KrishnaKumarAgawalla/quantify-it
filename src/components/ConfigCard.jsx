import React, { useState } from 'react';
import { Wallet, ChevronDown, Check, RotateCcw } from 'lucide-react';

export const ConfigCard = ({ budget, setBudget, timeframe, setTimeframe, unit, setUnit, mode, setMode, onReset }) => {
  const [strategyOpen, setStrategyOpen] = useState(false);
  const [unitOpen, setUnitOpen] = useState(false);

  const strategies = [
    { id: '1', label: 'Ratio' }, // Shortened label for compact UI
    { id: '2', label: 'Fixed (₹)' }
  ];

  const units = ['Days', 'Months', 'Years'];

  return (
    /* Reduced padding from p-6 to p-4 */
    <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200">
      <h2 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-700 underline decoration-indigo-200 decoration-4 underline-offset-4">
        <Wallet size={16} className="text-indigo-500"/> Configuration
      </h2>
      
      <div className="space-y-4"> {/* Reduced spacing from 5 to 4 */}
        
        {/* ROW 1: STRATEGY & BUDGET */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Strategy</label>
            <button
              onClick={() => setStrategyOpen(!strategyOpen)}
              className={`w-full flex items-center justify-between p-2 rounded-xl text-[12px] font-semibold transition-all border ${
                strategyOpen ? 'border-indigo-500 bg-white ring-2 ring-indigo-50' : 'border-transparent bg-slate-50 text-slate-700'
              }`}
            >
              <span className="truncate">{strategies.find(s => s.id === mode)?.label}</span>
              <ChevronDown size={12} className={`shrink-0 transition-transform duration-200 ${strategyOpen ? 'rotate-180 text-indigo-500' : 'text-slate-400'}`} />
            </button>

            {strategyOpen && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl p-1 animate-in fade-in zoom-in duration-150">
                {strategies.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => { setMode(s.id); setStrategyOpen(false); }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer text-[12px] transition-colors ${
                      mode === s.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {s.label}
                    {mode === s.id && <Check size={12} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Budget (₹)</label>
            <input 
              type="number" 
              value={budget} 
              onChange={e => setBudget(Number(e.target.value))} 
              className="w-full p-2 border border-slate-200 rounded-xl text-[12px] font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700" 
            />
          </div>
        </div>

        {/* ROW 2: DURATION & UNIT */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Duration</label>
            <input 
              type="number" 
              value={timeframe} 
              onChange={e => setTimeframe(Number(e.target.value))} 
              className="w-full p-2 border border-slate-200 rounded-xl text-[12px] font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700" 
            />
          </div>

          <div className="w-24 relative">
            <label className="text-[10px] font-black text-slate-400 uppercase block mb-1 text-center">Unit</label>
            <button
              onClick={() => setUnitOpen(!unitOpen)}
              className={`w-full flex items-center justify-between p-2 rounded-xl text-[12px] font-semibold transition-all border ${
                unitOpen ? 'border-indigo-500 bg-white ring-2 ring-indigo-50' : 'border-transparent bg-slate-50 text-slate-700'
              }`}
            >
              {unit}
              <ChevronDown size={12} className={unitOpen ? 'rotate-180 text-indigo-500' : 'text-slate-400'} />
            </button>

            {unitOpen && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl p-1 right-0 animate-in fade-in zoom-in duration-150">
                {units.map((u) => (
                  <div
                    key={u}
                    onClick={() => { setUnit(u); setUnitOpen(false); }}
                    className={`px-3 py-2 rounded-xl cursor-pointer text-[12px] transition-colors text-center ${
                      unit === u ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {u}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <button 
      onClick={onReset}
      className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-[11px] font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-dashed border-slate-200 hover:border-red-200"
    >
      <RotateCcw size={14} /> Reset Plan to Defaults
    </button>
    </div>
  );
};