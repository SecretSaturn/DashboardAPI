import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Define a function to fetch token configuration
async function fetchTokenConfig() {
    const url = "https://raw.githubusercontent.com/scrtlabs/dash.scrt.network/master/public/PriceIdsString.txt";
    const response = await fetch(url);
    tokens = await response.text();
}

// Store tokens globally
let tokens: any;
let prices: any;
let currencies: any;

// Initialize the token configuration on server start
fetchTokenConfig().then(() => {
    console.log("Token configuration loaded.");
    // Start the price refresh interval
    refreshData()
    setInterval(refreshData, 60*1000); // 60000 milliseconds == 60 seconds
    setInterval(fetchTokenConfig, 10*60*1000)
}).catch(error => {
    console.error("Failed to load token configuration:", error);
});

const refreshData = async () => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokens}&vs_currencies=USD`);
        prices = await response.json();
        const response2 = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=eur,jpy,gbp,aud,cad,chf`);
        currencies = await response2.json();
        console.log("Data refreshed.");
    } catch (error) {
        console.error("Error fetching aata:", error);
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

app.get("/getCurrencies", (req, res) => {
    if (!currencies) {
        return res.status(503).send("Currency data not initialized.");
    }
    res.json(currencies);
});


