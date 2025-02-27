package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/blexram-go/quickthoughts/backend/internal/database"
	"github.com/google/uuid"
)

type Entry struct {
	ID         uuid.UUID `json:"id"`
	Created_At time.Time `json:"created_at"`
	Updated_At time.Time `json:"updated_at"`
	Title      string    `json:"title"`
	Body       string    `json:"body"`
}

func (cfg *apiConfig) handlerCreateEntry(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Title string `json:"title"`
		Body  string `json:"body"`
	}

	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't decode parameters")
		return
	}

	validatedTitle, err := validateTitleLength(params.Title)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
	}

	validatedBody, err := validateBodyLength(params.Body)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	entry, err := cfg.db.CreateEntry(r.Context(), database.CreateEntryParams{
		ID:        uuid.New(),
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
		Title:     validatedTitle,
		Body:      validatedBody,
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't create entry")
		return
	}

	respondWithJSON(w, http.StatusCreated, Entry{
		ID:         entry.ID,
		Created_At: entry.CreatedAt,
		Updated_At: entry.UpdatedAt,
		Title:      entry.Title,
		Body:       entry.Body,
	})

}

func validateTitleLength(title string) (string, error) {
	const maxTitleLength = 140
	if len(title) > maxTitleLength {
		return "", errors.New("Entry title exceeds max length")
	}
	return title, nil
}

func validateBodyLength(body string) (string, error) {
	const maxBodyLength = 4096
	if len(body) > maxBodyLength {
		return "", errors.New("Entry body exceeds max length")
	}
	return body, nil
}
