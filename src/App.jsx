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
  // --- State Initialization with Persistence ---

  const [timeframe, setTimeframe] = useState(() => {
    return Number(localStorage.getItem('dca_timeframe')) || 12;
  });

  const [unit, setUnit] = useState(() => {
    return localStorage.getItem('dca_unit') || 'Days';
  });

  const [mode, setMode] = useState(() => {
    return localStorage.getItem('dca_mode') || '1';
  });

  const [assets, setAssets] = useState(() => {
    try {
      const saved = localStorage.getItem('dca_assets');
      return saved ? JSON.parse(saved) : [
        { name: 'AAPL', price: 180, value: 7 },
        { name: 'TATAMOTORS.NS', price: 240, value: 5 }
      ];
    } catch (e) {
      return [];
    }
  });

  const [budget, setBudget] = useState(() => {
    return Number(localStorage.getItem('dca_budget')) || 6000;
  });

  // --- Persistence Side Effects ---

  useEffect(() => {
    localStorage.setItem('dca_assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('dca_budget', budget.toString());
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('dca_timeframe', timeframe.toString());
  }, [timeframe]);

  useEffect(() => {
    localStorage.setItem('dca_unit', unit);
  }, [unit]);

  useEffect(() => {
    localStorage.setItem('dca_mode', mode);
  }, [mode]);

  // --- Logic & Helpers ---

  const { summary, calendar, remaining, recommendation } = calculatePlan(budget, timeframe, assets, mode);

  const getUnitLabel = () => unit === 'Days' ? 'Daily' : unit === 'Months' ? 'Monthly' : 'Yearly';
  const getColumnLabel = () => unit.endsWith('s') ? unit.slice(0, -1) : unit;

  const updateAsset = (index, field, val) => {
    const newAssets = [...assets];
    newAssets[index][field] = field === 'name' ? val : Number(val);
    setAssets(newAssets);
  };

  const resetPlan = () => {
    if (window.confirm("Are you sure you want to reset? This will clear all settings.")) {
      localStorage.clear();
      window.location.reload(); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto"> 
        <Header remaining={remaining} />

        <div className="grid grid-cols-1 lg:grid-cols-11 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <ConfigCard 
              budget={budget} setBudget={setBudget} 
              timeframe={timeframe} setTimeframe={setTimeframe} 
              unit={unit} setUnit={setUnit} 
              mode={mode} setMode={setMode}
              onReset={resetPlan}
            />
            <AssetCard assets={assets} setAssets={setAssets} updateAsset={updateAsset} mode={mode} />
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
      <Analytics />
      <SpeedInsights route="/dashboard" />
    </div>
  );
}