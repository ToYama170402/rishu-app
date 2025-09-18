package models

type Responsible struct {
	ResponsibleID int         `gorm:"primaryKey;autoIncrement;column:responsible_id"`
	CourseID      int         `gorm:"column:course_id"`
	Course        *Course     `gorm:"foreignKey:CourseID"`
	InstructorID  int         `gorm:"column:instructor_id"`
	Instructor    *Instructor `gorm:"foreignKey:InstructorID"`
}
