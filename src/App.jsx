import React, { useState } from 'react';
import { calculatePlan } from './lib/engine';
import { Wallet, Calendar, Plus, Trash2, TrendingUp } from 'lucide-react';

export default function App() {
  const [budget, setBudget] = useState(6000);
  const [timeframe, setTimeframe] = useState(12);
  const [assets, setAssets] = useState([
    { name: 'Large-ETF', price: 260, value: 7 },
    { name: 'Mid-ETF', price: 70, value: 5 }
  ]);

  const { summary, calendar, totalInvested, remaining } = calculatePlan(budget, timeframe, assets);

  const updateAsset = (index, field, val) => {
    const newAssets = [...assets];
    newAssets[index][field] = field === 'name' ? val : Number(val);
    setAssets(newAssets);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <TrendingUp className="text-indigo-600" /> QUANTIFY.IT
          </h1>
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg shadow-indigo-200">
            <span className="text-xs opacity-80 uppercase font-bold">Balance:</span>
            <span className="ml-2 font-mono font-bold">₹{remaining.toFixed(2)}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inputs Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="font-bold mb-4 flex items-center gap-2"><Wallet size={18}/> Configuration</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <label className="text-slate-500 block mb-1">Total Capital (₹)</label>
                  <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Timeframe (Days)</label>
                  <input type="number" value={timeframe} onChange={e => setTimeframe(Number(e.target.value))} className="w-full p-2 border rounded-md" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold flex items-center gap-2"><Plus size={18}/> Assets</h2>
                <button onClick={() => setAssets([...assets, {name: '', price: 0, value: 0}])} className="text-xs bg-slate-100 p-1 px-2 rounded hover:bg-slate-200">Add New</button>
              </div>
              {assets.map((asset, i) => (
                <div key={i} className="flex gap-2 mb-3 items-center">
                  <input placeholder="Name" value={asset.name} onChange={e => updateAsset(i, 'name', e.target.value)} className="flex-1 p-2 border rounded text-xs" />
                  <input type="number" placeholder="₹" value={asset.price} onChange={e => updateAsset(i, 'price', e.target.value)} className="w-16 p-2 border rounded text-xs" />
                  <input type="number" placeholder="Ratio" value={asset.value} onChange={e => updateAsset(i, 'value', e.target.value)} className="w-12 p-2 border rounded text-xs" />
                  <button onClick={() => setAssets(assets.filter((_, idx) => idx !== i))} className="text-slate-300 hover:text-red-500"><Trash2 size={14}/></button>
                </div>
              ))}
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr><th className="p-4 text-left">Asset</th><th className="p-4 text-center">Qty</th><th className="p-4 text-right">Actual Cost</th></tr>
                </thead>
                <tbody>
                  {summary.map((s, i) => (
                    <tr key={i} className="border-t"><td className="p-4 font-bold">{s.name}</td><td className="p-4 text-center">{s.totalQty}</td><td className="p-4 text-right font-mono">₹{s.actualCost}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 font-bold border-b flex items-center gap-2"><Calendar size={18}/> Purchase Schedule</div>
              <div className="max-h-[400px] overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 sticky top-0 uppercase text-slate-400">
                    <tr><th className="p-3 text-left">Day</th>{assets.map(a => <th key={a.name} className="p-3 text-center">{a.name}</th>)}<th className="p-3 text-right">Cost</th></tr>
                  </thead>
                  <tbody>
                    {calendar.map((c, i) => (
                      <tr key={i} className="border-t hover:bg-indigo-50/50">
                        <td className="p-3 text-slate-400 font-mono">{c.period}</td>
                        {c.dayAssets.map((da, j) => <td key={j} className={`p-3 text-center font-bold ${da.qty > 0 ? 'text-indigo-600' : 'text-slate-200'}`}>{da.qty}</td>)}
                        <td className="p-3 text-right font-bold text-slate-700 font-mono">₹{c.dayTotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}