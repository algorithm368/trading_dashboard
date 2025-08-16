import React from "react";
import { Shield, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import MetricCard from "./MetricCard";
import TrendBadge from "./TrendBadge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface OverviewSectionProps {
  data: any;
  chartData: any[];
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ data, chartData }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Latest Signal"
        value={data.latest_signal.type}
        icon={data.latest_signal.type === "BUY" ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
        color={data.latest_signal.type === "BUY" ? "text-green-600" : "text-red-600"}
        subtitle={`${data.latest_signal.confidence} confidence`}
      />
      <MetricCard
        title="Risk/Reward Ratio"
        value={data.risk_management.risk_reward_ratio.toFixed(2)}
        icon={<Shield className="w-5 h-5" />}
        color="text-blue-600"
      />
      <MetricCard
        title="Volatility"
        value={`${(data.risk_management.volatility * 100).toFixed(1)}%`}
        icon={<AlertTriangle className="w-5 h-5" />}
        color="text-orange-600"
      />
      <MetricCard
        title="Max Drawdown"
        value={`${(data.risk_management.max_drawdown * 100).toFixed(1)}%`}
        icon={<TrendingDown className="w-5 h-5" />}
        color="text-red-600"
      />
    </div>
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Price Movement & Signals</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }} />
          <Line type="monotone" dataKey="price" stroke="#f97316" strokeWidth={2} dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }} activeDot={{ r: 6, stroke: "#f97316", strokeWidth: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Trend Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">Short Term</p>
          <TrendBadge trend={data.trend_analysis.short_term} />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">Medium Term</p>
          <TrendBadge trend={data.trend_analysis.medium_term} />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">Long Term</p>
          <TrendBadge trend={data.trend_analysis.long_term} />
        </div>
      </div>
    </div>
  </div>
);

export default OverviewSection;
