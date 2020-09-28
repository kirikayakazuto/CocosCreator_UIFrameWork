import PropBind from "../Common/Utils/PropBind";
import EchartsBase from "../ECharts/EchartsBase";
import { FormType } from "../UIFrame/config/SysDefine";
import UIBase from "../UIFrame/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIEcharts extends UIBase {

    public formType = FormType.Screen;
    static prefabPath = "UIForms/UIEcharts";

    @property(EchartsBase)
    echarts: EchartsBase = null;
    @property(EchartsBase)
    echarts2: EchartsBase = null;

    // onLoad () {}

    start () {

    }

    onShow() {
        this.Test();
        this.Test2();
    }

    Test() {
        var option = {
            title: {text: 'Line Chart'},
            tooltip: {},
            toolbox: {
                feature: {
                    dataView: {},
                    saveAsImage: {
                        pixelRatio: 2
                    },
                    restore: {}
                }
            },
            xAxis: {},
            yAxis: {},
            series: [{
                type: 'line',
                smooth: true,
                
                data: [[12, 5], [24, 20], [36, 36], [48, 10], [60, 10], [72, 20]]
            }]
        };
        this.echarts.setOption(option);
    }
    Test2() {
        var option = {
            title: {text: 'Line Chart'},
            tooltip: {},
            toolbox: {
                feature: {
                    dataView: {},
                    saveAsImage: {
                        pixelRatio: 2
                    },
                    restore: {}
                }
            },
            xAxis: {},
            yAxis: {},
            series: [{
                type: 'line',
                smooth: true,
                
                data: [[12, 5], [24, 20], [36, 36], [48, 10], [60, 10], [72, 20]]
            }]
        };
        this.echarts2.setOption(option);
    }


    // update (dt) {}
}
