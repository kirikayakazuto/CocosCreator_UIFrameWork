import Const from "./Const";

//@ts-ignore
const fs = require('fs');
//@ts-ignore
const path = require('path');

const ProjectPath = Editor.Project.path;

module scene {
    let map: {[key: string]: any} = {};
    /** 遍历resources/forms */
    export async function start() {
        Editor.log(`正在读取配置文件: ${ProjectPath}/${Const.ConfigUrl} 请稍等.`);
        let config = fs.readFileSync(`${ProjectPath}/${Const.ConfigUrl}`);
        if(!config) {
            Editor.log(`读取配置文件失败:${ProjectPath}/${Const.ConfigUrl}`);
            return ;
        }
        config = JSON.parse(config);
        let ProjectDir = Editor.Project.path;
        let FormsPath = `${ProjectDir}/${config.FormsDir}`.replace(/\\/g, "/");
        let ConfigPath = `${ProjectDir}/${config.ScriptsDir}/${config.ScriptsName}`.replace(/\\/g, "/");
        await walkDirSync(FormsPath, async (prefabUrl: string, stat: any) => {
            let type = await getPrefabType(prefabUrl);
            if(!type) return null;
            let baseName = path.basename(prefabUrl).split(".")[0];
            map[baseName] = {
                prefabUrl: getResourcesUrl(prefabUrl),
                type: type
            }
            return null;
        });
        let contentStr = ``;
        for(const key in map) {
            contentStr += `static ${key} = {
        prefabUrl: "${map[key].prefabUrl}",
        type: "${map[key].type}"
    }
    `
        }
        let strScript = `
export default class UIConfig {
    ${contentStr}
}
cc.game.on(cc.game.EVENT_GAME_INITED, () => {
    for(const key in UIConfig) {
        let constourt = cc.js.getClassByName(key);
        if(constourt) constourt['UIConfig'] = UIConfig[key];
    }
});
`;

        let dbConfigPath = ConfigPath.replace(Editor.Project.path.replace(/\\/g, "/"), "db:/");
        await saveFile(dbConfigPath, strScript);
        
        Editor.log(`生成${config.ScriptsName}文件成功`);
    }

    function saveFile(ScriptPath: string, strScript: string) {
        return new Promise((resolve, reject) => {
            // main process or renderer process
            Editor.assetdb.createOrSave(ScriptPath, strScript, function (err: any, meta: any) {
                if(err) {
                    resolve(null);
                    return;
                }
                resolve(meta);
            });
        });
    }

    function getResourcesUrl(fileUrl: string) {
        let url = `${Editor.Project.path}/assets/resources/`.replace(/\\/g, "/");
        fileUrl = fileUrl.replace(/\\/g, "/");
        Editor.log(fileUrl, url);
        return fileUrl.replace(url, "").split('.')[0];
    }

    function getPrefabType(fileUrl: string): Promise<string | null> {
        return new Promise((resolve, reject) => {
            let dbFileUrl = getResourcesUrl(fileUrl);
            cc.resources.load(dbFileUrl, cc.Prefab, (err, asset) => {
                if(err) {
                    resolve(null);
                    return ;
                }
                //@ts-ignore
                const UIBase = cc.UIBase, UIScreen = cc.UIScreen, UIWindow = cc.UIWindow, UIFixed = cc.UIFixed, UITips = cc.UITips;
                let node = (asset as cc.Prefab).data;
                let com = node.getComponent(UIBase);
                if(!com) {
                    Editor.log(`${fileUrl}, 没有继承与UIBase`);
                    resolve(null);
                    return ;
                }
                if(com instanceof UIScreen) resolve("UIScreen");
                else if(com instanceof UIWindow) resolve("UIWindow");
                else if(com instanceof UIFixed) resolve("UIFixed");
                else if(com instanceof UITips) resolve("UITips");
            });
        });
    }

    // 遍历文件夹
    async function walkDirSync(dir: string, callback: (fileUrl: string, stat: any) => Promise<null>) {
        let items = fs.readdirSync(dir);
        for(let i=0; i<items.length; i++) {
            let name = items[i];
            let filePath = path.join(dir, name);
            let stat = fs.statSync(filePath);
            if (stat.isFile()) {
                let extName = path.extname(filePath);
                if(checkIsPrefab(extName)){
                    await callback(filePath, stat);
                }else {
                    if(extName != '.meta') Editor.log(`提示: 跳过${filePath}, 因为它不是prefab~`);
                }
            } else if(stat.isDirectory()) {
                await walkDirSync(filePath, callback);
            }
        }
        return null;
    }

    function checkIsPrefab(extName: string) {
        return extName == '.prefab';
    }

}
module.exports = scene;