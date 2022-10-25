# Docker Compose Testbed

## 1) Add cosmonaut-api/.env with contents:

```sh
HOST_ADDR=0.0.0.0
PORT=3334
LOCAL_RUST_SET=false
SESS_SECRET=<ENTER_SESS_SECRET>
REQ_TIMEOUT=130000
RUST_TIMEOUT=120000
TS_NODE_PROJECT=./tsconfig.prod.json
FRONT_HOST_ADDR="http://127.0.0.1:8080"
FRONT_MAIN_ADDR=/
FRONT_LOGIN_ADDR=/signUp
OAUTH_REDIRECT=[ONLY_SET_IF_PROXY]
GOOGLE_CLIENT_ID=<ENTER_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<ENTER_GOOGLE_CLIENT_SECRET>
GITHUB_CLIENT_ID=<ENTER_GITHUB_CLIENT_ID>
GITHUB_CLIENT_SECRET=<ENTER_GITHUB_CLIENT_SECRET>
REDISHOST=redis-sess
REDISPORT=6379
PGHOST=pgdb
PGPORT=5432
PGUSER=ljs
PGPASSWORD=secret # hardcoded for now with disabled ports
PGDATABASE=cosmonaut
```

#### For maximum timeout of HTTP request (ms) :

Set `REQ_TIMEOUT`

#### For maximum timeout of CosmWasm project build (ms) :

Set `RUST_TIMEOUT`

#### For OAuth registration

Set `GOOGLE_*` and `GITHUB_*`

#### For OAuth redirect from provider (optional) :

Set `OAUTH_REDIRECT` only when you use proxy server

#### For redirect address based on user login status:

Set `FRONT_MAIN_ADDR`, `FRONT_LOGIN_ADDR`

#### For CORS:

Set `FRONT_HOST_ADDR`

#### For DB:

Set `PG*` for PostgreSQL connection and `REDIS*` for Redis connection. You can customize those values as needed.

## 2) Add cosmonaut-frontend/.env with contents:
```sh
REACT_APP_API_ADDR=https://cosmonaut.cosmwasm.com
```

## 3) Run

Set `BUILD_ENV` args in `compose.yml` according to your situation ( production / development )

```sh
# Pull cosmo-rust image
docker pull tkxkd0159/cosmo-rust:latest

# Build react
# if you want rebuild react code, execute a script without 'new'
./react-build.sh [new]

# Build api-server and init Letsencrypt certificates
## Edit this file with staging=0 to get production-ready certificates
./init-letsencrypt.sh

# Start app
docker compose up -d
```

## \* Reset

```sh
docker compose down
docker volume rm cosmonaut_pgdb cosmonaut_cosmproj cosmonaut_cargo cosmonaut_cosmbase
```
