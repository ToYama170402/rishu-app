package controllers

import (
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/config"
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
