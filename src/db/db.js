import pq from "pg";

const pool = new pq.Pool({
  user: "postgres",
  password: "0958281672r",
  host: "localhost",
  port: 5432,
  database: "devit",
});

export default pool;
