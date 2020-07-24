/**
 * 取消一个先前通过调用 requestAnimationFrame 方法添加到计划中的动画帧请求
 */
declare function cancelAnimationFrame(requestID: number): void;

/**
 * 在下次进行重绘时执行。
 */
declare function requestAnimationFrame(callback: () => void): number;

/** 输出日志*/
interface Console {
    debug(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
    group(groupTitle?: string, ...optionalParams: any[]): void;
    groupEnd(): void;
    info(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
}

/** 输出日志*/
declare var Console: {
    prototype: Console;
    new(): Console;
};

declare var console: Console;
/**
 * 可取消由 setTimeout() 方法设置的定时器。
 */
declare function clearTimeout(timeoutID: number): void;

/**
 * 可取消由 setInterval() 方法设置的定时器。
 */
declare function clearInterval(intervalID: number): void;

/**
 * 设定一个定时器，在定时到期以后执行注册的回调函数
 * @param callback 回调函数
 * @param delay 延迟的时间，函数的调用会在该延迟之后发生，单位 ms。
 * @param rest param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数。
 * @returns number定时器的编号。这个值可以传递给 clearTimeout 来取消该定时。
 */
declare function setTimeout(callback: () => void, delay: number, ...rest): number;

/**
 * 设定一个定时器，按照指定的周期（以毫秒计）来执行注册的回调函数
 * @param callback 回调函数
 * @param delay 执行回调函数之间的时间间隔，单位 ms。
 * @param rest param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数。
 * @returns number定时器的编号。这个值可以传递给 clearTimeout 来取消该定时。
 */
declare function setInterval(callback: () => void, delay: number, ...rest): number;

/**
 * 微信小游戏命名空间
 */
declare namespace wx {

    type systemInfo = {
        /** 手机品牌*/
        brand: string;
        /** 手机型号*/
        model: string;
        /**	设备像素比 */
        pixelRatio: number;
        /** 屏幕宽度*/
        screenWidth: number;
        /** 屏幕高度*/
        screenHeight: number;
        /** 可使用窗口宽度*/
        windowWidth: number;
        /** 可使用窗口高度*/
        windowHeight: number;
        /** 状态栏的高度*/
        statusBarHeight: number;
        /** 微信设置的语言*/
        language: string;
        /** 微信版本号*/
        version: string;
        /** 操作系统版本*/
        system: string;
        /** 客户端平台*/
        platform: string
        /** 用户字体大小设置。以“我-设置 - 通用 - 字体大小”中的设置为准，单位 px。*/
        fontSizeSetting: number;
        /** 客户端基础库版本*/
        SDKVersion: string;
        /** 性能等级*/
        benchmarkLevel: number;
    }

    type launchOption = {
        /** 启动小游戏的场景值*/
        scene: number;
        /** 启动小游戏的 query 参数	*/
        query: Object;
        /** 当前小游戏是否被显示在聊天顶部*/
        referrerInfo: ReferrerInfo
        /** shareTicket，详见获取更多转发信息*/
        shareTicket: string;
    }

    type ReferrerInfo = {
        /** 来源小程序或公众号或App的 appId	*/
        appId: string,
        /**  来源小程序传过来的数据，scene=1037或1038时支持*/
        extraData: any
    }

    /**
     * UpdateManager 对象，用来管理更新，可通过 wx.getUpdateManager 接口获取实例。
     */
    type UpdateManager = {
        /**
         * 强制小程序重启并使用新版本。在小程序新版本下载完成后（即收到 onUpdateReady 回调）调用。
         */
        applyUpdate(): void;
        /**
         * 监听向微信后台请求检查更新结果事件。微信在小程序冷启动时自动检查更新，不需由开发者主动触发。
         * @param callback 向微信后台请求检查更新结果事件的回调函数
         */
        onCheckForUpdate(callback: (res: { hasUpdate: boolean }) => void): void;
        /**
         * 监听小程序有版本更新事件。客户端主动触发下载（无需开发者触发），下载成功后回调
         * @param callback 小程序有版本更新事件的回调函数
         */
        onUpdateReady(callback: () => void): void;
        /**
         * 监听小程序更新失败事件。小程序有新版本，客户端主动触发下载（无需开发者触发），下载失败（可能是网络原因等）后回调
         * @param callback 小程序更新失败事件的回调函数
         */
        onUpdateFailed(callback: () => void): void;
    }

    /**
     * 在触控设备上的触摸点。通常是指手指或者触控笔在触屏设备或者触摸板上的操作。
     */
    type Touch = {
        /** Touch 对象的唯一标识符，只读属性。一次触摸动作(我们值的是手指的触摸)在平面上移动的整个过程中, 该标识符不变。可以根据它来判断跟踪的是否是同一次触摸过程。*/
        identifier: number
        /** 触点相对于屏幕左边沿的 X 坐标。*/
        screenX: number
        /** 触点相对于屏幕上边沿的 Y 坐标。*/
        screenY: number
    }

    /**
     * 性能管理器
     */
    type Performance = {
        /**
         * 可以获取当前时间以微秒为单位的时间戳
         */
        now(): number;
    }

    /**
     * 加载分包任务实例，用于获取分包加载状态
     */
    type LoadSubpackageTask = {
        /**
         * 监听分包加载进度变化事件
         * @param callback 分包加载进度变化事件的回调函数
         */
        onProgressUpdate(callback: (res: {
            /** 分包下载进度百分比*/
            progress: number
            /** 已经下载的数据长度，单位 Bytes	*/
            totalBytesWritten: number
            /** 预期需要下载的数据总长度，单位 Bytes*/
            totalBytesExpectedToWrite: number
        }) => void): void
    }

    /**
     * 通过 Canvas.getContext('2d') 接口可以获取 CanvasRenderingContext2D 对象，实现了 HTML Canvas 2D Context 定义的大部分属性、方法。
     * 通过 Canvas.getContext('webgl') 接口可以获取 WebGLRenderingContext 对象，实现了 WebGL 1.0 定义的所有属性、方法、常量。
     * 2d 接口支持情况
     * iOS/Android 不支持的 2d 属性和接口

     * globalCompositeOperation 不支持以下值： source-in source-out destination-atop lighter copy。如果使用，不会报错，但是将得到与预期不符的结果。
     * isPointInPath
     * WebGL 接口支持情况
     * iOS/Android 不支持的 WebGL 接口

     * pixelStorei 当第一个参数是 gl.UNPACK_COLORSPACE_CONVERSION_WEBGL 时
     * compressedTexImage2D
     * compressedTexSubImage2D
     * 除此之外 Android 还不支持 WebGL 接口

     * getExtension
     * getSupportedExtensions
     */
    interface RenderingContext { }

    interface Canvas {
        /** 画布的宽度*/
        width: number;
        /** 画布的高度*/
        height: number;

        /**
         * 获取画布对象的绘图上下文
         */
        getContext(contextType: '2d' | 'webgl', contextAttributes: { antialias?: boolean, preserveDrawingBuffer?: boolean, antialiasSamples?: 2 }): RenderingContext;
        /**
         * 将当前 Canvas 保存为一个临时文件，并生成相应的临时文件路径。
         */
        toTempFilePath(object: { x?: number, y?: number, width?: number, height?: number, destWidth?: number, destHeight?: number, fileType?: 'jpg' | 'png', quality?: number, success?: (res?: any) => void, fail?: (err?: any) => void, complete?: (res?: any) => void }): string;
        /**
         * 把画布上的绘制内容以一个 data URI 的格式返回
         */
        toDataURL(): string;
        /**
         * Canvas.toTempFilePath 的同步版本
         */
        toTempFilePathSync(object: { x?: number, y?: number, width?: number, height?: number, destWidth?: number, destHeight?: number, fileType?: 'jpg' | 'png', quality?: number }): void;
    }

    /**
     * 获取系统信息
     */
    function getSystemInfo(object: { success: (res?: systemInfo) => void, fail: (err?: any) => void, complete: (res?: any) => void }): void;

    /**
     * wx.getSystemInfo 的同步版本
     */
    function getSystemInfoSync(): systemInfo;

    /**
     * 返回值 UpdateManager
     */
    function getUpdateManager(): UpdateManager;

    /**
     * 退出当前小游戏
     */
    function exitMiniProgram(object: { success?: () => void, fail?: () => void, complete?: () => void }): void;

    /**
    * 返回小程序启动参数
    */
    function getLaunchOptionsSync(): launchOption;
    /**
     * 监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
     */
    function onHide(callback: () => void): void;
    /**
     * 取消监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
     */
    function offHide(callback: () => void): void;
    /**
     * 监听小游戏回到前台的事件
     */
    function onShow(callback: (res: {
        /** 场景值*/
        scene: string,
        /** 查询参数*/
        query: any,
        /** shareTicket*/
        shareTicket: string,
        /** 当场景为由从另一个小程序或公众号或App打开时，返回此字段*/
        referrerInfo: ReferrerInfo
    }) => void): void;
    /**
     * 取消监听小游戏回到前台的事件
     */
    function offShow(callback: () => void): void;

    /**
    * 监听音频中断结束，在收到 onAudioInterruptionBegin 事件之后，小程序内所有音频会暂停，收到此事件之后才可再次播放成功
    */
    function onAudioInterruptionEnd(callback: () => void): void;
    /**
     * 取消监听音频中断结束，在收到 onAudioInterruptionBegin 事件之后，小程序内所有音频会暂停，收到此事件之后才可再次播放成功
     */
    function offAudioInterruptionEnd(callback: () => void): void;
    /**
     * 监听音频因为受到系统占用而被中断开始，以下场景会触发此事件：闹钟、电话、FaceTime 通话、微信语音聊天、微信视频聊天。此事件触发后，小程序内所有音频会暂停。
     */
    function onAudioInterruptionBegin(callback: () => void): void;
    /**
     * 取消监听音频因为受到系统占用而被中断开始，以下场景会触发此事件：闹钟、电话、FaceTime 通话、微信语音聊天、微信视频聊天。此事件触发后，小程序内所有音频会暂停。
     */
    function offAudioInterruptionBegin(callback: () => void): void;
    /**
     * 监听全局错误事件
     */
    function onError(callback: (res: {
        /** 错误*/
        message: string,
        /** 错误调用堆栈*/
        stack: string
    }) => void): void;
    /**
     * 取消监听全局错误事件
     */
    function offError(callback: () => void): void;

    /**
     * 监听开始触摸事件
     */
    function onTouchStart(callback: (res: {
        /** 当前所有触摸点的列表*/
        touches: Array<Touch>,
        /** 触发此次事件的触摸点列表*/
        changedTouches: Array<Touch>,
        /** 事件触发时的时间戳*/
        timeStamp: number
    }) => void): void;
    /**
     * 取消监听开始触摸事件
     */
    function offTouchStart(callback: () => void): void;
    /**
     * 监听触点移动事件
     */
    function onTouchMove(callback: (res: {
        /** 当前所有触摸点的列表*/
        touches: Array<Touch>,
        /** 触发此次事件的触摸点列表*/
        changedTouches: Array<Touch>,
        /** 事件触发时的时间戳*/
        timeStamp: number
    }) => void): void;
    /**
     * 取消监听触点移动事件
     */
    function offTouchMove(callback: () => void): void;
    /**
     * 监听触摸结束事件
     */
    function onTouchEnd(callback: (res: {
        /** 当前所有触摸点的列表*/
        touches: Array<Touch>,
        /** 触发此次事件的触摸点列表*/
        changedTouches: Array<Touch>,
        /** 事件触发时的时间戳*/
        timeStamp: number
    }) => void): void;
    /**
     * 取消监听触摸结束事件
     */
    function offTouchEnd(callback: () => void): void;
    /**
     * 监听触点失效事件
     */
    function onTouchCancel(callback: (res: {
        /** 当前所有触摸点的列表*/
        touches: Array<Touch>,
        /** 触发此次事件的触摸点列表*/
        changedTouches: Array<Touch>,
        /** 事件触发时的时间戳*/
        timeStamp: number
    }) => void): void;
    /**
     * 取消监听触点失效事件
     */
    function offTouchCancel(callback: () => void): void;

    /**
    * 获取性能管理器
    */
    function getPerformance(): Performance;
    /**
     * 加快触发 JavaScrpitCore Garbage Collection（垃圾回收），GC 时机是由 JavaScrpitCore 来控制的，并不能保证调用后马上触发 GC。
     */
    function triggerGC(): void;

    /**
     *  基础库 2.1.0 开始支持，低版本需做兼容处理。
     *  触发分包加载，详见 分包加载
     */
    function loadSubpackage(res: {
        /** 分包的名字，可以填 name 或者 root*/
        name: () => void,
        /** 分包加载成功回调事件*/
        success: () => void,
        /** 分包加载失败回调事件*/
        fail: () => void,
        /** 分包加载结束回调事件(加载成功、失败都会执行）*/
        complete: () => void
    }): LoadSubpackageTask;

    /**
     * 基础库 1.4.0 开始支持，低版本需做兼容处理。
     * 设置是否打开调试开关。此开关对正式版也能生效。
     */
    function setEnableDebug(res: {
        /** 是否打开调试*/
        enableDebug: boolean,
        /** 接口调用成功的回调函数*/
        success?: () => void,
        /** 接口调用失败的回调函数*/
        fail?: () => void,
        /** 接口调用结束的回调函数（调用成功、失败都会执行）*/
        complete?: () => void
    }): void;

    /**
     * 创建一个画布对象。首次调用创建的是显示在屏幕上的画布，之后调用创建的都是离屏画布。
     */
    function createCanvas(): Canvas;

    /**
     * 可以修改渲染帧率。默认渲染帧率为 60 帧每秒。修改后，requestAnimationFrame 的回调频率会发生改变。
     */
    function setPreferredFramesPerSecond(fps: number): void;

    /**
     * 获取一行文本的行高
     * @returns number 文本的行高
     */
    function getTextLineHeight(object: { fontStyle?: 'normal' | 'italic', fontWeight?: 'normal' | 'bold', fontSize?: 16, fontFamily: string, text: string, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): number;
    /**
     * 加载自定义字体文件
     * @returns string 如果加载字体成功，则返回字体 family 值，否则返回 null。
     */
    function loadFont(path: string): string;


    interface Image {
        /**
         * 图片的 URL
         */
        src: string;
        /**
        * 图片的真实宽度
        */
        width: number;
        /**
        * 图片的真实高度
        */
        height: number;
        /**
         * 图片的加载完成
         */
        onload: (res?: any) => void;
        /**
         * 图片加载发生错误后触发的回调函数
         */
        onerror: (res?: any) => void;
    }

    /**
     * 创建一个图片对象
     */
    function createImage(): Image;

    /**
     * banner 广告组件。banner 广告组件是一个原生组件，层级比上屏 Canvas 高，会覆盖在上屏 Canvas 上。banner 广告组件默认是隐藏的，需要调用 BannerAd.show() 将其显示。banner 广告会根据开发者设置的宽度进行等比缩放，缩放后的尺寸将通过 BannerAd.onResize() 事件中提供。
     */
    interface BannerAd {
        /**
         * banner 广告组件的样式。style 上的属性的值仅为开发者设置的值，banner 广告会根据开发者设置的宽度进行等比缩放，缩放后的真实尺寸需要通过 BannerAd.onResize() 事件获得。
         */
        style: {
            /** banner 广告组件的左上角横坐标*/
            left: number,
            /** banner 广告组件的左上角纵坐标*/
            top: number,
            /** banner 广告组件的宽度。最小 300，最大至 屏幕宽度（屏幕宽度可以通过 wx.getSystemInfoSync() 获取）。*/
            width: number,
            /** banner 广告组件的高度*/
            height: number,
            /** banner 广告组件经过缩放后真实的宽度*/
            realWidth: number,
            /** banner 广告组件经过缩放后真实的高度*/
            realHeight: number
        };

        /** 显示 banner 广告。*/
        show(): Promise<any>;
        /** 隐藏 banner 广告*/
        hide(): void;
        /** 销毁 banner 广告*/
        destroy(): void;
        /** 监听 banner 广告尺寸变化事件*/
        onResize(callback: (res: { width: number, height: number }) => void): void;
        /** 取消监听 banner 广告尺寸变化事件*/
        offResize(callback: () => void): void;
        /** 监听 banner 广告加载事件*/
        onLoad(callback: () => void): void;
        /** 取消监听 banner 广告加载事件*/
        offLoad(callback: () => void): void;
        /** 监听 banner 广告错误事件*/
        onError(callback: (res: { errMsg: string, errCode: 1000 | 1001 | 1002 | 1003 | 1004 | 1005 | 1006 | 1007 | 1008 }) => void): void;
        /** 取消监听 banner 广告错误事件*/
        offError(callback: () => void): void;
    }

    /**
     * 激励视频广告组件。激励视频广告组件是一个原生组件，并且是一个全局单例。层级比上屏 Canvas 高，会覆盖在上屏 Canvas 上。激励视频 广告组件默认是隐藏的，需要调用 RewardedVideoAd.show() 将其显示。
     */
    interface RewardedVideoAd {
        /** 隐藏激励视频广告*/
        load(): Promise<any>;
        /** 显示激励视频广告。激励视频广告将从屏幕下方推入。*/
        show(): Promise<any>;
        /** 销毁 banner 广告*/
        destroy(): void;
        /** 监听 banner 广告尺寸变化事件*/
        onResize(callback: (res: { width: number, height: number }) => void): void;
        /** 取消监听 banner 广告尺寸变化事件*/
        offResize(callback: () => void): void;
        /** 监听激励视频广告加载事件*/
        onLoad(callback: () => void): void;
        /** 取消监听激励视频广告加载事件*/
        offLoad(callback: () => void): void;
        /** 监听激励视频错误事件*/
        onError(callback: (res: { errMsg: string, errCode: 1000 | 1001 | 1002 | 1003 | 1004 | 1005 | 1006 | 1007 | 1008 }) => void): void;
        /** 取消监听激励视频错误事件*/
        offError(callback: () => void): void;
        /** 监听用户点击 关闭广告 按钮的事件*/
        onClose(callback: (res: { isEnded: boolean }) => void);
        /** 取消监听用户点击 关闭广告 按钮的事件*/
        offClose(callback: () => void);
    }

    /**
     * 创建激励视频广告组件。请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion 判断基础库版本号 >= 2.0.4 后再使用该 API。同时，开发者工具上暂不支持调试该 API，请直接在真机上进行调试。
     */
    function createRewardedVideoAd(res: { adUnitId: string }): RewardedVideoAd;

    /**
     * 创建 banner 广告组件。请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion 判断基础库版本号 >= 2.0.4 后再使用该 API。同时，开发者工具上暂不支持调试该 API，请直接在真机上进行调试。
     */
    function createBannerAd(res: {
        adUnitId: string, style: {
            left: number,
            top: number,
            width: number,
            height: number
        }
    }): BannerAd;

    /**
     * 显示操作菜单
     */
    function showActionSheet(object: { itemList: string[], itemColor?: string, success?: (res?: { tapIndex: number }) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /** 隐藏 loading 提示框*/
    function hideLoading(object: { success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;
    /** 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框*/
    function showLoading(object: { title: string, mask?: boolean, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /** 隐藏消息提示框*/
    function hideToast(object: { success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /** 显示消息提示框*/
    function showToast(object: { title: string, icon?: 'success' | 'loading' | 'none', image?: string, duration?: 1500, mask?: boolean, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * 显示模态对话框
     */
    function showModal(object: {
        title: string,
        content: string,
        showCancel?: true,
        cancelText?: '取消',
        cancelColor?: '#000000',
        confirmText?: '确定',
        confirmColor?: '#3cc51f',
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /**
     * 基础库 2.1.0 开始支持，低版本需做兼容处理。更新键盘输入框内容。只有当键盘处于拉起状态时才会产生效果
     */
    function updateKeyboard(res: {
        value: string,
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /**
     * 隐藏键盘
     */
    function hideKeyboard(object: { success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
    * 显示键盘
    */
    function showKeyboard(object: { defaultValue: string, maxLength: number, multiple: boolean, confirmHold: boolean, confirmType: 'done' | 'next' | 'search' | 'go' | 'send', success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;
    /**
     * 监听键盘输入事件
     */
    function onKeyboardInput(callback: (res: { value: string }) => void): void;
    /**
     * 取消监听键盘输入事件
     */
    function offKeyboardInput(callback: () => void): void;
    /**
     * 监听用户点击键盘 Confirm 按钮时的事件
     */
    function onKeyboardConfirm(callback: (res: { value: string }) => void): void;
    /**
     * 取消监听用户点击键盘 Confirm 按钮时的事件
     */
    function offKeyboardConfirm(callback: () => void): void;
    /**
     * 监听监听键盘收起的事件
     */
    function onKeyboardComplete(callback: (res: { value: string }) => void): void;
    /**
     * 取消监听监听键盘收起的事件
     */
    function offKeyboardComplete(callback: () => void): void;

    /** 基础库 2.1.0 开始支持，低版本需做兼容处理。获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。*/
    function getMenuButtonBoundingClientRect(): {
        width: number,
        height: number,
        top: number,
        right: number,
        bottom: number,
        left: number
    };

    /** 动态设置通过右上角按钮拉起的菜单的样式。*/
    function setMenuStyle(res: { style: 'light' | 'dark', success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /** 当在配置中设置 showStatusBarStyle 时，屏幕顶部会显示状态栏。此接口可以修改状态栏的样式。*/
    function setStatusBarStyle(res: { style: 'white' | 'black', success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * 监听窗口尺寸变化事件
     */
    function onWindowResize(callback: (res: { windowWidth: number, windowHeight: number }) => void): void;
    /**
     * 取消监听窗口尺寸变化事件
     */
    function offWindowResize(callback: () => void): void;

    interface RequestTask {
        abort(): void;
        /** 监听 HTTP Response Header 事件。会比请求完成事件更早*/
        onHeadersReceived(callback: (res: { header: Object }) => void): void;
        /** 取消监听 HTTP Response Header 事件*/
        offHeadersReceived(callback: () => void): void;
    }

    /**
     * 发起网络请求。
     */
    function request(object: {
        url: string,
        data?: string | {} | ArrayBuffer,
        header?: {},
        method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT',
        dataType?: 'json' | string,
        responseType: 'text' | 'arraybuffer',
        success?: (res?: {
            data: string | {} | ArrayBuffer,
            statusCode: number,
            header: {}
        }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): RequestTask;


    interface DownloadTask {
        abort(): void;

        /** 监听下载进度变化事件*/
        onProgressUpdate(callback: (res: {
            progress: number,
            totalBytesWritten: number,
            totalBytesExpectedToWrite: number
        }) => void): void;

        /** 取消监听下载进度变化事件*/
        offProgressUpdate(callback: () => void): void;
        /** 监听 HTTP Response Header 事件。会比请求完成事件更早*/
        onHeadersReceived(callback: (res: { header: Object }) => void): void;
        /** 取消监听 HTTP Response Header 事件*/
        offHeadersReceived(callback: () => void): void;
    }

    /**
     * 下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地文件路径。
     */
    function downloadFile(object: {
        url: string,
        header?: Object,
        filePath?: string,
        success?: (res?: {
            tempFilePath: string,
            statusCode: number
        }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): DownloadTask;

    interface UploadTask {
        /** 中断上传任务*/
        abort(): void;
        /** 监听上传进度变化事件*/
        onProgressUpdate(callback: (res: {
            progress: number,
            totalBytesSent: number,
            totalBytesExpectedToSend: number
        }) => void): void;
        /** 取消监听上传进度变化事件*/
        offProgressUpdate(callback: () => void): void;
        /** 监听 HTTP Response Header 事件。会比请求完成事件更早*/
        onHeadersReceived(callback: (res: { header: Object }) => void): void;
        /** 取消监听 HTTP Response Header 事件*/
        offHeadersReceived(callback: () => void): void;
    }

    /**
     * 将本地资源上传到开发者服务器，客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data 。
     */
    function uploadFile(object: {
        url: string,
        filePath: string,
        name: string,
        header?: Object,
        formData?: Object,
        success?: (res?: {
            data: string,
            statusCode: number
        }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): UploadTask;

    interface SocketTask {
        /**
         * 关闭 WebSocket 连接
         */
        close(object: { code?: 1000, reason?: string, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;
        /**
         * 监听WebSocket 连接打开事件
         */
        onOpen(callback: (res: { header: Object }) => void): void;
        /**
         * 监听WebSocket 连接关闭事件
         */
        onClose(callback: () => void): void;
        /**
         * 监听WebSocket 错误事件
         */
        onError(callback: (res: { errMsg: string }) => void): void;
        /**
         * 监听WebSocket 接受到服务器的消息事件
         */
        onMessage(callback: (res: { data: string | ArrayBuffer }) => void): void;
        /**
         * 通过 WebSocket 连接发送数据
         */
        send(object: { data: string | ArrayBuffer, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;
    }

    /**
     * 监听WebSocket 错误事件
     */
    function onSocketError(callback: (err?: any) => void): void;

    /**
     * 创建一个 WebSocket 连接。
     */
    function connectSocket(object: { url: string, header?: {}, protocols: Array<string>, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): SocketTask;
    /**
     * 关闭 WeSocket 连接
     */
    function closeSocket(object: { code?: 1000, reason?: string, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;
    /**
     * 监听WebSocket 连接打开事件
     */
    function onSocketOpen(callback: (res: { header: {} }) => void): void;
    /**
     * 监听WebSocket 连接关闭事件
     */
    function onSocketClose(callback: () => void): void;
    /**
     * 监听WebSocket 接受到服务器的消息事件
     */
    function onSocketMessage(callback: (res: { data: string | ArrayBuffer }) => void): void;
    /**
     * 通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
     */
    function sendSocketMessage(object: { data: string | ArrayBuffer, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /** 
     * 更新转发属性
     * 
     */
    function updateShareMenu(object: { withShareTicket?: boolean, isUpdatableMessage?: boolean, activityId?: string, templateInfo?: { parameterList: Array<{ name: string, value: string }> }, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * 显示当前页面的转发按钮
     */
    function showShareMenu(object: { withShareTicket?: boolean, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * 隐藏转发按钮
     * 
     */
    function hideShareMenu(object: { success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * 获取转发详细信息
     *  
     */
    function getShareInfo(object: {
        shareTicket: string,
        timeout: number,
        success?: (res: {
            errMsg: string,
            encryptedData: string,
            iv: string
        }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /**
     * 主动拉起转发，进入选择通讯录界面。
     */
    function shareAppMessage(object: { title?: string, imageUrl?: string, query?: string, imageUrlId?: string }): void;

    /**
     * 取消监听用户点击右上角菜单的“转发”按钮时触发的事件
     */
    function offShareAppMessage(callback: () => void): void;

    /**
     * 监听用户点击右上角菜单的“转发”按钮时触发的事件
     */
    function onShareAppMessage(callback: (res: {
        title: string,
        imageUrl: string,
        query: string
    }) => void): void;


    /**
    * 发起米大师支付
    */
    function requestMidasPayment(object: {
        mode: string,
        env?: 0 | 1,
        offerId: string,
        currencyType: string,
        platform?: string,
        buyQuantity?: number,
        zoneId?: string,
        success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void
    }): void;

    /**
     * wx.getStorageInfo 的同步版本
     */
    function getStorageInfoSync(): { keys: Array<string>, currentSize: number, limitSize: number };

    /**
     * 异步获取当前storage的相关信息
     */
    function getStorageInfo(object: { success?: (res: { keys: Array<string>, currentSize: number, limitSize: number }) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * wx.clearStorage 的同步版本
     */
    function clearStorageSync(): void;

    /**
     * 清理本地数据缓存
     */
    function clearStorage(object: { success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * wx.removeStorage 的同步版本
     */
    function removeStorageSync(key: string): void;

    /**
     * 从本地缓存中移除指定 key
     */
    function removeStorage(object: { key: string, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * wx.setStorage 的同步版本
     */
    function setStorageSync(key: string, data: any): void;

    /**
     * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容。
     */
    function setStorage(object: { key: string, data: any, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * wx.getStorage 的同步版本
     */
    function getStorageSync(key: string): any;

    /**
     * 从本地缓存中异步获取指定 key 的内容
     */
    function getStorage(object: { key: string, success?: (res: { data: any }) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * 设置 InnerAudioContext 的播放选项。设置之后对当前小程序全局生效。
     */
    function setInnerAudioOption(mixWithOther: true, obeyMuteSwitch: true, success?: (res: { data: any }) => void, fail?: (res?: any) => void, complete?: (res?: any) => void): void;

    /**
     * 获取当前支持的音频输入源
     */
    function getAvailableAudioSources(success?: (res: { audioSources: Array<'auto' | 'buildInMic' | 'headsetMic' | 'mic' | 'camcorder' | 'voice_communication' | 'voice_recognition'> }) => void, fail?: (res?: any) => void, complete?: (res?: any) => void): void;

    /**
     * InnerAudioContext 实例，可通过 wx.createInnerAudioContext 接口获取实例。
     */
    interface InnerAudioContext {
        /** 音频资源的地址，用于直接播放。2.2.3 开始支持云文件ID*/
        src: string;
        /** 开始播放的位置（单位：s），默认为 0*/
        startTime: number;
        /** 是否自动开始播放，默认为 false*/
        autoplay: boolean;
        /** 是否循环播放，默认为 false*/
        loop: boolean;
        /** 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音*/
        obeyMuteSwitch: boolean;
        /** 基础库 1.9.90 开始支持，低版本需做兼容处理。音量。范围 0~1。默认为 1*/
        volume: number;
        /** 当前音频的长度（单位 s）。只有在当前有合法的 src 时返回（只读）*/
        duration: number;
        /** 当前音频的播放位置（单位 s）。只有在当前有合法的 src 时返回，时间保留小数点后 6 位（只读）*/
        currentTime: number;
        /** 当前是是否暂停或停止状态（只读）*/
        paused: boolean;
        /** 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲（只读）*/
        buffered: number;
        /**
         * 销毁当前实例
         */
        destroy(): void;
        /**
         * 取消监听音频进入可以播放状态的事件
         */
        offCanplay(callback: () => void): void;
        /**
         * 监听音频暂停事件
         */
        onPause(callback: () => void): void;
        /**
         * 监听音频停止事件
         */
        onStop(callback: () => void): void;
        /**
         * 取消监听音频停止事件
         */
        offStop(callback: () => void): void;
        /**
         * 监听音频自然播放至结束的事件
         */
        onEnded(callback: () => void): void;
        /**
         * 取消监听音频自然播放至结束的事件
         */
        offEnded(callback: () => void): void;
        /**
         * 监听音频播放进度更新事件
         */
        onTimeUpdate(callback: () => void): void;
        /**
         * 监听音频播放事件
         */
        onPlay(callback: () => void): void;
        /**
         * 监听音频播放错误事件
         */
        onError(callback: (res: { errCode: 10001 | 10002 | 10003 | 10004 | -1 }) => void): void;
        /**
         * 取消监听音频暂停事件
         */
        offPause(callback: () => void): void;
        /**
         * 监听音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
         */
        onWaiting(callback: () => void): void;
        /**
         * 取消监听音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
         */
        offWaiting(callback: () => void): void;
        /**
         * 监听音频进行跳转操作的事件
         */
        onSeeking(callback: () => void): void;
        /**
         * 取消监听音频进行跳转操作的事件
         */
        offSeeking(callback: () => void): void;
        /**
         * 监听音频完成跳转操作的事件
         */
        onSeeked(callback: () => void): void;
        /**
         * 取消监听音频完成跳转操作的事件
         */
        offSeeked(callback: () => void): void;
        /**
         * 取消监听音频播放事件
         */
        offPlay(callback: () => void): void;
        /**
         * 取消监听音频播放进度更新事件
         */
        offTimeUpdate(callback: () => void): void;
        /**
         * 监听音频进入可以播放状态的事件
         */
        onCanplay(callback: () => void): void;
        /**
         * 取消监听音频播放错误事件
         */
        offError(callback: () => void): void;
        /**
         * 停止。停止后的音频再播放会从头开始播放。
         */
        pause(): void;
        /**
         * 播放
         */
        play(): void;
        /**
         * 跳转到指定位置，单位 s
         */
        seek(position: number): void;
    }
    /**
     * 创建内部 audio 上下文 InnerAudioContext 对象。
     */
    function createInnerAudioContext(): InnerAudioContext;

    /**
     * 从本地相册选择图片或使用相机拍照。
     */
    function chooseImage(object: {
        count: 9,
        sizeType?: ['original', 'compressed'],
        sourceType?: ['album', 'camera'],
        success?: (res: {
            tempFilePaths: Array<string>,
            tempFiles: Array<{ path: string, size: number }>
        }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /**
     * 预览图片
     */
    function previewImage(object: { urls: string[], current?: string, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;
    /**
     * 保存图片到系统相册。
     */
    function saveImageToPhotosAlbum(object: { filePath: string, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**全局唯一的录音管理器 */
    interface RecorderManager {
        /**
         * 监听录音暂停事件
         */
        onPause(callback: () => void): void;
        /**
         * 监听录音结束事件
         */
        onStop(callback: (res: { tempFilePath: string }) => void): void;
        /**
         * 监听已录制完指定帧大小的文件事件。如果设置了 frameSize，则会回调此事件。
         */
        onFrameRecorded(callback: (res: { frameBuffer: ArrayBuffer, isLastFrame: boolean }) => void): void;
        /**
         * 监听录音错误事件
         */
        onError(callback: (res: { errMsg: string }) => void): void;
        /**
         * 监听录音开始事件
         */
        onStart(callback: () => void): void;
        /**
         * 监听录音因为受到系统占用而被中断开始事件。以下场景会触发此事件：微信语音聊天、微信视频聊天。此事件触发后，录音会被暂停。pause 事件在此事件后触发
         */
        onInterruptionBegin(callback: () => void): void;
        /**
         * 监听录音中断结束事件。在收到 interruptionBegin 事件之后，小程序内所有录音会暂停，收到此事件之后才可再次录音成功。
         */
        onInterruptionEnd(callback: () => void): void;
        /**
         * 监听录音继续事件
         */
        onResume(callback: () => void): void;
        /**
         * 暂停录音
         */
        pause(): void;
        /**
         * 继续录音
         */
        resume(): void;
        /**
         * 停止录音
         */
        stop(): void;
        /**
         * 开始录音
         */
        start(object: { duration?: number, sampleRate?: number, numberOfChannels?: number, encodeBitRate?: number, format?: string, frameSize?: number, audioSource?: string }): void;
    }

    /**
     * 获取全局唯一的录音管理器 RecorderManager
     */
    function getRecorderManager(): RecorderManager;

    /** 视频对象*/
    interface Video {
        /** 视频的左上角横坐标*/
        x: number;
        /** 视频的左上角纵坐标*/
        y: number;
        /** 视频的宽度*/
        width: number;
        /** 视频的高度*/
        height: number;
        /** 视频的资源地址*/
        src: number;
        /** 视频的封面*/
        poster: number;
        /** 视频的初始播放位置，单位为 s 秒*/
        initialTime: number;
        /** 视频的播放速率，有效值有 0.5、0.8、1.0、1.25、1.5*/
        playbackRate: number;
        /** 视频是否为直播*/
        live: number;
        /** 视频的缩放模式*/
        objectFit: number;
        /** 视频是否显示控件*/
        controls: number;
        /** 视频是否自动播放*/
        autoplay: number;
        /** 视频是否是否循环播放*/
        loop: number;
        /** 视频是否禁音播放*/
        muted: number;
        /** 是否启用手势控制播放进度*/
        enableProgressGesture: boolean;
        /** 是否显示视频中央的播放按钮*/
        showCenterPlayBtn: boolean;

        /** 视频开始缓冲时触发的回调函数*/
        onwaiting: () => void;

        /** 视频开始播放时触发的回调函数*/
        onplay: () => void;

        /** 视频暂停时触发的回调函数*/
        onpause: () => void;

        /** 视频播放到末尾时触发的回调函数*/
        onended: () => void;

        /** 每当视频播放进度更新时触发的回调函数*/
        ontimeupdate: () => void;

        /** 视频发生错误时触发的回调函数*/
        onerror: () => void;

        /**
         * 视频退出全屏
         */
        exitFullScreen(): Promise<Object>;
        /**
         * 取消监听视频暂停事件
         */
        offPause(callback: () => void): void;
        /**
         * 监听视频播放到末尾事件
         */
        onEnded(callback: () => void): void;
        /**
         * 取消监听视频播放到末尾事件
         */
        offEnded(callback: () => void): void;
        /**
         * 监听视频播放进度更新事件
         */
        onTimeUpdate(callback: (res: { position: number, duration: number }) => void): void;
        /**
         * 取消监听视频播放进度更新事件
         */
        offTimeUpdate(callback: () => void): void;
        /**
         * 监听视频错误事件
         */
        onError(callback: (res: { errMsg: string }) => void): void;
        /**
         * 取消监听视频错误事件
         */
        offError(callback: () => void): void;
        /**
         * 监听视频播放事件
         */
        onPlay(callback: () => void): void;
        /**
         * 监听视频暂停事件
         */
        onPause(callback: () => void): void;
        /**
         * 取消监听视频缓冲事件
         */
        offWaiting(callback: () => void): void;
        /**
         * 监听视频缓冲事件
         */
        onWaiting(callback: () => void): void;
        /**
         * 取消监听视频播放事件
         */
        offPlay(callback: () => void): void;
        /**
         * 暂停视频
         */
        pause(): Promise<any>;
        /**
         * 播放视频
         */
        play(): Promise<any>;
        /**
         * 视频全屏
         */
        requestFullScreen(): Promise<any>;
        /**
         * 视频跳转
         */
        seek(time: number): Promise<any>;
        /**
         * 停止视频
         */
        stop(): Promise<Object>;
    }

    /**
     * 创建视频
     */
    function createVideo(object: {
        x?: number, y?: number,
        width?: number, height?: number,
        src: number, poster: number,
        initialTime?: number, playbackRate?: number,
        live?: number, objectFit?: number,
        controls?: number, autoplay?: number,
        loop?: number, muted?: number,
        enableProgressGesture: boolean,
        showCenterPlayBtn: boolean
    }): Video;

    /**
     * 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用。
     */
    function getLocation(object: {
        type?: string, altitude: string,
        success?: (res: {
            latitude: number,
            longitude: number,
            speed: number,
            accuracy: number,
            altitude: number,
            verticalAccuracy: number,
            horizontalAccuracy: number
        }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /** 文件管理器*/
    interface FileSystemManager {
        /**
         * 判断文件/目录是否存在
         */
        access(object: {
            path: string,
            success?: (res?: any) => void,
            fail?: (res?: { errMsg: string }) => void,
            complete?: (res?: any) => void
        }): void;
        /**
         * FileSystemManager.access 的同步版本
         */
        accessSync(path: string): void;

        /** 在文件结尾追加内容*/
        appendFile(filePath: string,
            data: string | ArrayBuffer,
            encoding: string,
            success?: (res?: any) => void,
            fail?: (res: { errMsg: string }) => void,
            complete?: (res?: any) => void): void;

        /** appendFile同步版本*/
        appendFileSync(filePath: string, data: string | ArrayBuffer, encoding: string): void;

        /**
        * 保存临时文件到本地。此接口会移动临时文件，因此调用成功后，tempFilePath 将不可用。
        */
        saveFile(object: { tempFilePath: string, filePath?: string, success?: (res: { savedFilePath: number }) => void, fail?: (res: { errMsg: string }) => void, complete?: (res?: any) => void }): void;

        /**
        * FileSystemManager.saveFile 的同步版本
        */
        saveFileSync(tempFilePath: string, filePath: string): number;

        /**
         * 获取该小程序下已保存的本地缓存文件列表
         */
        getSavedFileList(object: { success?: (res: { fileList: Array<{ filePath: string, size: number, createTime: number }> }) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

        /**
         * 删除该小程序下已保存的本地缓存文件
         */
        removeSavedFile(object: { filePath: string, success?: (res?: any) => void, fail?: (res: { errMsg: string }) => void, complete?: (res?: any) => void }): void;

        /**
         * 复制文件
         */
        copyFile(object: { srcPath: string, destPath: string, success?: (res?: any) => void, fail?: (res: { errMsg: string }) => void, complete?: (res?: any) => void }): void;

        /**
         * FileSystemManager.copyFile 的同步版本
         */
        copyFileSync(srcPath: string, destPath: string): void;

        /**
         * 获取该小程序下的 本地临时文件 或 本地缓存文件 信息
         */
        getFileInfo(object: { filePath: string, success?: (res: { size: number }) => void, fail?: (res: { errMsg: string }) => void, complete?: (res?: any) => void }): void;

        /**
         * 创建目录
         */
        mkdir(object: { dirPath: string, recursive?: boolean, success?: (res?: any) => void, fail?: (res: { errMsg: string }) => void, complete?: (res?: any) => void }): void;

        /**
         * FileSystemManager.mkdir 的同步版本
         */
        mkdirSync(dirPath: string): void;

        /**
         * 读取本地文件内容
         */
        readFile(object: { filePath: string, encoding?: string, success?: (res: { data: string | ArrayBuffer }) => void, fail?: (res: { errMsg: string }) => void, complete?: (res?: any) => void }): void;

        /**
         * FileSystemManager.readFile 的同步版本
         */
        readFileSync(filePath: string, encoding: string): string | ArrayBuffer;

        /**
         * 读取目录内文件列表
         */
        readdir(object: { dirPath: string, success?: (res: { files: Array<string> }) => void, fail?: (res: { errMsg: string }) => void, complete?: (res?: any) => void }): void;
        /**
         * FileSystemManager.readdir 的同步版本
         */
        readdirSync(dirPath: string): string[];

        /**
         * 重命名文件，可以把文件从 oldPath 移动到 newPath
         */
        rename(object: { oldPath: string, newPath: string, success?: (res?: any) => void, fail?: (res: { errMsg: string }) => void, complete?: (res?: any) => void }): void;

        /**
        * FileSystemManager.rename 的同步版本
        */
        renameSync(oldPath: string, newPath: string): void;

        /**
         * 删除目录
         */
        rmdir(object: { dirPath: string, recursive: boolean, success?: (res?: any) => void, fail?: (res: { errMsg: string }) => void, complete?: (res?: any) => void }): void;

        /**
         * FileSystemManager.rmdir 的同步版本
         */
        rmdirSync(dirPath: string, recursive: boolean): void;

        /**
         * 获取文件 Stats 对象
         */
        stat(object: { path: string, recursive?: boolean, success?: (res: { stats: Stats | Object }) => void, fail?: (res: { errMsg: string }) => void, complete?: (res?: any) => void }): Stats;

        /**
         * FileSystemManager.stat 的同步版本
         */
        statSync(path: string, recursive: boolean): Stats;

        /**
         * 删除文件
         */
        unlink(object: { filePath: string, success?: (res?: any) => void, fail?: (res: { errMsg: string }) => void, complete?: (res?: any) => void }): void;

        /**
         * 解压文件
         */
        unzip(object: { zipFilePath: string, targetPath: string, success?: (res?: any) => void, fail?: (res: { errMsg: string }) => void, complete?: (res?: any) => void }): void;

        /**
         * FileSystemManager.unlink 的同步版本
         */
        unlinkSync(filePath: string): void;

        /**
         * 写文件
         */
        writeFile(object: { filePath: string, data: string | ArrayBuffer, encoding: string, success?: (res?: any) => void, fail?: (res: { errMsg: string }) => void, complete?: (res?: any) => void }): void;

        /**
         * FileSystemManager.writeFile 的同步版本
         */
        writeFileSync(filePath: string, data: string | ArrayBuffer, encoding: string): void;
    }

    /** 描述文件状态的对象*/
    interface Stats {
        /**
         * 文件的类型和存取的权限，对应 POSIX stat.st_mode
         */
        mode: string;
        /**
         * 文件大小，单位：B，对应 POSIX stat.st_size
         */
        size: number;
        /**
         * 文件最近一次被存取或被执行的时间，UNIX 时间戳，对应 POSIX stat.st_atime
         */
        lastAccessedTime: number;
        /**
        * 文件最后一次被修改的时间，UNIX 时间戳，对应 POSIX stat.st_mtime
        */
        lastModifiedTime: number;
        /**
         * 判断当前文件是否一个目录
         */
        isDirectory(): boolean;
        /**
         * 判断当前文件是否一个普通文件
         */
        isFile(): boolean;
    }

    /**
     * 获取全局唯一的文件管理器
     */
    function getFileSystemManager(): FileSystemManager;

    /** 打开另一个小程序*/
    function navigateToMiniProgram(object: {
        appId: string,
        path?: string,
        extraData?: {},
        envVersion?: string,
        success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void
    }): void;

    /**
     * 用户信息
     */
    interface UserInfo {
        /** 用户昵称*/
        nickName: string;
        /** 用户头像图片的 URL。URL 最后一个数值代表正方形头像大小（有 0、46、64、96、132 数值可选，0 代表 640x640 的正方形头像，46 表示 46x46 的正方形头像，剩余数值以此类推。默认132），用户没有头像时该项为空。若用户更换头像，原有头像 URL 将失效。*/
        avatarUrl: string;
        /** 用户性别*/
        gender: 0 | 1 | 2;
        /** 用户所在国家*/
        country: string;
        /** 用户所在省份*/
        province: string;
        /** 用户所在城市*/
        city: string;
        /** 显示 country，province，city 所用的语言*/
        language: 'en' | 'zh_CN' | 'zh_TW'
    }

    /**
     * 调用前需要 用户授权 scope.userInfo。
     * 获取用户信息。
     */
    function getUserInfo(object: {
        withCredentials?: boolean, lang?: string, success?: (res: {
            ƒ
            userInfo: UserInfo,
            rawData: string,
            signature: string,
            encryptedData: string,
            iv: string
        }) => void, fail?: (res?: any) => void, complete?: (res?: any) => void
    }): void;

    /** 用户信息按钮*/
    interface UserInfoButton {
        /** 按钮的类型*/
        type: 'text' | 'image';
        /** 按钮上的文本，仅当 type 为 text 时有效*/
        text: string;
        /** 按钮的背景图片，仅当 type 为 image 时有效*/
        image: string;
        /** 按钮的样式*/
        style: {
            left: number,
            top: number,
            width: number,
            height: number,
            backgroundColor: string,
            borderColor: string,
            borderWidth: number,
            borderRadius: number,
            textAlign: string,
            fontSize: number,
            lineHeight: number
        },
        /** 显示用户信息按钮*/
        show();

        /** 隐藏用户信息按钮。*/
        hide();

        /** 销毁用户信息按钮*/
        destroy();

        /** 监听用户信息按钮的点击事件*/
        onTap(callback: (res: {
            userInfo: UserInfo,
            rawData: string,
            signature: string,
            encryptedData: string,
            iv: string
        }) => void);

        /** 取消监听用户信息按钮的点击事件*/
        offTap(callback: () => void);
    }

    /** 创建用户信息按钮*/
    function createUserInfoButton(object: {
        type: "text" | "image",
        text?: string,
        image?: string,
        style: {
            left: number,
            top: number,
            width: number,
            height: number,
            backgroundColor: string,
            borderColor: string,
            borderWidth: number,
            borderRadius: number,
            textAlign: "left" | "center" | "right",
            fontSize: number,
            lineHeight: number
        },
        withCredentials: boolean,
        lang?: "en" | "zh_CN" | "zh_TW"
    }): UserInfoButton;

    /**
     * 通过 wx.login 接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用 wx.checkSession 接口检测当前用户登录态是否有效。登录态过期后开发者可以再调用 wx.login 获取新的用户登录态。
     */
    function checkSession(object: { success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /** 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。更多用法详见 用户授权。*/
    function authorize(object: { scope: string, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * 调用接口获取登录凭证（code）进而换取用户登录态信息，包括用户的唯一标识（openid） 及本次登录的 会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成。
     */
    function login(object: { timeout?: number, success?: (res: { code: string }) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * 只有开放数据域能调用，获取主域和开放数据域共享的 sharedCanvas
     */
    function getSharedCanvas(): Canvas;

    /** 托管的 KV 数据*/
    interface KVData {
        /** 数据的 key*/
        key: string;
        /** 数据的 value*/
        value: string;
    }

    /** 托管数据*/
    interface UserGameData {
        /** 用户的微信头像 url*/
        avatarUrl: string;
        /** 用户的微信昵称*/
        nickname: string;
        /** 用户的 openid*/
        openid: string;
        /** 用户的托管 KV 数据列表*/
        KVDataList: Array<KVData>;
    }

    /**
     * 拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
     */
    function getFriendCloudStorage(object: { keyList: string[], success?: (res: { data: Array<UserGameData> }) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * 在小游戏是通过群分享卡片打开的情况下，可以通过调用该接口获取群同玩成员的游戏数据。该接口只可在开放数据域下使用。
     */
    function getGroupCloudStorage(object: { shareTicket: string, keyList: string[], success?: (res: { data: Array<UserGameData> }) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * 获取当前用户托管数据当中对应 key 的数据。该接口只可在开放数据域下使用
     */
    function getUserCloudStorage(object: { keyList: Array<string>, success?: (res: { KVDataList: Array<KVData> }) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * 删除用户托管数据当中对应 key 的数据。
     */
    function removeUserCloudStorage(object: { keyList: string[], success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * 对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
     */
    function setUserCloudStorage(object: { KVDataList: Array<KVData>, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /** 在无须用户授权的情况下，批量获取用户信息。该接口只在开放数据域下可用*/
    function getUserInfo(object: {
        /** 要获取信息的用户的 openId 数组，如果要获取当前用户信息，则将数组中的一个元素设为 'selfOpenId'*/
        openIdList?: Array<string>,
        /** 显示用户信息的语言*/
        lang?: 'en' | 'zh_CN' | 'zh_TW',
        success?: (res: {
            data: Array<{
                avatarUrl: string,
                city: string,
                country: string,
                gender: number,
                language: string,
                nickName: string,
                openId: string,
                province: string
            }>
        }) => void, fail?: (res?: any) => void, complete?: (res?: any) => void
    }): void;

    /**
     * 监听主域发送的消息
     */
    function onMessage(callback: () => void): void;

    /** 开放数据域对象*/
    interface OpenDataContext {
        /** 开放数据域和主域共享的 sharedCanvas*/
        canvas: Canvas;
        /**
         * 向开放数据域发送消息
         * @param message {} 要发送的消息，message 中及嵌套对象中 key 的 value 只能是 primitive value。即 number、string、boolean、null、undefined。
         */
        postMessage(message: {}): void;
    }

    /**
     * 获取开放数据域
     */
    function getOpenDataContext(): OpenDataContext;

    /**
     * 根据用户当天游戏时间判断用户是否需要休息
     */
    function checkIsUserAdvisedToRest(object: {
        todayPlayedTime: number,
        success?: (res: { result: boolean }) => void,
        fail?: (res?: any) => void, complete?: (res?: any) => void
    }): void;

    /**用户点击后打开意见反馈页面的按钮 */
    interface FeedbackButton {
        /** 按钮的类型*/
        type: 'text' | 'image';
        text: string,
        image: string,
        style: {
            left: number,
            top: number,
            width: number,
            height: number,
            backgroundColor: string,
            borderColor: string,
            borderWidth: number,
            borderRadius: number,
            textAlign: 'left' | 'center' | 'right',
            fontSize: number,
            lineHeight: number
        },

        /** 显示意见反馈按钮*/
        show(): void;

        /** 隐藏意见反馈按钮。*/
        hide(): void;

        /** 销毁意见反馈按钮*/
        destroy(): void;

        /** 监听意见反馈按钮的点击事件*/
        onTap(callback: () => void): void;

        /** 取消监听意见反馈按钮的点击事件*/
        offTap(callback: () => void): void;
    }
    /**
     * 创建打开意见反馈页面的按钮
     */
    function createFeedbackButton(object: {
        type: 'text' | 'image',
        text?: string,
        image?: string,
        style: {
            left: number,
            top: number,
            width: number,
            height: number,
            backgroundColor: string,
            borderColor: string,
            borderWidth: number,
            borderRadius: number,
            textAlign: 'left' | 'center' | 'right',
            fontSize: number,
            lineHeight: number
        }
    }): FeedbackButton;

    /** 用户授权设置信息，详情参考权限*/
    interface AuthSetting {
        /** 是否授权用户信息，对应接口 wx.getUserInfo*/
        userInfo: boolean;
        /** 是否授权地理位置，对应接口 wx.getLocation*/
        userLocation: boolean;
        /** 是否授权微信运动步数，对应接口 wx.getWeRunData*/
        werun: boolean;
        /** 是否授权保存到相册 wx.saveImageToPhotosAlbum*/
        writePhotosAlbum: boolean;
    }

    /** 调起客户端小程序设置界面，返回用户设置的操作结果。设置界面只会出现小程序已经向用户请求过的权限。*/
    function openSetting(object: {
        success?: (res: { authSetting: AuthSetting }) => void,
        fail?: (res?: any) => void, complete?: (res?: any) => void
    }): void;

    /** 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。*/
    function getSetting(object: {
        success?: (res: { authSetting: AuthSetting }) => void,
        fail?: (res?: any) => void, complete?: (res?: any) => void
    }): void;

    /**
     * 用户点击后打开设置页面的按钮
     */
    interface OpenSettingButton {
        type: 'text' | 'image';
        text: string,
        image: string,
        style: {
            left: number,
            top: number,
            width: number,
            height: number,
            backgroundColor: string,
            borderColor: string,
            borderWidth: number,
            borderRadius: number,
            textAlign: 'left' | 'center' | 'right',
            fontSize: number,
            lineHeight: number
        },

        show(): void;

        hide(): void;

        destroy(): void;

        onTap(callback: () => void): void;

        offTap(callback: () => void): void;
    }

    /** 创建打开设置页面的按钮*/
    function createOpenSettingButton(object: {
        type: 'text' | 'image',
        text?: string,
        image?: string,
        style: {
            left: number,
            top: number,
            width: number,
            height: number,
            backgroundColor: string,
            borderColor: string,
            borderWidth: number,
            borderRadius: number,
            textAlign: 'left' | 'center' | 'right',
            fontSize: number,
            lineHeight: number
        },
        show(): void;

        hide(): void;

        destroy(): void;

        onTap(callback: () => void): void;

        offTap(callback: () => void): void;
    }): OpenSettingButton;

    /** 游戏圈按钮。游戏圈按钮被点击后会跳转到小游戏的游戏圈。更多关于游戏圈的信息见 游戏圈使用指南*/
    interface GameClubButton {
        type: 'text' | 'image',
        text?: string,
        image?: string,
        style: {
            left: number,
            top: number,
            width: number,
            height: number,
            backgroundColor: string,
            borderColor: string,
            borderWidth: number,
            borderRadius: number,
            textAlign: 'left' | 'center' | 'right',
            fontSize: number,
            lineHeight: number
        },
        icon: 'green' | 'white' | 'dark' | 'light'
    }

    /** 创建游戏圈按钮。游戏圈按钮被点击后会跳转到小游戏的游戏圈。更多关于游戏圈的信息见 游戏圈使用指南*/
    function createGameClubButton(object: {
        type: 'text' | 'image',
        text?: string,
        image?: string,
        style: {
            left: number,
            top: number,
            width: number,
            height: number,
            backgroundColor: string,
            borderColor: string,
            borderWidth: number,
            borderRadius: number,
            textAlign: 'left' | 'center' | 'right',
            fontSize: number,
            lineHeight: number
        },
        icon: 'green' | 'white' | 'dark' | 'light'
    }): GameClubButton;

    /** 进入客服会话。要求在用户发生过至少一次 touch 事件后才能调用。后台接入方式与小程序一致，详见 客服消息接入*/
    function openCustomerServiceConversation(object: {
        sessionFrom?: string,
        showMessageCard?: boolean,
        sendMessageTitle?: string,
        sendMessagePath?: string,
        sendMessageImg?: string,
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /** 获取用户过去三十天微信运动步数。需要先调用 wx.login 接口。步数信息会在用户主动进入小程序时更新。*/
    function getWeRunData(object: {
        success?: (res: { encryptedData: string, iv: string }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /** 取消监听横竖屏切换事件*/
    function offDeviceOrientationChange(callback: () => void): void;

    /** 监听横竖屏切换事件*/
    function onDeviceOrientationChange(callback: (res: { value: 'portrait' | 'landscape' | 'landscapeReverse' }) => void): void;

    /** 监听加速度数据事件。频率根据 wx.startAccelerometer() 的 interval 参数。可使用 wx.stopAccelerometer() 停止监听。*/
    function onAccelerometerChange(callback: (res: { x: number, y: number, z: number }) => void): void;

    /** 停止监听加速度数据。*/
    function stopAccelerometer(object: {
        success?: (res: { encryptedData: string, iv: string }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /** 开始监听加速度数据。*/
    function startAccelerometer(object: {
        interval: string,
        success?: (res: { encryptedData: string, iv: string }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /**
     * 获取设备电量
     */
    function getBatteryInfo(object: {
        success?: (res: { level: string, isCharging: boolean }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /**
     * wx.getBatteryInfo 的同步版本
     */
    function getBatteryInfoSync(): { level: string, isCharging: boolean };

    /** 获取系统剪贴板的内容*/
    function getClipboardData(object: {
        success?: (res: { data: string }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /** 设置系统剪贴板的内容*/
    function setClipboardData(object: {
        data: string,
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /**
     * 监听罗盘数据，频率：5 次/秒，接口调用后会自动开始监听，可使用 wx.stopCompass 停止监听。
     * accuracy 在 iOS/Android 的差异
     * 由于平台差异，accuracy 在 iOS/Android 的值不同。
     * iOS：accuracy 是一个 number 类型的值，表示相对于磁北极的偏差。0 表示设备指向磁北，90 表示指向东，180 表示指向南，依此类推。
     * Android：accuracy 是一个 string 类型的枚举值。
     */
    function onCompassChange(callback: (res: { direction: number, accuracy: number | string }) => void): void;

    /**
     * 开始监听陀螺仪数据。
     */
    function startCompass(object: {
        interval?: string,
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /**
     * 停止监听陀螺仪数据。
     */
    function stopCompass(object: {
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /**
     * 监听设备方向变化事件。频率根据 wx.startDeviceMotionListening() 的 interval 参数。可以使用 wx.stopDeviceMotionListening() 停止监听。
     */
    function onDeviceMotionChange(callback: (res: {
        alpha: number,
        beta: number,
        gamma: number,
    }) => void): void;

    /** 停止监听设备方向的变化。*/
    function stopDeviceMotionListening(
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    ): void;

    /** 开始监听设备方向的变化。*/
    function startDeviceMotionListening(
        interval: string,
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    ): void;

    /** 监听网络状态变化事件*/
    function onNetworkStatusChange(callback: (res: { isConnected: boolean, networkType: string }) => void): void;

    /** 获取网络类型*/
    function getNetworkType(object: {
        success?: (res: { networkType: string }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /** 使手机发生较长时间的振动（400 ms)*/
    function vibrateLong(object: {
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /** 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效*/
    function vibrateShort(object: {
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /** 
     * 监听内存不足告警事件。
     * 当 iOS/Android 向小程序进程发出内存警告时，触发该事件。触发该事件不意味小程序被杀，大部分情况下仅仅是告警，开发者可在收到通知后回收一些不必要资源避免进一步加剧内存紧张。
     */
    function onMemoryWarning(callback: (res: { level: number }) => void): void;

    /** 设置屏幕亮度*/
    function setScreenBrightness(object: {
        value: number,
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /** 设置是否保持常亮状态。仅在当前小程序生效，离开小程序后设置失效。*/
    function setKeepScreenOn(object: {
        keepScreenOn: boolean,
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /** 获取屏幕亮度*/
    function getScreenBrightness(object: {
        success?: (res: { value: number }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /**
     * 对于游戏来说，每帧 16ms 是极其宝贵的，如果有一些可以异步处理的任务，可以放置于 Worker 中运行，待运行结束后，再把结果返回到主线程。Worker 运行于一个单独的全局上下文与线程中，不能直接调用主线程的方法，Worker 也不具备渲染的能力。 Worker 与主线程之间的数据传输，双方使用 Worker.postMessage() 来发送数据，Worker.onMessage() 来接收数据，传输的数据并不是直接共享，而是被复制的。
     * @see https://developers.weixin.qq.com/minigame/dev/tutorial/usability/worker.html
     */
    interface Worker {
        /**
         * 监听接收主线程/Worker 线程向当前线程发送的消息
         */
        onMessage(callback: (res: { message: Object }) => void): void;
        /**
         * 向主线程/Worker 线程发送的消息。
         */
        postMessage(message: {}): void;
        /**
         * 结束当前 worker 线程，仅限在主线程 worker 对象上调用。
         */
        terminate(): void;
    }

    /**
    * 创建一个 Worker 线程，目前限制最多只能创建一个 Worker，创建下一个 Worker 前请调用 Worker.terminate
    */
    function createWorker(scriptPath: string): Worker;
}

// /**
//  * 基础库 2.0.0 开始支持，低版本需做兼容处理。
//  * 将一个 Canvas 对应的 Texture 绑定到 WebGL 上下文。
//  */
// declare var WebGLRenderingContext: {
//     /**
//      * 
//      * @param texture WebGL 的纹理类型枚举值
//      * @param canvas 需要绑定为 Texture 的 Canvas
//      */
//     wxBindCanvasTexture: (texture: number, canvas: wx.Canvas) => void
// }