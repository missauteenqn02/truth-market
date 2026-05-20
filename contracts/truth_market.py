# { "Depends": "py-genlayer:test" }

import json
from dataclasses import dataclass
from genlayer import *


@allow_storage
@dataclass
class Market:
    id: str
    creator: str
    title: str
    description: str
    resolve_criteria: str
    resolve_url: str
    category: str
    end_date: str
    status: str
    yes_shares: u256
    no_shares: u256
    total_volume: u256
    resolved_outcome: str
    ai_reasoning: str
    ai_confidence: str


class TruthMarketContract(gl.Contract):
    markets: TreeMap[str, Market]
    market_count: u256

    def __init__(self):
        self.market_count = 0

    def _ai_resolve(self, title: str, resolve_criteria: str, resolve_url: str) -> str:
        def resolution_engine() -> str:
            web_data = gl.get_webpage(resolve_url, mode="text")
            task = f"""You are a prediction market resolution AI.

MARKET: {title}
RESOLUTION CRITERIA: {resolve_criteria}

WEB DATA from {resolve_url}:
{web_data[:2000]}

Based ONLY on the web data above, respond in JSON:
{{
    "decision": "YES",
    "confidence": 0.9,
    "reasoning": "short explanation"
}}
Decision must be exactly YES, NO, or INCONCLUSIVE.
Respond ONLY with the JSON, no other text."""
            result = gl.exec_prompt(task).replace("```json", "").replace("```", "")
            return json.dumps(json.loads(result), sort_keys=True)

        result_json = gl.eq_principle.strict_eq(resolution_engine)
        return result_json

    @gl.public.write
    def create_market(
        self,
        market_id: str,
        title: str,
        description: str,
        resolve_criteria: str,
        resolve_url: str,
        category: str,
        end_date: str,
    ) -> None:
        if market_id in self.markets:
            raise Exception("Market already exists")
        market = Market(
            id=market_id,
            creator=gl.message.sender_address.as_hex,
            title=title,
            description=description,
            resolve_criteria=resolve_criteria,
            resolve_url=resolve_url,
            category=category,
            end_date=end_date,
            status="ACTIVE",
            yes_shares=0,
            no_shares=0,
            total_volume=0,
            resolved_outcome="",
            ai_reasoning="",
            ai_confidence="",
        )
        self.markets[market_id] = market
        self.market_count += 1

    @gl.public.write
    def resolve_market(self, market_id: str) -> None:
        if market_id not in self.markets:
            raise Exception("Market not found")
        market = self.markets[market_id]
        if market.status != "ACTIVE":
            raise Exception("Market already resolved")

        result_str = self._ai_resolve(
            market.title,
            market.resolve_criteria,
            market.resolve_url,
        )
        result = json.loads(result_str)

        market.resolved_outcome = result.get("decision", "INCONCLUSIVE")
        market.ai_confidence = str(result.get("confidence", 0.0))
        market.ai_reasoning = result.get("reasoning", "")
        market.status = "RESOLVED"
        self.markets[market_id] = market

    @gl.public.view
    def get_market(self, market_id: str) -> dict:
        if market_id not in self.markets:
            raise Exception("Market not found")
        m = self.markets[market_id]
        return {
            "id": m.id,
            "title": m.title,
            "status": m.status,
            "resolved_outcome": m.resolved_outcome,
            "ai_confidence": m.ai_confidence,
            "ai_reasoning": m.ai_reasoning,
            "resolve_url": m.resolve_url,
            "category": m.category,
            "end_date": m.end_date,
        }

    @gl.public.view
    def get_market_count(self) -> int:
        return int(self.market_count)
