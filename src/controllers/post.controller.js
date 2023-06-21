import db from "../db/db.js";

class PostController {
  async getPosts(req, res) {
    const { page, limit, sortBy, sortOrder, searchField, search } = req.query;
    const offset = (page - 1) * limit;
    let posts = [];
    let query = `SELECT * FROM posts`;
    if (search && searchField) {
      query += ` WHERE ${searchField} ILIKE '%${search}%'`;
    }

    if (sortBy && sortOrder) {
      query += ` ORDER BY ${sortBy} ${sortOrder === "desc" ? "DESC" : "ASC"}`;
    }

    query += ` LIMIT ${limit} OFFSET ${offset}`;
    try {
      posts = await db.query(query);
    } catch (error) {
      console.log("get posts error" + error);
      res.sendStatus(500);
    }
    res.send(posts.rows);
  }

  async getPostById(req, res) {
    const postId = req.params.id;
    let post = {};
    try {
      post = await db.query("SELECT * FROM posts WHERE id = $1", [postId]);
    } catch (error) {
      console.log("get post by id error " + error);
      res.sendStatus(500);
    }
    res.send(post.rows[0]);
  }

  async createPost(req, res) {
    const newPost = req.body.post;
    try {
      await db.query(
        "INSERT INTO posts (id, creator, title, link, pub_date, content, content_snippet, categories) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
        [
          newPost.id,
          newPost.creator,
          newPost.title,
          newPost.link,
          newPost.pub_date,
          newPost.content,
          newPost.content_snippet,
          newPost.categories,
        ],
        (error, results) => {
          console.log("Post inserted:", newPost.title);
        }
      );
      res.sendStatus(200);
    } catch (error) {
      console.log("create post error" + error);
      res.sendStatus(500);
    }
  }

  async deletePost(req, res) {
    const postId = req.params.id;
    try {
      await db.query("DELETE FROM posts WHERE id = $1", [postId]);
      res.sendStatus(200);
    } catch (error) {
      console.log("delete post error " + error);
      res.sendStatus(500);
    }
  }

  async updatePost(req, res) {
    const updatedPost = req.body.post;
    const postId = req.params.id;
    try {
      await db.query(
        "UPDATE posts SET creator=$1, title=$2, link=$3, pub_date=$4, content=$5, content_snippet=$6, categories=$7 WHERE id=$8",
        [
          updatedPost.creator,
          updatedPost.title,
          updatedPost.link,
          updatedPost.pub_date,
          updatedPost.content,
          updatedPost.content_snippet,
          updatedPost.categories,
          postId,
        ]
      );

      res.sendStatus(200);
    } catch (error) {
      console.log("update post error " + error);
      res.sendStatus(500);
    }
  }
}

export default new PostController();
