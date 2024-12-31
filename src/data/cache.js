// 缓存
import {ref, watch} from "vue";

localStorage.setItem('isDark', JSON.stringify(window.matchMedia("(prefers-color-scheme: dark)").matches));
export const userCache = new class Cache {
    constructor(storageType = 'localStorage') {
       this.storage = storageType === 'localStorage' ? localStorage : sessionStorage;
       // 设置初始化记录用户白天模式还是暗黑模式，默认通过window.matchMedia("(prefers-color-scheme: dark)").matches记录。
        this.isDark = ref(this.get('isDark'))|| ref(window.matchMedia("(prefers-color-scheme: dark)").matches); // 优先读取storage中的值，没有则读取window.matchMedia("(prefers-color-scheme: dark)").matches
        this.set('isDark', this.isDark.value);
    }
    set(key, value) {
       try {
           const jsonValue = JSON.parse(value);
           this.storage.setItem(key, JSON.stringify(jsonValue));
       }catch (e) {
           console.error(e);
       }
    }
    get(key) {
       try {
           const value = this.storage.getItem(key);
           return JSON.parse(value);
       }catch (e) {
           console.error(e);
       }
    }
    remove(key) {
       this.storage.removeItem(key);
    }
    clear() {
       this.storage.clear();
    }
}

watch(userCache.isDark, (newValue) => {
    // userCache更新优先
    userCache.set('isDark', newValue);
});