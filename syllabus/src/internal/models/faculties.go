package models

type Faculty struct {
	FacultyID int    `gorm:"primaryKey;autoIncrement;column:faculty_id"`
	Faculty   string `gorm:"column:faculty"`
}
