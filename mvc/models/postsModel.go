package models

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	Industry     string `json:"industry"`
	Skills       string `json:"skills"`
	JobSelection string `json:"job_selection"`
}
