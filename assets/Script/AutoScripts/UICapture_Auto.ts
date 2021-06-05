
import ButtonPlus from "./../Common/Components/ButtonPlus"

const {ccclass, property} = cc._decorator;
@ccclass
export default class UICapture_Auto extends cc.Component {
	@property(ButtonPlus)
	Back: ButtonPlus = null;
	@property(ButtonPlus)
	Capture: ButtonPlus = null;
	@property(ButtonPlus)
	Pen: ButtonPlus = null;
	@property(ButtonPlus)
	Reaser: ButtonPlus = null;
 
}