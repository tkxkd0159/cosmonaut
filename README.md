# Docker Compose testbed
## 1) set .env in cosmonaut-api folder
```sh
HOST_ADDR=0.0.0.0
PORT=3334
LOCAL_RUST_SET=false
SESS_SECRET=YOURSECRETKEYGOESHERE
PGHOST=pgdb
PGPORT=5432
PGUSER=ljs
PGPASSWORD=secret
PGDATABASE=cosmonaut
REDISHOST=redis-sess
REDISPORT=6379
REQ_TIMEOUT=5000
RUST_TIMEOUT=4000
TS_NODE_PROJECT=./tsconfig.prod.json
FRONT_HOST_ADDR="http://127.0.0.1:8080"
FRONT_MAIN_ADDR=/
FRONT_LOGIN_ADDR=/signUp
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```
## 2) build cosmo-rust image
```sh
cd cosmonaut-api
docker build -f compose.rust.Dockerfile -t cosmo-rust:dind .
```
## 3) Serve react-front
```sh
cd ..
./react-build.sh
```
## 4) Use docker compose to serve
```sh
cd ..
docker compose build

docker compose up # start app
docker compose down # stop app
```