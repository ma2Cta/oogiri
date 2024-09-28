package models

type Game struct {
    ID          string   `firestore:"id"`
    Name        string   `firestore:"name"`
    Description string   `firestore:"description"`
    CreatedAt   int64    `firestore:"created_at"`
    UpdatedAt   int64    `firestore:"updated_at"`
    Status      string   `firestore:"status"`       // 'waiting', 'in_progress', 'finished'
    PlayerIDs   []string `firestore:"playerIds"`
    CurrentRound int     `firestore:"current_round"`
    TotalRounds  int     `firestore:"total_rounds"`
    Theme       string   `firestore:"theme"`
    Answers     []Answer `firestore:"answers"`
}

type Player struct {
    ID       string `firestore:"id"`
    Username string `firestore:"username"` // 追加
    Score    int    `firestore:"score"`
}

type Answer struct {
    ID       string `firestore:"id"`
    Content  string `firestore:"content"`
    PlayerID string `firestore:"player_id"`
}