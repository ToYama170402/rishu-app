package models

type DayPeriod struct {
	DayPeriodID int    `gorm:"primaryKey;autoIncrement;column:day_period_id"`
	Day         string `gorm:"column:day"`
	Period      string `gorm:"column:period"`
}
