package utils

import (
    "crypto/rand"
    "encoding/hex"
    "context"
    "os"
    "fmt"
    "log"

    "cloud.google.com/go/firestore"
    "google.golang.org/api/option"
)

var FirestoreClient *firestore.Client

func GenerateGameID() string {
    bytes := make([]byte, 16)
    rand.Read(bytes)
    return hex.EncodeToString(bytes)
}

// InitFirestore はFirestoreクライアントを初期化する関数です
func InitFirestore() error {
    ctx := context.Background()
  	log.Println("InitFirestore started: "+ os.Getenv("GOOGLE_APPLICATION_CREDENTIALS"))  // デバッグログ追加
    credentialsFile := os.Getenv("GOOGLE_APPLICATION_CREDENTIALS") // 環境変数から読み込み
    if credentialsFile == "" {
        return fmt.Errorf("GOOGLE_APPLICATION_CREDENTIALS environment variable not set")
    }
    sa := option.WithCredentialsFile(credentialsFile)
    client, err := firestore.NewClient(ctx, "oogiri-dev", sa)
    if err != nil {
        return err
    }
    FirestoreClient = client
    return nil
}