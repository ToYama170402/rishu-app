package model

type Course struct {
	CourseID             int          `json:"courseId"`
	Year                 int          `json:"year" binding:"required"`
	Title                string       `json:"title" binding:"required"`
	Numbering            string       `json:"numbering" binding:"required"`
	CourseNumber         string       `json:"courseNumber" binding:"required"`
	NumberOfProper       int          `json:"numberOfProper"`
	Semester             []int        `json:"semester" binding:"required"`
	NumberOfCredits      int          `json:"numberOfCredits" binding:"required"`
	Note                 string       `json:"note"`
	JapaneseURL          string       `json:"japaneseUrl" binding:"required"`
	EnglishURL           string       `json:"englishUrl" binding:"required"`
	OpenAccount          string       `json:"openAccount"`
	Max60CreditsFlag     string       `json:"max60CreditsFlag"`
	SubjectDistinguished string       `json:"subjectDistinguished"`
	CourseDescription    string       `json:"courseDescription" binding:"required"`
	Instructors          []Instructor `json:"instructors" binding:"required"`
	Schedules            []Schedule   `json:"schedules" binding:"required"`
	ClassFormat          string       `json:"classFormat"`
	LectureForm          string       `json:"lectureForm"`
	TargetStudents       string       `json:"targetStudents"`
	LectureRoomInfo      string       `json:"lectureRoomInfo" binding:"required"`
	Faculty              Faculty      `json:"faculty" binding:"required"`
	Keywords             []string     `json:"keywords"`
}
