use actix_web::{web, HttpResponse, Responder};
use uuid::Uuid;
use crate::models::{GameResponse, JoinGameRequest, GameData, Player};

pub async fn create_game() -> impl Responder {
    let game_id = Uuid::new_v4().to_string();
    HttpResponse::Ok().json(GameResponse { game_id })
}

pub async fn join_game(game_req: web::Json<JoinGameRequest>) -> impl Responder {
    HttpResponse::Ok().json(GameResponse { game_id: game_req.game_id.clone() })
}

pub async fn get_game_data(game_id: web::Path<String>) -> impl Responder {
    // ここでデータベースからゲームデータを取得する処理を実装します
    // この例では、仮のデータを返しています
    let game_data = GameData {
        id: game_id.into_inner(),
        status: "waiting".to_string(),
        players: vec![
            Player {
                id: Uuid::new_v4().to_string(),
                name: "Player 1".to_string(),
                score: 0,
            },
        ],
        current_round: 0,
        total_rounds: 3,
        theme: "初めてのお題".to_string(),
    };

    HttpResponse::Ok().json(game_data)
}

// 新しい構造体を追加
#[derive(serde::Serialize)]
struct HealthCheckResponse {
    status: String,
    message: String,
}

pub async fn health_check() -> impl Responder {
    let response = HealthCheckResponse {
        status: "healthy".to_string(),
        message: "サーバーは正常に動作しています".to_string(),
    };
    HttpResponse::Ok().json(response)
}