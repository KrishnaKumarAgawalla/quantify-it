import React, { useState, useRef, useEffect } from 'react';
import { Wallet, ChevronDown, Check } from 'lucide-react';

export const ConfigCard = ({ budget, setBudget, timeframe, setTimeframe, unit, setUnit, mode, setMode }) => {
  const [strategyOpen, setStrategyOpen] = useState(false);
  const [unitOpen, setUnitOpen] = useState(false);

  // Strategy Options
  const strategies = [
    { id: '1', label: 'Ratio-Based Split' },
    { id: '2', label: 'Fixed Amount (₹)' }
  ];

  // Unit Options
  const units = ['Days', 'Months', 'Years'];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
      <h2 className="text-sm font-bold mb-6 flex items-center gap-2 text-slate-700 underline decoration-indigo-200 decoration-4 underline-offset-4">
        <Wallet size={16} className="text-indigo-500"/> Configuration
      </h2>
      
      <div className="space-y-5">
        {/* CUSTOM STRATEGY DROPDOWN */}
        <div className="relative">
          <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Strategy</label>
          <button
            onClick={() => setStrategyOpen(!strategyOpen)}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl text-[13px] font-semibold transition-all border ${
              strategyOpen ? 'border-indigo-500 bg-white ring-2 ring-indigo-50' : 'border-transparent bg-slate-50 text-slate-700'
            }`}
          >
            {strategies.find(s => s.id === mode)?.label}
            <ChevronDown size={14} className={`transition-transform duration-200 ${strategyOpen ? 'rotate-180 text-indigo-500' : 'text-slate-400'}`} />
          </button>

          {strategyOpen && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl p-1.5 animate-in fade-in zoom-in duration-150">
              {strategies.map((s) => (
                <div
                  key={s.id}
                  onClick={() => { setMode(s.id); setStrategyOpen(false); }}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer text-[13px] transition-colors ${
                    mode === s.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {s.label}
                  {mode === s.id && <Check size={14} />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BUDGET INPUT */}
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Total Budget (₹)</label>
          <input 
            type="number" 
            value={budget} 
            onChange={e => setBudget(Number(e.target.value))} 
            className="w-full p-2.5 border border-slate-200 rounded-xl text-[13px] font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700" 
          />
        </div>

        <div className="flex gap-3">
          {/* DURATION INPUT */}
          <div className="flex-1">
            <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Duration</label>
            <input 
              type="number" 
              value={timeframe} 
              onChange={e => setTimeframe(Number(e.target.value))} 
              className="w-full p-2.5 border border-slate-200 rounded-xl text-[13px] font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700" 
            />
          </div>

          {/* CUSTOM UNIT DROPDOWN */}
          <div className="w-28 relative">
            <label className="text-[10px] font-black text-slate-400 uppercase block mb-1 text-center">Unit</label>
            <button
              onClick={() => setUnitOpen(!unitOpen)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-[13px] font-semibold transition-all border ${
                unitOpen ? 'border-indigo-500 bg-white ring-2 ring-indigo-50' : 'border-transparent bg-slate-50 text-slate-700'
              }`}
            >
              {unit}
              <ChevronDown size={14} className={unitOpen ? 'rotate-180 text-indigo-500' : 'text-slate-400'} />
            </button>

            {unitOpen && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl p-1.5 right-0 animate-in fade-in zoom-in duration-150">
                {units.map((u) => (
                  <div
                    key={u}
                    onClick={() => { setUnit(u); setUnitOpen(false); }}
                    className={`px-3 py-2 rounded-xl cursor-pointer text-[13px] transition-colors text-center ${
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
    </div>
  );
};