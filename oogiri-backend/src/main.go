package main

import (
	"log"
	"os"
	"oogiri-backend/src/handlers"
	"oogiri-backend/src/utils"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	// Firestoreクライアントの初期化
	if err := utils.InitFirestore(); err != nil {
		log.Fatalf("Failed to initialize Firestore: %v", err)
	}

	e.POST("/api/create_game", handlers.CreateGameHandler)
	e.GET("/api/games/:gameId", handlers.GetGameHandler)

	// 環境変数からオリジンを取得
	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
	if allowedOrigin == "" {
		allowedOrigin = "*" // デフォルト値
	}

	// CORSミドルウェアの設定
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{allowedOrigin},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
		AllowHeaders: []string{"*"},
	}))

	// サーバーの起動
	e.Logger.Fatal(e.Start(":8080"))
}