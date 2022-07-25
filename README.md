# Docker Compose Testbed
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
REQ_TIMEOUT=130000
RUST_TIMEOUT=120000
TS_NODE_PROJECT=./tsconfig.prod.json
FRONT_HOST_ADDR="http://127.0.0.1:8080"
FRONT_MAIN_ADDR=/
FRONT_LOGIN_ADDR=/signUp
OAUTH_REDIRECT="http://127.0.0.1:8080"
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```
#### For maximum timeout of HTTP request (ms) :
Set `REQ_TIMEOUT`
#### For maximum timeout of CosmWasm project build (ms) :
Set `RUST_TIMEOUT`
#### For OAuth redirect from provider (optional) :
Set `OAUTH_REDIRECT` only when you use proxy server
#### For redirect address based on user login status:
Set `FRONT_MAIN_ADDR`, `FRONT_LOGIN_ADDR`
#### For CORS:
Set `FRONT_HOST_ADDR`

## 2) Run
```sh
# Pull cosmo-rust image
docker pull tkxkd0159/cosmo-rust:dind

# Build react
./react-build.sh

# Build api-server
docker compose build

# Start app
docker compose up
```
## * Reset
```sh
docker compose down
docker volume rm pgdb cosmproj
```
