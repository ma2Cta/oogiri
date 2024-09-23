package handlers

import (
	"context"
	"net/http"
	"time"
	"github.com/google/uuid"
	"oogiri-backend/src/utils"
	"github.com/labstack/echo/v4"
	"log"  // 追加
)

// CreateGame はゲームを作成するためのハンドラです
func CreateGame(c echo.Context) error {
	log.Println("CreateGame handler started")  // デバッグログ追加

	ctx := context.Background()
	gameId := uuid.New().String()  // UUIDを生成
	log.Printf("Generated gameId: %s", gameId)  // デバッグログ追加

	game := map[string]interface{}{
		"gameId": gameId,
		"createdAt": time.Now(),
	}

	_, _, err := utils.FirestoreClient.Collection("games").Add(ctx, game)
	if err != nil {
		log.Printf("Failed to create game: %v", err)  // デバッグログ追加
		return c.String(http.StatusInternalServerError, "Failed to create game")
	}

	log.Println("Game created successfully")  // デバッグログ追加
	return c.String(http.StatusOK, "Game created")
}