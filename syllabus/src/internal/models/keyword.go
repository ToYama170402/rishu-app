package models

type Keyword struct {
	KeywordID int    `gorm:"primaryKey;autoIncrement;column:keyword_id"`
	Keyword   string `gorm:"column:keyword"`
}
