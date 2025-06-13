import {userCache} from "@/data/cache.js";
import {frp} from "../../../frp-plugin/frp-plugin/dist/esm/index.js";
import {BootFailedNotification} from "@/plugins/notifications.js";


export const starFrpc = (options = {
    fileName: userCache.selectFrpcConfigName.value
}, callback = () => {}) => {
    return new Promise((resolve, reject) => {
        frp.startDummyVpn().then((result) => {
            console.log('startDummyVpn授权 result', result);
            if (result.status  !== 'requested'){
                frp.startFrpc(options).then((res) => {
                    console.log('启动frpc结果：', res)
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            }else {
                BootFailedNotification.schedule(
                    {notifications: [{
                            id: 2,
                            title: "Frp应用启动失败",
                            body: "Frp客户端应用启动失败，请允许vpn网络权限并重新开启。",
                        }]});
                reject('未获取vpn权限');
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

export const stopFrpc = (options) => {
    return new Promise(async (resolve, reject) => {
       await frp.stopFrpc().then((result) => {
            console.log('停止frpc结果：', result)
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
       await frp.stopDummyVpn().then((result) => {
            console.log('停止DummyVpn结果：', result)
        }).catch((error) => {
            reject(error);
        });
    });
}

export const getFrpcStatus = () => {
    return new Promise(async (resolve, reject) => {
        await frp.getStatus({mode: 'frpc'}).then((result) => {
            console.log('获取frpc状态结果：', result)
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
}