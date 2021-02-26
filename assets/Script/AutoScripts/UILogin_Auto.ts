
import ButtonPlus from "./../Common/Components/ButtonPlus"

const {ccclass, property} = cc._decorator;
@ccclass
export default class UILogin_Auto extends cc.Component {
	@property(cc.Node)
	Login: cc.Node = null;
	@property(ButtonPlus)
	btn: ButtonPlus = null;
	@property(cc.Label)
	Name: cc.Label = null;
 
}