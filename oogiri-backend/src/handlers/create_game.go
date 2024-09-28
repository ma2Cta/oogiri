package handlers

import (
	"context"
	"net/http"
	"time"
	"github.com/google/uuid"
	"oogiri-backend/src/utils"
	"oogiri-backend/src/models" // 追加
	"github.com/labstack/echo/v4"
	"log"
)

// CreateGame はゲームを作成するためのハンドラです
func CreateGameHandler(c echo.Context) error {
	log.Println("CreateGame handler started")

	ctx := context.Background()
	gameId := uuid.New().String()
	log.Printf("Generated gameId: %s", gameId)

	game := models.Game{
		ID:          gameId,
		CreatedAt:   time.Now().Unix(),
		UpdatedAt:   time.Now().Unix(),
		Status:      "waiting",
		PlayerIDs:     []string{},
		CurrentRound: 0,
		TotalRounds:  0,
		Theme:       "",
		Answers:     []models.Answer{},
	}

	_, _, err := utils.FirestoreClient.Collection("games").Add(ctx, game)
	if err != nil {
		log.Printf("Failed to create game: %v", err)
		return c.String(http.StatusInternalServerError, "Failed to create game")
	}

	log.Println("Game created successfully")
	return c.JSON(http.StatusOK, map[string]interface{}{
		"id":           game.ID,
		"createdAt":    game.CreatedAt,
		"updatedAt":    game.UpdatedAt,
		"status":       game.Status,
		"playerIds":    game.PlayerIDs,
		"currentRound": game.CurrentRound,
		"totalRounds":  game.TotalRounds,
		"theme":        game.Theme,
		"answers":      game.Answers,
	})
}