"""
Professional Stock Analysis System
Advanced technical analysis with comprehensive indicators, risk management, and performance tracking.
"""

import pandas as pd
import numpy as np
import yfinance as yf
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional, Union
import logging
from dataclasses import dataclass
from dataclasses import asdict
from enum import Enum
import warnings
warnings.filterwarnings('ignore')

from analysis_engine.indicators import TechnicalIndicators
from analysis_engine.risk import RiskManager, RiskMetrics
from analysis_engine.model import TradingSignal, SignalType, SignalStrength

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class ProfessionalStockAnalyzer:
    """Professional-grade stock analysis system"""
    
    def __init__(self, symbol: str, period: str = '1y', data_source: str = 'yahoo'):
        """
        Initialize the professional stock analyzer
        
        Args:
            symbol: Stock symbol (e.g., 'AAPL', 'MSFT')
            period: Time period for data
            data_source: Data source provider
        """
        self.symbol = symbol.upper()
        self.period = period
        self.data_source = data_source
        self.data = pd.DataFrame()
        self.indicators = {}
        self.signals = []
        self.risk_metrics = None
        
        # Configuration
        self.config = {
            'rsi_window': 14,
            'rsi_overbought': 70,
            'rsi_oversold': 30,
            'macd_fast': 12,
            'macd_slow': 26,
            'macd_signal': 9,
            'bb_window': 20,
            'bb_std': 2.0,
            'stoch_k': 14,
            'stoch_d': 3,
            'min_signal_strength': 2,
            'risk_per_trade': 0.02,  # 2% risk per trade
        }
        
        self._fetch_data()
    
    def _fetch_data(self) -> None:
        """Fetch and validate stock data"""
        try:
            ticker = yf.Ticker(self.symbol)
            self.data = ticker.history(period=self.period)
            
            if self.data.empty:
                raise ValueError(f"No data found for symbol {self.symbol}")
            
            # Add additional columns
            self.data['Returns'] = self.data['Close'].pct_change()
            self.data['Log_Returns'] = np.log(self.data['Close'] / self.data['Close'].shift(1))
            
            logger.info(f"Successfully fetched {len(self.data)} records for {self.symbol}")
            
        except Exception as e:
            logger.error(f"Error fetching data for {self.symbol}: {e}")
            raise
    
    def calculate_all_indicators(self) -> None:
        """Calculate all technical indicators"""
        try:
            # Basic indicators
            self._calculate_moving_averages()
            self._calculate_rsi()
            self._calculate_macd()
            self._calculate_bollinger_bands()
            self._calculate_stochastic()
            
            # Advanced indicators
            self._calculate_williams_r()
            self._calculate_atr()
            self._calculate_cci()
            
            logger.info("All technical indicators calculated successfully")
            
        except Exception as e:
            logger.error(f"Error calculating indicators: {e}")
            raise
    
    def _calculate_moving_averages(self) -> None:
        """Calculate various moving averages"""
        self.data['SMA_10'] = self.data['Close'].rolling(window=10).mean()
        self.data['SMA_20'] = self.data['Close'].rolling(window=20).mean()
        self.data['SMA_50'] = self.data['Close'].rolling(window=50).mean()
        self.data['SMA_200'] = self.data['Close'].rolling(window=200).mean()
        
        self.data['EMA_12'] = self.data['Close'].ewm(span=12).mean()
        self.data['EMA_26'] = self.data['Close'].ewm(span=26).mean()
        self.data['EMA_50'] = self.data['Close'].ewm(span=50).mean()
    
    def _calculate_rsi(self) -> None:
        """Calculate RSI"""
        self.data['RSI'] = TechnicalIndicators.rsi(
            self.data['Close'], 
            self.config['rsi_window']
        )
    
    def _calculate_macd(self) -> None:
        """Calculate MACD"""
        macd, signal, histogram = TechnicalIndicators.macd(
            self.data['Close'],
            self.config['macd_fast'],
            self.config['macd_slow'],
            self.config['macd_signal']
        )
        self.data['MACD'] = macd
        self.data['MACD_Signal'] = signal
        self.data['MACD_Histogram'] = histogram
    
    def _calculate_bollinger_bands(self) -> None:
        """Calculate Bollinger Bands"""
        upper, middle, lower = TechnicalIndicators.bollinger_bands(
            self.data['Close'],
            self.config['bb_window'],
            self.config['bb_std']
        )
        self.data['BB_Upper'] = upper
        self.data['BB_Middle'] = middle
        self.data['BB_Lower'] = lower
        self.data['BB_Width'] = (upper - lower) / middle * 100
    
    def _calculate_stochastic(self) -> None:
        """Calculate Stochastic Oscillator"""
        k_percent, d_percent = TechnicalIndicators.stochastic(
            self.data['High'],
            self.data['Low'],
            self.data['Close'],
            self.config['stoch_k'],
            self.config['stoch_d']
        )
        self.data['Stoch_K'] = k_percent
        self.data['Stoch_D'] = d_percent
    
    def _calculate_williams_r(self) -> None:
        """Calculate Williams %R"""
        self.data['Williams_R'] = TechnicalIndicators.williams_r(
            self.data['High'],
            self.data['Low'],
            self.data['Close']
        )
    
    def _calculate_atr(self) -> None:
        """Calculate Average True Range"""
        self.data['ATR'] = TechnicalIndicators.atr(
            self.data['High'],
            self.data['Low'],
            self.data['Close']
        )
    
    def _calculate_cci(self) -> None:
        """Calculate Commodity Channel Index"""
        self.data['CCI'] = TechnicalIndicators.cci(
            self.data['High'],
            self.data['Low'],
            self.data['Close']
        )
    
    def generate_advanced_signals(self) -> List[TradingSignal]:
        """Generate advanced trading signals with confidence scoring"""
        self.signals = []
        
        for i in range(50, len(self.data)):  # Start after indicators are stable
            signal_score = 0
            reasons = []
            indicators_dict = {}
            
            current = self.data.iloc[i]
            previous = self.data.iloc[i-1]
            
            # Collect current indicator values
            indicators_dict = {
                'RSI': current['RSI'],
                'MACD': current['MACD'],
                'MACD_Signal': current['MACD_Signal'],
                'BB_Position': (current['Close'] - current['BB_Lower']) / (current['BB_Upper'] - current['BB_Lower']),
                'Stoch_K': current['Stoch_K'],
                'Williams_R': current['Williams_R'],
                'CCI': current['CCI']
            }
            
            # RSI Signals
            if current['RSI'] < self.config['rsi_oversold']:
                signal_score += 2
                reasons.append("RSI Oversold")
            elif current['RSI'] > self.config['rsi_overbought']:
                signal_score -= 2
                reasons.append("RSI Overbought")
            
            # MACD Signals
            if (current['MACD'] > current['MACD_Signal'] and 
                previous['MACD'] <= previous['MACD_Signal']):
                signal_score += 3
                reasons.append("MACD Bullish Crossover")
            elif (current['MACD'] < current['MACD_Signal'] and 
                  previous['MACD'] >= previous['MACD_Signal']):
                signal_score -= 3
                reasons.append("MACD Bearish Crossover")
            
            # Bollinger Bands Signals
            bb_position = indicators_dict['BB_Position']
            if bb_position < 0.1:  # Below lower band
                signal_score += 2
                reasons.append("Below BB Lower Band")
            elif bb_position > 0.9:  # Above upper band
                signal_score -= 2
                reasons.append("Above BB Upper Band")
            
            # Stochastic Signals
            if (current['Stoch_K'] < 20 and current['Stoch_D'] < 20 and
                current['Stoch_K'] > current['Stoch_D'] and
                previous['Stoch_K'] <= previous['Stoch_D']):
                signal_score += 2
                reasons.append("Stochastic Bullish Crossover")
            elif (current['Stoch_K'] > 80 and current['Stoch_D'] > 80 and
                  current['Stoch_K'] < current['Stoch_D'] and
                  previous['Stoch_K'] >= previous['Stoch_D']):
                signal_score -= 2
                reasons.append("Stochastic Bearish Crossover")
            
            # Williams %R Signals
            if current['Williams_R'] < -80:
                signal_score += 1
                reasons.append("Williams %R Oversold")
            elif current['Williams_R'] > -20:
                signal_score -= 1
                reasons.append("Williams %R Overbought")
            
            # CCI Signals
            if current['CCI'] < -100:
                signal_score += 1
                reasons.append("CCI Oversold")
            elif current['CCI'] > 100:
                signal_score -= 1
                reasons.append("CCI Overbought")
            
            # Moving Average Signals
            if (current['Close'] > current['SMA_20'] and 
                previous['Close'] <= previous['SMA_20']):
                signal_score += 1
                reasons.append("Price Above SMA20")
            elif (current['Close'] < current['SMA_20'] and 
                  previous['Close'] >= previous['SMA_20']):
                signal_score -= 1
                reasons.append("Price Below SMA20")
            
            # Golden Cross / Death Cross
            if (current['SMA_50'] > current['SMA_200'] and 
                previous['SMA_50'] <= previous['SMA_200']):
                signal_score += 4
                reasons.append("Golden Cross")
            elif (current['SMA_50'] < current['SMA_200'] and 
                  previous['SMA_50'] >= previous['SMA_200']):
                signal_score -= 4
                reasons.append("Death Cross")
            
            # Determine signal type and strength
            if abs(signal_score) >= self.config['min_signal_strength']:
                signal_type = SignalType.BUY if signal_score > 0 else SignalType.SELL
                
                strength_value = min(abs(signal_score), 6) / 2  # Scale to 1-3
                if strength_value <= 1.5:
                    strength = SignalStrength.WEAK
                elif strength_value <= 2.5:
                    strength = SignalStrength.MODERATE
                else:
                    strength = SignalStrength.STRONG
                
                # Calculate confidence based on indicator agreement
                confidence = min(abs(signal_score) / 8.0, 1.0)  # Max confidence of 100%
                
                trading_signal = TradingSignal(
                    date=current.name,
                    signal_type=signal_type,
                    strength=strength,
                    price=current['Close'],
                    indicators=indicators_dict,
                    reasons=reasons,
                    confidence=confidence
                )
                
                self.signals.append(trading_signal)
                
        
        return self.signals
    
    def calculate_risk_metrics(self, account_balance: float = 100000) -> RiskMetrics:
        """Calculate comprehensive risk metrics"""
        if self.data.empty:
            return None
        
        current_price = self.data['Close'].iloc[-1]
        atr = self.data['ATR'].iloc[-1] if 'ATR' in self.data else current_price * 0.02
        
        # Calculate volatility
        volatility = self.data['Returns'].std() * np.sqrt(252)  # Annualized volatility
        
        # Calculate stop loss and take profit levels
        stop_loss = current_price - (2 * atr)  # 2x ATR stop loss
        take_profit = current_price + (3 * atr)  # 3x ATR take profit (1:1.5 RR)
        
        # Calculate position size
        stop_loss_pct = abs(current_price - stop_loss) / current_price
        position_size = RiskManager.calculate_position_size(
            account_balance, 
            self.config['risk_per_trade'], 
            stop_loss_pct
        )
        
        # Risk-reward ratio
        risk_reward_ratio = abs(take_profit - current_price) / abs(current_price - stop_loss)
        
        # Maximum drawdown
        max_drawdown = RiskManager.calculate_max_drawdown(self.data['Close'])
        
        self.risk_metrics = RiskMetrics(
            stop_loss=stop_loss,
            take_profit=take_profit,
            risk_reward_ratio=risk_reward_ratio,
            position_size=position_size,
            max_drawdown=max_drawdown,
            volatility=volatility
        )
        
        return self.risk_metrics
    
    def get_current_analysis(self) -> Dict:
        """Get comprehensive current analysis"""
        if self.data.empty:
            return {}
        
        latest = self.data.iloc[-1]
        
        # Get latest signal
        latest_signal = None
        if self.signals:
            latest_signal = max(self.signals, key=lambda x: x.date)
        
        analysis = {
            'symbol': self.symbol,
            'current_price': latest['Close'],
            'date': latest.name.strftime('%Y-%m-%d'),
            'technical_indicators': {
                'RSI': latest['RSI'],
                'RSI_Signal': 'Oversold' if latest['RSI'] < 30 else 'Overbought' if latest['RSI'] > 70 else 'Neutral',
                'MACD': latest['MACD'],
                'MACD_Signal': latest['MACD_Signal'],
                'MACD_Trend': 'Bullish' if latest['MACD'] > latest['MACD_Signal'] else 'Bearish',
                'BB_Position': (latest['Close'] - latest['BB_Lower']) / (latest['BB_Upper'] - latest['BB_Lower']),
                'Stoch_K': latest['Stoch_K'],
                'Stoch_D': latest['Stoch_D'],
                'Williams_R': latest['Williams_R'],
                'CCI': latest['CCI'],
                'ATR': latest['ATR'],
                'Volatility': latest['ATR'] / latest['Close'] * 100  # ATR as % of price
            },
            'trend_analysis': {
                'short_term': 'Bullish' if latest['Close'] > latest['SMA_20'] else 'Bearish',
                'medium_term': 'Bullish' if latest['SMA_20'] > latest['SMA_50'] else 'Bearish',
                'long_term': 'Bullish' if latest['SMA_50'] > latest['SMA_200'] else 'Bearish'
            },
            'support_resistance': {
                'support': self.data['Low'].rolling(20).min().iloc[-1],
                'resistance': self.data['High'].rolling(20).max().iloc[-1],
                'bb_upper': latest['BB_Upper'],
                'bb_lower': latest['BB_Lower']
            }
        }
        
        if latest_signal:
            analysis['latest_signal'] = {
                'type': latest_signal.signal_type.name,
                'strength': latest_signal.strength.name,
                'confidence': f"{latest_signal.confidence:.1%}",
                'reasons': latest_signal.reasons
            }
        
        if self.risk_metrics:
            analysis['risk_management'] = {
                'stop_loss': self.risk_metrics.stop_loss,
                'take_profit': self.risk_metrics.take_profit,
                'risk_reward_ratio': f"1:{self.risk_metrics.risk_reward_ratio:.1f}",
                'position_size': self.risk_metrics.position_size,
                'volatility': f"{self.risk_metrics.volatility:.1%}",
                'max_drawdown': f"{self.risk_metrics.max_drawdown:.1%}"
            }
        
        return analysis
  
    def get_full_chart_data(self) -> str:
        """
        Prepares the historical data with indicators for charting on the front-end.
        Returns data as a JSON string in 'records' format.
        """
        if self.data.empty:
            return "[]"
        
        # Select relevant columns for the GUI chart
        chart_cols = [
            'Open', 'High', 'Low', 'Close', 'Volume', 'SMA_20', 'SMA_50',
            'BB_Upper', 'BB_Lower', 'RSI', 'MACD', 'MACD_Signal', 'MACD_Histogram'
        ]
        
        # Ensure all columns exist, fill with None if not
        df_chart = self.data.copy()
        for col in chart_cols:
            if col not in df_chart.columns:
                df_chart[col] = np.nan
        
        # Reset index to make the date a column
        df_chart.reset_index(inplace=True)
        # Rename 'Date' column if it exists to avoid conflicts
        if 'Date' in df_chart.columns and 'index' in df_chart.columns:
             df_chart.rename(columns={'Date':'Timestamp'}, inplace=True)
        elif 'index' in df_chart.columns:
             df_chart.rename(columns={'index':'Date'}, inplace=True)
        
        # Convert NaN to None for JSON compatibility
        df_chart = df_chart.replace({np.nan: None})

        # Return JSON string
        return df_chart[chart_cols + ['Date']].to_json(orient='records', date_format='iso')

    def get_json_output(self) -> Dict:
        """
        Creates a comprehensive dictionary suitable for JSON serialization.
        This will be the main payload for our API response.
        """
        analysis = self.get_current_analysis()
        
        
        # Serialize enums and dataclasses to be JSON-friendly
        if 'latest_signal' in analysis and analysis['latest_signal'] is not None:
             analysis['latest_signal']['type'] = SignalType[analysis['latest_signal']['type']].name
             analysis['latest_signal']['strength'] = SignalStrength[analysis['latest_signal']['strength']].name

        # Add signal history, properly formatted
        analysis['signal_history'] = []
        for signal in self.signals:
            analysis['signal_history'].append({
                'date': signal.date.isoformat(),
                'type': signal.signal_type.name,
                'strength': signal.strength.name,
                'price': signal.price,
                'confidence': signal.confidence,
                'reasons': signal.reasons
            })
            
        # Add risk metrics if they exist
        if self.risk_metrics:
            analysis['risk_management'] = asdict(self.risk_metrics)
        
        # Add data summary
        analysis['data_summary'] = {
            'total_records': len(self.data),
            'date_range': {
                'start': self.data.index[0].isoformat(),
                'end': self.data.index[-1].isoformat()
            },
            'price_range': {
                'high': float(self.data['High'].max()),
                'low': float(self.data['Low'].min()),
                'current': float(self.data['Close'].iloc[-1])
            }
        }
        
        return analysis
