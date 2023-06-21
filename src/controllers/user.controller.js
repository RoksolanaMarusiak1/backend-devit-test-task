import db from "../db/db.js";
import bcrypt from "bcrypt";
import {
  generateTokens,
  saveToken,
  validateRefreshToken,
} from "../helpers/token.js";

class UserController {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!user.rows[0]) {
      return res.status(500).send(`User not found`);
    }
    const isPassEquals = await bcrypt.compare(password, user.rows[0].password);
    if (!isPassEquals) {
      return res.status(500).send(`Password mismatch`);
    }
    const tokens = generateTokens({ email, id: user.rows[0].id });
    await saveToken(user.rows[0].id, tokens.refreshToken);
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 30 * 20 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.send({ ...tokens, user: user.rows[0] });
  }

  async registration(req, res) {
    const { email, password } = req.body;
    let candidate = {};
    try {
      candidate = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
    } catch (error) {
      console.log("registration error" + error);
    }
    if (candidate.rows[0]) {
      return res.status(500).send(`User already registered`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    let user = {},
      tokens = {};
    try {
      user = await db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, hashPassword]
      );
      tokens = generateTokens({ email, id: user.rows[0].id });
      await saveToken(user.rows[0].id, tokens.refreshToken);
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 20 * 60 * 60 * 1000,
        httpOnly: true,
      });
    } catch (error) {
      console.log("login error" + error);
    }
    res.send({ ...tokens, user: user.rows[0] });
  }

  async refresh(req, res) {
    const { refreshToken } = req.cookies;
    let tokenDB = {};
    if (!refreshToken) {
      return res.status(401).send("User is not authorized");
    }
    const userData = await validateRefreshToken(refreshToken);
    try {
      tokenDB = await db.query(
        "SELECT * FROM tokens WHERE refresh_token = $1 ",
        [refreshToken]
      );
    } catch (error) {
      console.log("refresh error " + error);
    }
    if (!userData || !tokenDB.rows[0]) {
      return res.status(401).send("User is not authorized");
    }
    const user = await db.query("SELECT * FROM users WHERE id = $1", [
      userData.id,
    ]);
    const tokens = generateTokens({
      email: userData.email,
      id: user.rows[0].id,
    });
    await saveToken(user.rows[0].id, tokens.refreshToken);
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 30 * 20 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.send({ ...tokens });
  }
}

export default new UserController();
