// @capacitor/local-notifications 推送通知实现
// notifications.js
import { LocalNotifications } from "@capacitor/local-notifications";
import {userCache} from "@/data/cache.js";

// ID 生成器（持久化计数器）
const ID_COUNTER_KEY = 'notification_id_counter'
class NotificationIdGenerator {
    static getNextId() {
        let counter = parseInt(userCache.get(ID_COUNTER_KEY) || '1000')
        counter = (counter % 2147483647) + 1 // 确保在 Java int 范围内
        userCache.set(ID_COUNTER_KEY, counter.toString())
        return counter
    }

    static validateId(id) {
        return Number.isInteger(id) &&
            id >= 0 &&
            id <= 2147483647
    }
}

export default class Notifications {
    constructor(options) {
        this.instance = LocalNotifications;
        this._validateOptions(options);
        this.notifications = this._processNotifications(options.notifications || []);
        this.id = this.notifications[0].id
        this.addAllListeners();
    }

    // 验证用户自定义 ID 的有效性
    _validateId(id) {
        if (!NotificationIdGenerator.validateId(id)) {
            throw new Error(`Invalid notification ID: ${id}. Must be 1-2147483647`)
        }
    }

    // 处理通知数组
    _processNotifications(notifications) {
        return notifications.map(notification => {
            // 优先使用用户定义的 ID
            const finalId = notification.id ?? NotificationIdGenerator.getNextId()
            this._validateId(finalId)

            return {
                ...notification,
                id: finalId,
                schedule: this._processSchedule(notification.schedule)
            }
        })
    }

    // 处理时间参数（可选）
    _processSchedule(schedule) {
        if (schedule?.at instanceof Date) {
            return { at: schedule.at }
        }
        if (typeof schedule?.at === 'number') {
            return { at: new Date(schedule.at) }
        }
        return schedule
    }

    // 验证配置参数
    _validateOptions(options) {
        if (options.notifications) {
            if (!Array.isArray(options.notifications)) {
                throw new Error('Notifications must be an array')
            }
            options.notifications.forEach(n => {
                if (n.id) this._validateId(n.id)
            })
        }
    }

    // 监听器
    addAllListeners() {
        this.addListeners('localNotificationReceived', notification => {
            console.log('Received notification:', notification);
        });
        this.addListeners('localNotificationActionPerformed', notification => {
            console.log('Action performed:', notification);
        });
    }
    addListeners(eventName = 'localNotificationReceived', callback = () => {}) {
        if (eventName !== 'localNotificationReceived' && eventName !== 'localNotificationActionPerformed'){
             throw new Error('eventName must be "localNotificationReceived" or "localNotificationActionPerformed"');
        }
       return new Promise((resolve, reject) => {
           this.instance.addListener(eventName, notification => {
               console.log(JSON.stringify(notification, null, 2));
               if (typeof callback === 'function'){
                   callback(notification);
               }
           }).then(r => {
               console.log("addListener" + eventName, r);
               resolve(r);
           });
       });
     }
    // 核心调度方法
    async schedule(customOptions)
    {
        try {
            // 合并配置
            const finalOptions = typeof customOptions === 'undefined' || customOptions === null ?
                {
                    notifications: this.notifications
                }
                :
                {
                    notifications: [Object.assign(this.notifications[0], customOptions.notifications[0])]
                };
            console.log("finalOptions", JSON.stringify(finalOptions, null, 2));
            // 权限检查
            const { display } = await this.instance.checkPermissions()
            if (display !== 'granted') {
                await this.instance.requestPermissions()
            }

            // 执行调度
            const result = await this.instance.schedule(finalOptions)
            console.debug('Scheduled notifications:', result.notifications)
            return result
        } catch (error) {
            console.error('Notification scheduling failed:', error)
            throw error
        }
    }

    // 静态方法：清除持久化计数器（调试用）
    static resetIdCounter() {
        localStorage.removeItem(ID_COUNTER_KEY)
    }
    removeDeliveredNotifications(delivered = {
        notifications: this.notifications
    }){
       return new Promise((resolve, reject) => {
           this.instance.removeDeliveredNotifications(delivered).then(r => {
               console.log("removeDeliveredNotifications", r);
               resolve(r);
           }).catch(e => {
               console.log("removeDeliveredNotifications", e);
               reject(e);
           });
       });
    }
}

export const BootSuccessNotification = new Notifications({
    notifications: [
        {
            id: 1,
            title: "Frp应用启动成功",
            body: "Frp客户端应用启动成功，请保持后台运行",
        }
    ]
});

export const BootFailedNotification = new Notifications({
    notifications: [
        {
            id: 2,
            title: "Frp应用启动失败",
            body: "Frp客户端应用启动失败，请检查配置文件",
        }
    ]
});