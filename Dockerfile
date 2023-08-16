
FROM node:16.15.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
USER node
CMD ["node", "src/server/server.js"]
