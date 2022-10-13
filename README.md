## 配置方式

1. `npm install`

2. `npm audit fix`（可选，用于修复一些 vulnerabilities）

3. `npm run start`

## Documentation
[Notion](https://www.notion.so/coinworld/ACY-Stats-API-Documentation-e1f4ebf4f158474abea9b54c8ad74812)

## 部署方式

1. npm run build

2. node build/server.js

如果想要改变端口，需要修改package.json中的“build”: "PORT=4001 razzle build"。正式环境务必使用build版本而非npm run start。
