// display.js 使组件不可用的display遮罩层功能

 import {error} from "@capacitor/assets/dist/util/log.js";

export class Display{
    constructor(el, isShow = false){
        this.el = el;
        this.isShow = isShow;
        this.init();
    }
    init(el){
       if (typeof el === 'undefined' || el === null){
       }
    }
    isDisplay(el = this.el, isShow = false){
        if (typeof el === 'undefined' || el === null){
            console.error('el is undefined or null')
        }
    }
}