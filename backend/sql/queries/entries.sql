-- name: CreateEntry :one
INSERT INTO entries (id, created_at, updated_at, title, body)
VALUES (
    $1,
    $2,
    $3,
    $4,
    $5
)
RETURNING *;

-- name: GetEntries :many
SELECT * FROM entries;

-- name: GetEntryByID :one
SELECT * FROM entries
WHERE id = $1;

-- name: DeleteEntry :exec
DELETE FROM entries
WHERE id = $1;