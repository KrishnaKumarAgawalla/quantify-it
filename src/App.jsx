import React, { useState } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { calculatePlan } from './lib/engine';
import { Header } from './components/Header';
import { ConfigCard } from './components/ConfigCard';
import { AssetCard } from './components/AssetCard';
import { TargetSummary } from './components/TargetSummary';
import { PurchaseSchedule } from './components/PurchaseSchedule';
import { InsightCard } from './components/InsightCard';

export default function App() {
  const [budget, setBudget] = useState(6000);
  const [timeframe, setTimeframe] = useState(12);
  const [unit, setUnit] = useState('Days');
  const [mode, setMode] = useState('1'); 
  const [assets, setAssets] = useState([
    { name: 'Large-ETF', price: 260, value: 7 },
    { name: 'Mid-ETF', price: 70, value: 5 }
  ]);

  const { summary, calendar, remaining, recommendation } = calculatePlan(budget, timeframe, assets, mode);

  const getUnitLabel = () => unit === 'Days' ? 'Daily' : unit === 'Months' ? 'Monthly' : 'Yearly';
  const getColumnLabel = () => unit.endsWith('s') ? unit.slice(0, -1) : unit;

  const updateAsset = (index, field, val) => {
    const newAssets = [...assets];
    newAssets[index][field] = field === 'name' ? val : Number(val);
    setAssets(newAssets);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-900">
      {/* Reduced max-width to 6xl to keep the app centered and snug */}
      <div className="max-w-6xl mx-auto"> 
        <Header remaining={remaining} />

        {/* Using a 12-column grid for precise control */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-8">
          
          {/* Sidebar Area: 4 out of 11 is roughly 36% (perfect middle ground) */}
          <div className="lg:col-span-4 space-y-6">
            <ConfigCard 
              budget={budget} setBudget={setBudget} 
              timeframe={timeframe} setTimeframe={setTimeframe} 
              unit={unit} setUnit={setUnit} 
              mode={mode} setMode={setMode} 
            />

            <AssetCard 
              assets={assets} 
              setAssets={setAssets} 
              updateAsset={updateAsset} 
              mode={mode} 
            />

            <InsightCard message={recommendation} />
          </div>

          {/* Results Area: 7 out of 11 */}
          <div className="lg:col-span-7 space-y-6">
            <TargetSummary summary={summary} />
            <PurchaseSchedule 
              calendar={calendar} 
              assets={assets} 
              unitLabel={getUnitLabel()} 
              columnLabel={getColumnLabel()} 
            />
          </div>
        </div>
      </div>

      {/* Vercel Monitoring Tools */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
} 