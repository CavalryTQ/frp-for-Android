// runners/background.js Background Runner 后台计划运行程序
// capacitor

addEventListener('testEvent', (resolve, reject, args) => {
    console.log('do something to update the system here');
    console.log('这是系统后台运行test1测试！');
    console.log('后台运行中...');
    console.log(JSON.stringify(args, null, 2))
    let i = 0;
    console.log(JSON.stringify(args, null, 2));
   const interval = setInterval(() => {
        console.log('后台运行中...'+i);
       if (i === 6){
           clearInterval(interval);
           resolve(true);
       }
        i += 1;
    }, 1000);

});

addEventListener('testEvent2', (resolve, reject, args) => {
    console.log('这是系统后台testEvent2运行测试！');
    console.log('后台运行中...');
    resolve(true);
});