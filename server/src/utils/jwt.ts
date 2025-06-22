import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("Missing JWT_SECRET in .env");
}

export const generateToken = (payload: object) => {
  return jwt.sign(payload, secret, { expiresIn: '1d' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};
