import React from 'react';
import { PieChart } from 'lucide-react';

export const TargetSummary = ({ summary }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
    <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-600 flex justify-between items-center text-[13px]">
      <span className="flex items-center gap-2">
        <PieChart size={16} className="text-indigo-500" /> Target Summary
      </span>
      <span className="text-[10px] text-slate-400 font-normal uppercase tracking-widest">Global Allocation</span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead className="text-slate-400 bg-white text-[10px] uppercase font-black border-b border-slate-200">
          <tr>
            <th className="px-5 py-3 text-left">Asset</th>
            <th className="px-5 py-3 text-center">Qty</th>
            <th className="px-5 py-3 text-right">Actual Cost</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {summary.map((s, i) => (
            <tr 
              key={i} 
              className={`transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-100/50'} hover:bg-indigo-50/50`}
            >
              <td className="px-5 py-3">
                <div className="font-bold text-slate-800">{s.name || 'Unnamed Asset'}</div>
                <div className="text-[10px] text-slate-400 font-mono italic">Ideal: ₹{s.targetValue.toFixed(0)}</div>
              </td>
              <td className="px-5 py-3 text-center font-mono font-bold text-base text-indigo-600">{s.totalQty}</td>
              <td className="px-5 py-3 text-right font-mono text-slate-700 font-bold text-base">₹{s.actualCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);