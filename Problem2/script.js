// Exchange rate data
const exchangeRates = [
    { currency: "BLUR", price: 0.20811525423728813 },
    { currency: "bNEO", price: 7.1282679 },
    { currency: "BUSD", price: 0.9998782611186441 },
    { currency: "USD", price: 1 },
    { currency: "ETH", price: 1645.9337373737374 },
    { currency: "GMX", price: 36.345114372881355 },
    { currency: "STEVMOS", price: 0.07276706779661017 },
    { currency: "LUNA", price: 0.40955638983050846 },
    { currency: "RATOM", price: 10.250918915254237 },
    { currency: "STRD", price: 0.7386553389830508 },
    { currency: "EVMOS", price: 0.06246181355932203 },
    { currency: "IBCX", price: 41.26811355932203 },
    { currency: "IRIS", price: 0.0177095593220339 },
    { currency: "ampLUNA", price: 0.49548589830508477 },
    { currency: "KUJI", price: 0.675 },
    { currency: "STOSMO", price: 0.431318 },
    { currency: "USDC", price: 1 },
    { currency: "ATOM", price: 7.186657333333334 },
    { currency: "STATOM", price: 8.512162050847458 },
    { currency: "OSMO", price: 0.3772974333333333 },
    { currency: "rSWTH", price: 0.00408771 },
    { currency: "STLUNA", price: 0.44232210169491526 },
    { currency: "LSI", price: 67.69661525423729 },
    { currency: "OKB", price: 42.97562059322034 },
    { currency: "OKT", price: 13.561577966101694 },
    { currency: "SWTH", price: 0.004039850455012084 },
    { currency: "USC", price: 0.994 },
    { currency: "WBTC", price: 26002.82202020202 },
    { currency: "wstETH", price: 1872.2579742372882 },
    { currency: "YieldUSD", price: 1.0290847966101695 },
    { currency: "ZIL", price: 0.01651813559322034 },
];

// DOM elements
const fromTokenSelect = document.getElementById("from-token");
const toTokenSelect = document.getElementById("to-token");
const inputAmount = document.getElementById("input-amount");
const outputAmount = document.getElementById("output-amount");
const exchangeRateElement = document.getElementById("exchange-rate");
const errorMessage = document.getElementById("error-message");
const confirmSwapButton = document.getElementById("confirm-swap");

let exchangeRate = null;

// Populate token selectors
function populateTokenSelectors() {
    const uniqueTokens = [...new Set(exchangeRates.map((rate) => rate.currency))];
    uniqueTokens.forEach((token) => {
        const option1 = new Option(token, token);
        const option2 = new Option(token, token);
        fromTokenSelect.add(option1);
        toTokenSelect.add(option2);
    });
}

// Calculate exchange rate
function calculateExchangeRate() {
    const fromToken = fromTokenSelect.value;
    const toToken = toTokenSelect.value;

    const fromPrice = exchangeRates.find((rate) => rate.currency === fromToken)?.price;
    const toPrice = exchangeRates.find((rate) => rate.currency === toToken)?.price;

    if (fromPrice && toPrice) {
        exchangeRate = fromPrice / toPrice;
        exchangeRateElement.textContent = `Rate: 1 ${fromToken} = ${exchangeRate.toFixed(4)} ${toToken}`;
    } else {
        exchangeRate = null;
        exchangeRateElement.textContent = "Rate: --";
    }
}

// Calculate output amount
function calculateOutputAmount() {
    const amount = parseFloat(inputAmount.value);

    if (amount > 0 && exchangeRate) {
        const result = amount * exchangeRate;
        outputAmount.value = result.toFixed(4);
    } else {
        outputAmount.value = "";
    }
}

// Handle swap
function handleSwap() {
    const fromToken = fromTokenSelect.value;
    const toToken = toTokenSelect.value;
    const amount = parseFloat(inputAmount.value);

    if (!fromToken || !toToken) {
        errorMessage.textContent = "Please select both tokens.";
        return;
    }

    if (!amount || amount <= 0) {
        errorMessage.textContent = "Enter a valid amount.";
        return;
    }

    if (exchangeRate === null) {
        errorMessage.textContent = "Unable to calculate exchange rate.";
        return;
    }

    errorMessage.textContent = "";
    alert(`Swapped ${amount} ${fromToken} to ${(amount * exchangeRate).toFixed(4)} ${toToken}`);
}

// Event listeners
fromTokenSelect.addEventListener("change", () => {
    calculateExchangeRate();
    calculateOutputAmount();
});
toTokenSelect.addEventListener("change", () => {
    calculateExchangeRate();
    calculateOutputAmount();
});
inputAmount.addEventListener("input", calculateOutputAmount);
confirmSwapButton.addEventListener("click", handleSwap);

// Initialize
populateTokenSelectors();
