import express from "express";
import expressAsyncHandler from "express-async-handler";
import Data from "../Data.js";
import User from "../models/userModel.js";
const userRouter = express.Router();
userRouter.get(
	"/seed",
	expressAsyncHandler(async (req, res) => {
		try {
			const createdUsers = await User.insertMany(Data.users);
			res.send({ createdUsers });
		} catch (error) {
			res.send("you have an error");
			console.log(error);
		}
	})
);
export default userRouter;
