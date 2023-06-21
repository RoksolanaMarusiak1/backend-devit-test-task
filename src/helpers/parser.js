import RSSParser from "rss-parser";
import db from "../db/db.js";

const feedUrl = "https://lifehacker.com/rss";

async function parseRSSFeed() {
  try {
    const feed = await new RSSParser().parseURL(feedUrl);
    feed.items.forEach((item) => {
      const post = {
        id: item.guid,
        creator: item.creator,
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        content: item.content,
        contentSnippet: item.contentSnippet,
        categories: item.categories?.join(","),
      };
      db.query(
        "INSERT INTO posts (id, creator, title, link, pub_date, content, content_snippet, categories) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          post.id,
          post.creator,
          post.title,
          post.link,
          post.pubDate,
          post.content,
          post.contentSnippet,
          post.categories,
        ],
        (error, results) => {
          console.log("Post inserted:", post.title);
        }
      );
    });
  } catch (error) {
    console.error("Error parsing RSS feed:", error);
  }
}

export default parseRSSFeed;
