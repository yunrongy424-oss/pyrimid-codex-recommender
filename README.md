# Codex Pyrimid Buyer-Agent Recommender

This repository is a live integration proof for the MYA/Pyrimid integration
bounty.

The page imports `PyrimidResolver` from `@pyrimid/sdk@0.2.6`, queries the live
Pyrimid catalog, and recommends x402 products for a buyer-agent need.

## Live URLs

- App: https://yunrongy424-oss.github.io/pyrimid-codex-recommender/
- Agent metadata: https://yunrongy424-oss.github.io/pyrimid-codex-recommender/.well-known/agent.json
- x402 metadata: https://yunrongy424-oss.github.io/pyrimid-codex-recommender/.well-known/x402.json
- agents.txt: https://yunrongy424-oss.github.io/pyrimid-codex-recommender/agents.txt
- llms.txt: https://yunrongy424-oss.github.io/pyrimid-codex-recommender/llms.txt

## Integration Details

- SDK: `@pyrimid/sdk@0.2.6`
- Catalog: `https://pyrimid.ai/api/v1/catalog`
- Affiliate ID: `yunrongy424-codex-agent`
- Purchase header: `X-Affiliate-ID: yunrongy424-codex-agent`
- Payout wallet: `0xb31DdEAcB7970688A9a958D3A3Cefc664CF2b72A`
- Network/asset: Base USDC

## Safety

This integration is recommendation and discovery only. It does not ask for
private keys, seed phrases, wallet credentials, or payment credentials. It does
not sign transactions or send payments.

Buyer agents keep custody and decide whether to purchase any recommended product
in their own wallet runtime.

## Local Check

```bash
node scripts/check-static.mjs
```

The repository also includes `smoke-desktop.png` and `smoke-mobile.png`, captured
from real browser checks after the SDK returned live recommendations.
