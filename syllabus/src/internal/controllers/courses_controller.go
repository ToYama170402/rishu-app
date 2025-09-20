package controllers

import (
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/config"
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/model"
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/repositories"
	"github.com/gin-gonic/gin"
)

func GetCourses(c *gin.Context) {
	db := config.GetDB()
	courses, err := repositories.GetCourses(db)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, courses)
}

func SaveCourses(c *gin.Context) {
	db := config.GetDB()
	var course []model.Course
	if err := c.BindJSON(&course); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	if course, err := repositories.SaveCourses(db, &course); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	} else {
		c.JSON(200, gin.H{"status": "success", "course": course})
	}
}
