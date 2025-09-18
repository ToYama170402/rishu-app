package routes

import (
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	courses := router.Group("/courses")
	{
		courses.GET("", controllers.GetCourses)
	}
}
