import express from "express";
import Data from "./Data.js";
const app = express();
app.get("/api/products", (req, res) => {
	res.send(Data.products);
});
app.get("/", (req, res) => {
	res.send("Server is ready");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Serve at http://localhost:${port}`);
});
