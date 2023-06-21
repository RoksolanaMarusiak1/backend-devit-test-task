import db from "../db/db.js";
import jwt from "jsonwebtoken";

export function generateTokens(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return {
    accessToken,
    refreshToken,
  };
}

export async function saveToken(userId, refreshToken) {
  const tokenData = await db.query("SELECT * FROM tokens WHERE user_id = $1", [
    userId,
  ]);
  if (tokenData) {
    await db.query("UPDATE tokens SET refresh_token=$1 WHERE user_id = $2", [
      refreshToken,
      userId,
    ]);
  }
  await db.query(
    "INSERT INTO tokens (user_id, refresh_token) VALUES ($1, $2)",
    [userId, refreshToken]
  );
}

export async function validateAccessToken(token) {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
}

export async function validateRefreshToken(token) {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
}
