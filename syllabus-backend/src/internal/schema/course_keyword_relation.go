package schema

type CourseKeywordRelation struct {
	CourseKeywordRelationID int      `gorm:"primaryKey;autoIncrement;column:course_keyword_relation_id"`
	CourseID                int      `gorm:"column:course_id;index"`
	KeywordID               int      `gorm:"column:keyword_id;index"`
	Course                  *Course  `gorm:"reference:CourseID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Keyword                 *Keyword `gorm:"reference:KeywordID"`
}
