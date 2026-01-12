# 作品展示平台 - 后端 (Backend)

基于 FastAPI + PostgreSQL 构建的作品展示平台后端服务。

## 环境要求

- Python 3.10+
- PostgreSQL Database

## 快速开始

### 1. 数据库配置
确保本地安装了 PostgreSQL，并创建一个名为 `showcase` 的数据库。

在 `backend` 目录下创建 `.env` 文件（参考以下内容），并填入正确的数据库密码：

```ini
PROJECT_NAME=Showcase Platform
POSTGRES_USER=postgres
POSTGRES_PASSWORD=你的数据库密码
POSTGRES_SERVER=localhost
POSTGRES_PORT=5432
POSTGRES_DB=showcase
SECRET_KEY=supersecretkey
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 2. 安装依赖
```bash
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

### 3. 运行数据库迁移
此步骤将在数据库中创建所需的表。
```bash
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```
> 如果遇到 `ConnectionResetError` 或认证失败，请检查 `.env` 中的密码是否正确。

### 4. 运行服务
```bash
uvicorn app.main:app --reload
```
服务将在 `http://localhost:8000` 启动。
API 文档位于 `http://localhost:8000/docs`。

## 目录结构
- `app/models`: 数据库模型
- `app/schemas`: Pydantic 数据验证模型
- `app/routers`: API 路由接口
- `app/crud`: 数据库 CRUD 操作
- `static/games`: 存放解压后的游戏文件
