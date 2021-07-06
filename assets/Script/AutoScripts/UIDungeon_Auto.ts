
import ButtonPlus from "./../Common/Components/ButtonPlus"

const {ccclass, property} = cc._decorator;
@ccclass
export default class UIDungeon_Auto extends cc.Component {
	@property(cc.Node)
	Items: cc.Node = null;
	@property(ButtonPlus)
	Back: ButtonPlus = null;
 
}