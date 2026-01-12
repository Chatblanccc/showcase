# Stage 1: Build
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Product Export
FROM alpine
WORKDIR /app
COPY --from=builder /app/dist /app/dist
# Copy files to the shared volume on startup
CMD ["sh", "-c", "cp -r /app/dist/* /usr/share/nginx/html/"]
