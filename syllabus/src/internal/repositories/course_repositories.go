package repositories

import (
	"encoding/json"

	"github.com/ToYama170402/rishu-app/syllabus/src/internal/model"
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/schema"
	"gorm.io/gorm"
)

func GetCourses(db *gorm.DB) ([]model.Course, error) {
	var rawResults []struct {
		Data json.RawMessage `gorm:"column:jsonb_build_object"`
	}
	rawQuery := `
SELECT jsonb_build_object(
    'courseId', courses.course_id,
    'year', courses.year,
    'title', courses.title,
    'numbering', courses.numbering,
    'courseNumber', courses.course_number,
    'numberOfProper', courses.number_of_proper,
    'numberOfCredits', courses.number_of_credits,
    'note', courses.note,
    'japaneseUrl', courses.japanese_url,
    'englishUrl', courses.english_url,
    'openAccount', courses.open_account,
    'max60CreditsFlag', courses.max60_credits_flag,
    'subjectDistinguished', courses.subject_distinguished,
    'courseDescription', courses.course_description,
    'instructors', (
        SELECT json_agg(
                json_build_object('name', i.name)
            )
        FROM (
                SELECT DISTINCT
                    instructors.name
                FROM responsibles
                    LEFT JOIN instructors ON responsibles.instructor_id = instructors.instructor_id
                WHERE
                    responsibles.course_id = courses.course_id
            ) i
    ),
    'schedules', (
        SELECT json_agg(
                json_build_object(
                    'day', s.day, 'period', s.period
                )
            )
        FROM (
                SELECT DISTINCT
                    day_periods.day, day_periods.period
                FROM schedules
                    LEFT JOIN day_periods ON schedules.day_period_id = day_periods.day_period_id
                WHERE
                    schedules.course_id = courses.course_id
            ) s
    ),
    'classFormat', class_formats.class_format,
    'lectureForm', lecture_forms.lecture_form,
    'targetStudents', target_students.target_students,
    'lectureRoomInfo', lecture_room_infos.lecture_room_info,
    'departmentName', departments.department_name,
    'faculty', json_build_object(
        'faculty', faculties.faculty, 'department', departments.department_name
    ),
    'keyword', (
        SELECT json_agg(k.keyword)
        FROM (
                SELECT DISTINCT
                    keywords.keyword
                FROM
                    course_keyword_relations
                    LEFT JOIN keywords ON course_keyword_relations.keyword_id = keywords.keyword_id
                WHERE
                    course_keyword_relations.course_id = courses.course_id
            ) k
    )
) AS jsonb_build_object
FROM
    courses
    LEFT JOIN class_formats ON courses.class_format_id = class_formats.class_format_id
    LEFT JOIN lecture_forms ON courses.lecture_form_id = lecture_forms.lecture_form_id
    LEFT JOIN target_students ON courses.target_students_id = target_students.target_students_id
    LEFT JOIN lecture_room_infos ON courses.lecture_room_info_id = lecture_room_infos.lecture_room_info_id
    LEFT JOIN departments ON courses.department_id = departments.department_id
    LEFT JOIN faculties ON departments.faculty_id = faculties.faculty_id
GROUP BY
    courses.course_id,
    courses.year,
    courses.title,
    courses.numbering,
    courses.course_number,
    courses.number_of_proper,
    courses.number_of_credits,
    courses.note,
    courses.japanese_url,
    courses.english_url,
    courses.open_account,
    courses.max60_credits_flag,
    courses.subject_distinguished,
    courses.course_description,
    class_formats.class_format,
    lecture_forms.lecture_form,
    target_students.target_students,
    lecture_room_infos.lecture_room_info,
    departments.department_name,
    faculties.faculty
ORDER BY courses.course_id;
`
	if err := db.Raw(rawQuery).Scan(&rawResults).Error; err != nil {
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
	return courses, nil
}

func CreateCourses(db *gorm.DB, courses *[]model.Course) ([]schema.Course, error) {
	var savedCourses []schema.Course
	result := db.Transaction(func(tx *gorm.DB) error {
		for _, course := range *courses {
			if savedCourse, error := CreateCourse(db, &course); error != nil {
				return error
			} else {
				savedCourses = append(savedCourses, savedCourse)
			}
		}
		return nil
	})
	if result != nil {
		return savedCourses, result
	} else {
		return savedCourses, nil
	}
}

func CreateCourse(db *gorm.DB, course *model.Course) (schema.Course, error) {
	var savedCourse schema.Course
	result := db.Transaction(func(tx *gorm.DB) error {
		faculty := schema.Faculty{Faculty: course.Faculty.Faculty}
		if err := tx.Model(&schema.Faculty{}).FirstOrCreate(&faculty).Error; err != nil {
			return err
		}

		department := schema.Department{DepartmentName: course.Faculty.Department, Faculty: &faculty}
		if err := tx.Model(&schema.Department{}).FirstOrCreate(&department).Error; err != nil {
			return err
		}

		classFormat := schema.ClassFormat{ClassFormat: course.ClassFormat}
		if err := tx.Model(&schema.ClassFormat{}).FirstOrCreate(&classFormat).Error; err != nil {
			return err
		}

		lectureForm := schema.LectureForm{LectureForm: course.LectureForm}
		if err := tx.Model(&schema.LectureForm{}).FirstOrCreate(&lectureForm).Error; err != nil {
			return err
		}

		targetStudents := schema.TargetStudents{TargetStudents: course.TargetStudents}
		if err := tx.Model(&schema.TargetStudents{}).FirstOrCreate(&targetStudents).Error; err != nil {
			return err
		}

		lectureRoomInfo := schema.LectureRoomInfo{LectureRoomInfo: course.LectureRoomInfo}
		if err := tx.Model(&schema.LectureRoomInfo{}).FirstOrCreate(&lectureRoomInfo).Error; err != nil {
			return err
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
		if err := tx.Model(&schema.Course{}).Create(&savedCourse).Error; err != nil {
			return err
		}

		semesters := []schema.Semester{}
		for _, semester := range course.Semester {
			a := schema.Semester{Semester: semester}
			if err := tx.Model(&schema.Semester{}).FirstOrCreate(&a).Error; err != nil {
				return err
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
			if err := tx.Model(&schema.CourseSemesterRelation{}).Create(&courseSemesterRelation).Error; err != nil {
				return err
			}
		}

		keywords := []schema.Keyword{}
		for _, keyword := range course.Keyword {
			a := schema.Keyword{Keyword: keyword}
			if err := tx.Model(&schema.Keyword{}).FirstOrCreate(&a).Error; err != nil {
				return err
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
			if err := tx.Model(&schema.CourseKeywordRelation{}).Create(&courseKeywordRelation).Error; err != nil {
				return err
			}
		}

		instructors := []schema.Instructor{}
		for _, instructor := range course.Instructors {
			a := schema.Instructor{Name: instructor.Name}
			if err := tx.Model(&schema.Instructor{}).FirstOrCreate(&a).Error; err != nil {
				return err
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
			if err := tx.Model(&schema.Responsible{}).Create(&responsible).Error; err != nil {
				return err
			}
		}

		dayPeriods := []schema.DayPeriod{}
		for _, schedule := range course.Schedules {
			dayPeriod := schema.DayPeriod{Day: schedule.Day, Period: schedule.Period}
			if err := tx.Model(&schema.DayPeriod{}).FirstOrCreate(&dayPeriod).Error; err != nil {
				return err
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
			if err := tx.Model(&schema.Schedule{}).Create(&schedules).Error; err != nil {
				return err
			}
		}

		return nil
	})
	if result != nil {
		return savedCourse, result
	}
	return savedCourse, nil
}
