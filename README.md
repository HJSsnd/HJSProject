# HJSProject - 极简云盘 (CloudDiskApp)

这是一个基于 Node.js 构建的私人极简云盘应用，提供轻量级、美观的文件管理体验。

## ✨ 核心功能

- **文件上传**：支持点击选择文件，或直接**拖拽文件**到网页指定区域进行上传。
- **实时进度**：大文件上传时显示实时进度条。
- **文件列表**：自动展示已上传的文件，按时间倒序排列，清晰显示文件大小和修改时间。
- **文件下载**：一键下载云盘中的任意文件。
- **文件删除**：支持删除不需要的文件，防误删确认。
- **完善的编码支持**：完美处理中文文件名的上传与展示，避免乱码。

## 🛠 技术栈

- **前端**：原生 HTML5 + CSS3 + Vanilla JavaScript（无额外框架，响应式设计）。
- **后端**：Node.js + Express。
- **文件处理**：使用 `multer` 中间件处理 Multipart 表单数据。
- **部署环境**：支持直接通过 Node 运行，也支持 Docker 容器化部署。

## 🚀 快速启动

### 方式一：本地 Node.js 运行

确保你的电脑已安装 Node.js 环境。

1. 进入云盘子目录：
   ```bash
   cd CloudDiskApp
   ```
2. 安装依赖：
   ```bash
   npm install
   ```
3. 启动服务（默认运行在 3000 端口，可通过 PORT 环境变量自定义端口）：
   ```bash
   PORT=3002 npm start
   ```
4. 在浏览器中打开：[http://localhost:3002](http://localhost:3002)

### 方式二：Docker Compose 一键运行

确保你的电脑已安装 Docker 和 Docker Desktop。

1. 在项目根目录执行：
   ```bash
   docker-compose up -d
   ```
2. 容器启动后，在浏览器中打开：[http://localhost:3002](http://localhost:3002)

## 📁 核心目录结构

```text
HJSProject/
├── CloudDiskApp/           # 极简云盘核心代码
│   ├── public/             # 前端静态页面 (index.html)
│   ├── uploads/            # 上传文件的保存目录 (不上传至 Git)
│   ├── server.js           # 后端服务及 API 逻辑
│   ├── package.json        # 项目依赖配置
│   └── Dockerfile          # 镜像构建文件
├── homepage.html           # 项目导航引导页
└── docker-compose.yml      # Docker 编排配置
```
