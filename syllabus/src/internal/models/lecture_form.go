package models

type LectureForm struct {
	LectureFormID int    `gorm:"primaryKey;autoIncrement;column:lecture_form_id"`
	LectureForm   string `gorm:"column:lecture_form"`
}
