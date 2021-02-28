import ButtonPlus from "./Common/Components/ButtonPlus";
import TouchPlus from "./Common/Components/TouchPlus";
import UILogin from "./test/UILogin";
import { EventCenter } from "./UIFrame/EventCenter";
import DebugWindowUtil from "./Common/Utils/DebugWindowUtils";
import UITest from "./test/UITest";
import { TestBroadcast } from "./test/TestBroadcast";
import UICapture from "./test/UICapture";
import NetManager from "./UIFrame/NetWork/NetManager";
import HttpUtils from "./UIFrame/NetWork/HttpUtils";
import UIOffline from "./test/UIOffline";
import { off } from "process";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(ButtonPlus)
    buttonPlus: ButtonPlus = null;
    @property(TouchPlus)
    touchPlus: TouchPlus = null;

    @property(cc.Label)
    diffTime: cc.Label = null;
    
    onLoad() {
        EventCenter.on("Event_Login", (a: number, b: number, c: number) => {
            console.log("Event ", a, b, c);
        }, this);
        cc.dynamicAtlasManager.enabled = false;
    }

    start () {
        if (CC_DEBUG) {
            DebugWindowUtil.init();
        }

        // TipsMgr.inst.setLoadingForm("UIForms/UILoading");
        UILogin.openView(1, 2, 3);
        // UITest.openView();
        // UICapture.openView();
        // UIDungeon.openView();
        this.buttonPlus.addClick(() => {
            cc.log("点击事件!");
        }, this);

        this.buttonPlus.addLongClick(() => {
            cc.log("触发长按事件 开始");
        }, () => { 
            cc.log("触发长按事件 结束");
        }, this);

        this.touchPlus.addEvent((e) => {
            console.log('触发点击事件');
        }, (e) => {
            console.log('触发滑动事件', e.getDelta());
        })
        this.test();

        this.requestNetTime();
    }

    requestNetTime() {
        let now = Date.now();
        HttpUtils.get("https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png", `id=${Math.random()}`).then((responst: any) => {
            if(!responst) {
                UIOffline.openView().then((offline) => {
                    offline.waitPromise().then((result) => {
                        this.requestNetTime();
                    });
                });
                return ;
            }
            let diff = Date.now() - now;
            this.diffTime.string = `当前延迟: ${diff}ms`;
            if(diff < 3000) {
                this.scheduleOnce(() => {
                    this.requestNetTime();
                }, 3);
            }else {
                this.requestNetTime();
            }
            
        });
        
    }

    test() {
        
    }



    /**
     * 
     */
    onDestroy() {
        cc.log('destory');
    } 
    
}
