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
        this.init();
    }
    init() {
        if (userCache.modelType.value !== 0){ // 如果是默认主题，则不执行后续操作
            console.log('model init')
        this.isDark.value = userCache.isDark.value;
        this.backGround.value = userCache.isDark.value ? this.APP_BG_DARK : this.APP_BG_LIGHT;
        this.textColor.value = userCache.isDark.value ? this.APP_TEXT_LIGHT : this.APP_TEXT_DARK;
        this.borderColor.value = userCache.isDark.value ? this.APP_BORDER_LIGHT : this.APP_BORDER_DARK;
        this.updateCSS();
        watch(userCache.isDark, (newValue) => {
            // 更新CSS
            this.backGround.value = newValue ? this.APP_BG_DARK : this.APP_BG_LIGHT;
            this.textColor.value = newValue ? this.APP_TEXT_LIGHT : this.APP_TEXT_DARK;
            this.borderColor.value = newValue ? this.APP_BORDER_LIGHT : this.APP_BORDER_DARK;

            this.changeTheme(newValue);

        });
      }
    }
    /**
     * 更新CSS
     */
    async updateCSS(css) {
        console.log('updateCss',css);
      try{
          const CSS_CONTENT = ref(`
            :root {
                --app-background: ${this.backGround.value} !important;
                --app-text-color: ${this.textColor.value} !important;
                --color-border: ${this.borderColor.value} !important;
                --app-btn-bg: ${userCache.isDark.value ? this.APP_MAIN_BTN_BG_DARK : this.APP_MAIN_BTN_BG_LIGHT};
                --app-label-color: ${userCache.isDark.value ? '#1974cd' : '#1d4374'};
            }
        `);
          const result = await this.loadCSS();
          console.log('updateCss',result);
          this.styleElement.value.innerHTML =  CSS_CONTENT.value + css;
          return result;
      }catch (e) {
          console.error('Error updating CSS:', e)
      }
    }

    /*
    加载css
    * */
    loadCSS() {
       return new Promise((resolve, reject) => {
           if (!this.styleElement.value){
               // 创建一个新的样式元素
               this.styleElement.value = document.createElement('style');
               this.styleElement.value.type = 'text/css';
               this.styleElement.value.id = 'app-model-theme';
               document.head.appendChild(this.styleElement.value);
           }else {
                resolve({message: '样式已经加载', type: 1, state: 0});
           }
           resolve({message: '样式加载成功', type: 1, state: 1});
       });
    }

    /*
    卸载css
    * */
    unloadCSS() {
        return new Promise((resolve, reject) => {
           setTimeout(() => {
               if (this.styleElement.value){
                   // 创建一个新的样式元素
                   document.head.removeChild(this.styleElement.value);
                   // 移除所有id=app-model-theme的style元素
                   this.styleElement.value = document.querySelectorAll('style[id="app-model-theme"]');
                   this.styleElement.value.forEach(item => {
                       console.log('移除id=app-model-theme的style元素', item);
                       item.remove();
                   });
                   this.styleElement.value = null;
                   resolve({ message: '样式卸载成功', type: 0, state: 1});
               }else {
                   reject({ message: '样式已经卸载', type: 0, state: 0});
               }
           }, 300);
        });
    }
    changeTheme(...data) {
        // console.log(typeof data);
       if (data.length > 0){
           data.forEach(item => {
               Array.isArray(item) ? new Error('参数错误,意外的数组类型') : null;
           });
           switch (typeof data[0]) {
               case 'boolean':
                   console.log('boolean')
                       this.isDark.value = data[0];
                       userCache.isDark.value = data[0];
                       this.backGround.value = userCache.isDark.value ? this.APP_BG_DARK : this.APP_BG_LIGHT;
                       this.textColor.value = userCache.isDark.value ? this.APP_TEXT_LIGHT : this.APP_TEXT_DARK;
                       this.borderColor.value = userCache.isDark.value ? this.APP_BORDER_LIGHT : this.APP_BORDER_DARK;
                       this.updateCSS(':)').then((result) => {
                           console.log(result)
                       });
                   break;
               case 'object':
                     console.log('object');
                     const objData = data[0];
                     objData['isDark'] ? this.isDark.value = objData['isDark'] : null;
                     if (objData['modelType'] === 0) return; // 如果是默认主题，则默认不执行后续操作, 用户可传入参数强制切换主题
                     // this.backGround.value = userCache.isDark.value ? this.APP_BG_DARK : this.APP_BG_LIGHT;
                     // this.textColor.value = userCache.isDark.value ? this.APP_TEXT_LIGHT : this.APP_TEXT_DARK;
                     // this.borderColor.value = userCache.isDark.value ? this.APP_BORDER_LIGHT : this.APP_BORDER_DARK;
                     this.updateCSS(objData['css']).then((result) => {
                         console.log(result)});
                   break;
               case 'string':
                   break;
               default:
                   throw new Error('参数错误');
           }
       }else {
           throw new Error('参数错误');
       }
    }
}