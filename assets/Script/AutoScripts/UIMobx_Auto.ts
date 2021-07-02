
import ButtonPlus from "./../Common/Components/ButtonPlus"

const {ccclass, property} = cc._decorator;
@ccclass
export default class UIMobx_Auto extends cc.Component {
	@property(ButtonPlus)
	Close: ButtonPlus = null;
	@property(cc.Label)
	Txt1: cc.Label = null;
	@property(ButtonPlus)
	Btn1: ButtonPlus = null;
	@property(cc.Label)
	Txt2: cc.Label = null;
	@property(ButtonPlus)
	Btn2: ButtonPlus = null;
	@property(cc.Label)
	Txt3: cc.Label = null;
	@property(cc.Label)
	Txt4: cc.Label = null;
	@property(ButtonPlus)
	Btn3: ButtonPlus = null;
	@property(ButtonPlus)
	Btn4: ButtonPlus = null;
	@property(cc.Label)
	Txt5: cc.Label = null;
 
}