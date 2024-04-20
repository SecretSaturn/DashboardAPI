import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.get("/getPrices", async (req, res) => {
  try {
  

    console.log(result)
    return res.json(result);

  } catch (error: any) {
    console.error("Error querying data:", error);
    return res.status(500).send(error.message);
  }
});

