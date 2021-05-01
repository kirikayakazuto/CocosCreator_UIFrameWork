
import ButtonPlus from "./../Common/Components/ButtonPlus"

const {ccclass, property} = cc._decorator;
@ccclass
export default class UISetting_Auto extends cc.Component {
	@property(ButtonPlus)
	Close: ButtonPlus = null;
	@property(ButtonPlus)
	Pop: ButtonPlus = null;
 
}