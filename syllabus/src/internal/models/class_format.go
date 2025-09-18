package models

type ClassFormat struct {
	ClassFormatID int    `gorm:"primaryKey;autoIncrement;column:class_format_id"`
	ClassFormat   string `gorm:"column:class_format"`
}
