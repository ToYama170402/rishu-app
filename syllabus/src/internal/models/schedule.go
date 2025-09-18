package models

type Schedule struct {
	ScheduleID  int        `gorm:"primaryKey;autoIncrement;column:schedule_id"`
	CourseID    int        `gorm:"column:course_id"`
	Course      *Course    `gorm:"foreignKey:CourseID"`
	DayPeriodID int        `gorm:"column:day_period_id"`
	DayPeriod   *DayPeriod `gorm:"foreignKey:DayPeriodID"`
}
