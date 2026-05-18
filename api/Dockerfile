# Image de base : Node.js version légère Alpine
FROM node:20-alpine

# Concept : WORKDIR définit le dossier de travail dans le conteneur
WORKDIR /app

# On copie d'abord package.json SÉPARÉMENT pour profiter du cache Docker
# Si le code change mais pas les dépendances, Docker ne réinstalle pas tout
COPY package*.json ./

# Installation de toutes les dépendances (incluant nodemon)
RUN npm install

# On copie le reste du code
COPY . .

# Le port exposé (documentation)
EXPOSE 5000

# En dev, on utilise nodemon pour le rechargement automatique
CMD ["npm", "run", "dev"]