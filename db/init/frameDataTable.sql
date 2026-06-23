CREATE TABLE frame_data (\

    id SERIAL PRIMARY KEY,\
    character_id INTEGER REFERENCES characters(id),\
    move_id INTEGER REFERENCES moves(id),\
    startup INTEGER NOT NULL,\
    on_block INTEGER,\
    recovery INTEGER,\
    on_hit INTEGER,\
    notes TEXT
)