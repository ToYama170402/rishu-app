package models

type Department struct {
	DepartmentID   int      `gorm:"primaryKey;autoIncrement;column:department_id"`
	DepartmentName string   `gorm:"column:department_name"`
	FacultyID      int      `gorm:"column:faculty_id"`
	Faculty        *Faculty `gorm:"foreignKey:FacultyID"`
}
