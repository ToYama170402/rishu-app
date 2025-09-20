package schema

type Semester struct {
	SemesterID int `gorm:"primaryKey;column:semester_id"`
	Semester   int `gorm:"column:semester"`
}
