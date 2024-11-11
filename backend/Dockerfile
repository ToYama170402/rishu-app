FROM python:3.12.5-slim-bullseye
ENV PYTHONUNBUFFERD=1

WORKDIR /workspace

COPY ./requirements.txt .
RUN pip install --upgrade pip\
  && pip install --upgrade setuptools\
  && pip install -r requirements.txt
COPY . .
RUN python manage.py migrate
RUN python manage.py loaddata api.Faculty.json api.Instructors.json api.LectureRoom.json api.Semester.json api.Syllabus.json api.TargetStudents.json api.WeekdayPeriod.json
CMD [ "gunicorn","app.wsgi:application","--bind","0.0.0.0:8000" ]
