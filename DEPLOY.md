# 华为云服务器部署指南 (cmuhe.com)

本指南将帮助你使用 Docker 快速将项目部署到华为云服务器。

## 1. 准备工作

### 1.1 安装 Docker (如果服务器未安装)
SSH 连接到你的华为云服务器，运行以下命令安装 Docker 和 Docker Compose：

```bash
# 更新系统
sudo apt-get update
# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
# 验证安装
docker --version
docker compose version
```

### 1.2 上传代码
将整个项目目录上传到服务器（例如 `/root/showcase`）。你可以使用 Git 或 SCP/SFTP 工具。

```bash
# 示例：使用 Git (推荐)
git clone https://github.com/your-repo/showcase.git /root/showcase
```

## 2. 配置

### 2.1 修改数据库密码
编辑 `docker-compose.yml` 文件，将 `POSTGRES_PASSWORD` 修改为一个安全的密码（两处都需要修改，必须一致）。

```bash
nano docker-compose.yml
```

### 2.2 确认 Nginx 配置
检查 `deploy/nginx.conf`，确保 `server_name` 已经是你的域名 `cmuhe.com`。

## 3. 启动服务

在项目根目录下运行：

```bash
# 构建并后台启动
docker compose up -d --build
```

### 4. 验证

1.  访问 `http://cmuhe.com`，应该能看到网站首页。
2.  访问 `http://cmuhe.com/admin`，测试上传功能。

## 5. 常见问题

-   **端口不通？** 检查华为云的安全组（防火墙）设置，确保 **80 端口 (HTTP)** 和 **443 端口 (HTTPS)** 已对入方向开放。
-   **上传失败？** 检查 `backend/static` 目录权限，Docker 会自动处理，但如果遇到权限问题，可以尝试 `chmod -R 777 backend/static`。

## 6. (可选) 配置 HTTPS

推荐使用 Certbot 获取免费的 SSL 证书。
建议在宿主机直接运行 Nginx 并使用 Certbot，或者使用 `Nginx Proxy Manager` 容器来自动管理 SSL 证书。
