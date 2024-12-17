module.exports = {
    plugins: {
        // 自动为 CSS 添加浏览器兼容性前缀
        autoprefixer: {},
        // 将 px 转换为 vw
        'postcss-px-to-viewport': {
            viewportWidth: 1264, // 设计稿的视口宽度，基于 2160px 宽度
            viewportHeight: 2780, // 可选：设计稿的视口高度
            unitPrecision: 5, // 转换后的精度，即小数点位数
            viewportUnit: 'vw', // 转换的视口单位
            selectorBlackList: ['.ignore', '.hairlines'], // 不进行转换的类名
            minPixelValue: 1, // 小于或等于 1px 不转换为视口单位
            mediaQuery: false, // 是否允许在媒体查询中转换
        },
    },
};