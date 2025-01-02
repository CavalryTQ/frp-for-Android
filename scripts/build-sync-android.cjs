const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

// 项目根目录
const projectRoot = path.resolve(__dirname, "..");

// 检查 capacitor.config.json 是否存在
const configPath = path.join(projectRoot, "capacitor.config.json");
if (!fs.existsSync(configPath)) {
    console.error(
        "Error: capacitor.config.json not found. Please run 'npx cap init' and add the Android platform before running this command."
    );
    process.exit(1);
}

// 读取 capacitor.config.json
const config = require(configPath);

// 获取打包目录名（默认为 "dist"）
const buildDir = config.webDir || "dist";

// Step 1: 运行 Vite 构建
console.log("Running Vite build...");
execSync("npm run build", { stdio: "inherit" });

// Step 2: 同步 Capacitor 项目
console.log(`Syncing Capacitor project with webDir: ${buildDir}...`);
execSync(`npx cap sync android`, { stdio: "inherit" });

console.log("Build and sync complete! You can now open the Android project in Android Studio.");