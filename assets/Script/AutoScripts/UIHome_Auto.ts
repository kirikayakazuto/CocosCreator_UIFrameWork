
import ButtonPlus from "./../Common/Components/ButtonPlus"

const {ccclass, property} = cc._decorator;
@ccclass
export default class UIHome_Auto extends cc.Component {
	@property(cc.Node)
	Logo: cc.Node = null;
	@property(ButtonPlus)
	Start: ButtonPlus = null;
	@property(ButtonPlus)
	About: ButtonPlus = null;
	@property(ButtonPlus)
	Back: ButtonPlus = null;
 
}