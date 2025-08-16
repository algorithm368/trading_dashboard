import pandas as pd
import numpy as np
from typing import Optional
from dataclasses import dataclass

@dataclass
class RiskMetrics:
    """Data class for risk management metrics"""
    stop_loss: Optional[float]
    take_profit: Optional[float]
    risk_reward_ratio: Optional[float]
    position_size: Optional[float]
    max_drawdown: Optional[float]
    volatility: float


class RiskManager:
    """Advanced risk management calculations"""
    
    @staticmethod
    def calculate_position_size(account_balance: float, risk_per_trade: float, stop_loss_pct: float) -> float:
        """Calculate position size based on risk management"""
        risk_amount = account_balance * risk_per_trade
        position_size = risk_amount / stop_loss_pct
        return min(position_size, account_balance * 0.1)  # Max 10% of account
    
    @staticmethod
    def calculate_sharpe_ratio(returns: pd.Series, risk_free_rate: float = 0.02) -> float:
        """Calculate Sharpe ratio"""
        excess_returns = returns - risk_free_rate / 252  # Daily risk-free rate
        return np.sqrt(252) * excess_returns.mean() / returns.std()
    
    @staticmethod
    def calculate_max_drawdown(prices: pd.Series) -> float:
        """Calculate maximum drawdown"""
        peak = prices.expanding().max()
        drawdown = (prices - peak) / peak
        return drawdown.min()
    
    @staticmethod
    def calculate_var(returns: pd.Series, confidence_level: float = 0.05) -> float:
        """Calculate Value at Risk"""
        return returns.quantile(confidence_level)
