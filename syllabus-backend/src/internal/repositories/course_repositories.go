package repositories

import (
	"encoding/json"
	"errors"
	"fmt"

	_ "embed"

	"github.com/ToYama170402/rishu-app/syllabus/src/internal/model"
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/schema"
	"gorm.io/gorm"
)

//go:embed sql/course_list_json_query_header.sql
var CourseListQueryHeader string

//go:embed sql/course_list_json_query_footer.sql
var CourseListQueryFooter string

var ErrCourseNotFound = errors.New("course not found")

func GetCourses(db *gorm.DB) (*[]model.Course, error) {
	var rawResults []struct {
		Data json.RawMessage `gorm:"column:jsonb_build_object"`
	}
	query := CourseListQueryHeader + CourseListQueryFooter
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
	query := CourseListQueryHeader + " WHERE courses.course_id = $1 " + CourseListQueryFooter
	result := db.Raw(query, courseID).Scan(&rawResult)
	if err := result.Error; err != nil {
		return nil, err
	}
	if result.RowsAffected == 0 {
		return nil, ErrCourseNotFound
	}
	if len(rawResult.Data) == 0 {
		return nil, ErrCourseNotFound
	}

	var course model.Course
	if err := json.Unmarshal(rawResult.Data, &course); err != nil {
		return nil, err
	}
	return &course, nil
}

func CreateCourses(db *gorm.DB, courses *[]model.Course) ([]*model.Course, error) {
	var savedCourses []*model.Course
	result := db.Transaction(func(tx *gorm.DB) error {
		for i := range *courses {
			course := &(*courses)[i]
			if savedCourse, err := createCourse(tx, course); err != nil {
				return err
			} else {
				savedCourses = append(savedCourses, savedCourse)
			}
		}
		return nil
	})
	if result != nil {
		return nil, result
	}
	return savedCourses, nil
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
		semesterInstance := schema.Semester{Semester: semester}
		if err := db.Model(&schema.Semester{}).FirstOrCreate(&semesterInstance, &semesterInstance).Error; err != nil {
			return nil, err
		}
		semesters = append(semesters, semesterInstance)
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
		keywordInstance := schema.Keyword{Keyword: keyword}
		if err := db.Model(&schema.Keyword{}).FirstOrCreate(&keywordInstance, &keywordInstance).Error; err != nil {
			return nil, err
		}
		keywords = append(keywords, keywordInstance)
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
		instructorInstance := schema.Instructor{Name: instructor.Name}
		if err := db.Model(&schema.Instructor{}).FirstOrCreate(&instructorInstance, &instructorInstance).Error; err != nil {
			return nil, err
		}
		instructors = append(instructors, instructorInstance)
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

	return convertSchemaCourseToModelCourse(
		&savedCourse,
		&semesters,
		&instructors,
		&dayPeriods,
		&keywords,
		&classFormat,
		&lectureForm,
		&targetStudents,
		&lectureRoomInfo,
		&department,
		&faculty,
	)
}

func convertSchemaCourseToModelCourse(
	schemaCourse *schema.Course,
	schemaSemester *[]schema.Semester,
	schemaInstructor *[]schema.Instructor,
	schemaDayPeriod *[]schema.DayPeriod,
	schemaKeywords *[]schema.Keyword,
	schemaClassFormat *schema.ClassFormat,
	schemaLectureForm *schema.LectureForm,
	schemaTargetStudents *schema.TargetStudents,
	schemaLectureRoomInfo *schema.LectureRoomInfo,
	schemaDepartment *schema.Department,
	schemaFaculty *schema.Faculty,
) (*model.Course, error) {
	var modelSemesters []int
	for _, semester := range *schemaSemester {
		modelSemesters = append(modelSemesters, semester.Semester)
	}

	var modelInstructors []model.Instructor
	for _, instructor := range *schemaInstructor {
		modelInstructors = append(modelInstructors, model.Instructor{
			Name: instructor.Name,
		})
	}

	var modelSchedules []model.Schedule
	for _, dayPeriod := range *schemaDayPeriod {
		modelSchedules = append(modelSchedules, model.Schedule{
			Day:    dayPeriod.Day,
			Period: dayPeriod.Period,
		})
	}

	var modelKeywords []string
	for _, keyword := range *schemaKeywords {
		modelKeywords = append(modelKeywords, keyword.Keyword)
	}

	modelFaculty := model.Faculty{
		Faculty:    schemaFaculty.Faculty,
		Department: schemaDepartment.DepartmentName,
	}

	newCourse := model.NewCourse(
		schemaCourse.CourseID,
		schemaCourse.Year,
		schemaCourse.Title,
		schemaCourse.Numbering,
		schemaCourse.CourseNumber,
		schemaCourse.NumberOfProper,
		modelSemesters,
		schemaCourse.NumberOfCredits,
		schemaCourse.Note,
		schemaCourse.JapaneseURL,
		schemaCourse.EnglishURL,
		schemaCourse.OpenAccount,
		schemaCourse.Max60CreditsFlag,
		schemaCourse.SubjectDistinguished,
		schemaCourse.CourseDescription,
		modelInstructors,
		modelSchedules,
		schemaClassFormat.ClassFormat,
		schemaLectureForm.LectureForm,
		schemaTargetStudents.TargetStudents,
		schemaLectureRoomInfo.LectureRoomInfo,
		modelFaculty,
		modelKeywords,
	)
	return newCourse, nil
}

// replaceManyToManyRelation はCourseと多対多の関係にあるテーブルとその中間テーブルを更新する関数です。
// T: 更新する内容が含まれるデータの型
// U: Courseと多対多の関係にある更新先のテーブルの型
// V: 中間テーブルの型
// tx: トランザクション用のgorm.DBインスタンス
// courseID: 更新対象のCourseのID
// updatedData: 更新後のデータ
// model: 更新先テーブルのモデル
// relationModel: 中間テーブルのモデル
// createModel: updatedDataから更新先テーブルのモデルを生成する関数
// createRelation: CourseIDと更新先テーブルのモデルから中間テーブルモデルを生成する関数
func replaceManyToManyRelation[T any, U any, V any](
	tx *gorm.DB,
	courseID int,
	updatedData []T,
	model *U,
	relationModel *V,
	createModel func(model T) U,
	createRelation func(courseID int, model U) V,
) (*[]U, error) {
	if err := tx.Model(&relationModel).
		Where("course_id = ?", courseID).
		Delete(&relationModel).Error; err != nil {
		return nil, fmt.Errorf("failed to delete relationModel: %w", err)
	}
	var updatedModel []U
	for i := range updatedData {
		data := updatedData[i]
		modelInstance := createModel(data)
		if err := tx.Model(&model).FirstOrCreate(&modelInstance, &modelInstance).Error; err != nil {
			return nil, fmt.Errorf("failed to get first model or create it: %w", err)
		}
		updatedModel = append(updatedModel, modelInstance)
		relation := createRelation(courseID, modelInstance)
		if err := tx.Model(&relationModel).Create(&relation).Error; err != nil {
			return nil, fmt.Errorf("failed to create relationModel: %w", err)
		}
	}
	return &updatedModel, nil
}

func UpdateCourseByID(
	db *gorm.DB,
	courseID int,
	updatedCourse *model.Course,
) (*model.Course, error) {
	var existingCourse *schema.Course
	var updatedSchemaSemester *[]schema.Semester
	var updatedSchemaInstructors *[]schema.Instructor
	var updatedSchemaDayPeriods *[]schema.DayPeriod
	var updatedSchemaKeywords *[]schema.Keyword
	var updatedSchemaClassFormat *schema.ClassFormat
	var updatedSchemaLectureForm *schema.LectureForm
	var updatedSchemaTargetStudents *schema.TargetStudents
	var updatedSchemaLectureRoomInfo *schema.LectureRoomInfo
	var updatedSchemaFaculty *schema.Faculty
	var updatedSchemaDepartment *schema.Department

	err := db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Model(&schema.Course{}).
			Where("course_id = ?", courseID).
			First(&existingCourse).
			Error; errors.Is(err, gorm.ErrRecordNotFound) {
			return ErrCourseNotFound
		} else if err != nil {
			return fmt.Errorf("failed to fetch existing course: %w", err)
		}

		var err error

		// Update semesters
		updatedSchemaSemester, err = replaceManyToManyRelation(
			tx,
			courseID,
			updatedCourse.Semester,
			&schema.Semester{},
			&schema.CourseSemesterRelation{},
			func(semester int) schema.Semester { return schema.Semester{Semester: semester} },
			func(courseID int, semester schema.Semester) schema.CourseSemesterRelation {
				return schema.CourseSemesterRelation{
					CourseID:   courseID,
					SemesterID: semester.SemesterID,
				}
			},
		)
		if err != nil {
			return fmt.Errorf("failed to update semester: %w", err)
		}

		// Update instructors
		updatedSchemaInstructors, err = replaceManyToManyRelation(
			tx,
			courseID,
			updatedCourse.Instructors,
			&schema.Instructor{},
			&schema.Responsible{},
			func(instructor model.Instructor) schema.Instructor {
				return schema.Instructor{Name: instructor.Name}
			},
			func(courseID int, instructor schema.Instructor) schema.Responsible {
				return schema.Responsible{
					CourseID:     courseID,
					InstructorID: instructor.InstructorID,
				}
			},
		)
		if err != nil {
			return fmt.Errorf("failed to update instructors: %w", err)
		}

		// Update schedules
		updatedSchemaDayPeriods, err = replaceManyToManyRelation(
			tx,
			courseID,
			updatedCourse.Schedules,
			&schema.DayPeriod{},
			&schema.Schedule{},
			func(schedule model.Schedule) schema.DayPeriod {
				return schema.DayPeriod{
					Day:    schedule.Day,
					Period: schedule.Period,
				}
			},
			func(courseID int, dayPeriod schema.DayPeriod) schema.Schedule {
				return schema.Schedule{
					CourseID:    courseID,
					DayPeriodID: dayPeriod.DayPeriodID,
				}
			},
		)
		if err != nil {
			return fmt.Errorf("failed to update schedules: %w", err)
		}

		// Update keywords
		updatedSchemaKeywords, err = replaceManyToManyRelation(
			tx,
			courseID,
			updatedCourse.Keywords,
			&schema.Keyword{},
			&schema.CourseKeywordRelation{},
			func(keyword string) schema.Keyword {
				return schema.Keyword{Keyword: keyword}
			},
			func(courseID int, keyword schema.Keyword) schema.CourseKeywordRelation {
				return schema.CourseKeywordRelation{
					CourseID:  courseID,
					KeywordID: keyword.KeywordID,
				}
			},
		)
		if err != nil {
			return fmt.Errorf("failed to update keywords: %w", err)
		}

		// Update class format if needed
		classFormat := &schema.ClassFormat{ClassFormat: updatedCourse.ClassFormat}
		if err := tx.Model(&schema.ClassFormat{}).FirstOrCreate(&classFormat, &classFormat).Error; err != nil {
			return fmt.Errorf("failed to get first classFormat or create it: %w", err)
		}
		updatedSchemaClassFormat = classFormat
		existingCourse.ClassFormatID = classFormat.ClassFormatID

		// Update lecture form if needed
		lectureForm := &schema.LectureForm{LectureForm: updatedCourse.LectureForm}
		if err := tx.Model(&schema.LectureForm{}).FirstOrCreate(&lectureForm, &lectureForm).Error; err != nil {
			return fmt.Errorf("failed to get first lectureForm or create it: %w", err)
		}
		updatedSchemaLectureForm = lectureForm
		existingCourse.LectureFormID = lectureForm.LectureFormID

		// Update target students if needed
		targetStudents := &schema.TargetStudents{TargetStudents: updatedCourse.TargetStudents}
		if err := tx.Model(&schema.TargetStudents{}).FirstOrCreate(&targetStudents, &targetStudents).Error; err != nil {
			return fmt.Errorf("failed to get first targetStudents or create it: %w", err)
		}
		updatedSchemaTargetStudents = targetStudents
		existingCourse.TargetStudentsID = targetStudents.TargetStudentsID

		// Update lecture room info if needed
		lectureRoomInfo := &schema.LectureRoomInfo{LectureRoomInfo: updatedCourse.LectureRoomInfo}
		if err := tx.Model(&schema.LectureRoomInfo{}).FirstOrCreate(&lectureRoomInfo, &lectureRoomInfo).Error; err != nil {
			return fmt.Errorf("failed to get first lectureRoomInfo or create it: %w", err)
		}
		updatedSchemaLectureRoomInfo = lectureRoomInfo
		existingCourse.LectureRoomInfoID = lectureRoomInfo.LectureRoomInfoID

		// Update faculty and department if needed
		faculty := &schema.Faculty{Faculty: updatedCourse.Faculty.Faculty}
		if err := tx.Model(&schema.Faculty{}).FirstOrCreate(&faculty, &faculty).Error; err != nil {
			return fmt.Errorf("failed to get first Faculty or create it: %w", err)
		}
		updatedSchemaFaculty = faculty

		department := &schema.Department{
			DepartmentName: updatedCourse.Faculty.Department,
			FacultyID:      faculty.FacultyID,
		}
		if err := tx.Model(&schema.Department{}).FirstOrCreate(&department, &department).Error; err != nil {
			return fmt.Errorf("failed to get first Department or create it: %w", err)
		}
		updatedSchemaDepartment = department
		existingCourse.DepartmentID = department.DepartmentID

		existingCourse.Year = updatedCourse.Year
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

		if err := tx.Model(&schema.Course{}).
			Where("course_id = ?", existingCourse.CourseID).
			Save(&existingCourse).Error; err != nil {
			return fmt.Errorf("failed to update existing course: %w", err)
		}

		return nil
	})
	if err != nil {
		return nil, err
	}
	return convertSchemaCourseToModelCourse(
		existingCourse,
		updatedSchemaSemester,
		updatedSchemaInstructors,
		updatedSchemaDayPeriods,
		updatedSchemaKeywords,
		updatedSchemaClassFormat,
		updatedSchemaLectureForm,
		updatedSchemaTargetStudents,
		updatedSchemaLectureRoomInfo,
		updatedSchemaDepartment,
		updatedSchemaFaculty,
	)
}

func DeleteCourseByID(db *gorm.DB, courseID int) error {
	return db.Transaction(func(tx *gorm.DB) error {
		if result := tx.Model(&schema.Course{}).
			Where("course_id = ?", courseID).
			Delete(&schema.Course{}); result.Error != nil {
			return result.Error
		} else if result.RowsAffected == 0 {
			return ErrCourseNotFound
		}
		return nil
	})
}
