package main

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/blexram-go/quickthoughts/backend/internal/database"
	_ "github.com/lib/pq"
)

type apiConfig struct {
	db *database.Queries
}

func main() {
	port := "8080"
	dbURL := "postgres://brianramos:@localhost:5432/quickthoughts?sslmode=disable"

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatalf("error connecting to database: %v", err)
	}
	defer db.Close()
	dbQueries := database.New(db)

	cfg := &apiConfig{
		db: dbQueries,
	}

	mux := http.NewServeMux()

	mux.Handle("/", http.FileServer(http.Dir("./frontend/build")))
	mux.HandleFunc("/create", cfg.handlerCreateEntry)

	server := http.Server{
		Addr:    ":" + port,
		Handler: mux,
	}

	log.Printf("Listening on port: %s", port)
	log.Fatal(server.ListenAndServe())
}
