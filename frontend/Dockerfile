# Dockerfile
FROM node:18-alpine

WORKDIR /app

# パッケージだけ先にコピーして依存解決
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

EXPOSE 3000
CMD ["npm", "start"]