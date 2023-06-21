import { validateAccessToken } from "../helpers/token.js ";

export default async function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(res.status(401).send("Unauthorized user"));
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(res.status(401).send("Unauthorized user"));
    }
    const userData = await validateAccessToken(accessToken);
    if (!userData) {
      return next(res.status(401).send("Unauthorized user"));
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(res.status(401).send("Unauthorized user"));
  }
}
