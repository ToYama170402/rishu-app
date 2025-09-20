package model

type Schedule struct {
	Day    string `json:"day" binding:"required"`
	Period int    `json:"period" binding:"required"`
}
