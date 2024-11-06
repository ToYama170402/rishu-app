from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
import logging
from .models import (
    CourseRegistrationAdjustmentStatus,
    Syllabus,
    Semester,
    WeekdayPeriod,
    TargetStudents,
    LectureRoom,
    Faculty,
    Instructors,
)
from .rishu_scraping import scrapeRegistrationStatus, scrapeSyllabus
import re


def parseWeekdayPeriod(weekday_period: str):
    if weekday_period == "集中":
        return (0, None)
    else:
        weekday, period = weekday_period
        if weekday == "月":
            weekday = 1
        elif weekday == "火":
            weekday = 2
        elif weekday == "水":
            weekday = 3
        elif weekday == "木":
            weekday = 4
        elif weekday == "金":
            weekday = 5
        elif weekday == "土":
            weekday = 6
        elif weekday == "日":
            weekday = 7
        return (weekday, int(period))


def data_fetch():
    print("Data Fetching Job")
    try:
        data = scrapeRegistrationStatus()
    except Exception as e:
        print("Error in data fetching job")
        return
    if len(data) == 0:
        print("No data")
        return
    for row in data:
        course_numbering = row[0]
        primary = row[8]
        first_choice = row[9]
        second_choice = row[10]
        third_choice = row[11]
        fourth_choice = row[12]
        fifth_choice = row[13]
        try:
            course = Syllabus.objects.order_by("-year").get(
                course_numbering=course_numbering
            )
        except Syllabus.DoesNotExist:
            try:
                course = scrapeSyllabus(course_numbering)
            except Exception as e:
                print("Error in data fetching job")
                return

            # 科目名
            course_title = course[0]
            timetable_number = course[4]
            numbering = course[2] if course[2] != "-----" else ""

            # 開講時期
            semesters = [int(i) for i in re.sub("Q", "", course[9]).split(",")]
            weekday_periods = map(parseWeekdayPeriod, course[10].split(","))
            subject_distinguished = None

            # 科目情報
            is_intensive = True if course[10] == "集中" else False
            number_of_proper = (
                int(re.sub("人", "", course[8])) if re.match("人", course[8]) else None
            )
            target_student = course[14]
            lecture_room = course[16]
            instructors = re.sub(r"\[.*?\]", "", course[1]).split(",")
            faculty = course[7]
            class_format = course[6] if course[6] != "-----" else ""
            lecture_form = course[12]
            number_of_credit = float(re.sub("単位", "", course[11]))
            class_to_a_maximum_of_60_credit = True if course[13] == "対象" else False

            # その他
            note = course[18] if course[18] != "-----" else ""
            explanation = course[19]
            url = course[20]

            try:
                target_student = TargetStudents.objects.get(
                    target_student=target_student
                )
            except TargetStudents.DoesNotExist:
                target_student = TargetStudents.objects.create(
                    target_student=target_student
                )
            try:
                lecture_room = LectureRoom.objects.get(lecture_room=lecture_room)
            except LectureRoom.DoesNotExist:
                lecture_room = LectureRoom.objects.create(lecture_room=lecture_room)
            try:
                faculty = Faculty.objects.get(faculty=faculty)
            except Faculty.DoesNotExist:
                faculty = Faculty.objects.create(faculty=faculty)

            course = Syllabus.objects.create(
                course_title=course_title,
                timetable_number=timetable_number,
                numbering=numbering,
                year=datetime.now().year,
                is_intensive=is_intensive,
                number_of_proper=number_of_proper,
                target_students=target_student,
                lecture_room=lecture_room,
                faculty=faculty,
                class_format=class_format,
                lectures_form=lecture_form,
                number_of_credit=number_of_credit,
                class_to_a_maximum_of_60_credit=class_to_a_maximum_of_60_credit,
                note=note,
                explanation=explanation,
                url=url,
            )

            for semester in semesters:
                try:
                    semester = Semester.objects.get(semester=semester)
                except Semester.DoesNotExist:
                    semester = Semester.objects.create(semester=semester)
                course.semester.add(semester)
            for weekday_period in weekday_periods:
                try:
                    weekday_period = WeekdayPeriod.objects.get(
                        weekday_period=weekday_period
                    )
                except WeekdayPeriod.DoesNotExist:
                    weekday_period = WeekdayPeriod.objects.create(
                        weekday=weekday_period[0], period=weekday_period[1]
                    )
                course.weekday_period.add(weekday_period)
            for instructor in instructors:
                try:
                    instructor = Instructors.objects.get(instructor=instructor)
                except Instructors.DoesNotExist:
                    instructor = Instructors.objects.create(instructor=instructor)
                course.instructors.add(instructor)

        CourseRegistrationAdjustmentStatus.objects.create(
            primary=primary,
            first_choice=first_choice,
            second_choice=second_choice,
            third_choice=third_choice,
            fourth_choice=fourth_choice,
            fifth_choice=fifth_choice,
            course=course,
        )


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(data_fetch, "cron", second=3, coalesce=True)
    scheduler.start()
