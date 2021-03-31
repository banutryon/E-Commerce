import express from "express";
import mongoose from "mongoose";
import Data from "./Data.js";
import userRouter from "./routers/userRouter.js";

const app = express();
mongoose.connect("mongodb://localhost/ecommerce", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
app.use("/api/users", userRouter);
app.get("/api/products/:id", (req, res) => {
	const product = Data.products.find((x) => x._id === req.params.id);
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ message: "Product not found" });
	}
});

app.get("/api/products", (req, res) => {
	res.send(Data.products);
});

app.get("/", (req, res) => {
	res.send("Server is ready");
});
app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Serve at http://localhost:${port}`);
});
