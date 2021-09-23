
import ButtonPlus from "./../Common/Components/ButtonPlus"

const {ccclass, property} = cc._decorator;
@ccclass
export default class UIFunction_Auto extends cc.Component {
	@property(ButtonPlus)
	Setting: ButtonPlus = null;
	@property(ButtonPlus)
	Skills: ButtonPlus = null;
	@property(ButtonPlus)
	ScrollHelper: ButtonPlus = null;
 
}