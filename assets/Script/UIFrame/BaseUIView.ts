import BaseUIBinder from "./BaseUIBinder";
/*
 * @Author: 邓朗 
 * @Date: 2019-09-19 22:27:44 
 * @Last Modified by: 邓朗
 * @Last Modified time: 2019-09-26 21:29:27
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseUIView extends BaseUIBinder {
    private called = false;
    /** 初始化 */
    _preInit() {
        if(this.called) return ;
        super.__preInit();
    }
}