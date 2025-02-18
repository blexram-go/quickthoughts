package main

import (
	"context"
	"net/http"

	"github.com/google/uuid"
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

func (cfg *apiConfig) handlerGetEntryByID(w http.ResponseWriter, r *http.Request) {
	entryIDString := r.PathValue("entryID")
	entryID, err := uuid.Parse(entryIDString)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid entry ID")
		return
	}

	dbEntry, err := cfg.db.GetEntryByID(context.Background(), entryID)
	if err != nil {
		respondWithError(w, http.StatusNotFound, "Couldn't get entry")
		return
	}

	respondWithJSON(w, http.StatusOK, Entry{
		ID:         dbEntry.ID,
		Created_At: dbEntry.CreatedAt,
		Updated_At: dbEntry.CreatedAt,
		Title:      dbEntry.Title,
		Body:       dbEntry.Body,
	})
}
