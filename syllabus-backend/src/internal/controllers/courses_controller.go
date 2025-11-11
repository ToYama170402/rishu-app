package controllers

import (
	"errors"

	"github.com/ToYama170402/rishu-app/syllabus/src/internal/config"
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/model"
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/repositories"
	"github.com/gin-gonic/gin"
)

type courseId struct {
	Id int `uri:"courseID" binding:"required"`
}

func GetCourses(c *gin.Context) {
	db := config.GetDB()
	courses, err := repositories.GetCourses(db)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, courses)
}

func GetCourseByID(c *gin.Context) {
	db := config.GetDB()
	var courseID courseId

	if err := c.ShouldBindUri(&courseID); err != nil {
		c.JSON(400, gin.H{"error": "Invalid course ID"})
		return
	}
	course, err := repositories.GetCourseByID(db, courseID.Id)
	if errors.Is(err, repositories.ErrCourseNotFound) {
		c.JSON(404, gin.H{"error": "Course not found"})
		return
	}
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, course)
}

func CreateCourses(c *gin.Context) {
	db := config.GetDB()
	var course []model.Course
	if err := c.BindJSON(&course); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	if course, err := repositories.CreateCourses(db, &course); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	} else {
		c.JSON(200, gin.H{"status": "success", "course": course})
	}
}

func UpdateCourseByID(c *gin.Context) {
	db := config.GetDB()
	var courseID courseId
	var courseData model.Course

	if err := c.ShouldBindUri(&courseID); err != nil {
		c.JSON(400, gin.H{"error": "Invalid course ID"})
		return
	}
	if err := c.BindJSON(&courseData); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	course, err := repositories.UpdateCourseByID(db, courseID.Id, &courseData)
	if errors.Is(err, repositories.ErrCourseNotFound) {
		c.JSON(404, gin.H{"error": "Course not found"})
		return
	}
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"status": "success", "course": course})
}

func DeleteCourseByID(c *gin.Context) {
	db := config.GetDB()
	var courseID courseId

	if err := c.ShouldBindUri(&courseID); err != nil {
		c.JSON(400, gin.H{"error": "Invalid course ID"})
		return
	}
	if err := repositories.
		DeleteCourseByID(db, courseID.Id); errors.Is(err, repositories.ErrCourseNotFound) {
		c.JSON(404, gin.H{"error": "Course not found"})
		return
	} else if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"status": "success"})
}
