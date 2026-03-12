import React from 'react';
import { TrendingUp } from 'lucide-react';

export const Header = ({ remaining }) => (
  <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
    <div>
      <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
        <TrendingUp className="text-indigo-600" size={28} /> QUANTIFY.IT
      </h1>
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Asset Allocation Engine</p>
    </div>
    <div className="bg-white border border-slate-200 px-5 py-3 rounded-2xl shadow-sm flex items-center gap-4">
      <div className="text-right">
        <p className="text-[9px] uppercase font-black text-slate-400 leading-none mb-1">Unused Capital</p>
        <p className="text-xl font-mono font-bold text-indigo-600 leading-none">₹{remaining.toFixed(2)}</p>
      </div>
    </div>
  </header>
);