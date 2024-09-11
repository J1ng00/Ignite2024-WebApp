package main

import (
	"os"

	"github.com/J1ng00/Ignite2024-WebApp/mvc/controllers"
	"github.com/J1ng00/Ignite2024-WebApp/mvc/initializers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDatabase()
	initializers.SyncDB()
}

func main() {
	//load templates
	engine := html.New("./views", ".html")

	//Setup App
	app := fiber.New(fiber.Config{
		Views: engine,
	})

	//configure app
	app.Static("/", "./public")

	//routes
	frontendRoutes := []string{
		"/",
		"/Forms",
		"/Floorplan",
		"/Company",
	}

	for _, route := range frontendRoutes {
		app.Get(route, controllers.PostsIndex)
	}

	//start app
	app.Listen(":" + os.Getenv("PORT"))
}
