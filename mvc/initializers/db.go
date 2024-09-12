package initializers

import (
	"fmt"
	"log"
	"os"

	"github.com/J1ng00/Ignite2024-WebApp/mvc/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

type ServerInfo struct {
	CurrentDatabase string
	CurrentUser     string
	ServerAddr      string
	ServerPort      int
}

// ConnectToDatabase initializes the connection to PostgreSQL
func ConnectToDatabase() {
	var err error
	dsn := os.Getenv("DB_URL") // Ensure that DB_URL is set in your environment variables

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	// Check if DB is properly initialized and ping the database
	dbConn, err := DB.DB() // Handle both the *sql.DB and error values
	if err != nil {
		log.Fatalf("Failed to retrieve the *sql.DB object from Gorm: %v", err)
	}

	// Now use the dbConn to ping the database
	if err := dbConn.Ping(); err != nil {
		log.Fatalf("Cannot ping the PostgreSQL database: %v", err)
	} else {
		log.Println("Ping to PostgreSQL database successful!")
	}

	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	} else {
		fmt.Println("Successfully connected to the PostgreSQL database!")

		var serverInfo ServerInfo
		result := DB.Raw("SELECT current_database(), current_user, inet_client_addr(), inet_server_port()").Scan(&serverInfo)
		if result.Error != nil {
			log.Fatal("Error retrieving server info:", result.Error)
		}

		// Log server info
		log.Printf("Connected to server - Database: %s, User: %s, Host: %s, Port: %d",
			serverInfo.CurrentDatabase, serverInfo.CurrentUser, serverInfo.ServerAddr, serverInfo.ServerPort)
	}
}

// SyncDB syncs the database schema (migrates the Post model)
func SyncDB() {
	DB.AutoMigrate(&models.Post{})
}
