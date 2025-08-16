from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import Dict, List

class SignalType(Enum):
    """Enumeration for different signal types"""
    BUY = 1
    SELL = -1
    HOLD = 0

class SignalStrength(Enum):
    """Enumeration for signal strength levels"""
    WEAK = 1
    MODERATE = 2
    STRONG = 3

@dataclass
class TradingSignal:
    """Data class for trading signals"""
    date: datetime
    signal_type: SignalType
    strength: SignalStrength
    price: float
    indicators: Dict[str, float]
    reasons: List[str]
    confidence: float