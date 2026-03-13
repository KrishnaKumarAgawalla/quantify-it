import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { calculatePlan } from './lib/engine';
import { Header } from './components/Header';
import { ConfigCard } from './components/ConfigCard';
import { AssetCard } from './components/AssetCard';
import { TargetSummary } from './components/TargetSummary';
import { PurchaseSchedule } from './components/PurchaseSchedule';
import { PortfolioChart } from './components/PortfolioChart';
import { InsightCard } from './components/InsightCard';

export default function App() {
  const [timeframe, setTimeframe] = useState(12);
  const [unit, setUnit] = useState('Days');
  const [mode, setMode] = useState('1'); 

  const [assets, setAssets] = useState(() => {
    try {
      const saved = localStorage.getItem('dca_assets');
      // Default assets if none are saved
      return saved ? JSON.parse(saved) : [
        { name: 'AAPL', price: 180, value: 7 },
        { name: 'TATAMOTORS.NS', price: 900, value: 5 }
      ];
    } catch (e) {
      console.error("Failed to load assets from storage", e);
      return [];
    }
  });

  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem('dca_budget');
    return savedBudget ? Number(savedBudget) : 6000;
  });

  useEffect(() => {
    localStorage.setItem('dca_assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('dca_budget', budget.toString());
  }, [budget]);

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
      <div className="max-w-6xl mx-auto"> 
        <Header remaining={remaining} />

        <div className="grid grid-cols-1 lg:grid-cols-11 gap-8">
          
          <div className="lg:col-span-4 space-y-6">
            <ConfigCard 
              budget={budget} 
              setBudget={setBudget} 
              timeframe={timeframe} 
              setTimeframe={setTimeframe} 
              unit={unit} 
              setUnit={setUnit} 
              mode={mode} 
              setMode={setMode} 
            />

            <AssetCard 
              assets={assets} 
              setAssets={setAssets} 
              updateAsset={updateAsset} 
              mode={mode} 
            />

            <PortfolioChart summary={summary} />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <InsightCard message={recommendation} />

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
      <SpeedInsights route="/dashboard" />
    </div>
  );
}