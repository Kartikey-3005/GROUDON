import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';
import { PieChart as PieIcon, BarChart2 } from 'lucide-react';

export default function ChartsPanel({ selectedDistrict, stateSummary }) {
  const data = selectedDistrict || stateSummary;

  // Status Distribution Data
  const statusData = [
    { name: 'Approved', value: data.approvedClaims, color: '#10b981' },
    { name: 'Pending', value: data.pendingClaims, color: '#f59e0b' },
    { name: 'Delayed', value: data.delayedClaims, color: '#ef4444' },
  ];

  // Mock Rights Type Distribution (IFR vs CFR)
  const isDistrict = Boolean(selectedDistrict);
  const typeData = isDistrict ? [
    { type: 'IFR (Indiv.)', count: Math.round(data.totalClaims * 0.72) },
    { type: 'CFR (Comm.)', count: Math.round(data.totalClaims * 0.23) },
    { type: 'Habitat', count: Math.round(data.totalClaims * 0.05) },
  ] : [
    { type: 'IFR (Indiv.)', count: Math.round(stateSummary.totalClaims * 0.76) },
    { type: 'CFR (Comm.)', count: Math.round(stateSummary.totalClaims * 0.20) },
    { type: 'Habitat', count: Math.round(stateSummary.totalClaims * 0.04) },
  ];

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const p = payload[0];
      const percentage = ((p.value / data.totalClaims) * 100).toFixed(1);
      return (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-2 shadow-xl text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.payload.color }}></span>
            <span className="font-semibold text-white">{p.name}:</span>
            <span className="font-mono text-slate-200">{p.value.toLocaleString()}</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">{percentage}% of total claims</p>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const p = payload[0];
      return (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-2 shadow-xl text-xs">
          <p className="font-semibold text-white">{p.payload.type}</p>
          <p className="font-mono text-emerald-400 mt-0.5">{p.value.toLocaleString()} Claims</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h4 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
          <PieIcon className="w-3.5 h-3.5 text-emerald-400" />
          Claim Status & Category Breakdown
        </h4>
        <span className="text-[10px] font-mono text-slate-400">Total: {data.totalClaims.toLocaleString()}</span>
      </div>

      {/* Grid with 2 mini charts */}
      <div className="grid grid-cols-2 gap-3 items-center">
        {/* Donut Chart */}
        <div>
          <div className="h-28 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  innerRadius={28}
                  outerRadius={45}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] text-slate-400 uppercase leading-none">Rate</span>
              <span className="text-xs font-bold text-emerald-400 leading-tight">
                {data.approvalRate}%
              </span>
            </div>
          </div>
          {/* Status Legend */}
          <div className="flex justify-center gap-2 mt-1 text-[10px]">
            <span className="flex items-center gap-1 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Apprv
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Pend
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Delay
            </span>
          </div>
        </div>

        {/* Rights Type Horizontal Bar Chart */}
        <div>
          <div className="text-[10px] font-medium text-slate-400 mb-1 flex items-center gap-1">
            <BarChart2 className="w-3 h-3 text-slate-400" />
            Claim Types
          </div>
          <div className="h-28 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={typeData}
                layout="vertical"
                margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="type" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 9 }}
                  width={60}
                />
                <RechartsTooltip content={<CustomBarTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill="#6366f1" 
                  radius={[0, 4, 4, 0]}
                  barSize={10} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
