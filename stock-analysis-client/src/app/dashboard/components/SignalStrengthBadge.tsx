import React from "react";

interface SignalStrengthBadgeProps {
  strength: string;
  type: string;
}

const SignalStrengthBadge: React.FC<SignalStrengthBadgeProps> = ({ strength, type }) => {
  const getColor = () => {
    if (strength === "STRONG") return type === "BUY" ? "bg-green-500" : "bg-red-500";
    if (strength === "MODERATE") return type === "BUY" ? "bg-green-400" : "bg-red-400";
    return "bg-gray-400";
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getColor()}`}
    >
      {type} · {strength}
    </span>
  );
};

export default SignalStrengthBadge;
