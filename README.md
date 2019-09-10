# Marknote

一个轻量笔记应用

## 功能

- 支持 Markdown
- 支持笔记的导入/导出
- 支持搜索笔记
- 支持离线使用以及本地保存
- 支持桌面设备/移动设备

## 环境要求

- [Node.js/NPM](https://nodejs.org)

## 开发模式

```bash
npm install
npm run dev
# http://localhost:3000
```

## 构建模式

```bash
npm run build
```

## 目录

```
|- public 静态资源
|- src 源码
  |- components 通用组件
    |- ErrorDisplay.js 错误面板
    |- LoadingDisplay.js 加载面板
  |- constants 常量
  |- containers 容器
    |- Editor 编辑器
    |- NoteList 笔记列表
    |- Preview 笔记预览
  |- utils 工具函数
    |- dialog.js 弹窗方法
    |- exportNote.js 导出笔记
    |- formatDate.js 格式化日期
    |- getRandomString.js 获取随机字符串
    |- importNote.js 导入笔记
    |- logger.js 日志/调试
    |- selectFile.js 选取文件
    |- snackbar.js 消息通知
  |- store.js 本地存储相关
```

## 常见问题

### 使用浏览器打开无法正常使用

> 目前没有进行兼容性测试，可以通过控制台查看是否有报错，一般更新到新版本浏览器就可以正常使用。

### 如何进行多设备同步

> 目前只支持本地导出然后手动同步到其他设备。如果想支持多设备自动同步，修改`src/store.js`中的方法与你的服务器进行通信而不是与本地 storage 通信，这样可以实现多设备同步。
