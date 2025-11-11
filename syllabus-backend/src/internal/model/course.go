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

func NewCourse(
	CourseID int,
	Year int,
	Title string,
	Numbering string,
	CourseNumber string,
	NumberOfProper int,
	Semester []int,
	NumberOfCredits int,
	Note string,
	JapaneseURL string,
	EnglishURL string,
	OpenAccount string,
	Max60CreditsFlag string,
	SubjectDistinguished string,
	CourseDescription string,
	Instructors []Instructor,
	Schedules []Schedule,
	ClassFormat string,
	LectureForm string,
	TargetStudents string,
	LectureRoomInfo string,
	Faculty Faculty,
	Keywords []string,
) (*Course, error) {
	return &Course{
		CourseID:             CourseID,
		Year:                 Year,
		Title:                Title,
		Numbering:            Numbering,
		CourseNumber:         CourseNumber,
		NumberOfProper:       NumberOfProper,
		Semester:             Semester,
		NumberOfCredits:      NumberOfCredits,
		Note:                 Note,
		JapaneseURL:          JapaneseURL,
		EnglishURL:           EnglishURL,
		OpenAccount:          OpenAccount,
		Max60CreditsFlag:     Max60CreditsFlag,
		SubjectDistinguished: SubjectDistinguished,
		CourseDescription:    CourseDescription,
		Instructors:          Instructors,
		Schedules:            Schedules,
		ClassFormat:          ClassFormat,
		LectureForm:          LectureForm,
		TargetStudents:       TargetStudents,
		LectureRoomInfo:      LectureRoomInfo,
		Faculty:              Faculty,
		Keywords:             Keywords,
	}, nil
}
