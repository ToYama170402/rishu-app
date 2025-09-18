package main

import (
	"os"

	"github.com/ToYama170402/rishu-app/syllabus/src/api/routes"
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/config"
	"github.com/ToYama170402/rishu-app/syllabus/src/internal/models"
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
		&models.Responsible{},
		&models.Instructor{},
		&models.Schedule{},
		&models.DayPeriod{},
		&models.CourseKeywordRelation{},
		&models.Keyword{},
		&models.Course{},
		&models.ClassFormat{},
		&models.LectureForm{},
		&models.TargetStudents{},
		&models.LectureRoomInfo{},
		&models.Department{},
		&models.Faculty{},
	)

	router := gin.Default()
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
