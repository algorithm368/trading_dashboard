import React from "react";
import { Activity, Target, TrendingUp } from "lucide-react";

interface NavigationTabsProps {
  activeTab: "overview" | "signals" | "indicators";
  setActiveTab: (tab: "overview" | "signals" | "indicators") => void;
}

const tabs = [
  { key: "overview", label: "Overview", icon: <Activity className="w-4 h-4" /> },
  { key: "signals", label: "Trading Signals", icon: <Target className="w-4 h-4" /> },
  { key: "indicators", label: "Technical Analysis", icon: <TrendingUp className="w-4 h-4" /> },
];

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, setActiveTab }) => (
  <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm border border-gray-100">
    {tabs.map(tab => (
      <button
        key={tab.key}
        onClick={() => setActiveTab(tab.key as "overview" | "signals" | "indicators")}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
          activeTab === tab.key ? "bg-orange-100 text-orange-700 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        }`}
      >
        {tab.icon}
        <span className="font-medium">{tab.label}</span>
      </button>
    ))}
  </div>
);

export default NavigationTabs;
