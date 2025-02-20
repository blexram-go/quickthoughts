package main

import (
	"net/http"

	"github.com/google/uuid"
)

func (cfg *apiConfig) handlerDeleteEntry(w http.ResponseWriter, r *http.Request) {
	entryIDString := r.PathValue("entryID")
	entryID, err := uuid.Parse(entryIDString)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid entry ID")
		return
	}

	dbEntry, err := cfg.db.GetEntryByID(r.Context(), entryID)
	if err != nil {
		respondWithError(w, http.StatusNotFound, "Couldn't get entry")
		return
	}

	err = cfg.db.DeleteEntry(r.Context(), dbEntry.ID)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Couldn't delete entry")
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
