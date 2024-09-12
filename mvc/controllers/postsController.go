package controllers

import (
	"github.com/J1ng00/Ignite2024-WebApp/mvc/initializers"
	"github.com/J1ng00/Ignite2024-WebApp/mvc/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

var db *gorm.DB = initializers.DB

func PostsIndex(c *fiber.Ctx) error {
	return c.Render("posts/index", fiber.Map{})
}

func CreatePost(c *fiber.Ctx) error {
	var post models.Post
	if err := c.BodyParser(&post); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	// Save the post to the database
	db.Create(&post)

	return c.Status(fiber.StatusCreated).JSON(post)
}

// GetPosts handles GET requests to fetch all posts
func GetPosts(c *fiber.Ctx) error {
	var posts []models.Post
	db.Find(&posts)

	return c.Status(fiber.StatusOK).JSON(posts)
}
