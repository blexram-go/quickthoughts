-- +goose Up
CREATE TABLE entries (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL
);

-- +goose Down
DROP TABLE entries;