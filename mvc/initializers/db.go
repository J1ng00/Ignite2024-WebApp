package initializers

import (
	"fmt"
	"os"

	"github.com/J1ng00/Ignite2024-WebApp/mvc/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// ConnectToDatabase initializes the connection to PostgreSQL
func ConnectToDatabase() {
	var err error
	dsn := os.Getenv("DB_URL") // Ensure that DB_URL is set in your environment variables

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println("Failed to connect to the database:", err)
	} else {
		fmt.Println("Successfully connected to the PostgreSQL database!")

		type ServerInfo struct {
			CurrentDatabase string
			CurrentUser     string
			ServerAddr      string
			ServerPort      int
		}

		var serverInfo ServerInfo

		// Run a query to get server information
		DB.Raw("SELECT current_database(), current_user, inet_server_addr(), inet_server_port()").Scan(&serverInfo)

		// Print the server info
		fmt.Printf("Connected to server - Database: %s, User: %s, Host: %s, Port: %d",
			serverInfo.CurrentDatabase, serverInfo.CurrentUser, serverInfo.ServerAddr, serverInfo.ServerPort)
	}
}

// SyncDB syncs the database schema (migrates the Post model)
func SyncDB() {
	DB.AutoMigrate(&models.Post{})
}
