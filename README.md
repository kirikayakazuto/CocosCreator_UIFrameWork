
## 使用过程中有任何问题 可以添加我的QQ 1099263878

# 基于cocos creator的UI框架, 当前使用的cocos creator版本2.2.2版本
        中心思想, 将所有的UI窗体分为4类管理(普通窗体, 固定窗体, 弹出窗体, 独立窗体), 再将窗体制作成预制体, 动态加载与释放;
        使用UIManager.getInstance().showForms("窗体名字");
        -- UIROOT(UIManager脚本挂载结点)
        ---- normal(普通窗体)
        ---- fixed(固定窗体)
        ---- popup(弹出窗体)
        ---- Independent(独立窗体)
        ---- UIMaskScript(UIMaskManager挂载结点, 为窗体添加阴影)
        ---- UIAdaptationScript(AdaptationManager挂载结点, 用于窗体适配)
        不同类型的窗体放置在不同的节点上, 统一管理

## 项目介绍(主要脚本功能)
        -- UIManager ***
                UI窗体管理类, 控制的所有窗体的加载, 显示,隐藏和销毁等功能
        -- BaseUIForm **
                UI窗体的基类, 你的自定义窗体脚本应当继承它, 设置脚本的UIType, MaskType属性, 并重写init方法
        -- UIMaskManager **
                UI窗体的遮罩管理类, 为UI窗体添加一个背景阴影
        -- UIMaskScript *
                设置遮罩样式和取消遮罩
        -- AdaptationManager **
                适配管理, 用于适配固定窗体(Fixed)的贴边处理,上下左右贴边,并且可以适配刘海屏
        -- BaseUIBinder **
                自动绑定编辑器上的结点, 自定义脚本继承BaseUIView脚本即可使用, 你也可以手动继承BaseUIBinder脚本, 并且调用_preInit方法即可
        -- ButtonPlus **
                button组件扩展, 添加了统一的音效播放, 长按检查和屏蔽连续点击
        -- CocosHelper **
                封装了一些cocos的api, 方便使用
        -- GEventManager **
                订阅发布模式工具, 处理全局事件GEventManager.on("事件名称", 回调方法, target); target表示处理对象
        -- ResLoader **
                处理窗体的加载, 会对加载的窗体检查其引用的资源
        

        -- ConfigUIFrame *
                配置UI窗体 名称与路径的对应关系
        -- SysDefine *
                设置一些定义的路径和对应结点名称
        

# 基本作用

![](https://github.com/kirikayakazuto/UIFrameWorld/blob/master/yanshi.png)

        我们将这个场景分成5个部分, 
        1, 表示Top部分的玩家信息
        2, 表示左侧的玩家列表
        3, 表示房间入口按钮
        4, 表示底部的功能列表
        5, 表示背景

前4个我们将其挂载在Fixed结点上, 5号挂载在Normal结点上并设置HideOther属性然后使用AdaptationManager组件使结点在个个位置适配

演示视屏: 暂无

## 使用方法

 1, 下载项目, 将其中的assets\Script下的UIFrame文件夹拷贝到自己的项目, 如果你希望使用ButtonPlus脚本, 那么还需将packages下的文件夹拷贝到你的项目packages下

 2, 将assets\resources下的UIROOT预制体复制到自己的项目, 然后挂载到场景上

 3, 制作自己的窗体Prefab, 在结点上挂载自定义的脚本, 并且这个脚本继承BaseUIForm

 4, 在脚本中定义好UIType, MaskType等属性

 5, 使用UIManager.GetInstance().ShowUIForms("你的prefab路径");即可

![](https://github.com/kirikayakazuto/UIFrameWorld/blob/master/UIROOT_dist.png)

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


