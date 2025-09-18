package model

type Course struct {
	CourseID             int          `json:"course_id"`
	Year                 int          `json:"year"`
	Title                string       `json:"title"`
	Numbering            string       `json:"numbering"`
	CourseNumber         string       `json:"course_number"`
	NumberOfProper       int          `json:"number_of_proper"`
	Semester             []int        `json:"semester"`
	NumberOfCredits      int          `json:"number_of_credits"`
	Note                 string       `json:"note"`
	JapaneseURL          string       `json:"japanese_url"`
	EnglishURL           string       `json:"english_url"`
	OpenAccount          string       `json:"open_account"`
	Max60CreditsFlag     string       `json:"max60_credits_flag"`
	SubjectDistinguished string       `json:"subject_distinguished"`
	CourseDescription    string       `json:"course_description"`
	Instructors          []Instructor `json:"instructors"`
	Schedules            []Schedule   `json:"schedules"`
	ClassFormat          string       `json:"class_format"`
	LectureForm          string       `json:"lecture_form"`
	TargetStudents       string       `json:"target_students"`
	LectureRoomInfo      string       `json:"lecture_room_info"`
	DepartmentName       string       `json:"department_name"`
	Faculty              Faculty      `json:"faculty"`
	Keyword              []string     `json:"keyword"`
}
