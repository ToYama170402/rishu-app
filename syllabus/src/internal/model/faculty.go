package model

type Faculty struct {
	Faculty    string `json:"faculty" binding:"required"`
	Department string `json:"department"`
}
