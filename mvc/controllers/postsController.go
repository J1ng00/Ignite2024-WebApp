package controllers

import (
	"log"

	"github.com/J1ng00/Ignite2024-WebApp/mvc/initializers"
	"github.com/J1ng00/Ignite2024-WebApp/mvc/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

var DB *gorm.DB = initializers.DB

func PostsIndex(c *fiber.Ctx) error {
	return c.Render("posts/index", fiber.Map{})
}

func CreatePost(c *fiber.Ctx, DB *gorm.DB) error {
	var post models.Post

	// Parse the incoming request body
	if err := c.BodyParser(&post); err != nil {
		log.Println("Error parsing request body:", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	// Insert data into the posts table
	if result := DB.Create(&post); result.Error != nil {
		log.Println("Error inserting data into posts table:", result.Error)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to insert post into database",
		})
	}

	// Return the inserted post data
	log.Println("Successfully inserted post:", post)
	return c.Status(fiber.StatusCreated).JSON(post)
}

func GetPosts(c *fiber.Ctx, DB *gorm.DB) error {
	var posts []models.Post
	DB.Find(&posts)

	return c.Status(fiber.StatusOK).JSON(posts)
}
