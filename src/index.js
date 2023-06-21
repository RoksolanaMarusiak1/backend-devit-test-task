import "dotenv/config";
import express from "express";
import cron from "node-cron";
import cors from "cors";
import cookieParser from "cookie-parser";
import parseRSSFeed from "./helpers/parser.js";
import postRouter from "./routes/posts.router.js";
import userRouter from "./routes/users.router.js";

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000', 
  credentials:true,        
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log("server is running on port", server.address().port);
});

cron.schedule("* * * * *", () => {
  parseRSSFeed();
});

app.use("/posts", postRouter);
app.use("/users", userRouter);
