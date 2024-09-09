package main

import (
	"fmt"

	"github.com/J1ng00/Ignite2024-WebApp/mvc/initializers"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDatabase()
}

func main() {
	fmt.Println("Hello")
}
