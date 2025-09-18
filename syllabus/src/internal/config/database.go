package config

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func ConnectDatabase(host, port, user, password, dbname string) {
	var err error
	db, err = gorm.Open(postgres.Open(fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}
}

func MigrateDatabase(model ...interface{}) {
	if db == nil {
		log.Fatal("Database connection is not established")
	}

	db.AutoMigrate(model...)
}

func GetDB() *gorm.DB {
	return db
}
