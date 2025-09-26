package schema

type CourseSemesterRelation struct {
	CourseSemesterRelationID int      `gorm:"primaryKey;column:course_semester_relation_id"`
	CourseID                 int      `gorm:"column:course_id;index"`
	Course                   Course   `gorm:"reference:CourseID"`
	SemesterID               int      `gorm:"column:semester_id"`
	Semester                 Semester `gorm:"reference:SemesterID"`
}
