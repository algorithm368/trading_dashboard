from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from analysis_engine.analyzer import ProfessionalStockAnalyzer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/analyze")
def analyze(
    symbol: str = Query(..., description="Stock symbol, e.g. AAPL"),
    period: str = Query("1y", description="Data period, e.g. 1y, 6mo"),
    account_balance: float = Query(100000, description="Account balance for risk metrics")
):
    try:
        analyzer = ProfessionalStockAnalyzer(symbol, period)
        analyzer.calculate_all_indicators()
        analyzer.generate_advanced_signals()
        analyzer.calculate_risk_metrics(account_balance)
        return analyzer.get_json_output()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))