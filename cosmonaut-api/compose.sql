CREATE TABLE federated_credentials(
   id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   provider TEXT NOT NULL,
   subject TEXT NOT NULL,
   disp_name TEXT,
   created_at TIMESTAMPTZ,
   UNIQUE (provider, subject)
);

CREATE TABLE users(
   id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   provider TEXT NOT NULL,
   subject TEXT NOT NULL,
   lesson INTEGER NOT NULL,
   chapter INTEGER NOT NULL,
   CONSTRAINT unique_progress UNIQUE (provider, subject, lesson),
   CONSTRAINT fk_unique_user
      FOREIGN KEY(provider, subject)
         REFERENCES federated_credentials(provider, subject) ON DELETE CASCADE
);

CREATE TABLE assets(
   id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   provider TEXT NOT NULL,
   subject TEXT NOT NULL,
   lesson INTEGER NOT NULL,
   status TEXT NOT NULL,
   loc TEXT NOT NULL,
   CONSTRAINT unique_asset UNIQUE(provider, subject, lesson),
   CONSTRAINT fk_unique_user
      FOREIGN KEY(provider, subject)
         REFERENCES federated_credentials(provider, subject) ON DELETE CASCADE
);

CREATE TABLE lesson_range(
   lesson INTEGER NOT NULL,
   threshold INTEGER NOT NULL,
   PRIMARY KEY (lesson)
);
INSERT INTO lesson_range (lesson, threshold)
VALUES(0, 1),(1, 6),(2, 8),(3, 3),(4, 3);

CREATE OR REPLACE PROCEDURE update_asset(newp TEXT, news TEXT, newl INTEGER, new_status TEXT, new_loc TEXT)
LANGUAGE SQL
BEGIN ATOMIC
  INSERT INTO assets (provider, subject, lesson, status, loc) VALUES (newp, news, newl, new_status, new_loc)
  ON CONFLICT ON CONSTRAINT unique_asset
  DO UPDATE SET status = new_status, loc = new_loc WHERE assets.provider = newp AND assets.subject = news AND assets.lesson = newl;
END;

CREATE OR REPLACE PROCEDURE update_lesson(newp TEXT, news TEXT, newl INTEGER, newc INTEGER)
LANGUAGE SQL
BEGIN ATOMIC
  INSERT INTO users (provider, subject, lesson, chapter) VALUES (newp, news, newl, newc)
  ON CONFLICT ON CONSTRAINT unique_progress
  DO UPDATE SET chapter = newc WHERE users.provider = newp AND users.subject = news AND users.lesson = newl;
END;

CREATE OR REPLACE FUNCTION get_progress(u_provider TEXT, u_subject TEXT, u_lesson INTEGER)
RETURNS TABLE(res_lesson INTEGER, res_chapter INTEGER) AS $$
BEGIN
  RETURN QUERY SELECT lesson, chapter FROM users WHERE provider = u_provider AND subject = u_subject AND lesson = u_lesson;
END;
$$
IMMUTABLE
LANGUAGE plpgsql
