# 基于cocos creator的UI框架  有疑问可以添加我的QQ 1099263878
        中心思想, 将所有的UI窗体分为3类管理(普通窗体, 固定窗体, 弹出窗体), 在将窗体制作成预制体, 使用UIManager.getInstance().showForms("窗体名字");显示
        -- UIROOT(UIManager脚本挂载结点)
        ---- normal(普通窗体)
        ---- fixed(固定窗体)
        ---- popup(弹出窗体)
        ---- UIMaskScript(UIMaskManager挂载结点, 为窗体添加阴影)
        ---- UIAdaptationScript(AdaptationManager挂载结点, 用于窗体适配)
        不同类型的窗体放置在不同的节点上, 统一管理

## 项目介绍
        -- UIManager ***
                UI窗体管理类, 控制的所有窗体的加载, 显示和释放
        -- BaseUIForm **
                UI窗体的基类, 所有的窗体应当继承它, 并重写init方法
        -- UIMaskManager **
                UI窗体的遮罩管理类, 为UI窗体添加一个背景阴影
        -- UIMaskScript *
                设置遮罩样式和取消遮罩
        -- AdaptationManager **
                适配管理, 用于适配固定窗体(Fixed)的贴边处理,上下左右贴边,并且可以适配刘海屏
        -- UIType *
                设置窗体类型, 在BaseUIForm中设置其属性
        -- UILoader *
                用于加载UI窗体, 释放窗体资源

        -- ConfigUIFrame *
                配置UI窗体 名称与路径的对应关系
        -- SysDefine *
                设置一些定义的路径和对应结点名称
        
## 为什么使用UIFrame

        在传统项目中, 场景的切换, 以及各UI之间的互动效果 都不太好用, 比如场景的切换, 场景的切换使用loadScene,一句话就搞定了, 但是还有一个弊端, 就是两个场景之间的消息传递十分麻烦, 频繁的切换场景也十分销毁资源, 另一个就是UI的复用, a场景中的一个UI我希望在b场景中也使用, 一般就是制作成预制体, 或者是常驻结点, 无论是哪一种都不太方便, 而使用UIFrame之后, 只需要将重复使用的结点挂在Fixed结点上就好了, 下面看一张图

![](https://github.com/kirikayakazuto/UIFrameWorld/blob/master/yanshi.png)

        我们将这个场景分成5个部分, 
        1, 表示Top部分的玩家信息
        2, 表示左侧的玩家列表
        3, 表示房间入口按钮
        4, 表示底部的功能列表
        5, 表示背景

        前4个我们将其挂载在Fixed结点上, 5号挂载在Normal结点上, 并设置HideOther属性, 并且使用AdaptationManager组件使结点在个个位置适配

        演示视屏: 

## 使用方法
        下载: 进入script文件夹中, 将UIFrame文件夹拷贝到你自己的项目中

        场景结点设置, 如果UIROOT及子节点设置的和我不同, 请到SysDefind中修改
![](https://github.com/kirikayakazuto/UIFrameWorld/blob/master/UIROOT_dist.png)

        1, 新建一个UI窗体, 并为它创建一个脚本, 脚本继承自BaseUIForm, 重写属性CurrentUIType设置为窗体对应属性
        2, 重写init方法, 并获取参数obj, 对UI窗体进行数据初始化, 每一次执行showUIForm方法都会触发init方法
        3, 重写ShowPopUpAnimation方法,播放入场动画,重写HidePopUpAnimation方法, 播放出场动画
        ~~4, 在config/ConfigUIForm 中配置窗体名称与对应的路径~~
        5, 通过UIManager.GetInstance().ShowUIForms("uiformname", null); 方法展示窗体
        6, 更多详细内容, 请见test中的示例


## 8月3日新增功能
BaseUIForm中添加CloseAndDestory属性, 当此属性为true时, 关闭此窗体将会销毁此结点,并且释放结点资源
对于已经显示的窗体, 不会二次显示