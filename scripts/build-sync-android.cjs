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

// 读取 package.json
const packageJsonPath = path.join(projectRoot, "package.json");
const packageJson = require(packageJsonPath);

// 更新 capacitor.config.json 的版本号
config.appVersion = packageJson.version;
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log(`Updated appVersion in capacitor.config.json to ${packageJson.version}`);

// 检查 Android build.gradle 是否存在
const androidGradlePath = path.join(
    projectRoot,
    "android",
    "app",
    "build.gradle"
);
if (fs.existsSync(androidGradlePath)) {
    let gradleContent = fs.readFileSync(androidGradlePath, "utf-8");
    gradleContent = gradleContent.replace(
        /versionName "\d+\.\d+\.\d+"/,
        `versionName "${packageJson.version}"`
    );
    fs.writeFileSync(androidGradlePath, gradleContent);
    console.log(`Updated versionName in build.gradle to ${packageJson.version}`);
}

// 获取打包目录名（默认为 "dist"）
const buildDir = config.webDir || "dist";

// Step 1: 运行 Vite 构建
console.log("Running Vite build...");
execSync("npm run build", { stdio: "inherit" });

// Step 2: 同步 Capacitor 项目
console.log(`Syncing Capacitor project with webDir: ${buildDir}...`);
execSync(`npx cap sync android`, { stdio: "inherit" });

console.log("Build and sync complete! You can now open the Android project in Android Studio.");