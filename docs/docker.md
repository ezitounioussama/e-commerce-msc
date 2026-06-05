# Dockerization Guide

## Architecture

```
┌──────────────┐     ┌──────────────┐
│   Client     │     │   Server     │
│  (Vite dev)  │────▶│  (Express)   │
│  :5173       │     │  :5000       │
└──────────────┘     └──────┬───────┘
                            │
                    ┌───────▼───────┐
                    │   MongoDB     │
                    │    Atlas      │
                    │  (external)   │
                    └───────────────┘
```

- **Client** — Vite dev server, serves the React SPA on port `5173`
- **Server** — Express API on port `5000`, connects to MongoDB Atlas
- **MongoDB** — hosted externally on Atlas (no container needed)
- **Network** — both containers share the `ecommerce-net` bridge network

## Startup Flow

```
Container start
      │
      ▼
 docker-entrypoint.sh
      │
      ├── node seed.js        (skips if products exist)
      ├── node seedAdmin.js   (skips if admin exists)
      │
      ▼
 node --watch server.js
```

## Services

### server
| | |
|---|---|
| Port | `5000` |
| Image | `node:22-alpine` |
| Entrypoint | `docker-entrypoint.sh` — runs seeds, then starts server |
| CMD | `node --watch server.js` (auto-restarts on file changes) |
| Env | loaded from `server/.env` |

### client
| | |
|---|---|
| Port | `5173` |
| Image | `node:22-alpine` (dev target) |
| CMD | `pnpm dev --host 0.0.0.0` |
| Env | loaded from `client/.env` |

## Volumes

| Volume name | Mounts to | Purpose |
|---|---|---|
| `./server` (bind) | `/app` | Live source code sync |
| `server_node_modules` (named) | `/app/node_modules` | Persist installed deps, avoid reinstall on host changes |
| `./client` (bind) | `/app` | Live source code sync (hot-reload) |
| `client_node_modules` (named) | `/app/node_modules` | Persist installed deps, avoid reinstall on host changes |

## Network

- **`ecommerce-net`** — bridge network connecting client ↔ server
- Containers resolve each other by service name (`client`, `server`)

## Getting Started

### Prerequisites

- Docker Engine 24+
- Docker Compose v2

### Start the application

```bash
# from the project root
docker compose up -d
```

This starts both services in detached mode.

### View logs

```bash
# all services
docker compose logs -f

# specific service
docker compose logs -f server
docker compose logs -f client
```

### Stop the application

```bash
docker compose down
```

### Stop and remove volumes (reset state)

```bash
docker compose down -v
```

### Auto-seeding on startup

The server container automatically runs seeds on every start:

1. **`node seed.js`** — Fetches products from Fake Store API if the products collection is empty; skips if products already exist.
2. **`node seedAdmin.js`** — Creates the admin user (`admin@shopmsc.com` / `admin123`) if it doesn't already exist.

No manual seeding is needed after the initial `docker compose up`.

### Manual re-seeding

```bash
# force re-seed products (clears and re-inserts)
docker compose exec server node -e "
  import('./seed.js?force='+Date.now()).then(m => m.default || m.seed?.())
"

# seed admin user (idempotent)
docker compose exec server node seedAdmin.js
```

> The product seed is idempotent in normal startup — it only inserts when the collection is empty. To force a fresh seed, run `node seed.js` manually (it will `deleteMany` only when invoked directly).

### Rebuild after dependency changes

```bash
docker compose build --no-cache
docker compose up -d
```

## Environment Variables

All env vars are loaded from `.env` files in each service directory.

### `server/.env`

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `PORT` | API port (default `5000`) |
| `JWT_SECRET` | Secret for admin JWT tokens |
| `ADMIN_EMAIL` | Default admin email for `seed:admin` |
| `ADMIN_PASSWORD` | Default admin password for `seed:admin` |

### `client/.env`

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL (`http://localhost:5000/api`) |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number for checkout messages |

The API URL points to `localhost:5000` because client-side JavaScript runs in the **browser**, which accesses the host-mapped port. Inside the Docker network, containers can also reach the server via `http://server:5000/api`.

## File Structure

```
project-root/
├── docker-compose.yml          # orchestrates all services
├── server/
│   ├── Dockerfile              # server image (node:22-alpine)
│   ├── docker-entrypoint.sh    # runs seeds → starts server
│   ├── .dockerignore
│   ├── pnpm-workspace.yaml     # allows bcrypt native build
│   └── ...
├── client/
│   ├── Dockerfile              # client image (multi-stage: dev + prod)
│   ├── .dockerignore
│   ├── pnpm-workspace.yaml     # allows sharp native build
│   └── ...
└── docs/
    └── docker.md               # this file
```

## Production Build

The client `Dockerfile` has a multi-stage `prod` target that builds the Vite app and serves it via Nginx:

```bash
# build client for production
docker build -t ecommerce-client:prod --target prod ./client

# run it (requires a running server separately)
docker run -d -p 80:80 ecommerce-client:prod
```

For the server in production, create a separate Dockerfile without `--watch`:

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && pnpm install
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

Also adjust `VITE_API_URL` in `client/.env` to point to the production API domain.

## Troubleshooting

### node_modules issues (wrong platform / missing deps)

```bash
docker compose down -v    # remove volumes including node_modules
docker compose build --no-cache
docker compose up -d
```

### Port already in use

Change the host port mapping in `docker-compose.yml`:

```yaml
ports:
  - "5174:5173"   # maps host 5174 → container 5173
```

### Changes not reflecting (client hot-reload)

Ensure `VITE_API_URL` in `client/.env` uses `http://localhost:5000/api` (not `http://server:5000/api`) since the browser resolves the API URL from the host machine.

### Force re-seed products

The entrypoint only seeds when the products collection is empty. To force a re-seed:

```bash
docker compose exec server node -e "
  const m = await import('mongoose');
  await m.connect(process.env.MONGODB_URI);
  await m.connection.db.collection('products').drop();
  await m.disconnect();
"
docker compose restart server
```

This drops the products collection, then on restart the entrypoint seed runs and fetches fresh data from Fake Store API.
