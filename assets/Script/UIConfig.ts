
export default class UIConfig {
    static UIFunction = {
        prefabUrl: "Forms/Fixed/UIFunction",
        type: "UIFixed"
    }
    static UISound = {
        prefabUrl: "Forms/Fixed/UISound",
        type: "UIFixed"
    }
    static UIAbout = {
        prefabUrl: "Forms/Screen/UIAbout",
        type: "UIScreen"
    }
    static UICapture = {
        prefabUrl: "Forms/Screen/UICapture",
        type: "UIScreen"
    }
    static UIDungeon = {
        prefabUrl: "Forms/Screen/UIDungeon",
        type: "UIScreen"
    }
    static UIECSView = {
        prefabUrl: "Forms/Screen/UIECSView",
        type: "UIScreen"
    }
    static UIGame = {
        prefabUrl: "Forms/Screen/UIGame",
        type: "UIScreen"
    }
    static UIHome = {
        prefabUrl: "Forms/Screen/UIHome",
        type: "UIScreen"
    }
    static UILight = {
        prefabUrl: "Forms/Screen/UILight",
        type: "UIScreen"
    }
    static UIMap = {
        prefabUrl: "Forms/Screen/UIMap",
        type: "UIScreen"
    }
    static UIMeshTexture = {
        prefabUrl: "Forms/Screen/UIMeshTexture",
        type: "UIScreen"
    }
    static UINavigator = {
        prefabUrl: "Forms/Screen/UINavigator",
        type: "UIScreen"
    }
    static UIScrollTexture = {
        prefabUrl: "Forms/Screen/UIScrollTexture",
        type: "UIScreen"
    }
    static UISplitTexture = {
        prefabUrl: "Forms/Screen/UISplitTexture",
        type: "UIScreen"
    }
    static UILoading = {
        prefabUrl: "Forms/Tips/UILoading",
        type: "UITips"
    }
    static UIToast1 = {
        prefabUrl: "Forms/Toast/UIToast1",
        type: "UIToast"
    }
    static UIMobx = {
        prefabUrl: "Forms/Windows/UIMobx",
        type: "UIWindow"
    }
    static UIPop = {
        prefabUrl: "Forms/Windows/UIPop",
        type: "UIWindow"
    }
    static UIScrollPlus = {
        prefabUrl: "Forms/Windows/UIScrollPlus",
        type: "UIWindow"
    }
    static UISetting = {
        prefabUrl: "Forms/Windows/UISetting",
        type: "UIWindow"
    }
    static UISkills = {
        prefabUrl: "Forms/Windows/UISkills",
        type: "UIWindow"
    }
    static UITips = {
        prefabUrl: "Forms/Windows/UITips",
        type: "UIWindow"
    }
    
}
cc.game.on(cc.game.EVENT_GAME_INITED, () => {
    if(CC_EDITOR) return;
    for(const key in UIConfig) { 
        let constourt = cc.js.getClassByName(key);
        if(!constourt) {
            let urls = UIConfig[key].prefabUrl.split('/') as string[];
            if(!urls || urls.length <= 0) continue;
            let name = urls[urls.length-1];
            constourt = cc.js.getClassByName(name);
        }
        constourt['UIConfig'] = UIConfig[key];
    }
});
