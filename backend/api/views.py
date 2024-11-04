from django.http import HttpResponse, JsonResponse
from .models import (
    CourseRegistrationStatus,
    CourseRegistrationAdjustmentStatus,
    Syllabus,
)


def index(request):
    return HttpResponse("Hello, world. You're at the API index.")


def registration_term(request):
    all_course = Syllabus.objects.all()
    registration_statuses = []
    for course in all_course:
        registration_status = course.CourseRegistrationStatus_set.order_by(
            "-add_date"
        ).first()
        registration_status = {
            "Id": course.timetable_number,
            "Category": course.subject_distinguished.subject_distinguished,
            "Name": course.course_title,
            "Day": course.weekday,
            "Period": course.period,
            "Teacher": course.instructors.name,
            "Target": course.target_students.target_students,
            "Capacity": course.number_of_proper,
            "Primary": registration_status.primary,
            "First": registration_status.first_choice,
            "Second": registration_status.second_choice,
            "Third": registration_status.third_choice,
            "Fourth": registration_status.fourth_choice,
            "Fifth": registration_status.fifth_choice,
        }
    return JsonResponse(registration_statuses, safe=False)


def adjustment_term(request):
    all_course = Syllabus.objects.all()
    adjustment_statuses = []
    for course in all_course:
        adjustment_status = course.CourseRegistrationAdjustmentStatus_set.order_by(
            "-add_date"
        ).first()
        adjustment_status = {
            "Id": course.timetable_number,
            "Category": course.subject_distinguished.subject_distinguished,
            "Name": course.course_title,
            "Day": course.weekday,
            "Period": course.period,
            "Teacher": course.instructors.name,
            "Target": course.target_students.target_students,
            "Capacity": course.number_of_proper,
            "Registered": adjustment_status.registered,
        }
    return JsonResponse(adjustment_statuses, safe=False)
