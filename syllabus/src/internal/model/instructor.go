package model

type Instructor struct {
	Name string `json:"name" binding:"required"`
}
