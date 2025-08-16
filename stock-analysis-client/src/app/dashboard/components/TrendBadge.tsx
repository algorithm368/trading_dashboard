import React from "react";

interface TrendBadgeProps {
  trend: string;
  size?: "sm" | "md";
}

const TrendBadge: React.FC<TrendBadgeProps> = ({ trend, size = "md" }) => {
  const colors = {
    Bullish: "bg-green-100 text-green-800",
    Bearish: "bg-red-100 text-red-800",
    Neutral: "bg-gray-100 text-gray-800",
  };

  const sizeClasses = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${
        colors[trend as keyof typeof colors] || colors.Neutral
      } ${sizeClasses}`}
    >
      {trend}
    </span>
  );
};

export default TrendBadge;
