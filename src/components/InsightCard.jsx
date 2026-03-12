import React from 'react';
import { AlertCircle } from 'lucide-react';

export const InsightCard = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg flex gap-3 animate-in fade-in zoom-in duration-300">
      <AlertCircle className="shrink-0" size={18} />
      <div className="space-y-0.5">
        <p className="text-[9px] font-black uppercase tracking-widest opacity-70">
          Insight
        </p>
        <p className="text-[11px] font-medium leading-tight">
          {message}
        </p>
      </div>
    </div>
  );
};