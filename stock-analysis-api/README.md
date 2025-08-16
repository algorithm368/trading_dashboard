# Professional Stock Analysis API

This is a Flask-based API server that provides advanced technical analysis for stock symbols. It is designed to be consumed by a front-end application, such as a React GUI.

## Project Structure

```
/stock-analysis-api
├── app.py                  # Main Flask application
├── analysis_engine/
│   └── analyzer.py         # Core analysis logic
├── requirements.txt        # Dependencies
└── README.md               # This file
```

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd stock-analysis-api
    ```

2.  **Create and activate a virtual environment (recommended):**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install the required packages:**
    ```bash
    pip install -r requirements.txt
    ```

## Running the Server

To start the Flask development server, run:

```bash
python app.py
```

The server will start on `http://127.0.0.1:5000`.

## API Endpoints

### 1. Full Analysis

- **URL:** `/analyze/<symbol>`
- **Method:** `GET`
- **Description:** Returns a comprehensive JSON object with current price, technical indicators, trend analysis, support/resistance levels, latest trading signal, and risk metrics.
- **Query Parameters:**
  - `period` (optional): The time period for historical data. Examples: `6mo`, `1y`, `2y`, `max`. Default is `1y`.
- **Example Request:**
  ```bash
  curl http://127.0.0.1:5000/analyze/AAPL?period=6mo
  ```
- **Success Response (200 OK):** A detailed JSON object with the full analysis.
- **Error Response (404 Not Found):** If the symbol is invalid or no data is found.

### 2. Chart Data

- **URL:** `/data/<symbol>`
- **Method:** `GET`
- **Description:** Returns an array of historical data points, including OHLC, Volume, and key indicators (SMA, BBands, RSI, MACD), perfect for building charts.
- **Query Parameters:**
  - `period` (optional): Same as above. Default is `1y`.
- **Example Request:**
  ```bash
  curl http://127.0.0.1:5000/data/TSLA
  ```
- **Success Response (200 OK):** A JSON array of data objects, one for each day.
  ```json
  [
    {
      "Date": "2023-01-03T00:00:00.000Z",
      "Open": 118.47,
      "High": 118.98,
      "Low": 104.64,
      "Close": 108.1,
      "Volume": 231432400,
      "SMA_20": null,
      "RSI": null,
      "...": "..."
    },
    ...
  ]
  ```

## How a React Front-End Would Use This

In your React application, you would use `fetch` or a library like `axios` to call these endpoints.

```javascript
// Example using fetch in a React component

import React, { useState, useEffect } from "react";

function StockAnalysis({ symbol }) {
  const [analysis, setAnalysis] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const analysisResponse = await fetch(
          `http://127.0.0.1:5000/analyze/${symbol}`
        );
        if (!analysisResponse.ok) {
          throw new Error("Failed to fetch analysis data");
        }
        const analysisData = await analysisResponse.json();
        setAnalysis(analysisData);

        const chartResponse = await fetch(
          `http://127.0.0.1:5000/data/${symbol}`
        );
        if (!chartResponse.ok) {
          throw new Error("Failed to fetch chart data");
        }
        const chartJsonData = await chartResponse.json();
        setChartData(chartJsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]); // Re-run when the symbol changes

  if (loading) return <div>Loading analysis for {symbol}...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!analysis) return null;

  return (
    <div>
      <h1>{analysis.symbol} Analysis</h1>
      <h2>Current Price: ${analysis.current_price.toFixed(2)}</h2>
      {/* Render other analysis data here */}
      {/* Use a charting library like Chart.js or Recharts to visualize chartData */}
    </div>
  );
}
```
