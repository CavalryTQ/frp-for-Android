// 1rem = 100 设计稿 px；设计稿基准宽度为 1264（见 base.css 的 --app-base-width），
// 因此 :root{font-size: stage / (1264 / 100)} = stage / 12.64，可与旧的 px→vw 逐像素等价
const ROOT_VALUE = 100;

const PX_REGEXP = /"[^"]+"|'[^']+'|url\([^)]+\)|(\d*\.?\d+)px/gi;

const createPxReplace = ({ rootValue, minPixelValue, unitPrecision }) => (match, pixels) => {
    if (!pixels) return match; // 引号 / url() 内的内容原样保留
    const value = parseFloat(pixels);
    if (Number.isNaN(value) || value <= minPixelValue) return match; // 细线保留物理像素
    return `${(value / rootValue).toFixed(unitPrecision)}rem`;
};

/**
 * 设计稿 px -> rem
 * 缩放比例不再固化在长度单位里（vw 无法封顶），而是由 :root 的 font-size 统一控制，
 * 因此平板 / 桌面可以停止放大，手机档位行为与旧的 postcss-px-to-viewport 完全一致。
 * 媒体查询参数（如 min-width: 600px）不参与转换，断点保持真实 CSS px 语义。
 */
const pxToRem = (options = {}) => {
    const opts = {
        rootValue: ROOT_VALUE,
        minPixelValue: 1,
        unitPrecision: 5,
        // :root 内是适配基准变量，绝不能转换，否则与 :root 的 font-size 形成循环依赖
        selectorBlackList: ['.ignore', '.hairlines', ':root'],
        ...options,
    };
    const replace = createPxReplace(opts);
    const isBlacklisted = (selector) =>
        typeof selector === 'string' && opts.selectorBlackList.some((s) => selector.includes(s));

    return {
        postcssPlugin: 'postcss-design-px-to-rem',
        Once(root) {
            root.walkDecls((decl) => {
                if (!decl.value || decl.value.indexOf('px') === -1) return;
                if (isBlacklisted(decl.parent && decl.parent.selector)) return;
                decl.value = decl.value.replace(PX_REGEXP, replace);
            });
        },
    };
};
pxToRem.postcss = true;

module.exports = {
    plugins: [
        // 自动为 CSS 添加浏览器兼容性前缀
        require('autoprefixer'),
        // 将设计稿 px 转换为可封顶的 rem
        pxToRem({ rootValue: ROOT_VALUE, minPixelValue: 1, unitPrecision: 5 }),
    ],
};
