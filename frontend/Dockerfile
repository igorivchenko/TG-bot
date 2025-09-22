# Dockerfile
FROM node:22-alpine

WORKDIR /app

# Встановлюємо ngrok
RUN npm install -g ngrok

# Приймаємо токен як аргумент
ARG NGROK_TOKEN
RUN ngrok authtoken $NGROK_TOKEN

# Копіюємо package.json і встановлюємо залежності
COPY package*.json ./
RUN npm install

# Копіюємо весь проект
COPY . .

# Виставляємо порт для Vite
EXPOSE 5173

# Запуск Vite + ngrok одночасно
CMD sh -c "npm run dev -- --host 0.0.0.0 & ngrok http 5173 --log=stdout"
