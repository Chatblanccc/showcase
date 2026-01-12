# Showcase Platform - Web Game Hosting Platform

🎮 一个基于 React + FastAPI 构建的 Web 游戏作品展示平台，支持上传、托管和在线试玩 HTML5 游戏。

## ✨ 功能特性

- **🎯 游戏托管**: 支持上传 Zip 格式的 Web 游戏包，自动解压部署
- **🖼️ 可视化展示**: 网格化的项目卡片展示，支持封面图片
- **🎮 在线试玩**: 通过 iframe 容器安全运行游戏，支持全屏模式
- **⚡ 前后端分离**: 支持 React、Vue、Cocos Creator 等现代框架构建的游戏
- **📦 一键部署**: 使用 Docker Compose 实现快速部署

## 🛠️ 技术栈

### 前端
- React 18 + TypeScript
- Vite (构建工具)
- Tailwind CSS (样式)
- React Router (路由)

### 后端
- FastAPI (Python 3.10+)
- PostgreSQL + SQLAlchemy (Async)
- Alembic (数据库迁移)
- asyncpg (数据库驱动)

### 部署
- Docker + Docker Compose
- Nginx (反向代理)

## 🚀 快速开始

### 开发环境

#### 后端
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
pip install -r requirements.txt

# 配置数据库 (修改 .env 文件)
alembic upgrade head
uvicorn app.main:app --reload
```

#### 前端
```bash
cd frontend
npm install
npm run dev
```

### 生产部署

查看详细部署指南：[DEPLOY.md](DEPLOY.md)

```bash
# 修改 docker-compose.yml 中的数据库密码
docker compose up -d --build
```

## 📖 使用说明

1. 访问 `/admin` 进入管理后台
2. 填写项目信息（标题、Slug、描述）
3. 上传游戏 Zip 包（必须包含 `index.html`）
4. 可选：上传封面图片
5. 首页即可查看并试玩上传的游戏

### 对前后端分离项目的支持

如果你的游戏是用 React/Vue 等框架构建的，请确保：
- **构建配置**: 设置 `base: './'` (Vite) 或 `"homepage": "."` (CRA)
- **路由模式**: 推荐使用 Hash 路由避免刷新 404

详见管理后台的"打包指南"。

## 📂 项目结构

```
.
├── backend/              # FastAPI 后端
│   ├── app/
│   │   ├── core/        # 核心配置
│   │   ├── models/      # 数据库模型
│   │   ├── routers/     # API 路由
│   │   ├── schemas/     # Pydantic 模型
│   │   └── utils/       # 工具函数
│   ├── alembic/         # 数据库迁移
│   └── static/          # 静态文件托管
├── frontend/            # React 前端
│   └── src/
│       ├── components/  # UI 组件
│       ├── pages/       # 页面
│       ├── services/    # API 调用
│       └── types/       # TypeScript 类型
├── deploy/              # 部署配置
│   └── nginx.conf
└── docker-compose.yml   # Docker 编排
```

## 🔧 环境变量

后端 `.env` 配置示例：
```ini
PROJECT_NAME=Showcase Platform
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_SERVER=localhost
POSTGRES_PORT=5432
POSTGRES_DB=showcase
SECRET_KEY=your_secret_key
```

## 📝 License

MIT

## 👤 Author

[@Chatblanccc](https://github.com/Chatblanccc)
