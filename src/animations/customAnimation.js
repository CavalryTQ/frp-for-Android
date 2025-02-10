import {userCache} from "@/data/cache.js";

export const rippleEffect = (event, element, options = {
    // 默认配置
    isDark: userCache.isDark.value, // 是否为暗黑模式
    color: 'rgba(0, 0, 0, 0.3)', // 涟漪颜色
    duration: 5000, // 动画时长，单位 ms
    sizeFactor: 2.5, // 涟漪扩散倍数
    rippleCenter: false, // 涟漪是否按照点击位置中心开始
}) => {
     if (event.cancelable){ // 判断是否可以取消默认行为
         event.preventDefault(); // 阻止默认行为
     }
     const defaultOptions = {
         isDark: userCache.isDark.value,
         color: 'rgba(0, 0, 0, 0.3)', // 涟漪颜色
         duration: 5000, // 动画时长，单位 ms
         sizeFactor: 2.5, // 涟漪扩散倍数
         rippleCenter: false, // 涟漪是否按照点击位置中心开始
     };
     // if (options.isDark){
     //     console.log('dark mode');
     //     options.color = 'rgba(255, 255, 255, 0.3)';
     // }
    // console.log('rippleEffect', event, element, options)
    const config = Object.assign(defaultOptions, options);
    if(config.isDark){
        config.color ='rgba(255, 255, 255, 0.3)';
    }
    // console.log('config', config);
    // 计算点击位置
    const rect = element.getBoundingClientRect();
    const rippleX = event.clientX - rect.left;
    const rippleY = event.clientY - rect.top;
    // let rippleX, rippleY;
    // const rect = element.getBoundingClientRect();
    // if (!config.rippleCenter){
    //     rippleX = event.clientX - rect.left;
    //     rippleY = event.clientY - rect.top;
    // }else {
    //     rippleX = rect.width / 2;
    //     rippleY = rect.height / 2;
    // }

    // 创建涟漪元素
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height) * config.sizeFactor}px`;
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = config.color;
    ripple.style.pointerEvents = 'none';
    ripple.style.top = `${rippleY - (Math.max(rect.width, rect.height) * config.sizeFactor) / 2}px`;
    ripple.style.left = `${rippleX - (Math.max(rect.width, rect.height) * config.sizeFactor) / 2}px`;
    ripple.style.opacity = '0';
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = `transform ${config.duration}ms ease-out, opacity ${config.duration}ms ease-out`;
    ripple.style.zIndex = '1';

    // 添加涟漪到元素
    // console.log(element)
    element.style.position = 'relative';
    element.style.overflow = 'hidden'; // TODO: AppSetting.vue 当目标元素内有相对目标元素的子元素绝对定位且超过父元素大小，子元素会被裁剪或消失，待解决 target：select-model第99行 2025.1.21
    element.appendChild(ripple);

    // 延迟开始动画，避免插入 DOM 时跳帧
    requestAnimationFrame(() => {
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '0.5';
    });

    // 动画结束后移除涟漪
    setTimeout(() => {
        ripple.style.opacity = '0';
        ripple.addEventListener(
            'transitionend',
            () => {
                if (ripple.parentElement) ripple.parentElement.removeChild(ripple);
            },
            { once: true }
        );
    }, config.duration);
}