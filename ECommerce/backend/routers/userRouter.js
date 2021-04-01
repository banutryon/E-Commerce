import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
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

userRouter.post(
	"/signin",
	expressAsyncHandler(async (req, res) => {
		try {
			const user = await User.findOne({ email: req.body.email });
			if (user) {
				if (bcrypt.compairSync(req.body.password, user.password)) {
					res.send({
						_id: user._id,
						name: user.name,
						email: user.email,
						isAdmin: user.isAdmin,
						token: generateToken(user),
					});
					return;
				}
			}
			res.status(401).send({ message: "Invalid email user or password" });
		} catch (error) {
			res.send("you have an error");
			console.log(error);
		}
	})
);
export default userRouter;
