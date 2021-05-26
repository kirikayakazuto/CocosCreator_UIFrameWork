
import ButtonPlus from "./../Common/Components/ButtonPlus"

const {ccclass, property} = cc._decorator;
@ccclass
export default class UIMap_Auto extends cc.Component {
	@property(ButtonPlus)
	Round: ButtonPlus = null;
	@property(ButtonPlus)
	Setting: ButtonPlus = null;
	@property(ButtonPlus)
	Skills: ButtonPlus = null;
	@property(ButtonPlus)
	Back: ButtonPlus = null;
 
}