from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Syllabus(models.Model):

    # モデルのフィールド

    # 科目名
    course_title = models.CharField(max_length=100)  # 科目名
    timetable_number = models.CharField(max_length=100)  # 時間割番号
    numbering = models.CharField(max_length=100)  # 科目ナンバー

    # 開講時期
    year = models.PositiveSmallIntegerField()  # 開講年度
    semester = models.ManyToManyField("Semester")  # 開講学期
    weekdat_period = models.ManyToManyField("WeekdayPeriod")  # 曜日・時限

    # 科目情報
    subject_distinguished = models.ForeignKey(  # 科目区分
        "SubjectDistinguished", on_delete=models.SET_NULL, null=True
    )
    is_intensive = models.BooleanField()  # 集中講義かどうか
    number_of_proper = models.PositiveSmallIntegerField()  # 適正人数
    target_students = models.ForeignKey(  # 対象学生
        "TargetStudents", on_delete=models.SET_NULL, null=True
    )
    lecture_room = models.ForeignKey(  # 教室
        "LectureRoom", on_delete=models.SET_NULL, null=True
    )
    instructors = models.ManyToManyField("Instructors")  # 担当教員
    faculty = models.ForeignKey(  # 開講学類・専攻 例）共通教育科目
        "Faculty", on_delete=models.SET_NULL, null=True
    )
    class_format = models.CharField(max_length=100)  # 講義形態 例）講義その他
    lectures_form = models.CharField(  # 授業形態 例）対面とオンラインの併用
        max_length=100
    )
    number_of_credit = models.DecimalField(max_digits=2,decimal_places=1)  # 単位数
    class_to_a_maximum_of_60_credit = models.BooleanField()  # 60単位上限

    # その他
    note = models.CharField(max_length=400)  # 備考
    explanation = models.TextField()  # 説明（全文）
    url = models.URLField()  # URL

    def __str__(self):
        return self.course_title


# 開講学期
class Semester(models.Model):

    # クオーターの選択肢
    SEMESTER = [
        (1, "第1クオーター"),
        (2, "第2クオーター"),
        (3, "第3クオーター"),
        (4, "第4クオーター"),
    ]

    semester = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(4)],
        choices=SEMESTER,
    )

    def __str__(self):
        return self.semester


class WeekdayPeriod(models.Model):

    # 曜日の選択肢
    WEEKDAY = [
        (0, "集中"),
        (1, "月曜日"),
        (2, "火曜日"),
        (3, "水曜日"),
        (4, "木曜日"),
        (5, "金曜日"),
        (6, "土曜日"),
        (7, "日曜日"),
    ]

    PERIOD = [
        (1, "1限"),
        (2, "2限"),
        (3, "3限"),
        (4, "4限"),
        (5, "5限"),
        (6, "6限"),
        (7, "7限"),
    ]

    weekday = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(7)], choices=WEEKDAY
    )
    period = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(7)],
        null=True,
        choices=PERIOD,
    )

    def __str__(self):
        return f"{self.get_weekday_display()} {self.get_period_display()}"


# 科目区分
class SubjectDistinguished(models.Model):
    subject_distinguished = models.CharField(max_length=100)

    def __str__(self):
        return self.subject_distinguished


# 担当講師
class Instructors(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# 対象学生
class TargetStudents(models.Model):
    target_students = models.CharField(max_length=100)

    def __str__(self):
        return self.target_students


# 開講学類・専攻
class Faculty(models.Model):
    faculty = models.CharField(max_length=100)

    def __str__(self):
        return self.faculty


# 講義室
class LectureRoom(models.Model):
    lecture_room = models.CharField(max_length=100)

    def __str__(self):
        return self.lecture_room


# 履修登録状況
class CourseRegistrationStatus(models.Model):
    primary = models.PositiveSmallIntegerField()
    first_choice = models.PositiveSmallIntegerField()
    second_choice = models.PositiveSmallIntegerField()
    third_choice = models.PositiveSmallIntegerField()
    fourth_choice = models.PositiveSmallIntegerField()
    fifth_choice = models.PositiveSmallIntegerField()
    add_date = models.DateTimeField(auto_now_add=True)
    course = models.ForeignKey("Syllabus", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.add_date} {self.course.course_title}"


# 補正期間中登録状況
class CourseRegistrationAdjustmentStatus(models.Model):
    registered = models.PositiveSmallIntegerField()
    add_date = models.DateTimeField(auto_now_add=True)
    course = models.ForeignKey("Syllabus", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.registered} {self.course.course_title}"
