package repositories

import (
	"encoding/json"

	"github.com/ToYama170402/rishu-app/syllabus/src/internal/model"
	"gorm.io/gorm"
)

func GetCourses(db *gorm.DB) ([]model.Course, error) {
	var rawResults []struct {
		Data json.RawMessage `gorm:"column:jsonb_build_object"`
	}
	rawQuery := `
SELECT jsonb_build_object(
    'course_id', courses.course_id,
    'year', courses.year,
    'title', courses.title,
    'numbering', courses.numbering,
    'course_number', courses.course_number,
    'number_of_proper', courses.number_of_proper,
    'number_of_credits', courses.number_of_credits,
    'note', courses.note,
    'japanese_url', courses.japanese_url,
    'english_url', courses.english_url,
    'open_account', courses.open_account,
    'max60_credits_flag', courses.max60_credits_flag,
    'subject_distinguished', courses.subject_distinguished,
    'course_description', courses.course_description,
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
    'class_format', class_formats.class_format,
    'lecture_form', lecture_forms.lecture_form,
    'target_students', target_students.target_students,
    'lecture_room_info', lecture_room_infos.lecture_room_info,
    'department_name', departments.department_name,
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
