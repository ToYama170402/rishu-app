GROUP BY
  courses.course_id,
  class_formats.class_format,
  lecture_forms.lecture_form,
  target_students.target_students,
  lecture_room_infos.lecture_room_info,
  faculties.faculty,
  departments.department_name
ORDER BY
  courses.course_id;