import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Define a function to fetch token configuration
async function fetchTokenConfig() {
    const url = "https://raw.githubusercontent.com/scrtlabs/dash.scrt.network/master/public/PriceIdsString.txt";
    const response = await fetch(url);
    const text = await response.text();
    return text
}

// Store tokens globally
let tokens: any;
let prices: any;

// Initialize the token configuration on server start
fetchTokenConfig().then(config => {
    console.log(config)
    tokens = config;
    console.log("Token configuration loaded.");
    console.log(tokens)
    // Start the price refresh interval
    refreshPrices()
    setInterval(refreshPrices, 30000); // 30000 milliseconds == 30 seconds
}).catch(error => {
    console.error("Failed to load token configuration:", error);
});

const refreshPrices = async () => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokens}&vs_currencies=USD`);
        prices = await response.json();
        console.log(prices)
        console.log("Prices refreshed.");
    } catch (error) {
        console.error("Error fetching prices:", error);
    }
};

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.get("/getPrices", (req, res) => {
    if (!prices) {
        return res.status(503).send("Price data not initialized.");
    }

    res.json(prices);
});

