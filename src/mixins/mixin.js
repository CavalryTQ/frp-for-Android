import {ref, watch} from "vue";
import {userCache} from "@/data/cache.js";

export const icons = import.meta.glob('@/assets/icons/*.svg', { eager: true });// 引入所有图标 eager: true 提前加载
export const isBack = ref(true);
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
export const dynamicModeIcon = (dark, light) => {
     let res;
     res =  userCache.isDark.value ? loadIcon(dark) : loadIcon(light);
     return res
 }
 export const goToPage = (router, data) => {
     if (typeof data === 'number') {
         isBack.value = data < 0;
         router.go(data);
     }else {
         isBack.value = false;
         typeof data === 'string' ? router.push(data) : router.push({path:  data.path, query: data.query});
     }
 }

 // 获取当前路由的参数
 export const getCurrentRouteQuery = (route, attribute) => {
    if (route.query[attribute]) return JSON.parse(route.query[attribute]);
    else return JSON.parse('{}');
 }

