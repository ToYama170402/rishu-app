package schema

type TargetStudents struct {
	TargetStudentsID int    `gorm:"primaryKey;autoIncrement;column:target_students_id"`
	TargetStudents   string `gorm:"column:target_students"`
}
