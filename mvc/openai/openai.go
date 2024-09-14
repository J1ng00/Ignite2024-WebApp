package openai

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
)

const openAIAPIURL = "https://api.openai.com/v1/chat/completions"

// OpenAIRequest represents the structure of the request body for the ChatGPT API
type OpenAIRequest struct {
	Model       string          `json:"model"`
	Messages    []OpenAIMessage `json:"messages"`
	MaxTokens   int             `json:"max_tokens"`
	Temperature float64         `json:"temperature"`
}

// OpenAIMessage represents the message structure for ChatGPT
type OpenAIMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

// OpenAIResponse represents the structure of the response from the ChatGPT API
type OpenAIResponse struct {
	Choices []struct {
		Message OpenAIMessage `json:"message"`
	} `json:"choices"`
}

// GetChatGPTRecommendation sends a prompt to the OpenAI ChatGPT API and returns the response
func GetChatGPTRecommendation(prompt string) (string, error) {
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		log.Fatal("OpenAI API key not set")
	}

	// Construct the request payload
	requestBody := OpenAIRequest{
		Model: "gpt-3.5-turbo",
		Messages: []OpenAIMessage{
			{Role: "system", Content: "You are a career advisor recommending students companies they should visit."},
			{Role: "user", Content: prompt},
		},
		MaxTokens:   250,
		Temperature: 0.6,
	}

	// Encode the request into JSON
	requestBodyJSON, err := json.Marshal(requestBody)
	if err != nil {
		return "", err
	}

	// Create the HTTP request
	req, err := http.NewRequest("POST", openAIAPIURL, bytes.NewBuffer(requestBodyJSON))
	if err != nil {
		return "", err
	}

	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	// Parse the response
	var openAIResp OpenAIResponse
	if err := json.NewDecoder(resp.Body).Decode(&openAIResp); err != nil {
		return "", err
	}

	// Return the first response choice from ChatGPT
	if len(openAIResp.Choices) > 0 {
		return openAIResp.Choices[0].Message.Content, nil
	}

	return "", nil
}
