package schema

type Responsible struct {
	ResponsibleID int        `gorm:"primaryKey;autoIncrement;column:responsible_id"`
	CourseID      int        `gorm:"column:course_id;index"`
	Course        Course     `gorm:"reference:CourseID;constraint:OnDelete:CASCADE;OnUpdate:CASCADE"`
	InstructorID  int        `gorm:"column:instructor_id;index"`
	Instructor    Instructor `gorm:"reference:InstructorID"`
}
