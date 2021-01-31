
/**
 * @author zhangxin
 * @description creator编辑器头文件
 * 2020/9/4
 */
/**@class Gizmo (for the renderer Process)*/
declare module Editor {
    export class Gizmo {

        /**
         * Register a moveable svg element. When the svg element is moved, the callback created from onCreateMoveCallbacks will be called.
         * @param svg  Svg Element - The svg element which can move.
         * @param args  Object | Array - The args will parse to callback:Funtion, you can check which svg element is moved with the args.
         * @param opts: {
         *                  cursor String - The move mouse cursor.
         *                  ignoreWhenHoverOther Boolean - Will ignore the mouse down event on this svg element if hover on other svg element.
         *              } 
         */
        registerMoveSvg(svg: SvgElement, args: Object | Array, opts?: { cursor?: string, ignoreWhenHoverOther?: boolean })

        /**
         * Record undo changes, generally gizmo will record changes automatically.
         */
        recordChanges()

        /**
         * Commit undo changes, generally gizmo will commit changes automatically
         */
        commitChanges()

        /**
         * Adjust value to avoid value's fractional part to be too long.
         * @param targets [Object] - The target wich should adjust.
         * @param keys  String (optional) - If not specified, then will adjust all available properties on target.
         * @param minDifference  Number(optionnal) - The decimal precision, default is Editor.Gizmo.prototype.defaultMinDifference()
         */
        adjustValue(targets: Object[], keys?: string | string[], minDifference?: number)

        /**
         * Convert cocos2d world position to svg position.
         * @param position 
         */
        worldToPixel(position: cc.Vec3): cc.Vec3

        /**
         * Convert svg position to cocos2d world position.
         * @param position 
         */
        pixelToWorld(position: cc.Vec3): cc.Vec3

        /**
         * Convert cocos2d scene position to svg position.
         * @param position 
         */
        sceneToPixel(position): cc.Vec3

        /**
         * Convert svg position to cocos2d scene position.
         * @param position 
         */
        pixelToScene(position): cc.Vec3

        /**
         * Call when init a gizmo, you can reimplement this function to do your self init. 
         */
        init()

        /**
         * There three layer types now: background, scene, foreground, generally we add gizmo to scene layer.
         *  Default implement:
         *  layer () {
         *       return 'scene';
         *  }
         */
        layer(): 'background' | 'scene' | 'foreground'

        /**
         * Whether the gizmo is visible, 
         * if you want the gizmo always be visible, then return true.
         * Default implement:
         *  visible () {
         *      return this.selecting || this.editing;
         *  }
         */
        visible(): boolean

        /**
         * Whether the gizmo is dirty, the gizmo will only update when gizmo is dirty. 
         * If you want to update gizmo every frame then return true.
         * 
         * Default implement:
         *  dirty(){
         *      return this._viewDirty() || this._nodeDirty() || this._dirty;
         *  }
         */
        dirty(): boolean

        /**
         * This function will call when create the root svg element for a gizmo. 
         * You can implement this function to custom your gizmo creation.
         */
        onCreateRoot()

        /**
         * This callback return from the function will call when the moveable svg element is moved.
         * The callback should include methods with:
         * start(x, y, event, ...args) -Called when mouse press on the svg  
         * update(dx, dy, event, ...args) - Called when mouse move on the svg
         * end(updated, event, ...args) - Called when mouse release on the svg
         */
        onCreateMoveCallbacks(): {
           /**
            *  Called when mouse press on the svg
            * @param x Number - Press x position
            * @param y Number - Press y position
            * @param event MouseEvent - The mouse event
            * @param args - The arguments parsed from registerMoveSvg
            */
            start: (x: number, y: number, event: MouseEvent, ...args) => void,
            /** 
             * Called when mouse move on the svg
             * @param dx Number - Horizontal move distance from current mouse position to start mouse position
             * @param dy Number - Vertical move distance from current mouse position to start mouse position
             * @param event MouseEvent - The mouse event
             * @param args - The arguments parsed from registerMoveSvg
            */
            update: (dx: number, dy: number, event: MouseEvent, ...args) => void,
            /**
             * Called when mouse release on the svg
             * @param updated Boolean - Whether the mouse moved
             * @param event MouseEvent - The mouse event
             * @param args - The arguments parsed from registerMoveSvg
             */
            end: (updated: boolean, event: MouseEvent, ...args) => void
        }

        /**
         * Used for Editor.Gizmo.prototype.adjustValue.
         * The default min difference will be:
         * @default defaultMinDifference() {
         *      return Editor.Math.numOfDecimalsF(1.0/this._view.scale);
         *  }
         */
        defaultMinDifference()

        /**Get node of the gizmo.*/
        node: cc.Node

        /**Get current nodes of the gizmo.*/
        nodes: cc.Node[]

        /**Get current top nodes of the gizmo.*/
        topNodes: cc.Node

        /**Whether the gizmo is selecting.*/
        selecting: boolean

        /**Whether the gizmo is editing.*/
        editing: boolean

        /**Whether the gizmo is hovering.*/
        hovering: boolean

        /** 获取 gizmo 依附的组件*/
        target: CustomComponent

        _root
        _tool

    }
}

/**@class GizmosUtils (for the renderer Process)*/
declare module Editor {
    export class GizmosUtils {
        /**
         * 
         * @param position Vec2 - the vec2 to snap
         */
        static snapPixelWihVec2(position: cc.Vec2): cc.Vec2
        /**
         * 
         * @param pixel Number - the pixel to snap
         */
        static snapPixel(pixel: number): number
        /**
         * 
         * @param nodes  [Node] - the nodes to get center
         */
        static getCenter(nodes:cc.Node[])
    }
}
/**@module Editor (for the renderer Process) */
declare class Editor {
    /**
     * Returns the file path (if it is registered in custom protocol) or url (if it is a known public protocol).
     * @param url string
     */
    static url(url)

    /**
     * Load profile via url, if no profile found, it will use the defaultProfile and save it to the disk.You must register your profile path:string via Editor.Profile.register before you can use it.
     * @param url string - The url of the profile.
     * @param defaultProfile object - The default profile to use if the profile is not found.
     * @example:
     * register a project profile
     * Editor.Profile.register( 'project', '/foo/bar');
     * load the profile at /foo/bar/foobar.json
     * let profile = Editor.loadProfile( 'profile:/**project/foobar.json', {
     * foo: 'foo',
     * bar: 'bar',
     * });
     * change and save your profile
     * profile.foo = 'hello foo';
     * profile.save();
     */


    static loadProfile(url, defaultProfile)

    /**
     * urls string|array - The url list.
     */
    static import(urls)

}
/**@module Console (for the renderer Process) */
declare module Editor{
    declare module Console{
        /**
         * Trace the log.
         * @param level String - The log level 
         * @param ...args ... - Whatever arguments the message needs 
         */
        export function trace(level, ...args?)
        
        
        
        /**
         * Log the normal message and show on the console. The method will send ipc message editor:renderer-console-log to the main process.
         * @param ...args ... - Whatever arguments the message needs 
         */
        export function log(...args?)
        
        /**
         * Log the success message and show on the console. The method will send ipc message editor:renderer-console-success to the main process.
         * @param ...args ... - Whatever arguments the message needs 
         */
        export function success(...args?)
        
        
        /**
         * Log the failed message and show on the console. The method will send ipc message editor:renderer-console-failed to the main process.
         * @param ...args ... - Whatever arguments the message needs 
         */
        export function failed(...args?)
      
        
        /**
         * Log the info message and show on the console. The method will send ipc message editor:renderer-console-info to the main process.
         * @param ...args ... - Whatever arguments the message needs 
         */
        export function info(...args?)
       
        
        /**
         * Log the warn message and show on the console. The method will send ipc message editor:renderer-console-warn to the main process.
         * @param ...args ... - Whatever arguments the message needs 
         */
        export function warn(...args?)
     
        
        /**
         * Log the error message and show on the console. The method will send ipc message editor:renderer-console-error to the main process.
         * @param ...args ... - Whatever arguments the message needs 
         */
        export function error(...args?)
        
        

    }
}
/**@module Audio (for the renderer Process) */
declare module Editor {
    //TODO:这官方居然点不开这个 https://docs.cocos.com/creator/manual/zh/extension/api/editor-framework/renderer/audio.md
}
declare module Editor{
    declare module Dialog{
        /**Send 'dialog:open-file' to the main process */
        export function openFile(...args)
        
        /**Send 'dialog:save-file' to the main process */
        export function saveFile(...args)
        
        /**Send 'dialog:message-box' to the main process */
        export function messageBox(...args)
        
    }
}
/**@module Ipc (for the renderer Process)*/
declare module Editor{
    declare module Ipc
    {
        /**
         * Cancel request sent to main or renderer process.
         * @param sessionID string - Session ID.
         */
        export function cancelRequest (sessionID)



        /**
         * Ipc option used in export function sendToAll.
         * @param opts opts object
            excludeSelf boolean - exclude send ipc message to main process when calling export function sendToAll.

         */
        export function option (opts)


        /**
         * 
        Send message with ...args to all opened window and to main process asynchronously.

         * @param message string - Ipc message.
         * @param ...args ... - Whatever arguments the message needs.
         * @param option object - You can indicate the last argument as an IPC option by export function option({...}).
         */
        export function sendToAll (message, ...args, option)



        /**
         * Send message with ...args to main process asynchronously. It is possible to add a callback as the last or the 2nd last argument to receive replies from the IPC receiver.
         * @param message string - Ipc message.
         * @param ...args ... - Whatever arguments the message needs.
         * @param callback function - You can specify a callback function to receive IPC reply at the last or the 2nd last argument.
         * @param timeout number - You can specify a timeout for the callback at the last argument. If no timeout specified, it will be 5000ms.
         */
        export function sendToMain (message, ...args, callback?, timeout?)

        /**
         * Send message with ...args to main process synchronized and return a result which is responded from main process.

         * @param message string - Ipc message.
         * @param ...args ... - Whatever arguments the message needs.
         */
        export function sendToMainSync (message, ...args)



        /**
         * Send message with ...args to the main window asynchronously.
         * @param message string - Ipc message.
         * @param ...args ... - Whatever arguments the message needs.
         */
        export function sendToMainWin (message, ...args)





        /**
         * Send message with ...args to main process by package name and the short name of the message.
         * @param pkgName string - Package name.
         * @param message string - Ipc message.
         * @param ...args ... - Whatever arguments the message needs.
         */
        export function sendToPackage (pkgName, message, ...args)


        /**
         * Send message with ...args to panel defined in renderer process asynchronously. It is possible to add a callback as the last or the 2nd last argument to receive replies from the IPC receiver.
         * @param panelID string - Panel ID.
         * @param message string - Ipc message.
         * @param ...args ... - Whatever arguments the message needs.
         * @param callback function - You can specify a callback function to receive IPC reply at the last or the 2nd last argument.
         * @param timeout number - You can specify a timeout for the callback at the last argument. If no timeout specified, it will be 5000ms.
         */
        export function sendToPanel (panelID, message, args, callback?, timeout?)

        /**
         * Send message with ...args to all opened windows asynchronously. The renderer process can handle it by listening to the message through the Electron.ipcRenderer module.
         * @param message string - Ipc message.
         * @param ...args ... - Whatever arguments the message needs.
         * @param option object - You can indicate the last argument as an IPC option by Editor.Ipc.option({...}). 
         */
        export function sendToWins (message, ...args, option)





    }
}
/**@module MainMenu (for the renderer Process) */
declare module Editor{
    /**The main menu module for manipulating main menu items. */
    declare module MainMenu{
        /**Apply main menu changes. */
        export function apply ()


        /**
         * Send main-menu:add to main process.
         * @param path string - Menu path
         * @param template array|object - Menu template
         */
        export function add (path, template)




        /**Send main-menu:init to main process. */
        export function init ()


        /**
         * Send main-menu:remove to main process.
         * @param path string - Menu path
         */
        export function remove (path)



        /**
         * Send main-menu:set to main process.
         * @param path string - Menu path
         * @param options :{
         * 
            icon NativeImage - A NativeImage
            enabled boolean
            visible boolean
            checked boolean - NOTE: You must set your menu-item type to 'checkbox' to make it work
            }
         */
        export function set (path, options)


        /**
         * Send main-menu:update to main process.
         * @param path string - Menu path
         * @param template array|object - Menu template
         */
        export function update (path, template)




    }
}
/**@class Menu (for the renderer Process)*/
declare module Editor{
    declare class Menu
    {
        /**
         * Send menu:popup to main process.
         * @param template array|object - Menu template for initialize. The template take the options of Electron's Menu Item
         * @param x The position x
         * @param y The position y
         */
        static popup (template:Partial<MenuTemplate>, x, y)
          /**
         * Send menu:register to main process.
         * @param name Name of the register menu
         * @param fn  A function returns the menu template
         * @param force  Force to register a menu even it was registered before
         */
        static register(name: string, fn: Function, force: boolean)
       
        /**
         * @example Editor.Menu.walk(menuTmpl, item => {
            if ( item.params ) {
                item.params.unshift('Hello');
            }

            if (item.message === 'foobar:say-hello') {
                item.enabled = false;
            }
            });
         * @param template Menu template for initialize. The template take the options of Electron's Menu Item
         * @param fn Function applied to each menu item
         */
        static walk(template: Partial<MenuTemplate>, fn: Function)
    }
}
/**@module Package (for the renderer Process)*/
declare module Editor{
    declare module Package{
        /**
         * Send editor:package-reload to main process.
         * @param name string - The package name
         */
        export function reload (name)
        
        
        /**
         * Send editor:package-query-info to main process.
         * @param name string - The package name
         * @param cb function
         */
        export function queryInfo (name, cb)
        
        
        
        /**
         * Send editor:package-query-infos to main process.
         * @param cb function
         */
        export function queryInfos (cb)
        
        
    }
}
/**@module Panel (for the renderer Process) */    
declare module Editor{
    declare module Panel{
        /**
         * Close a panel via panelID.
         * @param panelID string - The panel ID
         */
        export function close (panelID)



        /**
         * Cache a panel frame and send editor:panel-dock to main
         * @param panelID string - The panel ID
         * @param frameEL HTMLElement - The panel frame
         */
        export function dock (panelID, frameEL)



        /** Dump the layout of the panels in current window.*/
        export function dumpLayout ()


        /**
         * Create a simple panel frame via panelID.
         * @param panelID string - The panel ID
         * @param cb function
         */
        export function newFrame (panelID, cb)



        /**
         * Extends a panel.
         * @param proto object
         */
        export function extend (proto)


        /**
         * Find panel frame via panelID.
         * @param panelID string - The panel ID
         */
        export function find (panelID)

        /**
         * Focus panel via panelID.
         * @param panelID string - The panel ID
         */
        export function focus (panelID)



        /**Get current focused panel. */
        export function getFocusedPanel ()


        /**
         * Get panel info via panelID.
         * @param panelID string - The panel ID
         */
        export function getPanelInfo (panelID)


        /**
         * Check if the specific panel is dirty.
         * @param panelID string - The panel ID
         */
        export function isDirty (panelID)


        /**
         * Open a panel via panelID.
         * @param panelID string - The panel ID
         * @param argv object
         */
        export function open (panelID, argv?)

        /**
         * Popup an exists panel via panelID.
         * @param panelID string - The panel ID
         */
        export function popup (panelID)


        /**
         * Remove a panel element from document but do not close it.

         * @param panelID string - The panel ID
         */
        export function undock (panelID)

        /**Get panels docked in current window. */
        export var panels


        //  IPC Messages

        Message: 'editor:panel-run'

        Message: 'editor:panel-unload'

        Message: 'editor:panel-out-of-date'
    }
}
/**@module Protocol (for the renderer Process) Protocol module used in Editor.url and custom protocol.*/
declare module Editor{
    declare module Protocol{
        /**
         * @example 
         *  const Path = require('path');

            let _url2path = base => {
                return uri => {
                    if ( uri.pathname ) {
                        return Path.join( base, uri.host, uri.pathname );
                    }
                    return Path.join( base, uri.host );
                };
            };

            Editor.Protocol.register('editor-framework', _url2path(Editor.frameworkPath));
         * @description Register a protocol so that Editor.url can use it to convert an url to the filesystem path. The fn accept an url Object via url.parse.
         * @param protocol string - Protocol name
         * @param fn function
         */
        export function register (protocol, fn)
    }
}
/**@module Window (for the renderer Process) */
declare module Editor{
    declare module Window{
        /**
         * Open a new Editor.Window with options and load url.
         * @param name string
         * @param url string
         * @param options object
         */
        export function open (name, url, options)
        
        /**Focus on current window. */
        export function focus ()
        
        /**
         * Load url in current window.
         * @param url string
         * @param argv object
         */
        export function load (url, argv)
        
        /**
         * Resize current window.
         * @param w number
         * @param h number
         * @param useContentSize useContentSize boolean
         */
        export function resize (w, h, useContentSize)
        
        
        /**
         * Resize current window synchronously.
         * @param w number
         * @param h number
         * @param useContentSize boolean
         */
        export function resizeSync (w, h, useContentSize)
        
        /**Center the window. */
        export function center ()
        
        
        //IPC Messages
        /**Turn on the inspect element mode. */
        Message: 'editor:window-inspect'
        
        
    }
}




/**@module  UI (for the renderer Process)(DOM Utils Module) */
declare module Editor{
    declare module UI{

        /**
         * Load url content and create a style element to wrap it.
         * @param url string 
         */
        export function createStyleElement (url)
        
        
        
        /**
         * Remove all child element.
         * @param element HTMLElement 
         */
        export function clear (element)
        
        
        
        /**
         * Get the index of the element
         * @param element HTMLElement
         */
        export function index (element)
        
        
        
        /**
         * Get the parent element, it will go through the host if it is a shadow element.
         * @param element HTMLElement
         */
        export function parentElement (element)
        
        
        
        /**
         * Returns the offset {x, y} from el to parentEL
         * @param el HTMLElement 
         * @param parentEL HTMLElement
         */
        export function offsetTo (el, parentEL)
        
        
        
        
        /**
         * Recursively search children use depth first algorithm.
         * @param el HTMLElement
         * @typedef opts
         * @param opts @type {
         diveToShadow:boolean,
         excludeSelf:boolean
         }
         * 
         * @param cb function
         */
        export function walk (el, opts, cb)
        
        
        
        
        
        /**
         * Fires a CustomEvent to the specific element .
         * @param element HTMLElement
         * @param eventName string
         * @param opts object
         * @example   
        Editor.fire(el, 'foobar', {
            bubbles: false,
            detail: {
                value: 'Hello World!'
            }
        });
         */
        export function fire (element, eventName, opts)
        
        /**
         * Call preventDefault and stopImmediatePropagation for the event
        
         * @param event Event
         */
        export function acceptEvent (event)
        
        
        /**
         * Handle mouse down and up event for button like element
         * @param element HTMLElement 
         */
        export function installDownUpEvent (element)
        
        
        
        /**
         * Check if the element is in document
        
         * @param el el HTMLElement
         */
        export function inDocument (el)
        
        
        /**
         * Check if the element is in panel
         * @param el HTMLElement
         */
        export function inPanel (el)
        
        
        
        /**
         * Check if the element is visible by itself
         * @param el HTMLElement
         */
        export function isVisible (el)
        
        
        
        /**
         * Check if the element is visible in hierarchy
         * @param el HTMLElement
         */
        export function isVisibleInHierarchy (el)
        
        
        
        /**
         * Start handling element dragging behavior
         * @param cursor string - CSS cursor
         * @param event Event
         * @param onMove function
         * @param onEnd function
         * @param onWheel function
         */
        export function startDrag (cursor, event, onMove, onEnd, onWheel)
        
        /**Cancel dragging element */
        export function cancelDrag ()
        
        
        /**
         * Add a dragging mask to keep the cursor not changed while dragging
         * @param cursor string - CSS cursor
         */
        export function addDragGhost (cursor)
        
        
        
        /**
         * Remove the dragging mask
         */
        export function removeDragGhost ()
        
        
        /**
         *  Add hit mask
         * @param cursor string - CSS cursor
         * @param zindex number
         * @param onhit function
         */
        export function addHitGhost (cursor, zindex, onhit)
        
        
        
        
       
        /**Remove hit mask */
        export function removeHitGhost ()
        
        
        /**
         * Add loading mask
         * @param options object
         * @param onclick function
         */
        export function addLoadingMask (options, onclick)
        
        
        
        
        /**
         * Remove loading mask
         */
        export function removeLoadingMask ()
        
        
        /**
         * Convert a string to human friendly text. For example, fooBar will be Foo bar
         * @param text string
         */
        export function toHumanText (text)
        
        
        
        /**
         * Convert a string to camel case text. For example, foo-bar will be fooBar
         * @param text string
         */
        export function camelCase (text)
        
        
        
        /**
         * Convert a string to kebab case text. For example, fooBar will be foo-bar
         * @param text string
         */
        export function kebabCase (text)
        
        
        
    }
}
/**@module UI (for the renderer Process)(Element Utils Module)*/
declare module Editor{
    declare module UI{
        /**
         * Get registered property via type.
         * @param type string
         */
        export function getProperty (type)
        
        
        /**
         * Parse txt as an array.
         * @param txt string
         */
        export function parseArray (txt)
        
        
        /**
         * Parse txt as a boolean value.
         * @param txt string
         */
        export function parseBoolean (txt)
        
        
        /**
         * Parse txt as a color object.
         * @param txt string
         */
        export function parseColor (txt)
        
        
        /**
         * Parse txt as an object.
         * @param txt string
         */
        export function parseObject (txt)
        
        
        /**
         * Parse txt as a string.
         * @param txt string
         */
        export function parseString (txt)
        
        
        /**
         * Regenerate property at propEL.
         * @param propEL HTMLElement
         * @param cb function
         */
        export function regenProperty (propEL, cb)
        
        
        
        /**
         * Register a custom element.
         * @param name string
         * @param def object
         */
        export function registerElement (name, def)
        
        
        
        /**
         * Register a custom property.
         * @param type string
         * @param protoOrUrl object|string
         */
        export function registerProperty (type, protoOrUrl)
        
        
        
        /**
         * Unregister a custom property.
         * @param type string
         */
        export function unregisterProperty (type)
        
        
    }
}
/**@module UI (for the renderer Process)(Focus Module) */
declare module Editor{
    declare module UI{
        /**
         * Focus on specific element.
         * @param element HTMLElement
         */
        export function focus (element)
        
        /**
         * Focus on the parent of element.
         * @param element HTMLElement
         */
        export function focusParent (element)
        
        
        /**Focus on the next element. */
        export function focusNext ()
        
        /**Focus on the previous element. */
        export function focusPrev ()
        
        
        //Properties
        /**Current focused element. */
        export let focusedElement
        
        /**Current focused panel frame. */
        export let focusedPanelFrame
        
        /**The last focused element. */
        export let lastFocusedElement
        
        /**The last focused panel frame. */
        export let lastFocusedPanelFrame
        
        
    }
}
/**@module UI (for the renderer Process)(Resources Module) */
declare module Editor{
    declare module UI{
        /**
         * Get cached resource by url.
         * @param url string
         */
        export function getResource (url)
        
        
        /**
         * Load and cache the resource then return a promise.
         * @param url string
         */
        export function importResource (url)
        
        
        /**
         * Load and evaluate the script, cache the result then return a promise.
         * @param url string
         */
        export function importScript (url)
        
        
        /**
         * Load and evaluate the script list, cache the result then return a promise.
         * @param urls array
         */
        export function importScripts (urls)
        
        
        /**
         * Load and cache the style sheet by url then return a promise.
         * @param url string
         */
        export function importStylesheet (url)
        
        
        /**
         * Load and cache the style sheet by urls list then return a promise.
         * @param urls array
         */
        export function importStylesheets (urls)
        
        
        /**
         * Load and cache the template then return a promise.
         * @param url string
         */
        export function importTemplate (url)
        
        
        /**
         * @description Load and append script by url. Once it is done, the cb will be invoked.
         * @see NOTE: the different between loadGlobalScript and importScript is loadGlobalScript use <script> tag, and it will process zipped script internally in browser. However, loadGlobalScript cannot return evaluated result, which means you can only get the context in it by assigning global variable inside the target script.
         * @param url string
         * @param cb function
         */
        export function loadGlobalScript (url, cb)
        
        
        
        
        

        
    }
}
/**@module UI.Settings (for the renderer Process)(Resources Module) */
declare module Editor{
    declare module Editor.UI.Settings{
        /**Control the default step for float point input element. Default is 0.1. */
        export let stepFloat
        
        /**Control the default step for integer input element. Default is 1. */
        export let stepInt
        
        /**Control the step when shift key press down. Default is 10. */
        export let shiftStep
        
    }
}
/**@module DockUtils (for the renderer Process)TODO: The API still under development.*/
declare module Editor{
    declare module DockUtils
    {
        
        /**The root element for docking in the window. */
        root

        
        /** The size of the resizer.*/
        resizerSpace

        
    }
}
/**@module DragDrop (for the renderer Process)TODO: The API still under development.*/
declare module Editor{
    declare module UI.DragDrop{

    }
}


