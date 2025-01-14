// display.js 使组件不可用的display遮罩层功能


export class Display{
    constructor(el, isShow = false){
        this.el = el;
        this.isShow = isShow;
        this.init();
    }
    init(el){
        // 初始化组件禁用在isDisplay调用

    }
    isDisplay(el = this.el, isShow = false){
        if (typeof el === 'undefined' || el === null){
            console.error('el is undefined or null')
        }
    }
}