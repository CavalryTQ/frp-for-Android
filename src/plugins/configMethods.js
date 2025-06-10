import {frpcConfigFile, frpcConfigDir} from "@/plugins/filesystem.js";
import {cloneDeep} from "lodash/lang.js";


export const loadFrpcConfigFile = async (readFileOptions = frpcConfigFile.readFileOptions) => {
   return new Promise( async (resolve, reject) => {
      try  {
          const configFile = await frpcConfigFile.readSecretFile(readFileOptions);
          resolve(configFile);
       } catch (e) {
           reject(e);
       }
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
    data = ''
) => {
    return new Promise( async (resolve, reject) => {
       try  {
           // await frpcConfigFile.setData(data);
           const writeFileOptions = await cloneDeep(frpcConfigDir.writeFileOptions);
           writeFileOptions.path = '/frpc/' + fileName;
           writeFileOptions.data = data;
           // 加载是否有同名配置
           const configWriteFile = await frpcConfigFile.writeSecretFile(writeFileOptions);
           console.log("writeFileOptions", writeFileOptions)
           console.log("saveConfig", configWriteFile, data);
           // const configFile = await frpcConfigFile.writeSecretFile(writeFileOptions);
       } catch (e) {
           reject(e);
       }
    });
}

export  const deleteConfigFile = async (fileName = 'frpc.toml') => {
    return new Promise( async (resolve, reject) => {
        try  {
            const deleteFileOptions = await cloneDeep(frpcConfigDir.deleteFileOptions);
            deleteFileOptions.path = '/frpc/' + fileName;
            const configDeleteFile = await frpcConfigFile.deleteSecretFile(deleteFileOptions);
            console.log("deleteConfig", configDeleteFile);
            resolve(configDeleteFile);
        } catch (e) {
            reject(e);
        }
    });
}