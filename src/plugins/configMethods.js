import {frpcConfigFile, frpcConfigDir} from "@/plugins/filesystem.js";
import {cloneDeep} from "lodash/lang.js";


export const loadFrpcConfigFile = async (readFileOptions = frpcConfigFile.readFileOptions) => {
   return new Promise( async (resolve, reject) => {
       const configFile = await frpcConfigFile.readSecretFile(readFileOptions);
        resolve(configFile);
   })
}

export const loadFrpcConfigDir = async (readdirOptions = frpcConfigDir.readdirOptions) => {
   return new Promise( async (resolve, reject) => {
       const configDir = await frpcConfigDir.lsDir(readdirOptions);
        if (configDir.code === 0){
            reject(configDir);
        }else {
            resolve(configDir);
        }
   });
}

export const saveConfigFile = async (
    fileName = 'frpc.toml',
) => {
    return new Promise( async (resolve, reject) => {
        const readdirOptions =  cloneDeep(frpcConfigDir.readdirOptions);
        readdirOptions.path = '/frpc/' + fileName;
        // 加载配置目录遍历文件
        const configDir = await loadFrpcConfigFile(readdirOptions);
        console.log("configDir", configDir);
        // const configFile = await frpcConfigFile.writeSecretFile(writeFileOptions);

    });
}