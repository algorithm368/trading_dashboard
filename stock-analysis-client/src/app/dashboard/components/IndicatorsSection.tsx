import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface IndicatorsSectionProps {
  data: any;
  indicatorData: any[];
}

const IndicatorsSection: React.FC<IndicatorsSectionProps> = ({
  data,
  indicatorData,
}) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Technical Indicators
      </h2>
      <div className="mb-4">
        <p className="text-sm font-medium text-blue-700">BB Lower</p>
        <p className="text-lg font-semibold text-blue-800">
          {data.support_resistance.bb_lower.toFixed(2)}
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={indicatorData}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              color: "black",
            }}
          />
          <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Support & Resistance
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-700">Support</p>
          <p className="text-lg font-semibold text-green-800">
            ${data.support_resistance.support.toFixed(2)}
          </p>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <p className="text-sm font-medium text-red-700">Resistance</p>
          <p className="text-lg font-semibold text-red-800">
            ${data.support_resistance.resistance.toFixed(2)}
          </p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-700">BB Lower</p>
          <p className="text-lg font-semibold text-blue-800">
            ${data.support_resistance.bb_lower.toFixed(2)}
          </p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <p className="text-sm font-medium text-purple-700">BB Upper</p>
          <p className="text-lg font-semibold text-purple-800">
            ${data.support_resistance.bb_upper.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Risk Management
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <p className="text-sm font-medium text-red-700">Stop Loss</p>
          <p className="text-xl font-semibold text-red-800">
            ${data.risk_management.stop_loss.toFixed(2)}
          </p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-700">Take Profit</p>
          <p className="text-xl font-semibold text-green-800">
            ${data.risk_management.take_profit.toFixed(2)}
          </p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-700">Position Size</p>
          <p className="text-xl font-semibold text-blue-800">
            ${data.risk_management.position_size.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default IndicatorsSection;
