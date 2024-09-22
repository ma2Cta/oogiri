mod handlers;
mod models;
mod routes;

use actix_web::{App, HttpServer};
use actix_cors::Cors;
use actix_web::http::header;
use dotenv::dotenv;
use std::env;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    
    let frontend_url = env::var("FRONTEND_URL").unwrap_or_else(|_| "http://localhost:3000".to_string());
    
    println!("サーバーを起動中...");
    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin(&frontend_url)
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
            .allowed_header(header::CONTENT_TYPE)
            .max_age(3600);

        App::new()
            .wrap(cors)
            .configure(routes::config)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}