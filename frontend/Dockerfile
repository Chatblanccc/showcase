FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install

# 显式复制所有文件，确保最新的 .tsx 代码被拷入
COPY . .

# 增加一个构建参数来强制缓存失效
ARG CACHEBUST=1
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
