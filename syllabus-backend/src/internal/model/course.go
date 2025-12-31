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
	courseID int,
	year int,
	title string,
	numbering string,
	courseNumber string,
	numberOfProper int,
	semester []int,
	numberOfCredits int,
	note string,
	japaneseURL string,
	englishURL string,
	openAccount string,
	max60CreditsFlag string,
	subjectDistinguished string,
	courseDescription string,
	instructors []Instructor,
	schedules []Schedule,
	classFormat string,
	lectureForm string,
	targetStudents string,
	lectureRoomInfo string,
	faculty Faculty,
	keywords []string,
) *Course {
	return &Course{
		CourseID:             courseID,
		Year:                 year,
		Title:                title,
		Numbering:            numbering,
		CourseNumber:         courseNumber,
		NumberOfProper:       numberOfProper,
		Semester:             semester,
		NumberOfCredits:      numberOfCredits,
		Note:                 note,
		JapaneseURL:          japaneseURL,
		EnglishURL:           englishURL,
		OpenAccount:          openAccount,
		Max60CreditsFlag:     max60CreditsFlag,
		SubjectDistinguished: subjectDistinguished,
		CourseDescription:    courseDescription,
		Instructors:          instructors,
		Schedules:            schedules,
		ClassFormat:          classFormat,
		LectureForm:          lectureForm,
		TargetStudents:       targetStudents,
		LectureRoomInfo:      lectureRoomInfo,
		Faculty:              faculty,
		Keywords:             keywords,
	}
}
