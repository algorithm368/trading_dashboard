import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
    <span className="ml-2 text-gray-600">Loading trading data...</span>
  </div>
);

export default LoadingSpinner;
