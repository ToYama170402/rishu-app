from django.http import HttpResponse, JsonResponse
from .models import (
    CourseRegistrationStatus,
    CourseRegistrationAdjustmentStatus,
    Syllabus,
)
from django.db.models import OuterRef, Subquery
from concurrent.futures import ThreadPoolExecutor
import os
from datetime import datetime


def get_semester_to_register():
    this_month = datetime.now().month
    if this_month == 4:
        registration_semester = 1
    elif this_month == 5:
        registration_semester = 2
    elif this_month == 9:
        registration_semester = 3
    elif this_month == 11:
        registration_semester = 4
    return registration_semester


def convert_weekday_period(weekday_period):
    weekday_table = ["集中", "月", "火", "水", "木", "金", "土", "日"]
    return [weekday_table[i.weekday] + str(i.period) for i in weekday_period.all()]


def index(request):
    return HttpResponse("Hello, world. You're at the API index.")


def registration_term(request):

    all_course = Syllabus.objects.filter(semester__semester=1, year=datetime.now().year)

    def get_registration_status(course):
        registration_status = course.courseregistrationstatus_set.order_by(
            "-add_date"
        ).first()
        if registration_status:
            print(registration_status)
            instructors = [i.name for i in course.instructors.all()]
            registration_status = {
                "Id": course.timetable_number,
                "Category": course.get_category(),
                "Name": course.course_title,
                "DayPeriod": convert_weekday_period(course.weekday_period),
                "Teacher": instructors,
                "Target": course.target_students.target_students,
                "Capacity": course.number_of_proper,
                "Primary": registration_status.primary,
                "First": registration_status.first_choice,
                "Second": registration_status.second_choice,
                "Third": registration_status.third_choice,
                "Fourth": registration_status.fourth_choice,
                "Fifth": registration_status.fifth_choice,
            }
            return registration_status
        return None

    with ThreadPoolExecutor() as executor:
        result = executor.map(get_registration_status, all_course)
    registration_status = [i for i in result if i]
    return JsonResponse(
        registration_status, json_dumps_params={"ensure_ascii": False}, safe=False
    )


def adjustment_term(request):
    all_course = Syllabus.objects.filter(
        semester__semester=get_semester_to_register(), year=datetime.now().year
    )
    adjustment_statuses = []

    def get_adjustment_status(course):
        adjustment_status = course.courseregistrationadjustmentstatus_set.order_by(
            "-add_date"
        ).first()
        if adjustment_status:
            instructors = [i.name for i in course.instructors.all()]
            adjustment_status = {
                "Id": course.timetable_number,
                "Category": course.get_category(),
                "Name": course.course_title,
                "Day": convert_weekday_period(course.weekday_period),
                "Teacher": instructors,
                "Target": course.target_students,
                "Capacity": course.number_of_proper,
                "Registered": adjustment_status.registered,
            }
            return adjustment_status
        return None
        with ThreadPoolExecutor() as executor:
            result = executor.map(get_adjustment_status, all_course)
        adjustment_statuses = [i for i in result if i]

    return JsonResponse(
        adjustment_statuses, safe=False, json_dumps_params={"ensure_ascii": False}
    )
