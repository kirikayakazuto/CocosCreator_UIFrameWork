
import ButtonPlus from "./../Common/Components/ButtonPlus"

const {ccclass, property} = cc._decorator;
@ccclass
export default class UIECSView_Auto extends cc.Component {
	@property(ButtonPlus)
	Back: ButtonPlus = null;
 
}