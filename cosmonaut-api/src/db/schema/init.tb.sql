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

-- CREATE TABLE assets(
--    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--    provider TEXT NOT NULL,
--    subject TEXT NOT NULL,
--    key TEXT NOT NULL,
--    reward JSONB NOT NULL
-- );
-- INSERT INTO assets (provider, subject, key, reward)
-- VALUES('google', 'dummy', 'secret1', '[{"name": "clear1", "loc": "assets/nft/clear1"}, {"name": "clear2", "loc": "assets/nft/clear2"}]'),
--       ('facebook', 'dummy', 'secret2', '[{"name": "clear3", "loc": "assets/nft/clear3"}, {"name": "clear4", "loc": "assets/nft/clear4"}]');

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
INSERT INTO assets (provider, subject, lesson, status, loc)

CREATE TABLE lesson_range(
   lesson INTEGER NOT NULL,
   threshold INTEGER NOT NULL,
   PRIMARY KEY (lesson)
);
INSERT INTO lesson_range (lesson, threshold)
VALUES(0, 1),(1, 6),(2, 8),(3, 3),(4, 3);