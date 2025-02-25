// @capacitor/filesystem 具体实现
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import {Capacitor} from "@capacitor/core";
// TODO: 待完善文件系统的实现

export class FileSystem{
    constructor(path, directoryEnumKey, encodingEnumKey, data, recursive) {
        this.isApp = Capacitor.getPlatform() !== 'web';
        this.instance = this.isApp ? Filesystem : new Error('Platform not supported');
        this.readFileOptions = new ReadFileOptions(path, directoryEnumKey, encodingEnumKey);
        this.writeFileOptions = new WriteFileOptions(path, directoryEnumKey, encodingEnumKey, data, recursive);
    }


 writeSecretFile = async (options = this.writeFileOptions) => {
    console.log('writeSecretFile')
     await this.checkPermissions();
     await Filesystem.writeFile(options).then((result) => {
         console.log('writeFile:', JSON.stringify(result, null, 2));
     });
};

 readSecretFile = async () => {
    const contents = await Filesystem.readFile({
        path: 'secrets/text.txt',
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
    });
    await this.checkPermissions();
    console.log('secrets:', contents);
};

 deleteSecretFile = async () => {
    await Filesystem.deleteFile({
        path: 'secrets/text.txt',
        directory: Directory.Documents,
    });
};


mkDir = async (options = {
    path: '/storage/emulated/0/test',
    directory: Directory.Documents,
    recursive: true,
}) => {
    await this.checkPermissions();
    console.log('mkDir');
    console.log(JSON.stringify(options, null, 2));
   const result =  await Filesystem.mkdir(options);
    console.log('result:', JSON.stringify(result, null, 2));
};

lsDir = async (options = {
    path: '/',
    directory: Directory.Data,
}) => {
    await this.checkPermissions();
    console.log('lsDir');
    console.log(JSON.stringify(options, null, 2));
    const result = await Filesystem.readdir(options);
    console.log('result:', JSON.stringify(result, null, 2));
};
 checkPermissions = async () => {
    const status = await Filesystem.checkPermissions();
    console.log('status:', JSON.stringify(status, null, 2));
    if (status.publicStorage !== 'granted') {
        const { publicStorage } = await Filesystem.requestPermissions();
        console.log('publicStorage:', JSON.stringify(publicStorage, null, 2));
    }
};
}

class ReadFileOptions {
    constructor(path, directoryEnumKey, encodingEnumKey) {
        this.path = path;
        this.directory = Directory[directoryEnumKey];
        this.encoding = Encoding[encodingEnumKey];
        initEnumKey(directoryEnumKey, encodingEnumKey, this);
    }

}

export class WriteFileOptions {
    constructor(path, directoryEnumKey, encodingEnumKey, data, recursive) {
        this.path = path;
        this.directory = Directory[directoryEnumKey];
        this.encoding = Encoding[encodingEnumKey];
        this.data = data;
        this.recursive = recursive;
        initEnumKey(directoryEnumKey, encodingEnumKey, this);
        rex(this);
    }
}

const initEnumKey = (directoryEnumKey, encodingEnumKey, that) => {
    if (that.directory === undefined){
        let key = directoryEnumKey.toLocaleLowerCase();
        key = key.slice(0, 1).toUpperCase() + key.slice(1);
        that.directory = Directory[key];
        key = null;
    }
    if (that.encoding === undefined){
        const key = encodingEnumKey.toUpperCase();
        that.encoding = Encoding[key];
    }
}
const rex = (that)=>{
    // 校验成员属性....
    Object.entries(that).forEach(([key, value]) => {
        if (value === undefined) {
            throw new Error(`${key} is required`);
        }
    });
}

// export const writeSecretFile = async (options = {
//     path: 'secrets/text.txt',
//     data: 'This is a test',
//     directory: Directory.Documents,
//     encoding: Encoding.UTF8,
// }) => {
//     console.log('writeSecretFile')
//     await checkPermissions();
//      await Filesystem.writeFile(options).then((result) => {
//          console.log('writeFile:', JSON.stringify(result, null, 2));
//      });
// };
//
// export const readSecretFile = async () => {
//     const contents = await Filesystem.readFile({
//         path: 'secrets/text.txt',
//         directory: Directory.Documents,
//         encoding: Encoding.UTF8,
//     });
//     await checkPermissions();
//     console.log('secrets:', contents);
// };
//
// const deleteSecretFile = async () => {
//     await Filesystem.deleteFile({
//         path: 'secrets/text.txt',
//         directory: Directory.Documents,
//     });
// };
//
// export const readFilePath = async (options = {
//     path: '/test.txt',
//     directory: Directory.Documents,
//     encoding: Encoding.UTF8,
// }) => {
//     // Here's an example of reading a file with a full file path. Use this to
//     // read binary data (base64 encoded) from plugins that return File URIs, such as
//     // the Camera.
//     const contents = await Filesystem.readFile(options).catch((e) => {
//         console.log('error:', JSON.stringify(e, null, 2));
//     });
//
//     console.log('data:', JSON.stringify(contents, null, 2));
// };
//
// export const mkDir = async (options = {
//     path: '/storage/emulated/0/test',
//     directory: Directory.Documents,
//     recursive: true,
// }) => {
//     await checkPermissions();
//     console.log('mkDir');
//     console.log(JSON.stringify(options, null, 2));
//    const result =  await Filesystem.mkdir(options);
//     console.log('result:', JSON.stringify(result, null, 2));
// };
//
// export const lsDir = async (options = {
//     path: '/',
//     directory: Directory.Data,
// }) => {
//     await checkPermissions();
//     console.log('lsDir');
//     console.log(JSON.stringify(options, null, 2));
//     const result = await Filesystem.readdir(options);
//     console.log('result:', JSON.stringify(result, null, 2));
// };
// const checkPermissions = async () => {
//     const status = await Filesystem.checkPermissions();
//     console.log('status:', JSON.stringify(status, null, 2));
//     if (status.publicStorage !== 'granted') {
//         const { publicStorage } = await Filesystem.requestPermissions();
//         console.log('publicStorage:', JSON.stringify(publicStorage, null, 2));
//     }
// };