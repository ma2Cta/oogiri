package handlers

import (
	"context"
	"net/http"
	"oogiri-backend/src/models" // 修正されたインポートパス
	"oogiri-backend/src/utils"
	"github.com/labstack/echo/v4"
	"log" // ログ出力のために追加
)

func GetGameHandler(c echo.Context) error {
	gameId := c.Param("gameId")

	if gameId == "" {
		return c.String(http.StatusBadRequest, "ゲームIDが指定されていません")
	}

	// 既存のFirestoreクライアントを使用
	ctx := context.Background()
	query := utils.FirestoreClient.Collection("games").Where("id", "==", gameId)
	docs, err := query.Documents(ctx).GetAll()
	if err != nil {
		log.Printf("Firestoreからゲームデータの取得に失敗しました: %v", err)
		return c.String(http.StatusInternalServerError, "ゲームデータの取得に失敗しました")
	}

	if len(docs) == 0 {
		log.Printf("指定されたゲームIDのデータが見つかりません: %v", gameId)
		return c.String(http.StatusNotFound, "指定されたゲームIDのデータが見つかりません")
	}

	var game models.Game
	if err := docs[0].DataTo(&game); err != nil {
		log.Printf("ゲームデータのパースに失敗しました: %v", err)
		return c.String(http.StatusInternalServerError, "ゲームデータのパースに失敗しました")
	}

	return c.JSON(http.StatusOK, game)
}