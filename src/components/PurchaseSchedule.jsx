import React from 'react';
import { Calendar } from 'lucide-react';

export const PurchaseSchedule = ({ calendar, assets, unitLabel, columnLabel }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
    <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-600 flex items-center gap-2 text-[13px]">
      <Calendar size={16} className="text-indigo-500"/> {unitLabel} Purchase Schedule
    </div>
    <div className="max-h-[330px] overflow-y-auto">
      <table className="w-full text-[13px]"> 
        <thead className="bg-white sticky top-0 uppercase text-slate-400 text-[10px] font-black border-b border-slate-200 z-10">
          <tr>
            <th className="px-5 py-3 text-left bg-white min-w-[80px]">{columnLabel}</th>
            {assets.map((a,idx) => <th key={idx} className="px-5 py-3 text-center bg-white">{a.name || '??'}</th>)}
            <th className="px-5 py-3 text-right bg-white">Total Cost</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {calendar.map((c, i) => (
            <tr 
              key={i} 
              className={`transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-100/80'} hover:bg-indigo-50/60`}
            >
              <td className="px-5 py-3 text-slate-500 font-mono font-bold border-r border-slate-100">
                {c.period}
              </td>
              {c.dayAssets.map((da, j) => (
                <td key={j} className={`px-5 py-3 text-center font-black ${da.qty > 0 ? 'text-indigo-600' : 'text-slate-300'}`}>
                  {da.qty}
                </td>
              ))}
              <td className="px-5 py-3 text-right font-bold text-slate-800 font-mono text-base border-l border-slate-100">
                ₹{c.dayTotal}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);