package repositories

import (
	"encoding/json"
	"fmt"

	_ "embed"

	"github.com/ToYama170402/rishu-app/syllabus/src/internal/model"
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/schema"
	"gorm.io/gorm"
)

//go:embed sql/course_list_json_query.sql
var CourseListQuery string

func GetCourses(db *gorm.DB) (*[]model.Course, error) {
	var rawResults []struct {
		Data json.RawMessage `gorm:"column:jsonb_build_object"`
	}
	query := fmt.Sprintf(CourseListQuery, "")
	if err := db.Raw(query).Scan(&rawResults).Error; err != nil {
		return nil, err
	}

	var courses []model.Course
	for _, r := range rawResults {
		var c model.Course
		if err := json.Unmarshal(r.Data, &c); err != nil {
			return nil, err
		}
		courses = append(courses, c)
	}
	return &courses, nil
}

func GetCourseByID(db *gorm.DB, courseID int) (*model.Course, error) {
	var rawResult struct {
		Data json.RawMessage `gorm:"column:jsonb_build_object"`
	}
	query := fmt.Sprintf(CourseListQuery, "WHERE courses.course_id = $1")
	if err := db.Raw(query, courseID).Scan(&rawResult).Error; err != nil {
		return nil, err
	}
	if rawResult.Data == nil || len(rawResult.Data) == 0 {
		return nil, gorm.ErrRecordNotFound
	}

	var course model.Course
	if err := json.Unmarshal(rawResult.Data, &course); err != nil {
		return nil, err
	}
	return &course, nil
}

func CreateCourses(db *gorm.DB, courses *[]model.Course) (*[]*model.Course, error) {
	var savedCourses []*model.Course
	result := db.Transaction(func(tx *gorm.DB) error {
		for i := range *courses {
			course := (*courses)[i]
			if savedCourse, err := createCourse(tx, &course); err != nil {
				return err
			} else {
				savedCourses = append(savedCourses, savedCourse)
			}
		}
		return nil
	})
	if result != nil {
		return nil, result
	} else {
		return &savedCourses, nil
	}
}

func createCourse(db *gorm.DB, course *model.Course) (*model.Course, error) {
	var savedCourse schema.Course
	faculty := schema.Faculty{Faculty: course.Faculty.Faculty}
	if err := db.Model(&schema.Faculty{}).FirstOrCreate(&faculty, &faculty).Error; err != nil {
		return nil, err
	}

	department := schema.Department{DepartmentName: course.Faculty.Department, FacultyID: faculty.FacultyID}
	if err := db.Model(&schema.Department{}).FirstOrCreate(&department, &department).Error; err != nil {
		return nil, err
	}

	classFormat := schema.ClassFormat{ClassFormat: course.ClassFormat}
	if err := db.Model(&schema.ClassFormat{}).FirstOrCreate(&classFormat, &classFormat).Error; err != nil {
		return nil, err
	}

	lectureForm := schema.LectureForm{LectureForm: course.LectureForm}
	if err := db.Model(&schema.LectureForm{}).FirstOrCreate(&lectureForm, &lectureForm).Error; err != nil {
		return nil, err
	}

	targetStudents := schema.TargetStudents{TargetStudents: course.TargetStudents}
	if err := db.Model(&schema.TargetStudents{}).FirstOrCreate(&targetStudents, &targetStudents).Error; err != nil {
		return nil, err
	}

	lectureRoomInfo := schema.LectureRoomInfo{LectureRoomInfo: course.LectureRoomInfo}
	if err := db.Model(&schema.LectureRoomInfo{}).FirstOrCreate(&lectureRoomInfo, &lectureRoomInfo).Error; err != nil {
		return nil, err
	}

	savedCourse = schema.Course{
		Year:                 course.Year,
		Title:                course.Title,
		Numbering:            course.Numbering,
		CourseNumber:         course.CourseNumber,
		NumberOfProper:       course.NumberOfProper,
		NumberOfCredits:      course.NumberOfCredits,
		Note:                 course.Note,
		EnglishURL:           course.EnglishURL,
		JapaneseURL:          course.JapaneseURL,
		OpenAccount:          course.OpenAccount,
		Max60CreditsFlag:     course.Max60CreditsFlag,
		SubjectDistinguished: course.SubjectDistinguished,
		CourseDescription:    course.CourseDescription,
		ClassFormatID:        classFormat.ClassFormatID,
		LectureFormID:        lectureForm.LectureFormID,
		TargetStudentsID:     targetStudents.TargetStudentsID,
		LectureRoomInfoID:    lectureRoomInfo.LectureRoomInfoID,
		DepartmentID:         department.DepartmentID,
	}
	if err := db.Model(&schema.Course{}).Create(&savedCourse).Error; err != nil {
		return nil, err
	}

	semesters := []schema.Semester{}
	for _, semester := range course.Semester {
		a := schema.Semester{Semester: semester}
		if err := db.Model(&schema.Semester{}).FirstOrCreate(&a, &a).Error; err != nil {
			return nil, err
		}
		semesters = append(semesters, a)
	}

	var courseSemesterRelation []schema.CourseSemesterRelation
	for _, semester := range semesters {
		courseSemesterRelation = append(courseSemesterRelation, schema.CourseSemesterRelation{
			CourseID:   savedCourse.CourseID,
			SemesterID: semester.SemesterID,
		})
	}
	if len(courseSemesterRelation) > 0 {
		if err := db.Model(&schema.CourseSemesterRelation{}).Create(&courseSemesterRelation).Error; err != nil {
			return nil, err
		}
	}

	keywords := []schema.Keyword{}
	for _, keyword := range course.Keywords {
		a := schema.Keyword{Keyword: keyword}
		if err := db.Model(&schema.Keyword{}).FirstOrCreate(&a, &a).Error; err != nil {
			return nil, err
		}
		keywords = append(keywords, a)
	}

	var courseKeywordRelation []schema.CourseKeywordRelation
	for _, keyword := range keywords {
		courseKeywordRelation = append(courseKeywordRelation, schema.CourseKeywordRelation{
			CourseID:  savedCourse.CourseID,
			KeywordID: keyword.KeywordID,
		})
	}
	if len(courseKeywordRelation) > 0 {
		if err := db.Model(&schema.CourseKeywordRelation{}).Create(&courseKeywordRelation).Error; err != nil {
			return nil, err
		}
	}

	instructors := []schema.Instructor{}
	for _, instructor := range course.Instructors {
		a := schema.Instructor{Name: instructor.Name}
		if err := db.Model(&schema.Instructor{}).FirstOrCreate(&a, &a).Error; err != nil {
			return nil, err
		}
		instructors = append(instructors, a)
	}

	var responsible []schema.Responsible
	for _, instructor := range instructors {
		responsible = append(responsible, schema.Responsible{
			CourseID:     savedCourse.CourseID,
			InstructorID: instructor.InstructorID,
		})
	}
	if len(responsible) > 0 {
		if err := db.Model(&schema.Responsible{}).Create(&responsible).Error; err != nil {
			return nil, err
		}
	}

	dayPeriods := []schema.DayPeriod{}
	for _, schedule := range course.Schedules {
		dayPeriod := schema.DayPeriod{Day: schedule.Day, Period: schedule.Period}
		if err := db.Model(&schema.DayPeriod{}).FirstOrCreate(&dayPeriod, &dayPeriod).Error; err != nil {
			return nil, err
		}
		dayPeriods = append(dayPeriods, dayPeriod)
	}

	var schedules []schema.Schedule
	for _, dayPeriod := range dayPeriods {
		schedules = append(schedules, schema.Schedule{
			CourseID:    savedCourse.CourseID,
			DayPeriodID: dayPeriod.DayPeriodID,
		})
	}
	if len(schedules) > 0 {
		if err := db.Model(&schema.Schedule{}).Create(&schedules).Error; err != nil {
			return nil, err
		}
	}

	return convertSchemaCourseToModelCourse(&savedCourse)
}

func convertSchemaCourseToModelCourse(schemaCourse *schema.Course) (*model.Course, error) {
	return &model.Course{
		CourseID:             schemaCourse.CourseID,
		Year:                 schemaCourse.Year,
		Title:                schemaCourse.Title,
		Numbering:            schemaCourse.Numbering,
		CourseNumber:         schemaCourse.CourseNumber,
		NumberOfProper:       schemaCourse.NumberOfProper,
		NumberOfCredits:      schemaCourse.NumberOfCredits,
		Note:                 schemaCourse.Note,
		EnglishURL:           schemaCourse.EnglishURL,
		JapaneseURL:          schemaCourse.JapaneseURL,
		OpenAccount:          schemaCourse.OpenAccount,
		Max60CreditsFlag:     schemaCourse.Max60CreditsFlag,
		SubjectDistinguished: schemaCourse.SubjectDistinguished,
		CourseDescription:    schemaCourse.CourseDescription,
	}, nil
}

func UpdateCourseByID(db *gorm.DB, courseID int, updatedCourse *model.Course) (*model.Course, error) {
	var existingCourse schema.Course
	err := db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Model(&schema.Course{}).Where("course_id = ?", courseID).First(&existingCourse).Error; err != nil {
			return err
		}

		existingCourse.Title = updatedCourse.Title
		existingCourse.Numbering = updatedCourse.Numbering
		existingCourse.CourseNumber = updatedCourse.CourseNumber
		existingCourse.NumberOfProper = updatedCourse.NumberOfProper
		existingCourse.NumberOfCredits = updatedCourse.NumberOfCredits
		existingCourse.Note = updatedCourse.Note
		existingCourse.EnglishURL = updatedCourse.EnglishURL
		existingCourse.JapaneseURL = updatedCourse.JapaneseURL
		existingCourse.OpenAccount = updatedCourse.OpenAccount
		existingCourse.Max60CreditsFlag = updatedCourse.Max60CreditsFlag
		existingCourse.SubjectDistinguished = updatedCourse.SubjectDistinguished
		existingCourse.CourseDescription = updatedCourse.CourseDescription

		if err := tx.Model(&schema.Course{}).Save(&existingCourse).Error; err != nil {
			return err
		}

		return nil
	})
	if err != nil {
		return nil, err
	}
	return convertSchemaCourseToModelCourse(&existingCourse)
}

func DeleteCourseByID(db *gorm.DB, courseID int) error {
	return db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Model(&schema.Course{}).Where("course_id = ?", courseID).Delete(&schema.Course{}).Error; err != nil {
			return err
		}
		return nil
	})
}
