import { readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "app.js",
  "styles.css",
  ".well-known/agent.json",
  ".well-known/x402.json",
  "agents.txt",
  "llms.txt",
];

const wallet = "0xb31DdEAcB7970688A9a958D3A3Cefc664CF2b72A";
const affiliateId = "yunrongy424-codex-agent";

for (const file of requiredFiles) {
  const content = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
  if (!content.trim()) {
    throw new Error(`${file} is empty`);
  }
}

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
if (!app.includes("@pyrimid/sdk@0.2.6/resolver")) {
  throw new Error("app.js does not import the Pyrimid resolver");
}
if (!app.includes(affiliateId) || !app.includes(wallet)) {
  throw new Error("app.js is missing affiliate or wallet metadata");
}

const agent = JSON.parse(
  await readFile(new URL("../.well-known/agent.json", import.meta.url), "utf8"),
);
const x402 = JSON.parse(
  await readFile(new URL("../.well-known/x402.json", import.meta.url), "utf8"),
);

if (agent.pyrimid.affiliate_id !== affiliateId) {
  throw new Error("agent metadata affiliate id mismatch");
}
if (x402.affiliate.payout_wallet !== wallet) {
  throw new Error("x402 metadata wallet mismatch");
}

console.log(
  JSON.stringify(
    {
      ok: true,
      sdk: "@pyrimid/sdk@0.2.6",
      affiliate_id: affiliateId,
      payout_wallet: wallet,
      checked_files: requiredFiles.length,
    },
    null,
    2,
  ),
);
