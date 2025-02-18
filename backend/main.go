package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/blexram-go/quickthoughts/backend/internal/database"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type apiConfig struct {
	db *database.Queries
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("PORT environment variable is not set")
	}

	dbURL := os.Getenv("DB_URL")
	if dbURL == "" {
		log.Fatal("DB_URL environment variable is not set")
	}

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
	mux.HandleFunc("POST /entries", cfg.handlerCreateEntry)
	mux.HandleFunc("GET /entries", cfg.handlerGetEntries)
	mux.HandleFunc("GET /entries/{entryID}", cfg.handlerGetEntryByID)

	server := http.Server{
		Addr:    ":" + port,
		Handler: mux,
	}

	log.Printf("Listening on port: %s", port)
	log.Fatal(server.ListenAndServe())
}
