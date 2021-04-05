import jwt from "jsonwebtoken";
export const generateToken = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_SECRET || "something...",
		{
			expiresIn: "30d",
		}
	);
};

export const isAuth = (req, res, next) => {
	const authorization = req.headers.authorization;
	if (authorization) {
		const token = authorization.slice(7, authorization.lenght);
		jwt.verify(token, process.env.JWT_SECRET || "seceret", (err, decode) => {
			if (err) {
				res.status(401).send({ message: "Invalid Token" });
			} else {
				req.user = decode;
			}
		});
	} else {
		res.status(401).send({ message: "No Token" });
	}
};
