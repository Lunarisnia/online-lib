FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run test
RUN npm run build