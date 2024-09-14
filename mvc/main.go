package main

import (
	"log"
	"os"

	"github.com/J1ng00/Ignite2024-WebApp/mvc/controllers"
	"github.com/J1ng00/Ignite2024-WebApp/mvc/initializers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/template/html/v2"
)

func init() {
	initializers.LoadEnvVariables()  // Load environment variables
	initializers.ConnectToDatabase() // Connect to the database
	initializers.SyncDB()            // Sync the database
}

func main() {
	// Load templates
	engine := html.New("./views", ".html")

	// Setup Fiber app
	app := fiber.New(fiber.Config{
		Views: engine,
	})

	// Enable CORS middleware (allow requests from any origin)
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // Allow all origins
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Content-Type",
	}))

	// Serve static files
	app.Static("/", "./public")

	// Define frontend routes
	frontendRoutes := []string{
		"/",
		"/Forms",
		"/Floorplan",
		"/Company",
	}

	for _, route := range frontendRoutes {
		app.Get(route, controllers.PostsIndex)
	}

	app.Post("/posts", controllers.RecommendCompany)

	app.Get("/posts", func(c *fiber.Ctx) error {
		return controllers.GetPosts(c, initializers.DB) // Pass DB
	})

	// Start the Fiber app on the specified port
	log.Println("Server running on port " + os.Getenv("PORT"))
	log.Fatal(app.Listen("0.0.0.0:" + os.Getenv("PORT")))
}
