"use client";
import React, { useState, useEffect } from "react";

// Types
interface TradingData {
  current_price: number;
  data_summary: {
    date_range: {
      end: string;
      start: string;
    };
    price_range: {
      current: number;
      high: number;
      low: number;
    };
    total_records: number;
  };
  date: string;
  latest_signal: {
    confidence: string;
    reasons: string[];
    strength: string;
    type: string;
  };
  risk_management: {
    max_drawdown: number;
    position_size: number;
    risk_reward_ratio: number;
    stop_loss: number;
    take_profit: number;
    volatility: number;
  };
  signal_history: Array<{
    confidence: number;
    date: string;
    price: number;
    reasons: string[];
    strength: string;
    type: string;
  }>;
  support_resistance: {
    bb_lower: number;
    bb_upper: number;
    resistance: number;
    support: number;
  };
  symbol: string;
  technical_indicators: {
    ATR: number;
    BB_Position: number;
    CCI: number;
    MACD: number;
    MACD_Signal: number;
    MACD_Trend: string;
    RSI: number;
    RSI_Signal: string;
    Stoch_D: number;
    Stoch_K: number;
    Volatility: number;
    Williams_R: number;
  };
  trend_analysis: {
    long_term: string;
    medium_term: string;
    short_term: string;
  };
}

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// API Functions
const fetchTradingData = async (
  symbol: string = "AAPL",
  period: string = "6mo"
): Promise<TradingData> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/analyze?symbol=${symbol}?period=${period}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching trading data:", error);
    throw error;
  }
};

// Components
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import ServerDownMessage from "./components/ServerDownMessage";
import EmptyState from "./components/EmptyState";
import HeaderSection from "./components/HeaderSection";
import NavigationTabs from "./components/NavigationTabs";
import OverviewSection from "./components/OverviewSection";
import SignalsSection from "./components/SignalsSection";
import IndicatorsSection from "./components/IndicatorsSection";

export default function TradingDashboard() {
  const [data, setData] = useState<TradingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "signals" | "indicators"
  >("overview");
  const [symbol, setSymbol] = useState<string>("AAPL");
  const [period, setPeriod] = useState<string>("6mo");

  // Debounced symbol for search
  const [debouncedSymbol, setDebouncedSymbol] = useState<string>(symbol);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSymbol(symbol);
    }, 500); // 500ms debounce
    return () => clearTimeout(handler);
  }, [symbol]);

  // Fetch data function
  const loadTradingData = async (searchSymbol?: string) => {
    setLoading(true);
    setError(null);

    try {
      if (symbol) {
        const tradingData = await fetchTradingData(
          searchSymbol || debouncedSymbol,
          period
        );
        setData(tradingData);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch trading data. Please check your API connection."
      );
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount and when debouncedSymbol/period changes
  useEffect(() => {
    loadTradingData(debouncedSymbol);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSymbol, period]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto p-6">
          <HeaderSection
            data={null}
            symbol={symbol}
            period={period}
            setSymbol={setSymbol}
            setPeriod={setPeriod}
            loading={loading}
            loadTradingData={() => loadTradingData(symbol)}
          />
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-8">
            <div className="max-w-7xl mx-auto p-6">
              <LoadingSpinner />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error or empty state
  if (error) {
    console.log(error);
    const isServerDown =
      error.toLowerCase().includes("failed to fetch") ||
      error.toLowerCase().includes("server") ||
      error.toLowerCase().includes("networkerror");
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto p-6">
          <HeaderSection
            data={null}
            symbol={symbol}
            period={period}
            setSymbol={setSymbol}
            setPeriod={setPeriod}
            loading={loading}
            loadTradingData={() => loadTradingData(symbol)}
          />
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-8">
            {isServerDown ? (
              <ServerDownMessage onRetry={() => loadTradingData(symbol)} />
            ) : (
              <ErrorMessage
                message={error}
                onRetry={() => loadTradingData(symbol)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!symbol) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto p-6">
          <HeaderSection
            data={null}
            symbol={symbol}
            period={period}
            setSymbol={setSymbol}
            setPeriod={setPeriod}
            loading={loading}
            loadTradingData={() => loadTradingData(symbol)}
          />
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-8">
            <EmptyState />
          </div>
        </div>
      </div>
    );
  }

  // Process chart data - handle both signal_history array and potential empty data
  const chartData =
    data.signal_history?.slice(-10).map((signal) => ({
      date: new Date(signal.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      price: signal.price,
      confidence: signal.confidence * 100,
      type: signal.type,
    })) || [];

  // Process indicator data for IndicatorsSection
  const indicatorData = data.technical_indicators
    ? Object.entries(data.technical_indicators)
        .filter(([key]) => !key.includes("Signal") && !key.includes("Trend"))
        .slice(0, 8)
        .map(([key, value]) => ({
          name: key,
          value: typeof value === "number" ? parseFloat(value.toFixed(2)) : 0,
        }))
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto p-6">
        <HeaderSection
          data={data}
          symbol={symbol}
          period={period}
          setSymbol={setSymbol}
          setPeriod={setPeriod}
          loading={loading}
          loadTradingData={() => loadTradingData(symbol)}
        />
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "overview" && (
          <OverviewSection data={data} chartData={chartData} />
        )}
        {activeTab === "signals" && <SignalsSection data={data} />}
        {activeTab === "indicators" && (
          <IndicatorsSection data={data} indicatorData={indicatorData} />
        )}
      </div>
    </div>
  );
}
