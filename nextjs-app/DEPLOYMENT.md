# 生产环境部署指南

## 环境要求

- Docker 20.10+
- Docker Compose v2+

## Docker 部署

### 快速部署

```bash
# 克隆代码
git clone https://github.com/quanquan1996/BodyBuildingQuan.git
cd BodyBuildingQuan/nextjs-app

# 构建并启动
docker compose up -d --build

# 查看日志
docker compose logs -f
```

应用将运行在 `http://localhost:3000`

### 常用命令

```bash
# 停止服务
docker compose down

# 重新构建并启动
docker compose up -d --build

# 查看运行状态
docker compose ps

# 查看实时日志
docker compose logs -f
```

### 手动构建镜像

```bash
# 构建镜像
docker build -t bodybuildingquan .

# 运行容器
docker run -d -p 3000:3000 --name bodybuildingquan bodybuildingquan

# 停止并删除
docker stop bodybuildingquan && docker rm bodybuildingquan
```

## 环境变量

如需配置环境变量，修改 `docker-compose.yml`：

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 常见问题

**Q: 端口被占用？**
修改 `docker-compose.yml` 中的端口映射：
```yaml
ports:
  - "3001:3000"  # 改为 3001
```

**Q: 如何更新部署？**
```bash
git pull
docker compose up -d --build
```
