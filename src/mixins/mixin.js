export const icons = import.meta.glob('@/assets/icons/*.svg', { eager: true });// 引入所有图标 eager: true 提前加载

 export const loadIcons = (iconName) => {
     // return icons[`/src/assets/icons/${iconName}.svg`].default;
     // 支持模糊匹配
     return Object.keys(icons).find(key => key.includes(iconName)) ? icons[Object.keys(icons).find(key => key.includes(iconName))].default : '';
};