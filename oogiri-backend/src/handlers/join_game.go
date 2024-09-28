package handlers

import (
	"net/http"
	"encoding/json"
	// "github.com/labstack/echo/v4" // 未使用のため削除
)

// JoinGameRequest はゲームに参加するためのリクエストの構造体です
type JoinGameRequest struct {
	GameID   string `json:"gameId"`
	Username string `json:"username"` // 追加
}

// JoinGame はゲームに参加するためのハンドラです
func JoinGameHandler(w http.ResponseWriter, r *http.Request) {
	var req JoinGameRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// ユーザー名を使用してゲームに参加するロジックを追加
	err := joinGame(req.GameID, req.Username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// joinGame はゲームにユーザーを参加させるための関数です
func joinGame(gameID, username string) error {
	// ここにゲーム参加のロジックを実装
	return nil
}