use actix_web::web;
use crate::handlers;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/api/create_game", web::post().to(handlers::create_game))
        .route("/api/join_game", web::post().to(handlers::join_game))
        .route("/api/games/{game_id}", web::get().to(handlers::get_game_data));
}