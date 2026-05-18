# TP3 — Docker Compose et architecture multi-services
# TP3 — Gestionnaire de tâches Docker

Application web complète de gestion de tâches construite avec Docker Compose.

## Architecture

| Service    | Rôle                              | Port (dev) |
|------------|-----------------------------------|------------|
| `client`   | Application React avec Vite       | 3000       |
| `api`      | API REST Node.js + Express        | 5000       |
| `database` | Base de données MongoDB           | (interne)  |
| `nginx`    | Reverse proxy (production)        | 80         |

## Lancement en développement

\`\`\`bash
# 1. Cloner le projet
git clone <url-du-repo>
cd tp3-docker-compose

# 2. Lancer tous les services
docker compose up --build
\`\`\`

- Client : http://localhost:3000
- API : http://localhost:5000/api/health

## Lancement en production

\`\`\`bash
docker compose -f docker-compose.prod.yml up --build
\`\`\`

- Application : http://localhost

## Variables d'environnement

\`\`\`
PORT=5000
MONGO_URL=mongodb://database:27017/tp3
NODE_ENV=development
VITE_API_URL=http://localhost:5000/api
\`\`\`

## Routes de l'API

| Méthode | Route          | Description              |
|---------|----------------|--------------------------|
| GET     | /api/health    | Vérification de l'état   |
| GET     | /api/items     | Récupérer les tâches     |
| POST    | /api/items     | Ajouter une tâche        |