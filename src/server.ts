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
    console.log("Token configuration loaded.");
}

// Store tokens globally
let tokens: any;
let prices: any;
let currencies: any;
let volume: any;
let Chart1Day: any;
let Chart1Month: any;
let Chart1Year: any;

// Initialize the token configuration on server start
fetchTokenConfig().then(() => {
    // Start the price refresh interval
    refreshData()
    setInterval(refreshData, 60*1000); // 60000 milliseconds == 60 seconds
    setInterval(fetchTokenConfig, 10*60*1000)
}).catch(error => {
    console.error("Failed to load token configuration:", error);
});

const refreshData = async () => {
    try {
        prices = await(await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokens}&vs_currencies=USD`)).json();
        currencies = await(await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=eur,jpy,gbp,aud,cad,chf`)).json();
        volume = await(await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=secret&vs_currencies=usd,eur,jpy,gbp,aud,cad,chf&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`)).json();
       // Chart1Day = await(await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=eur,jpy,gbp,aud,cad,chf`)).json();
        //Chart1Month = await(await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=eur,jpy,gbp,aud,cad,chf`)).json();
        //Chart1Year = await(await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=eur,jpy,gbp,aud,cad,chf`)).json();
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

app.get("/getVolume", (req, res) => {
    if (!volume) {
        return res.status(503).send("Volume data not initialized.");
    }

    res.json(volume);
});


