-- name: CreateUser :one
INSERT INTO users (id, email, password, username)
VALUES (
    $1,
    $2,
    $3,
    $4
)
RETURNING *;

