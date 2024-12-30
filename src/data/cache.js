// 缓存
export const userCache = new class Cache {
    constructor(storageType = 'localStorage') {
       this.storage = storageType === 'localStorage' ? localStorage : sessionStorage;
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