package handlers

import (
	"net/http"
	"github.com/labstack/echo/v4"
)

// JoinGameRequest はゲームに参加するためのリクエストの構造体です
type JoinGameRequest struct {
	GameID string `json:"game_id"`
	UserID string `json:"user_id"`
}

// JoinGame はゲームに参加するためのハンドラです
func JoinGame(c echo.Context) error {
	// ここにゲーム参加のロジックを追加
	return c.String(http.StatusOK, "Joined game")
}