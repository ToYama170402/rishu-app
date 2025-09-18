package models

type LectureRoomInfo struct {
	LectureRoomInfoID int    `gorm:"primaryKey;autoIncrement;column:lecture_room_info_id"`
	LectureRoomInfo   string `gorm:"column:lecture_room_info"`
}
