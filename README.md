
## 使用过程中有任何问题 可以添加我的QQ 1099263878
### Cocos Creator交流群: 521643513



# 基于cocos creator的UI框架, 当前使用的cocos creator版本2.4.3版本
        中心思想, 将所有的UI窗体分为4类管理(screen窗体, 固定窗体, 弹出窗体, 独立窗体), 再将窗体制作成预制体, 动态加载与释放;
        使用UIManager.getInstance().openUIForm("窗体名字"); 显示窗体
        -Scene(管理UIManager)
        -- UIROOT(UIManager脚本挂载结点)
        ---- screen(普通窗体)
        ---- fixed(固定窗体)
        ---- popup(弹出窗体)
        ---- TopTips(独立窗体)
        不同类型的窗体放置在不同的节点上, 统一管理

- UIManager.ts

        核心脚本,包括了加载,显示,隐藏窗体等功能. 
- UIBase.ts

        包好了生命周期函数,如load,init,onShow,onHide等
- AdapterMgr.ts 

        适配管理
- ModalMgr.ts
- UIModalScript.ts

        弹窗模态层管理
- EventCenter.ts

        事件管理
- ResMgr.ts

        资源管理,包括加载释放等
- SoundMgr.ts

        音频管理,包括播放,暂停,声音大小,本地保存等
- Binder.ts

        自动绑定结点, 通过特殊的结点命名方式


## 使用方法

下载本项目后, 将assets\Script下的UIFrame文件夹拷贝到自己的项目, 如果你希望使用ButtonPlus和MaskPlus等扩展组件, 那么还需将packages下的文件夹拷贝到你的项目packages下

新建一个预制体,并将其放在resources目录下. 在新建一个脚本继承于UIBase, 重写prefabPath指定预制体路径(注意: prefabPath需要使用static声明)和窗体类型formType, 将脚本挂载在预制体根节点上.
```
这是项目中的例子, 继承UIBase,重写prefabPath和formType.
const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHall extends UIBase {
    static prefabPath = "UIForms/UIHall";               // resources下的路径
    public formType = FormType.Screen;                  // 窗体类型
    ...
}
```

最后使用UIHall.openView(); 既可.


项目结点都是动态生成的, 使用UIManger.getInstance()时就会动态创建Scene结点和UIROOT等结点.


# 基本功能

![](https://github.com/kirikayakazuto/UIFrameWorld/blob/master/yanshi.png)

        我们将这个场景分成5个部分, 
        1, 表示Top部分的玩家信息
        2, 表示左侧的玩家列表
        3, 表示房间入口按钮
        4, 表示底部的功能列表
        5, 表示背景

前4个我们将其挂载在Fixed结点上, 5号挂载在Normal结点上并设置HideOther属性然后使用AdapterMgr组件使结点在个个位置适配

演示视屏: 暂无

## 2021/01/31 Binder plus, 升级了项目中的自动结点绑定
注意: 目前第一次生成脚本时无法立即绑定到对应结点上, 需要再次执行一次run 即可.

支持代码生成和结点绑定

![](https://github.com/kirikayakazuto/UIFrameWorld/blob/master/doc/autobinder.gif)


## 2020/10/19 Mask Plus, 支持自定义遮罩
扩展了cc.Mask, 添加了一种枚举类型Polygon
![](https://github.com/kirikayakazuto/UIFrameWorld/blob/master/doc/addMaskPlus.gif)

## 2020/10/15 添加2d光线功能
2d光影效果, 项目在2dlight分支, 目前还在优化中 关键代码在Script/Common/light下, 有兴趣的可以看看,
![](https://github.com/kirikayakazuto/UIFrameWorld/blob/master/doc/2dlight.png)


## 2020/7/28 集成ECharts
集成了ECharts, 在ECharts-Support分支, 有需要的可以看看

## 2020/7/10 新增功能
集成Mobx，对于Mobx的使用详情可以前往Mobx的官网了解，github地址 https://github.com/mobxjs/mobx
对于cocos使用例子可以看项目中UIHall的实现

注意事项：将mobx导入为插件时需要将允许编辑器加载打上勾✅

## 2020/5/10 项目结构修改
UIManager -> UIBase             UIManager控制UIBase的加载，释放，显示，隐藏
UIMaskManager -> UIMaskScript   UIMaskManager控制UIMaskScript的显示，隐藏

UIBase继承UIBinder，默认自动绑定UI节点，添加onShow, onHide，showAnimation, hideAnimation的接口
生命周期 load -> onShow -> onLoad -> start -> onHide -> onDestory

EventCenter替换GEventManager，EventCenter使用双层Map，优化了emit的速度

去掉了一些冗余属性和方法，优化了属性，方法名称，精简才是王道


## 2019/10/16 新增功能

1, 将BaseUIBinder分离出来作为BaseUIView的父类, 如果希望使用BaseUIBinder的功能, 请为你的结点添加BaseUIView组件, 你也可以自己继承BaseUIBinder, 然后调用_preInit方法

为什么这么做?
        对于UIForm的控制我尝试过多种方法, 这一次是希望实现一个类似MVC的控制结构, 对于一个UIForm, 我们为其添加C(控制)和V(视图)组件
例如, 我在LoginForm预制体添加的组件一样, 将Form的动画, 显示放在View脚本中, 而事件的监听, 游戏逻辑则放在Control脚本中, 当然View脚本不是必须的
你也可以只实现Control脚本

2, 场景切换(在本单场景管理, 即是Normal结点的更换), 添加加载过度动画

如何使用: 
        1, 在游戏的Main脚本中设置UIIndependentManager.getInstance().setLoadingForm("UIForm/LoadingForm"); 过度场景
        2, 在加载场景时使用UIManager.GetInstance().ShowUIFormWithLoading("UIForm/HallForm");
如上, 在HallForm中需要提前加载的UIform或者其他资源, 可以放在HallForm的load方法中, 这样就会在load内资源加载完毕, 在关闭LoadingForm, 完美实现场景切换

3, 新增了Independent结点与类型
        Independent类似常驻结点, 是独立于其他窗体的特殊窗体, 不会受到其他窗体的影响, 例如加载过度窗体, 就属于独立窗体, 不会因为其他窗体设置了HideOther属性就将其隐藏

## 2019年9月26日新增功能

扩展button, 为button组件添加了

1. 点击button播放音效
2. 屏蔽连续点击

需要注意的是, ButtonPlus.ts需要配合插件使用, 插件路径位于UIFrameWorld\packages\buttonplus, 原因是
在ButtonPlus中@inspector('packages://buttonplus/inspector.js'), 需要引入插件中的inspector.js,
用户也可以在inspector自定义编辑器上ButtonPlus显示格式.


## 2019年9月19日新增功能

 添加UIHelper自动绑定规范命名的结点, UIHelper的功能, 在用脚本控制UI的
 时候, 绑定UI是一件很烦人的事情, 尤其是将UI拖到面板上绑定, 就更加繁琐, 或者在onload, start上 使用getChildByName() 或者cc.find() 查找结点, 又会显得代码冗长大部分时候, 在我创建这个结点的时候, 我就已经想好要让这个结点完成什么功能了(针对渲染结点), 所有我希望在取名字的时候,通过特殊的命名规则, 就可以在脚本中直接使用此结点,  UIHelper就来完成此功能

1. 给结点取一个规范的名字, 例如 _Label$NickName  _Sprite&HeadImage

我分别解释每一部分的意思

* _表示这个结点需要被自动绑定
* Label表示脚本中属性的类型
* $表示分隔符, 后面紧接这个表示变量名字
* NickName就表示这个变量的名字

所以在脚本中, 你可以通过 this._Labels.NickName 获得这个结点上的cc.Label组件

需要注意的是 自动绑定的结点必须是是挂载脚本的结点或者子节点, 如图

![](https://github.com/kirikayakazuto/UIFrameWorld/blob/master/UIBind_dist.png)


只会在BindTest结点的子节点自动绑定结点, 那么我现在有一个结点希望自动绑定, 但是其父节点没有挂载脚本, 怎么办呢.
UIHelper还提供了了bindNode()方法, 将对方结点或者其父节点传入, 那么你就可以在其他脚本将结点自动绑定

还需要注意的是 重复绑定, 因为每次进行查询绑定操作时, 都会对其所有的子节点进行查找, 所有可能会出现重复绑定!




## 8月3日新增功能

BaseUIForm中添加CloseAndDestory属性, 当此属性为true时, 关闭此窗体将会销毁此结点,并且释放结点资源
对于已经显示的窗体, 不会二次显示


