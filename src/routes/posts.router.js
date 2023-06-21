import express from "express";
import postController from "../controllers/post.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const postRouter = express.Router();

postRouter.get("/", authMiddleware, postController.getPosts);
postRouter.get("/:id", authMiddleware, postController.getPostById);
postRouter.post("/", authMiddleware, postController.createPost);
postRouter.delete("/:id", authMiddleware, postController.deletePost);
postRouter.put("/:id", authMiddleware, postController.updatePost);

export default postRouter;
