package controllers

import (
	"errors"
	"log"

	"github.com/ToYama170402/rishu-app/syllabus/src/internal/config"
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/model"
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/repositories"
	"github.com/gin-gonic/gin"
)

type courseIDPathParam struct {
	ID int `uri:"courseID" binding:"required"`
}

func GetCourses(c *gin.Context) {
	db := config.GetDB()
	courses, err := repositories.GetCourses(db)
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	}
	c.JSON(200, gin.H{"courses": courses})
}

func GetCourseByID(c *gin.Context) {
	db := config.GetDB()
	var courseID courseIDPathParam

	if err := c.ShouldBindUri(&courseID); err != nil {
		c.JSON(400, gin.H{"error": "Invalid course ID"})
		return
	}
	course, err := repositories.GetCourseByID(db, courseID.ID)
	if errors.Is(err, repositories.ErrCourseNotFound) {
		c.JSON(404, gin.H{"error": "Course not found"})
		return
	}
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	}
	c.JSON(200, course)
}

func CreateCourses(c *gin.Context) {
	db := config.GetDB()
	var coursesRequest struct {
		Courses []model.Course `json:"courses" binding:"required"`
	}
	if err := c.BindJSON(&coursesRequest); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request body"})
		return
	}
	if savedCourses, err := repositories.CreateCourses(db, &coursesRequest.Courses); err != nil {
		log.Println(err)
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	} else {
		c.JSON(200, gin.H{"courses": savedCourses})
	}
}

func UpdateCourseByID(c *gin.Context) {
	db := config.GetDB()
	var courseID courseIDPathParam
	var courseData model.Course

	if err := c.ShouldBindUri(&courseID); err != nil {
		c.JSON(400, gin.H{"error": "Invalid course ID"})
		return
	}
	if err := c.BindJSON(&courseData); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request body"})
		return
	}
	course, err := repositories.UpdateCourseByID(db, courseID.ID, &courseData)
	if errors.Is(err, repositories.ErrCourseNotFound) {
		c.JSON(404, gin.H{"error": "Course not found"})
		return
	}
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	}
	c.JSON(200, gin.H{"course": course})
}

func DeleteCourseByID(c *gin.Context) {
	db := config.GetDB()
	var courseID courseIDPathParam

	if err := c.ShouldBindUri(&courseID); err != nil {
		c.JSON(400, gin.H{"error": "Invalid course ID"})
		return
	}
	err := repositories.DeleteCourseByID(db, courseID.ID)
	if errors.Is(err, repositories.ErrCourseNotFound) {
		c.JSON(404, gin.H{"error": "Course not found"})
		return
	}
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	}
	c.JSON(200, gin.H{"status": "success"})
}
