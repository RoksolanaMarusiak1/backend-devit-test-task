create TABLE posts(
    id SERIAL PRIMARY KEY,
    creator VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    pub_date VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    content_snippet TEXT,
    categories TEXT
);

create TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE(email)
)

create TABLE tokens( id SERIAL PRIMARY KEY,user_id INT, refresh_token VARCHAR(255) NOT NULL,FOREIGN KEY(user_id) REFERENCES users(id));