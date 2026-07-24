CREATE TABLE IF NOT EXISTS moves (
    id SERIAL PRIMARY KEY,
    move TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_moves_move ON moves(move);
