package models

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	Industry     string `json:"industry"`
	Skills       string `json:"skills"`
	JobSelection string `json:"job_selection"`
}

type IgniteCompany struct {
	Industry     string `gorm:"column:Industry"`      // No space here, matches exactly
	CompanyName  string `gorm:"column:Company Name"`  // Matches "Company Name" exactly
	JobPositions string `gorm:"column:Job Positions"` // Matches "Job Positions" exactly
	JobCategory  string `gorm:"column:Job Category"`  // Matches "Job Category" exactly
	Traits       string `gorm:"column:Traits"`        // No space here, matches exactly
}

func (I IgniteCompany) TableName() string {
	return "IgniteCompany" // Use the exact name of the table in your database
}
