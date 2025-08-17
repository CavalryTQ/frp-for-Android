# Frp for Android

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-brightgreen)](https://vuejs.org/)
[![Capacitor](https://img.shields.io/badge/Capacitor-7.x-blue)](https://capacitorjs.com/)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT)

一个基于 Vue 3 和 Capacitor 的 Android 平台 Frp 客户端应用，界面设计参考 Clash for Android。

<p align="center">
  <img src="public/favicon.ico" alt="Frp for Android Logo" width="120" />
</p>

## 项目简介

本项目是一个运行在 Android 平台上的 Frp 客户端应用程序，如果你不知道什么是Frp请参阅：

> https://github.com/fatedier/frp

[//]: # (## 功能特性)

[//]: # ()
[//]: # (- ✅ Frp 客户端配置管理（TOML格式）)

[//]: # (- ✅ 一键启动/停止 Frp 服务)

[//]: # (- ✅ 实时日志查看)

[//]: # (- ✅ 通知权限和 VPN 权限管理)

[//]: # (- ✅ 深色/浅色主题切换)

[//]: # (- ✅ 多配置文件管理)

[//]: # (- ✅ 本地文件系统操作)

## 技术栈

- [Vue 3](https://vuejs.org/) - 前端框架
- [Capacitor](https://capacitorjs.com/) - 跨平台原生运行时
- [Vite](https://vitejs.dev/) - 构建工具
- [frp-plugin](file:../frp-plugin/frp-plugin) - 自定义 Capacitor 插件
- [Toml](https://www.npmjs.com/package/toml) - TOML 解析库
- [CodeMirror](https://codemirror.net/) - 代码编辑器

## 我的环境

- Node.js >= 20.11.0
- npm 或 yarn
- Android Studio version = 2024.3.1 Meerkat
- JDK 21 或更高版本
- targetSdkVersion = 35
- distributionUrl=file:/D:/gradle-8.12/gradle-8.12-all.zip

## 项目设置

### 安装依赖

```bash
npm install
```

### 核心插件

> ⚠️ **重要提示**: 本项目依赖自定义的 `frp-capacitor-plugin` 插件来与原生 Android 功能交互，必须安装此插件才能正常运行。

```bash
npm install frp-capacitor-plugin
```
### build and sync

```bash
npm run build-sync-android
```
### Android
```bash
cd ./android
```
打开Android Studio导入

## 使用说明

1. 在应用中创建或导入 FRP 配置文件（TOML格式）
2. 选择要使用的配置文件
3. 点击启动按钮并授予必要的权限（通知权限和VPN权限）
4. 查看实时日志以监控连接状态

示例配置文件：
```toml
# Frp client config
serverAddr = "your.domain.name"
serverPort = 3244
auth.token = ""

[[visitors]]
name = "p2p_ssh_visitor"
type = "xtcp"
serverName = "p2p_ssh"
secretKey = ""
bindAddr = "127.0.0.1"
bindPort = 7000
```

[//]: # (## 注意事项)

[//]: # ()
[//]: # (1. 本项目需要配合 `frp-capacitor-plugin` 插件使用)

[//]: # (2. 需要在 Android 设备上运行以获得完整功能)

[//]: # (3. 需要网络权限和 VPN 权限才能正常工作)

[//]: # (4. 项目目前仅支持 Android 平台)

## 相关链接

- [Frp 官方项目](https://github.com/fatedier/frp)
- [Clash for Android](https://github.com/Kr328/ClashForAndroid) (UI 参考)
- [Vue 3](https://vuejs.org/)
- [Capacitor](https://capacitorjs.com/)


## 开源许可证

### MIT License