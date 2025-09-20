package schema

type CourseKeywordRelation struct {
	CourseKeywordRelationID int      `gorm:"primaryKey;autoIncrement;column:course_keyword_relation_id"`
	CourseID                int      `gorm:"column:course_id"`
	KeywordID               int      `gorm:"column:keyword_id"`
	Course                  *Course  `gorm:"reference:CourseID"`
	Keyword                 *Keyword `gorm:"reference:KeywordID"`
}
