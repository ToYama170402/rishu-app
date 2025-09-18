package schema

type Course struct {
	CourseID             int              `gorm:"column:course_id;primaryKey"`
	Year                 int              `gorm:"column:year"`
	Title                string           `gorm:"column:title"`
	Numbering            string           `gorm:"column:numbering"`
	CourseNumber         string           `gorm:"column:course_number"`
	NumberOfProper       int              `gorm:"column:number_of_proper"`
	Semester             int              `gorm:"column:semester"`
	NumberOfCredits      int              `gorm:"column:number_of_credits"`
	Note                 string           `gorm:"column:note"`
	EnglishURL           string           `gorm:"column:english_url"`
	JapaneseURL          string           `gorm:"column:japanese_url"`
	OpenAccount          string           `gorm:"column:open_account"`
	Max60CreditsFlag     string           `gorm:"column:max60_credits_flag"`
	SubjectDistinguished string           `gorm:"column:subject_distinguished"`
	CourseDescription    string           `gorm:"column:course_description"`
	ClassFormatID        int              `gorm:"column:class_format_id"`
	ClassFormat          *ClassFormat     `gorm:"reference:ClassFormatID"`
	LectureFormID        int              `gorm:"column:lecture_form_id"`
	LectureForm          *LectureForm     `gorm:"reference:LectureFormID"`
	TargetStudentsID     int              `gorm:"column:target_students_id"`
	TargetStudents       *TargetStudents  `gorm:"reference:TargetStudentsID"`
	LectureRoomInfoID    int              `gorm:"column:lecture_room_info_id"`
	LectureRoomInfo      *LectureRoomInfo `gorm:"reference:LectureRoomInfoID"`
	DepartmentID         int              `gorm:"column:department_id"`
	Department           *Department      `gorm:"reference:DepartmentID"`
}
