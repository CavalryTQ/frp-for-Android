import {ref, watch} from "vue";
import {userCache} from "@/data/cache.js";

export const icons = import.meta.glob('@/assets/icons/*.svg', { eager: true });// 引入所有图标 eager: true 提前加载
export const isDarkModel = ref(userCache.isDark.value) || ref(window.matchMedia("(prefers-color-scheme: dark)").matches);
export const systemModel = ref(window.matchMedia("(prefers-color-scheme: dark)"));
 export const loadIcon = (iconName) => {
     // 将用户输入的关键字分解为正则模式，忽略顺序和间隔
     const keywords = iconName.split('').map(char => char.trim()).join('.*'); // 将空格替换为任意字符
     const regex = new RegExp(keywords, 'i'); // 'i' 表示忽略大小写

     // 在所有图标中查找匹配项
     const matchKey = Object.keys(icons).find(key => regex.test(key));

     return matchKey ? icons[matchKey].default : new Error(`Icon "${iconName}" not found.`);
};
 export const loadIcons = (iconName) => {
     return Object.keys(icons).filter(key => key.includes(iconName)).map(key => icons[key].default);
 }

 export const goToPage = (router, data) => {
    typeof data === 'string' ? router.push(data) : router.push(data.path)
 }

 export const watchMode =  watch(systemModel, (newValue, oldValue) => {
     console.log(newValue, oldValue)
 });

 export const modelChangeHook = (newValue, oldValue) => {
     console.log(newValue, oldValue);
 }