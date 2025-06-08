import {ref, watch} from "vue";

export const userCache = new class Cache {
    constructor(storageType = "localStorage") {
        this.storage = storageType === "localStorage" ? localStorage : sessionStorage;

        const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
        this.modelType = ref(0);
        this.dark = ref(systemDarkMode.matches);
        const cachedDark = this.get("isDark");

        this.isDark = ref(
            cachedDark !== null && cachedDark !== undefined
                ? cachedDark
                : this.dark.value
        );
        this.selectFrpcConfigName = ref(this.get("selectFrpcConfigName") ? this.get("selectFrpcConfigName") : this.initSettings("selectFrpcConfigName", "frpc.toml"));
        this.handleSystemDarkModeChange = this.updateSystemDarkMode.bind(this); // 绑定this
        systemDarkMode.addEventListener("change", this.handleSystemDarkModeChange); // 添加监听器
        this.init();
        watch(this.isDark, (newValue) => {
            console.log("cache isDark:", newValue);
            this.set("isDark", newValue);
        });
    }

    init(attr, value){
        if (attr === undefined){
            this.modelType.value = this.get("modelType") === null || this.get("modelType") === undefined ?
                this.initSettings("modelType", 0) : this.initGetter("modelType");
        }else {
           if (this[attr].value === undefined || this[attr].value === null){
               this[attr] = ref(this.initSettings(attr, value));
           }else {
               this[attr].value = this.initSettings(attr, value);
           }
        }

    }

    initSettings(key, value){
        if (this[key]){
            console.log(this[key]);
            this[key].value = value;
        }
        this.set(key, value);
        return value;
    }

    initGetter(key){
        watch(this[key], (newValue) => {
            console.log("initGetter666" + key + " " + newValue);
            this.set(key, newValue);
        });
            console.log(this[key]);
        return this.get(key);
    }

    updateSystemDarkMode(event) {
        this.dark.value = event.matches;
        // modelType:0 跟随系统，1跟随用户设置，即使以外切换系统模式也跟随缓存设置
        if (this.modelType.value === 0) {
            this.isDark.value = this.dark.value;
        }else {
            this.isDark.value = this.get("isDark");
        }
    }

    removeSystemDarkModeListener() {
        const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
        systemDarkMode.removeEventListener("change", this.handleSystemDarkModeChange);
    }

    set(key, value) {
        try {

            this.storage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("Failed to set cache:", e);
        }
    }

    get(key) {
        try {
            const value = this.storage.getItem(key);
            return JSON.parse(value);
        } catch (e) {
            console.error("Failed to get cache:", e);
            return null;
        }
    }

    remove(key) {
        this.storage.removeItem(key);
    }

    clear() {
        this.storage.clear();
    }
};
