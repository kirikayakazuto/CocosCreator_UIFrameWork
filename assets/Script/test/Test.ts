const {ccclass, property} = cc._decorator;

@ccclass
export default class Test extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        cc.loader.load({uuid:"", url: ""}, (err, data) => {

        })
    }

    // update (dt) {}
}
