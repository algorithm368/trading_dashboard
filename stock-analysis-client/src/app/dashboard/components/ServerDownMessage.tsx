import React from "react";

interface ServerDownMessageProps {
  onRetry?: () => void;
}

const ServerDownMessage: React.FC<ServerDownMessageProps> = ({ onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
    <div className="text-4xl mb-4">🚫</div>
    <h2 className="text-xl font-semibold mb-2 text-red-600">Server is Down</h2>
    <p className="mb-4 text-gray-700">
      We are unable to connect to the server. Please check your connection or
      try again later.
    </p>
    {onRetry && (
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={onRetry}
      >
        Retry
      </button>
    )}
  </div>
);

export default ServerDownMessage;
