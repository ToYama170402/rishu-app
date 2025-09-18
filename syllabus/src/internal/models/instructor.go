package models

type Instructor struct {
	InstructorID int    `gorm:"primaryKey;autoIncrement;column:instructor_id"`
	Name         string `gorm:"column:name"`
}
