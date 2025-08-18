# Stock Manager

![Python](https://img.shields.io/badge/Python-3.11-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-API-green)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)

A full-stack project for stock analysis and management, featuring a Python-based API and a Next.js client dashboard.

---

## Tech Stack

- **Backend:** Python, FastAPI
- **Frontend:** Next.js, TypeScript
- **Other:** ESLint, PostCSS

---

## Project Structure

```
stock-analysis-api/ # Python FastAPI backend for stock
analysis stock-analysis-client/ # Next.js frontend dashboard
```

---

## 1. stock-analysis-api

A FastAPI backend providing endpoints for stock data analysis, indicators, and risk assessment.

### Features

- Stock data analysis engine
- Technical indicators calculation
- Risk assessment models
- Configurable via `reader.yaml`

### Setup

```fish
cd stock-analysis-api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Run

```
uvicorn app:app --reload
```

---

## 2. stock-analysis-client

A Next.js dashboard for visualizing stock analysis results.

### Features

- Dashboard with metrics, signals, and trends
- Interactive charts and indicator sections
- Error and loading states

### Setup

```
cd stock-analysis-client
npm install
```

### Run

```
npm run dev
```

---

## Usage

1. Start the API server.
2. Start the client dashboard.
3. Access the dashboard in your browser (default: http://localhost:3000).

---

## Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a pull request or submit an issue.

---

## License

The project is licensed under the MIT License.
