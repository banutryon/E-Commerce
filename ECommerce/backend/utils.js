import jwt from "jsonwebtoken";
export const generateToken = (user) => {
	return JWT_SECERT.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_SECERT,
		{
			expiresIn: "30d",
		}
	);
};
