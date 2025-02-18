package main

import (
	"context"
	"net/http"
)

func (cfg *apiConfig) handlerGetEntries(w http.ResponseWriter, r *http.Request) {
	dbEntries, err := cfg.db.GetEntries(context.Background())
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Couldn't get entries")
		return
	}

	entries := []Entry{}
	for _, entry := range dbEntries {
		entries = append(entries, Entry{
			ID:         entry.ID,
			Created_At: entry.CreatedAt,
			Updated_At: entry.UpdatedAt,
			Title:      entry.Title,
			Body:       entry.Body,
		})
	}

	respondWithJSON(w, http.StatusOK, entries)
}
