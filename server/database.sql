CREATE DATABASE authlern;

CREATE TABLE userstable(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL
);

-- CREATE TABLE todo(
--   todo_id SERIAL,
--   user_id UUID ,
--   description VARCHAR(255),
--   PRIMARY KEY (todo_id),
--   FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );

-- aa8a00cd-7bb1-4dc8-965a-972b268a1c02
INSERT INTO userstable (user_name, user_email, user_password) VALUES ('jolanta', 'jolanta.woronowska@gmail.com', 'Optymalnie2009!');