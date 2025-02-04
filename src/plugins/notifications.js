// @capacitor/local-notifications 推送通知实现

 import {LocalNotifications} from "@capacitor/local-notifications";

export default class Notifications {
    constructor(state = false,notifications = {
        notifications: [
            {
                id: Date.now(), // 唯一ID
                title: "操作完成",
                body: "您的任务已处理成功！",
                schedule: { at: new Date(Date.now() + 500) }, // 0.5秒延迟
            }
        ]
    }) {
        this.instance = LocalNotifications;
        this.state = state;
        this.id = notifications.notifications[0].id === undefined ? Date.now() : notifications.notifications[0].id;
        this.notifications = this.state ? notifications.notifications : null;
    }

    async schedule(ScheduleOptions = {
        notifications: [
            {
                id: this.id,
                title: "本地通知测试",
                body: "这是一条完全本地的通知",
                schedule: { at: new Date(Date.now() + 1000) }, // 1秒后触发
                sound: "default", // 可选声音
                attachments: [], // 可选附件
                actionTypeId: "", // 可选点击动作
                extra: {} // 附加数据
            }
        ]
    }) {
        // const thisNotification = {notifications: this.notifications};
        const checkPermissions = await this.instance.checkPermissions();
        console.log('checkPermissions', JSON.stringify(checkPermissions, null, 2));
        if (checkPermissions.display !== 'granted'){
            await this.instance.requestPermissions();
        }
        try {
            await this.instance.schedule(ScheduleOptions).then(result => {
                console.log('schedule', JSON.stringify(result.notifications, null, 2));
            }).catch(e => {
                console.log('schedule error', JSON.stringify(e, null, 2))
            });

        } catch (e) {
            console.log('schedule error', JSON.stringify(e, null, 2));
        }
    }
}