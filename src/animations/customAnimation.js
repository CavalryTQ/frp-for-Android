
export const rippleEffect = (event, element, options = {
    // 默认配置
    color: 'rgba(255, 255, 255, 0.6)', // 涟漪颜色
    duration: 500, // 动画时长，单位 ms
    sizeFactor: 2.5, // 涟漪扩散倍数
}) => {
    // console.log('rippleEffect', event, element, options)
    const config = {  ...options };

    // 计算点击位置
    const rect = element.getBoundingClientRect();
    const rippleX = event.clientX - rect.left;
    const rippleY = event.clientY - rect.top;

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

    // 添加涟漪到元素
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    // 延迟开始动画，避免插入 DOM 时跳帧
    requestAnimationFrame(() => {
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '1';
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