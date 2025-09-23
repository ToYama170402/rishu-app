package main

import (
	"os"

	"github.com/ToYama170402/rishu-app/syllabus/src/api/routes"
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/config"
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/schema"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	dbHost := getEnv("POSTGRES_HOST", "syllabus-db")
	dbPort := getEnv("POSTGRES_PORT", "5432")
	dbUser := getEnv("POSTGRES_USER", "postgres")
	dbPassword := getEnv("POSTGRES_PASSWORD", "postgres")
	dbName := getEnv("POSTGRES_DB", "syllabus")

	config.ConnectDatabase(dbHost, dbPort, dbUser, dbPassword, dbName)

	config.MigrateDatabase(
		&schema.Responsible{},
		&schema.Instructor{},
		&schema.Schedule{},
		&schema.DayPeriod{},
		&schema.CourseKeywordRelation{},
		&schema.Keyword{},
		&schema.Course{},
		&schema.ClassFormat{},
		&schema.LectureForm{},
		&schema.TargetStudents{},
		&schema.LectureRoomInfo{},
		&schema.Department{},
		&schema.Faculty{},
		&schema.Semester{},
		&schema.CourseSemesterRelation{},
	)

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"*"},
		AllowMethods:  []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:  []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders: []string{"Content-Length"},
	}))

	routes.SetupRoutes(router)
	router.Run(":8080")
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
