const AFFILIATE_ID = "yunrongy424-codex-agent";
const PAYOUT_WALLET = "0xb31DdEAcB7970688A9a958D3A3Cefc664CF2b72A";
const CATALOG_URL = "https://pyrimid.ai/api/v1/catalog";

const form = document.querySelector("#query-form");
const input = document.querySelector("#need");
const badge = document.querySelector("#status-badge");
const grid = document.querySelector("#product-grid");
const summary = document.querySelector("#result-summary");
const wallet = document.querySelector("#wallet");
const affiliate = document.querySelector("#affiliate-id");

wallet.textContent = PAYOUT_WALLET;
affiliate.textContent = AFFILIATE_ID;

function setStatus(text, type = "ok") {
  badge.textContent = text;
  badge.classList.toggle("error", type === "error");
}

function formatMicrousdc(value) {
  if (typeof value !== "number") {
    return "unknown";
  }
  return `$${(value / 1_000_000).toFixed(2)}`;
}

function renderProducts(products, need) {
  grid.innerHTML = "";
  summary.textContent = `${products.length} product matches for "${need}".`;

  if (products.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No matching catalog products were returned for this query.";
    grid.append(empty);
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const title = document.createElement("h3");
    title.textContent = product.product_id || product.vendor_name || "Catalog product";

    const description = document.createElement("p");
    description.textContent = product.description || "No description returned.";

    const meta = document.createElement("div");
    meta.className = "product-meta";

    [
      product.category,
      product.network,
      product.asset,
      product.price_display || formatMicrousdc(product.price_usdc),
      `${Math.round((product.affiliate_bps || 0) / 100)}% affiliate`,
    ]
      .filter(Boolean)
      .forEach((value) => {
        const pill = document.createElement("span");
        pill.className = "pill";
        pill.textContent = value;
        meta.append(pill);
      });

    const endpoint = document.createElement("div");
    endpoint.className = "endpoint";
    endpoint.textContent = product.endpoint || "No endpoint returned.";

    const header = document.createElement("p");
    header.textContent = `Purchase header: X-Affiliate-ID: ${AFFILIATE_ID}`;

    card.append(title, description, meta, endpoint, header);
    grid.append(card);
  });
}

async function runLookup(need) {
  setStatus("Loading catalog");
  summary.textContent = "Requesting Pyrimid catalog through the SDK resolver.";

  try {
    const { PyrimidResolver } = await import(
      "https://esm.sh/@pyrimid/sdk@0.2.6/resolver?bundle"
    );
    const resolver = new PyrimidResolver({
      affiliateId: AFFILIATE_ID,
      catalogUrl: CATALOG_URL,
      maxPriceUsdc: 500_000,
      preferVerifiedVendors: true,
    });

    const products = await resolver.findProducts(need, 6);
    renderProducts(products, need);
    setStatus("SDK live");
  } catch (error) {
    console.error(error);
    setStatus("SDK lookup failed", "error");
    summary.textContent =
      "The live SDK lookup failed in this browser session. Check the console for details.";
    grid.innerHTML = "";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  runLookup(input.value.trim() || input.defaultValue);
});

runLookup(input.value);
