package main

import (
	"log"
	"net/http"
)

func main() {
	port := "8080"

	mux := http.NewServeMux()

	server := http.Server{
		Addr:    ":" + port,
		Handler: mux,
	}

	log.Printf("Listening on port: %s", port)
	log.Fatal(server.ListenAndServe())
}
