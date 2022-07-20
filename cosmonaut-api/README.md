# Setup
1. Setup Redis
2. Setup PostgreSQL & make account, database (Use db/schema)
3. Set .env (Refer to envSchema of config)
4. Build cosmo-rust image to build contract & Run

# Local Run

```bash
npm start # Run wihtout build for only dev purpose
```
## Local setting without Docker Compose
```sh
# Initialization
docker build -f rust.Dockerfile -t cosmo-rust:1.0 .

docker run -d -p 5432:5432 --name <pg_container_name> -e POSTGRES_USER=<id> -e POSTGRES_PASSWORD=<pw> postgres
docker run -d -p 6379:6379 --name <redis_container_name> redis

# Attach
docker exec -it <pg_container_name> psql -U <id> -d cosmonaut
docker exec -it <redis_container_name> redis-cli
```