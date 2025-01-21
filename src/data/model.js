// model.js 改变前端背景颜色
import {userCache} from "@/data/cache.js";
import {ref, watch} from "vue";
export default new class Model{
    constructor() {
        this.APP_BG_DARK = '#121212';
        this.APP_BG_LIGHT = '#FAFAFA';
        this.APP_TEXT_DARK = '#000000';
        this.APP_TEXT_LIGHT = '#FFFFFF';
        this.APP_BORDER_DARK = 'rgba(60, 60, 60, 0.12)';
        this.APP_BORDER_LIGHT = 'rgba(84, 84, 84, 0.48)';

        this.APP_MAIN_BTN_BG_DARK = '#2F2F2F'; // 组件mainButton
        this.APP_MAIN_BTN_BG_LIGHT = '#FFFFFF';

        this.isDark = ref(userCache.isDark.value);
        this.backGround = ref(userCache.isDark.value ? this.APP_BG_DARK : this.APP_BG_LIGHT);
        this.textColor = ref(userCache.isDark.value ? this.APP_TEXT_LIGHT : this.APP_TEXT_DARK);
        this.borderColor = ref(userCache.isDark.value ? this.APP_BORDER_LIGHT : this.APP_BORDER_DARK);
        this.styleElement = ref(null); // 存储样式元素的引用
        this.CSS_CONTENT = ref(`
            :root {
                --app-background: ${this.backGround.value};
                --app-text-color: ${this.textColor.value};
                --app-btn-bg: ${userCache.isDark.value ? this.APP_MAIN_BTN_BG_DARK : this.APP_MAIN_BTN_BG_LIGHT}
            }
        `);
        this.init();
    }
    init() {
        this.isDark.value = userCache.isDark.value;
        this.backGround.value = userCache.isDark.value ? this.APP_BG_DARK : this.APP_BG_LIGHT;
        this.textColor.value = userCache.isDark.value ? this.APP_TEXT_LIGHT : this.APP_TEXT_DARK;
        this.updateCSS();
    }
    /**
     * 更新CSS
     */
    updateCSS(css) {
        const CSS_CONTENT = ref(`
            :root {
                --app-background: ${this.backGround.value};
                --app-text-color: ${this.textColor.value};
                --color-border: ${this.borderColor.value};
                --app-btn-bg: ${userCache.isDark.value ? this.APP_MAIN_BTN_BG_DARK : this.APP_MAIN_BTN_BG_LIGHT}
            }
        `);
       if (!this.styleElement.value){
           // 创建一个新的样式元素
           this.styleElement.value = document.createElement('style');
           this.styleElement.value.type = 'text/css';
           document.head.appendChild(this.styleElement.value);
       }
        console.log('CSS_CONTENT', CSS_CONTENT.value)
       this.styleElement.value.innerHTML = CSS_CONTENT.value
    }
    changeTheme(...data) {
        console.log(typeof data);
       if (typeof data[0] === "boolean"){
           this.isDark.value = data[0];
           userCache.isDark.value = data[0];
           this.backGround.value = userCache.isDark.value ? this.APP_BG_DARK : this.APP_BG_LIGHT;
           this.textColor.value = userCache.isDark.value ? this.APP_TEXT_LIGHT : this.APP_TEXT_DARK;
           this.updateCSS();
       }else if (typeof data[0] === "string"){
           console.log(typeof data);
       }else {
           console.log('obj');
       }
    }
}