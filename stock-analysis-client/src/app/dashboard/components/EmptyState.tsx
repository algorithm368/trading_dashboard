import React from "react";

const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-16 h-16 text-gray-400 mb-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4m6 6a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <h2 className="text-xl font-semibold text-gray-600 mb-2">
      No Data Available
    </h2>
    <p className="text-gray-500">Try searching for another symbol or period.</p>
  </div>
);

export default EmptyState;
