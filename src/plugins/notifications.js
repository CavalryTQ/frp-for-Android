// @capacitor/push-notifications 推送通知实现
import { PushNotifications } from '@capacitor/push-notifications';

 export default new class Notifications {
    constructor() {
        this.instance = PushNotifications;
        // this.title = title;
        // this.body = body;
    }

    async addListeners(){
        await this.addListener('registration', (token) => {
            console.log('Push registration success, token: ' + token.value);
        });

        await this.addListener('registrationError', (error) => {
            console.log('Error on registration: ' + JSON.stringify(error));
        });

        await this.addListener('pushNotificationReceived', (notification) => {
            console.log('Push notification received: ' + JSON.stringify(notification));
        });
        await this.addListener('pushNotificationActionPerformed', (notification) => {
            console.log('Push notification action performed', notification.data);
        });
    }
    async addListener(eventName, callback){
        await this.instance.addListener(eventName, async (token) => {
            console.log('Push notification token: ' + token.value);
            callback(token.value);
        });
    }
    async register() {
        try {
            let permStatus = await this.instance.checkPermissions();

            if (permStatus.receive === 'prompt') {
                permStatus = await this.instance.requestPermissions();
            }

            if (permStatus.receive !== 'granted') {
                 new Error('User denied permissions!');
            }

            await this.instance.register();
        } catch (error) {
            console.error(error);
        }
    }
    requestPermissions(){
        return new Promise((resolve, reject) => {
            this.instance.requestPermissions().then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
