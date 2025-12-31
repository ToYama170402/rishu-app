SELECT
  jsonb_build_object (
    'courseId',
    courses.course_id,
    'year',
    courses.year,
    'title',
    courses.title,
    'numbering',
    courses.numbering,
    'courseNumber',
    courses.course_number,
    'numberOfProper',
    courses.number_of_proper,
    'semester',
    json_agg (DISTINCT semesters.semester) FILTER (
      WHERE
        semesters.semester IS NOT NULL
    ),
    'numberOfCredits',
    courses.number_of_credits,
    'note',
    courses.note,
    'japaneseUrl',
    courses.japanese_url,
    'englishUrl',
    courses.english_url,
    'openAccount',
    courses.open_account,
    'max60CreditsFlag',
    courses.max60_credits_flag,
    'subjectDistinguished',
    courses.subject_distinguished,
    'courseDescription',
    courses.course_description,
    'instructors',
    json_agg (
      DISTINCT jsonb_build_object ('name', instructors.name)
    ) FILTER (
      WHERE
        instructors.name IS NOT NULL
    ),
    'schedules',
    json_agg (
      DISTINCT jsonb_build_object (
        'day',
        day_periods.day,
        'period',
        day_periods.period
      )
    ) FILTER (
      WHERE
        day_periods.day IS NOT NULL
        AND day_periods.period IS NOT NULL
    ),
    'classFormat',
    class_formats.class_format,
    'lectureForm',
    lecture_forms.lecture_form,
    'targetStudents',
    target_students.target_students,
    'lectureRoomInfo',
    lecture_room_infos.lecture_room_info,
    'faculty',
    json_build_object (
      'faculty',
      faculties.faculty,
      'department',
      departments.department_name
    ),
    'keywords',
    json_agg (DISTINCT keywords.keyword) FILTER (
      WHERE
        keywords.keyword IS NOT NULL
    )
  )
FROM
  courses
  LEFT JOIN class_formats ON courses.class_format_id = class_formats.class_format_id
  LEFT JOIN lecture_forms ON courses.lecture_form_id = lecture_forms.lecture_form_id
  LEFT JOIN target_students ON courses.target_students_id = target_students.target_students_id
  LEFT JOIN lecture_room_infos ON courses.lecture_room_info_id = lecture_room_infos.lecture_room_info_id
  LEFT JOIN departments ON courses.department_id = departments.department_id
  LEFT JOIN faculties ON departments.faculty_id = faculties.faculty_id
  LEFT JOIN course_semester_relations on course_semester_relations.course_id = courses.course_id
  LEFT JOIN semesters on course_semester_relations.semester_id = semesters.semester_id
  LEFT JOIN responsibles on responsibles.course_id = courses.course_id
  LEFT JOIN instructors on responsibles.instructor_id = instructors.instructor_id
  LEFT JOIN schedules on courses.course_id = schedules.course_id
  LEFT JOIN day_periods on schedules.day_period_id = day_periods.day_period_id
  LEFT JOIN course_keyword_relations on course_keyword_relations.course_id = courses.course_id
  LEFT JOIN keywords on keywords.keyword_id = course_keyword_relations.keyword_id
