import React from "react";
import { RefreshCw } from "lucide-react";

type AnalysisData = {
  symbol?: string;
  current_price?: number;
  price?: number;
  change?: number;
};

type HeaderSectionProps = {
  data?: AnalysisData;
  symbol: string;
  period: string;
  setSymbol: (s: string) => void;
  setPeriod: (p: string) => void;
  loading: boolean;
  loadTradingData: () => void;
};

const HeaderSection: React.FC<HeaderSectionProps> = ({
  data,
  symbol,
  period,
  setSymbol,
  setPeriod,
  loading,
  loadTradingData,
}) => (
  <div className="mb-8">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pt-10 bg-white rounded-lg p-4 shadow-sm border border-gray-10 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Trading Dashboard
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Real-time analysis for {symbol || "—"}
        </p>
      </div>
      {data?.current_price !== undefined && (
        <div className="text-right">
          <div className="text-2xl md:text-3xl font-bold text-gray-900">
            ${data.current_price.toFixed(2)}
          </div>
          <div className="text-xs md:text-sm text-gray-500">Current Price</div>
        </div>
      )}
    </div>
    <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-lg p-4 shadow-sm border border-gray-100 gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div>
          <label
            htmlFor="symbol"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Symbol
          </label>
          <input
            type="text"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black w-full min-w-[100px]"
            placeholder="AAPL"
          />
        </div>
        <div>
          <label
            htmlFor="period"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Period
          </label>
          <select
            id="period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black w-full min-w-[100px]"
          >
            <option value="3mo">3 Months</option>
            <option value="6mo">6 Months</option>
            <option value="1y">1 Year</option>
            <option value="2y">2 Years</option>
          </select>
        </div>
      </div>
      <button
        onClick={loadTradingData}
        disabled={loading}
        className="flex items-center justify-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        <span>Refresh</span>
      </button>
    </div>
  </div>
);

export default HeaderSection;
