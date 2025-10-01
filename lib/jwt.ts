// import jwt from "jsonwebtoken";

// const ACCESS_SECRET = process.env.ACCESS_SECRET!;
// const REFRESH_SECRET = process.env.REFRESH_SECRET!;

// export function generateTokens(payload: object, isRemember: boolean) {
//   const accessToken = jwt.sign(payload, ACCESS_SECRET, {
//     expiresIn: "15m",
//   });

//   const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
//     expiresIn: isRemember ? "30d" : "1d",
//   });

//   return { accessToken, refreshToken };
// } 

// export function verifyAccessToken(token: string) {
//   return jwt.verify(token, ACCESS_SECRET);
// }

// export function verifyRefreshToken(token: string) {
//   return jwt.verify(token, REFRESH_SECRET);
// }

import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export function generateTokens(payload: object, isRemember: boolean) {
  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: isRemember ? "30d" : "1d",
  });
  return { accessToken, refreshToken };
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET);
}
