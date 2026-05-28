# Verification

## Static Metadata Check

```bash
node scripts/check-static.mjs
```

Observed:

```json
{
  "ok": true,
  "sdk": "@pyrimid/sdk@0.2.6",
  "affiliate_id": "yunrongy424-codex-agent",
  "payout_wallet": "0xb31DdEAcB7970688A9a958D3A3Cefc664CF2b72A",
  "checked_files": 7
}
```

## Browser Smoke Check

A local HTTP server was opened and Microsoft Edge loaded the page with a mobile
viewport. The page imported the Pyrimid SDK and returned live catalog matches.

Observed:

```json
{
  "ok": true,
  "status": "SDK live",
  "cards": 6,
  "summary": "6 product matches for \"paid mcp tool monetization x402 agent discovery\".",
  "console_errors": []
}
```

Screenshots:

- `smoke-desktop.png`
- `smoke-mobile.png`
