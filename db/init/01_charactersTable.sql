CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_characters_name ON characters(name);