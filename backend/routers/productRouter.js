import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";
const productRouter = express.Router();

productRouter.get(
	"/",
	expressAsyncHandler(async (req, res) => {
		try {
			const products = await Product.find({});
			res.send(products);
		} catch (error) {
			res.send("you have an error on route '/' ");
			console.log(error);
		}
	})
);

// productRouter.get(
// 	"/seed",
// 	expressAsyncHandler(async (req, res) => {
// 		try {
// 			await Product.remove({});
// 			const createdProducts = await Product.insertMany(Data.products);
// 			res.send({ createdProducts });
// 		} catch (error) {
// 			res.send("you have an error on route '/seed'");
// 			console.log(error);
// 		}
// 	})
// );

productRouter.get(
	"/:id",
	expressAsyncHandler(async (req, res) => {
		try {
			const product = await Product.findById(req.params.id);
			if (product) {
				res.send(product);
			} else {
				res.status(404).send({ message: "Product Not Found" });
			}
		} catch (error) {
			res.send("you have an error on route '/:id' ");
			console.log(error);
		}
	})
);

productRouter.post(
	"/",
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const product = new Product({
			name: "sample name" + Date.now(),
			image: "/images/addImage.png",
			price: 0,
			category: "sample category",
			brand: "sample brand",
			countInStock: 0,
			rating: 0,
			numReviews: 0,
			description: "sample description",
		});
		const createdProduct = await product.save();
		res.send({ message: "Product Created", product: createdProduct });
	})
);

productRouter.put(
	"/:id",
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const productId = req.params.id;
		const product = await Product.findById(productId);
		if (product) {
			product.name = req.body.name;
			product.price = req.body.price;
			product.image = req.body.image;
			product.category = req.body.category;
			product.brand = req.body.brand;
			product.countInStock = req.body.countInStock;
			product.description = req.body.description;
			const updatedProduct = await product.save();
			res.send({ message: "Product Updated", product: updatedProduct });
		} else {
			res.status(404).send({ message: "Product Not Found" });
		}
	})
);

productRouter.delete(
	"/:id",
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id);
		if (product) {
			const deleteProduct = await product.remove();
			res.send({ message: "Product Deleted", product: deletProduct });
		} else {
			res.status(404).send({ message: "Product Not Found" });
		}
	})
);
export default productRouter;
