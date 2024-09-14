package controllers

import (
	"log"

	"github.com/J1ng00/Ignite2024-WebApp/mvc/initializers"
	"github.com/J1ng00/Ignite2024-WebApp/mvc/models"
	"github.com/J1ng00/Ignite2024-WebApp/mvc/openai"
	"github.com/gofiber/fiber/v2"
)

type StudentInput struct {
	Industry    string `json:"industry"`
	Skills      string `json:"skills"`
	JobPosition string `json:"job_position"`
}

func RecommendCompany(c *fiber.Ctx) error {
	// Parse the incoming request
	var input StudentInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	// Query the database asynchronously
	companies := make(chan []models.IgniteCompany)
	go func() {
		var results []models.IgniteCompany
		result := initializers.DB.Where("industry = ?", input.Industry).Find(&results)
		if result.Error != nil {
			log.Println("Failed to query companies:", result.Error)
		}
		companies <- results
	}()

	// Fetch the companies and proceed with the recommendation
	selectedCompanies := <-companies

	// Build the company list string
	companyList := ""
	for _, company := range selectedCompanies {
		companyList += company.CompanyName + " - " + company.JobPositions + "\n"
	}

	// Perform the ChatGPT request asynchronously
	responseChannel := make(chan string)
	go func() {
		prompt := "The student is interested in the " + input.Industry + " industry, has skills in " +
			input.Skills + ", and is looking for a job as a " + input.JobPosition + ".\n\n" +
			"Here is a list of relevant companies:\n" + companyList +
			"\n\nBased on this information, recommend the top 3 companies that would be a good fit for the student."

		recommendation, err := openai.GetChatGPTRecommendation(prompt)
		if err != nil {
			log.Println("Error getting recommendation:", err)
			responseChannel <- "Error"
			return
		}
		responseChannel <- recommendation
	}()

	// Non-blocking response handler
	recommendation := <-responseChannel

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"recommendation": recommendation,
	})
}
