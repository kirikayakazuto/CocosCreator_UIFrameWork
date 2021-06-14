
import ButtonPlus from "./../Common/Components/ButtonPlus"

const {ccclass, property} = cc._decorator;
@ccclass
export default class UISetting_Auto extends cc.Component {
	@property(ButtonPlus)
	Pop: ButtonPlus = null;
	@property(ButtonPlus)
	Mobx: ButtonPlus = null;
	@property(ButtonPlus)
	Capture: ButtonPlus = null;
	@property(ButtonPlus)
	Light: ButtonPlus = null;
 
}