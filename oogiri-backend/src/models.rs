use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct GameResponse {
    pub game_id: String,
}

#[derive(Deserialize)]
pub struct JoinGameRequest {
    pub game_id: String,
}

#[derive(Serialize, Deserialize)]
pub struct Player {
    pub id: String,
    pub name: String,
    pub score: i32,
}

#[derive(Serialize, Deserialize)]
pub struct GameData {
    pub id: String,
    pub status: String,
    pub players: Vec<Player>,
    pub current_round: i32,
    pub total_rounds: i32,
    pub theme: String,
}