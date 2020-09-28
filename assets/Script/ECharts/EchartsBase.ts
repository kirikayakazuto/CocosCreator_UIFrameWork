import DomHelper from "../Common/Components/DomHelper";
import { EventCenter } from "../UIFrame/EventCenter";
import { EventType } from "../UIFrame/EventType";

const {ccclass, property} = cc._decorator;

/**
 * 封装了一层Echarts
 */
@ccclass
export default class EchartsBase extends cc.Component {    

    private echarts: echarts.ECharts = null;
    private option: any = null;

    domHelper: DomHelper = null;
    onLoad() {
        this.domHelper = this.getComponent(DomHelper);
        if(!this.domHelper) {
            this.domHelper = this.addComponent(DomHelper);
        }
    }
    start() {
        this.echarts = echarts.init(this.domHelper.getDom());
        if(this.option) this.echarts.setOption(this.option);

        this.node.on(cc.Node.EventType.SIZE_CHANGED, this.onWindonwResize, this);
        EventCenter.on(EventType.WindowResize, this.onWindonwResize, this);
    }
    onDestroy() {
        this.node.off(cc.Node.EventType.SIZE_CHANGED, this.onWindonwResize, this);
        EventCenter.off(EventType.WindowResize, this.onWindonwResize, this);
        echarts.dispose(this.echarts);
    }

    public getEcharts() {
        return this.echarts;
    }

    public setOption(option: any) {
        this.option = option;
        if(!this.echarts) return ;

        this.echarts.setOption(option);
    }
    public clear() {
        this.echarts && this.echarts.clear();
        
    }    
    private onWindonwResize() {
        this.domHelper && this.domHelper.onResize(() => {
            this.echarts.resize();
        });
    }

}