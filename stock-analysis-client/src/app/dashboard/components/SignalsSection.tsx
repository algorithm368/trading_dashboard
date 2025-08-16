import React from "react";
import SignalStrengthBadge from "./SignalStrengthBadge";

interface SignalsSectionProps {
  data: any;
}

const SignalsSection: React.FC<SignalsSectionProps> = ({ data }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Latest Signal
      </h2>
      <div className="flex items-center justify-between mb-4">
        <SignalStrengthBadge
          strength={data.latest_signal.strength}
          type={data.latest_signal.type}
        />
        <span className="text-sm text-gray-500">
          {data.latest_signal.confidence} confidence
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Reasons:</p>
        <div className="flex flex-wrap gap-2">
          {data.latest_signal.reasons.map((reason: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {reason}
            </span>
          ))}
        </div>
      </div>
    </div>
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Recent Signals
      </h2>
      <div className="space-y-4">
        {[...data.signal_history].reverse().map((signal: unknown) => (
          <div
            key={signal.date}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <SignalStrengthBadge
                strength={signal.strength}
                type={signal.type}
              />
              <div>
                <p className="font-medium text-gray-900">
                  ${signal.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  {(() => {
                    const d = new Date(signal.date);
                    const day = String(d.getDate()).padStart(2, "0");
                    const month = String(d.getMonth() + 1).padStart(2, "0");
                    const year = d.getFullYear();
                    return `${day}/${month}/${year}`;
                  })()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">
                {(signal.confidence * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-gray-500">Confidence</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SignalsSection;
