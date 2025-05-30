// @capacitor/filesystem 具体实现
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import {Capacitor} from "@capacitor/core";
// TODO: 待完善文件系统的实现

export class FileSystem{
    constructor(path, directoryEnumKey, encodingEnumKey, data, recursive) {
        this.isApp = Capacitor.getPlatform() !== 'web';
        this.instance = this.isApp ? Filesystem : new Error('Platform not supported');
        this.data = data;
        this.recursive = recursive;
        this.readFileOptions = new ReadFileOptions(path, directoryEnumKey, encodingEnumKey);
        this.writeFileOptions = new WriteFileOptions(path, directoryEnumKey, encodingEnumKey, this.data, this.recursive);
        this.readdirOptions = new ReaddirOptions(path, directoryEnumKey);
    }


 writeSecretFile = async (options = this.writeFileOptions) => {
    console.log('writeSecretFile')
     await this.checkPermissions();
     return await new Promise((resolve, reject) => {
         console.log('writeFile', options);
       Filesystem.writeFile(options).then((result) => {
             console.log('writeFile:', JSON.stringify(result, null, 2));
             resolve(result);
         }).catch((e) => {
             console.log('error:', JSON.stringify(e, null, 2));
             reject(e);
         });
     })
};

 readSecretFile = async (options = this.readFileOptions) => {
     await this.checkPermissions();
     const contents = await this.instance.readFile(options);
    console.log('secrets:', contents);
     console.log('readFile:', contents.data)
     return contents;
};

 deleteSecretFile = async () => {
    await Filesystem.deleteFile({
        path: 'secrets/text.txt',
        directory: Directory.Documents,
    });
};

    /**
     *
     * @param options
     * @returns {Promise<void>}
     */
    mkDir = async (options = this.writeFileOptions) => {
    await this.checkPermissions();
    console.log('mkDir');
    console.log(JSON.stringify(options, null, 2));
   const result =  await this.instance.mkdir(options);
    console.log('result:', JSON.stringify(result, null, 2));
};

    /**
     * 返回目录中的文件列表（非递归）
     * @param options
     * @returns {Promise<ReaddirResult>}
     */
    lsDir = async (options = this.readdirOptions) => {
    await this.checkPermissions();
    console.log('lsDir', options);
    console.log(JSON.stringify(options, null, 2));
    const result = await Filesystem.readdir(options).catch((e) => {
        return {
            code: 0,
            message: e.message
        }
    });
    console.log('result:', JSON.stringify(result, null, 2));
    return result;
};
 checkPermissions = async () => {
    const status = await Filesystem.checkPermissions();
    console.log('status:', JSON.stringify(status, null, 2));
    if (status.publicStorage !== 'granted') {
        const { publicStorage } = await Filesystem.requestPermissions();
        console.log('publicStorage:', JSON.stringify(publicStorage, null, 2));
    }

};

 setData = async (data) => {
    this.data = data;
    this.writeFileOptions.data = data;
 }

 setReadDirOptions =  (options = {
     path: '/',
     directory: 'Documents'
 }) => {
     const Op = options;
     Op.directory = Directory[options.directory];
     this.readdirOptions.init(Op);
     console.log('setReadDirOptions This', this.readdirOptions);
 }
 setWriteFileOptions = (options = {
     path: '/',
     directory: 'Documents',
     encoding: 'UTF8',
     data: '',
     recursive: false
 }) => {
     const Op = Object.entries(options).map(([key, value]) => {
         if (key === 'directory') {
             value = Directory[value];
         }
         if (key === 'encoding') {
             value = Encoding[value];
         }
     });
     this.writeFileOptions.init(Op)
 }
}

class ReadFileOptions {
    constructor(path, directoryEnumKey, encodingEnumKey) {
        this.path = path;
        this.directory = Directory[directoryEnumKey];
        this.encoding = Encoding[encodingEnumKey];
        initEnumKey(directoryEnumKey, encodingEnumKey, this);
    }

}

 class WriteFileOptions{
    constructor(path, directoryEnumKey, encodingEnumKey, data, recursive) {
        this.path = path;
        this.directory = Directory[directoryEnumKey];
        this.encoding = Encoding[encodingEnumKey];
        this.data = data;
        this.recursive = recursive;
        initEnumKey(directoryEnumKey, encodingEnumKey, this);
        // rex(this);
    }

    init(options = {
        path: '/',
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
        data: '',
        recursive: false
    }){
        Object.entries(options).forEach(([key, value]) => {
            if (value !== undefined) {
                this[key] = value;
            }
        });
    }
}

 class ReaddirOptions{
    constructor(path, directoryEnumKey) {
        this.path = path;
        this.directory = Directory[directoryEnumKey];
        initEnumKey(directoryEnumKey, undefined, this);
    }

    init(options = {
        path: '/',
        directory: Directory.Documents
    }){
        Object.entries(options).forEach(([key, value]) => {
            if (value !== undefined) {
                this[key] = value;
            }
        });
        console.log('当前ReaddirOptions', this);
    }
}

const initEnumKey = (directoryEnumKey, encodingEnumKey, that) => {
    if (encodingEnumKey === undefined){
        return;
    }
    if (directoryEnumKey === undefined){
        throw new Error(`${directoryEnumKey} is required`);
    }
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

export const frpcConfigFile = new FileSystem('/frpc/frpc.toml', 'Data', 'UTF8', '', true);
// const rex = (that)=>{
//     // 校验成员属性....
//     Object.entries(that).forEach(([key, value]) => {
//         if (value === undefined) {
//             throw new Error(`${key} is required`);
//         }
//     });
// }

// class ReadFileResult  {
//     constructor(data, path, directory, encoding) {
//         this.data = data;
//         this.path = path;
//         this.directory = directory;
//         this.encoding = encoding;
//     }
// }



