import {ref, watch} from "vue";

export const userCache = new class Cache {
    constructor(storageType = "localStorage") {
        this.storage = storageType === "localStorage" ? localStorage : sessionStorage;

        const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
        this.dark = ref(systemDarkMode.matches);

        const cachedDark = this.get("isDark");
        this.isDark = ref(
            cachedDark !== null && cachedDark !== undefined
                ? cachedDark
                : this.dark.value
        );

        this.handleSystemDarkModeChange = this.updateSystemDarkMode.bind(this);
        systemDarkMode.addEventListener("change", this.handleSystemDarkModeChange);

        watch(this.isDark, (newValue) => {
            this.set("isDark", newValue);
        });
    }

    updateSystemDarkMode(event) {
        this.dark.value = event.matches;
        this.isDark.value = this.dark.value;
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
