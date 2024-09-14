package controllers

import (
	"log"

	"github.com/J1ng00/Ignite2024-WebApp/mvc/initializers"
	"github.com/J1ng00/Ignite2024-WebApp/mvc/models"
	"github.com/J1ng00/Ignite2024-WebApp/mvc/openai"
	"github.com/gofiber/fiber/v2"
)

func RecommendCompany(c *fiber.Ctx) error {

	err := CreatePost(c, initializers.DB)
	if err != nil {
		log.Println("Error creating post:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create post",
		})
	}

	log.Println("Post created successfully in ChatGPT") // Log success message

	// Define the structure for student input
	type StudentInput struct {
		Industry    string `json:"industry"`
		Skills      string `json:"skills"`
		JobPosition string `json:"job_position"`
	}

	var input StudentInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	// Query the PostgreSQL database based on form input
	var companies []models.IgniteCompany
	result := initializers.DB.Where("\"Industry\" = ?", input.Industry).Find(&companies)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to query companies",
		})
	}

	log.Println("Companies fetched from the database:", companies)

	// Generate the ChatGPT prompt
	companyList := ""
	for _, company := range companies {
		companyList += company.CompanyName + " - " + company.JobPositions + "\n"
	}

	log.Println("Generated company list:", companyList)

	prompt := "The student is interested in the " + input.Industry + " industry, has skills in " +
		input.Skills + ", and is looking for a job as a " + input.JobPosition + ".\n\n" +
		"Here is a list of relevant companies:\n" + companyList +
		"\n\nBased on this information, recommend the top 3 companies that would be a good fit for the student, and for each company, provide a one sentence description summarizing why the company is a good match for the student."

	log.Println("Generated ChatGPT Prompt:", prompt)

	// Call ChatGPT API using your helper function
	recommendation, err := openai.GetChatGPTRecommendation(prompt)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to get recommendations from ChatGPT",
		})
	}

	log.Println("Generated ChatGPT Rec:", recommendation)

	// Step 1: Send the recommendation back to the frontend
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"recommendation": recommendation,
	})
}
