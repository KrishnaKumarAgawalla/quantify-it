import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

export const PortfolioChart = ({ summary }) => {
  // Format data for Recharts
  const data = summary.map(item => ({
    name: item.name,
    value: item.targetValue
  }));

  const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

  return (
    /* Height reduced to 280px and padding to p-4 */
    <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 h-[280px] flex flex-col">
      <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2 underline decoration-indigo-200 decoration-4 underline-offset-4">
        <PieIcon size={16} className="text-indigo-500"/> Strategy Visualizer
      </h2>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              /* Slightly smaller radius to fit the new height */
              innerRadius={50}
              outerRadius={65}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  cornerRadius={6} 
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                fontSize: '12px'
              }}
            />
            {/* Legend tightened up */}
            <Legend 
              verticalAlign="bottom" 
              height={20} 
              iconSize={10} 
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};