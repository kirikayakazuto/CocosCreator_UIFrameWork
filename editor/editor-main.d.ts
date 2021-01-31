/**
 * @author zhangxin
 * @description creator编辑器头文件
 * 2020/9/4
 */
/**@module Editor (for the Main Process) */
declare module Editor {


    export var argv: yargs.argv

    /**Indicates if the application is running with --dev option.*/
    export var dev
    /**The Editor-Framework module path. Usually it is {your-app}/editor-framework/*/
    export var frameworkPath: string
    /**Indicates if the Editor-Framework App is closing.*/
    export readonly var isClosing: boolean
    /**Indicates the language used in --lang option.*/
    export var lang
    /**Absolute path for current open project.*/
    export var Project: { path: string }
    /**
     * Specify the log file path. By default it is saving in:
     * Windows: /.{app-name}/logs/{app-home}.log
     * Mac: /Library/Logs/{app-name}.log
     */
    export var logfile
    /**A table contains all version info for app and sub-modules. By default it contains App and Editor-Framework version info.*/
    export var versions

    export type Options = {
        i18n: Array,/**Specify i18n phrases for your application*/
        layout: string,/**Specify the layout file used as default layout for your application*/
        'main-menu': Function,/**A function returns the main menu template*/
        profile: object,/**Register profile name to path table used in Editor.Profile module*/
        'package-search-path:string:string': string[],/**Paths to search packages*/
        'panel-window': string,/**Specify a html file that used as panel window entry page*/
        selection: object,/**Register selection type that used in Editor.Selection module*/
        theme: string,/**The name of the theme we would like to search for in theme:/** protocol*/
        'theme-search-path:string:string': string[]/** Paths to search in theme:/** protocol*/
    }

    /**
     * 
     * @param opts 
     */
    export function init(opts: Partial<Options>)

    /**
     * Run the Editor by restoring last window or openning the a new one.
     * @param url The url to load for default main window
     * @param opts The opts to used when constructing the default main window
     */
    export function run(url: string, opts: object)

    /**
     * Reset the configuration of Editor
     */
    export function reset()

    /**
     * Load all packages under path. Once it done the callback will be invoked.
     * @param path 
     * @param callback 
     */
    export function loadPackagesAt(path: string, callback: Funtion)

    /**
     * Load all packages under the package-search-path:string:string which specified in Editor.init.
     *  Once it done the callback will be invoked.
     * @param callback 
     */
    export function loadAllPackages(callback: Funtion)

    /**
     * Require the module by Editor.url. This is good for module exists in package,
     * since the absolute path of package may be variant in different machine. 
     * @example:
     * this is equal to require(Editor.url('packages:/**foobar/foo'))
     * const Foo = Editor.require('packages:/**foobar/foo');
     * @param url 
     */
    export function require(url: string)

    /**
     * Returns the file path (if it is registered in custom protocol) or 
     * url (if it is a known public protocol).
     * @param url 
     */
    export function url(url: string)

    /**
     * Start watching all packages. Once it done the callback will be invoked.
     * @param callback 
     */
    export function watchPackages(callback: Funtion)





}
/**@module console (for the Main Process)*/
declare module Editor {
    /**
     * Clear the logs. If we specify pattern for the method, it will clear the match pattern. The method will send ipc message editor:console-clear to all windows.
     * @param pattern string - Specify the clear pattern
     * @param useRegex boolean - If we use regex for the clear pattern
     */
    export function clearLog(pattern, useRegex)
    /**
     * After we call this function, all the incoming logs will be stored in the memory, and can be queried by ipc message editor:console-query.
     */
    export function connectToConsole()
    /**
     * Log the error message and show on the console, it also shows the call stack start from the function call it. The method will sends ipc message editor:console-error to all windows.
     * @param ...args ... - Whatever arguments the message needs 
     */
    export function error(...args)
    /**
     * Log the fatal message and show on the console, the app will quit immediately after that.
     * @param ...args ... - Whatever arguments the message needs 
     */
    export function fatal([...args])
    /**
     * Log the failed message and show on the console The method will send ipc message editor:console-failed to all windows.
     * @param ...args ... - Whatever arguments the message needs 
     */
    export function failed([...args])
    /**
     * Log the info message and show on the console The method will send ipc message editor:console-info to all windows.
     * @param args 
     */
    export function info(...args)
    /**
     * Log the normal message and show on the console. The method will send ipc message editor:console-log to all windows.
     * @param args 
     */
    export function log(...args)
    /**
     * Log the success message and show on the console The method will send ipc message editor:console-success to all windows.
     * @param args 
     */
    export function success(...args)
    /**
     * Trace the log
     * @param level string - The log level
     * @param args 
     */
    export function trace(level, ...args)
    /**
     * Log the warnning message and show on the console, it also shows the call stack start from the function call it. The method will send ipc message editor:console-warn to all windows.
     * @param args 
     */
    export function warn(...args)

    Message: 'editor:console-query'

    /**Return logs stores in the memory in main process.*/

    Message: 'editor:renderer-console-error'

    /**Log the error message:string from renderer process.*/

    Message: 'editor:renderer-console-trace'

    /**Trace the log from renderer process.*/

    Message: 'editor:renderer-console-failed'

    /**Log the failed message:string from renderer process.*/

    Message: 'editor:renderer-console-info'

    /**Log the failed message:string from renderer process.*/

    Message: 'editor:renderer-console-log'

    /**Log the normal message:string from renderer process.*/

    Message: 'editor:renderer-console-success'

    /**Log the success message:string from renderer process.*/

    Message: 'editor:renderer-console-warn'

    /**Log the warning message:string from renderer process.*/
}
/**@module App */
declare module Editor{
    declare class App{
        /**Indicates if application is focused */
        static focused
        
        /**Your application's home path. Usually it is ~/.{your-app-name} */
        static home
        
        /**The name of your app loaded from the name field in package.json. */
        static name
        
        /**Your path of your application. */
        static path
        
        /**The version of your app loaded from the version field in package.json. */
        static version
        
        /**
         * Emits event by name.
         * @param eventName string - The name of the event
         * @param ...args ... - Arguments
         */
        static emit(eventName, ...args?)
        
        /**
         * Extends the Editor.App module. More details read App Lifecycle callbacks
         * @param proto object - The prototype used to extends
         */
        static extends(proto)
        
        
        /**
         * Removes an event listner function.
         * @param eventName string - The name of the event
         * @param listener function - The callback function
         */
        static off(eventName, listener)
        
        
        
        /**
         * Adds an event listner function.
         * @param eventName string - The name of the event
         * @param listener function - The callback function
         */
        static on(eventName, listener)
        
        
        
        /**
         * Adds a one time event listner function.
         * @param eventName string - The name of the event
         * @param listener function - The callback function
         */
        static once(eventName, listener)
        
       
        Event: 'blur'
        //Emit when your app is blurred.
        
        Event: 'focus'
        //Emit when your app is focused.
        
        Event: 'quit'
        //Emit when Editor.App closed all window and main process services.
    }
        
        
}
/**@module Debugger (for the Main Process) */
declare module Editor {
    declare module Debugger
    {
        
        /**The debug port for node inspector.*/
        export var debugPort
        
        
        /**Indicate if the node inspector is enabled.*/
        export var isNodeInspectorEnabled
        
        /**Indicate if the repl is enabled. */
        export var isReplEnabled
        
        
        
        /**
         * Active devtron.
         */
        export function activeDevtron()
        
        /**
         *Toggle the node inspector in main process. 
         */
        export function toggleNodeInspector()
        
        /**
         *Toggle the repl in main process. 
         */
        export function toggleRepl()
        
        /**
         *Turn on the node inspector in main process. 
         */
        
        export function startNodeInspector()
        
        /**
         * Turn on the repl in main process. 
         */
        
        export function startRepl()
        
        /**
         *Turn off the node inspector in main process. 
         */
        
        export function stopNodeInspector()
        
        /**
         *Turn off the repl in main process. 
         */
        export function stopRepl()
        
    }
}
/**@module DevTools (for the Main Process) */
declare module Editor {
    declare module DevTools{

        /**
         * Focus on devtools for editorWin.
         * @param editorWin 
         */
        export function focus(editorWin: Editor.Window)
        
        /**
         * Execute script in the devtools for editorWin.
         * @param editorWin 
         * @param script 
         */
        export function executeJavaScript(editorWin: Editor.Window, script: string)
        
        /**
         * Enter the inspect element mode for editorWin.
         * @param editorWin 
         */
        export function enterInspectElementMode(editorWin: Editor.Window)
        
        
    }
}
/**@module Dialog (for the Main Process) */
declare module Editor {
    declare module Dialog{

        /**
         * Same as dialog.showOpenDialog
         * @param args 
         */
        export function openFile(...args)
        
        /**
         * Same as dialog.showSaveDialog
         * @param args 
         */
        export function saveFile(...args)
        
        
        /**
         * Same as dialog.showMessageBox
         * @param args 
         */
        export function messageBox(...args)
        
        
        
        Message: 'dialog:open-file'
        
        Message: 'dialog:save-file'
        
        Message: 'dialog:message:string-box'
    }
}
/**@module Ipc (for the Main Process) */
declare module Editor {
    declare module Ipc {


        /**Cancel request sent to main or renderer process.*/
        export function cancelRequest(sessionID: string)
    
        /** opts object
        /**      excludeSelf boolean - exclude send ipc message:string to main process when calling Editor.Ipc.sendToAll.
        /**     Ipc option used in Editor.Ipc.sendToAll.
        /**
         * 
         * @param opts :{excludeSelf boolean - exclude send ipc message:string to main process when calling Editor.Ipc.sendToAll.}      
         */
        export function option(opts: { excludeSelf: boolean })

        /**
         * Send message:string with ...args to all opened window and to main process asynchronously.
         * @param message:string string - Ipc message:string.
         * @param args  - Whatever arguments the message:string needs.
         * @param option - You can indicate the last argument as an IPC option by Editor.Ipc.option({...}).
         */
        export function sendToAll(message: string, ...args, option)

        /**
         * Send message:string with ...args to main process asynchronously. It is possible to add a callback as the last or the 2nd last argument to receive replies from the IPC receiver.
         * @param message:string string - Ipc message:string
         * @param args ... - Whatever arguments the message:string needs.
         * @param callback function - You can specify a callback function to receive IPC reply at the last or the 2nd last argument.
         * @param timeout number - You can specify a timeout for the callback at the last argument. If no timeout specified, it will be 5000ms.
         */
        export function sendToMain(message: string, ...args, callback: Funtion, timeout)

        /**
         * Send message:string with ...args to main process synchronized and return a result which is responded from main process.
         * @param message:string string - Ipc message:string.
         * @param args ... - Whatever arguments the message:string needs.
         */
        export function sendToMainSync(message: string, ...args)

        /**
         * Send message:string with ...args to the main window asynchronously.
         * @param message:string string - Ipc message:string.
         * @param args ... - Whatever arguments the message:string needs.
         */
        export function sendToMainWin(message: string, ...args)

        /**
         * Send message:string with ...args to main process by package name and the short name of the message:string.
         * @param pkgName string - Package name.
         * @param message:string string - Ipc message:string.
         * @param args ... - Whatever arguments the message:string needs.
         */
        export function sendToPackage(pkgName, message: string, ...args)

        /**
         * Send message:string with ...args to panel defined in renderer process asynchronously. It is possible to add a callback as the last or the 2nd last argument to receive replies from the IPC receiver.
         * @param panelID string - Panel ID.
         * @param message:string string - Ipc message:string.
         * @param args ... - Whatever arguments the message:string needs.
         * @param callback  function - You can specify a callback function to receive IPC reply at the last or the 2nd last argument.
         * @param timeout  number - You can specify a timeout for the callback at the last argument. If no timeout specified, it will be 5000ms.
         */
        export function sendToPanel(panelID, message: string, ...args?, callback: Funtion?, timeout?)

        /**
         * Send message:string with ...args to all opened windows asynchronously. The renderer process can handle it by listening to the message:string through the Electron.ipcRenderer module.
         * @param message:string string - Ipc message:string.
         * @param args ... - Whatever arguments the message:string needs.
         * @param option object - You can indicate the last argument as an IPC option by Editor.Ipc.option({...}).
         */
        /**
         * @example:
         * Send IPC message:string (main process)
         * Editor.Ipc.sendToWins('foobar:say-hello', 'Hello World!');
         * Receive IPC message:string (renderer process)
         * <html>
         *   <body>
         *     <script>
         *       require('ipc').on('foobar:say-hello', (event, text) => {
         *         console.log(text);  //Prints "Hello World!"
         *       })
         *     </script>
         *   </body>
         * </html>
         */
        export function sendToWins(message: string, ...args, option)

    }
}
/**@module MainMenu (for the Main Process) module for manipulating main menu items.*/
declare module Editor {
    declare module MainMenu
    {
        /**
         * Apply main menu changes.
        
         */
        export function apply()

        /**
         *  Build a template into menu item and add it to path
         * @param path string - Menu path
         * @param template array|object - Menu template
         */
        export function add(path: string, template: Partial<MenuTemplate>)

        /**
         * Init main menu.
         */
        export function init()

        /**
         * Remove menu item at path.    
         * @param path string - Menu path
         */
        export function remove(path: string)

        /**
         * 
         * @param path string - Menu path
         * @param options  options object
         *                  icon NativeImage - A NativeImage
         *                  enabled boolean
         *                  visible boolean
         *                  checked boolean - NOTE: You must set your menu-item type to 'checkbox' to make it work
         *                  Set options of a menu item at path.
         */
        export function set(path: string, options: Partial<{ icon: NativeImage, enabled: boolean, visible: boolean, checked: boolean }>)

        /**
         * Build a template into menu item and update it to path
         * @param path string - Menu path
         * @param template array|object - Menu template 
         */
        export function update(path: string, template: Partial<MenuTemplate>)

        export var menu: Editor.Menu

        /**Get main menu instance for debug purpose*/

        /**IPC Messages*/

        Message: 'main-menu:add'

        Message: 'main-menu:apply'

        Message: 'main-menu:init'

        Message: 'main-menu:remove'

        Message: 'main-menu:set'

        Message: 'main-menu:update'
    }
}

declare type MenuTemplate =
    {
        path: string /**- add a menu item by path.*/
        message: string/** - Ipc message:string name.*/
        command: string/** - A global function in main process (e.g. Editor.log).*/
        params: Array/** - The parameters passed through ipc.*/
        panel: string/** - The panelID, if specified, the message:string will send to panel.*/
        dev: string/** - Only show when Menu.showDev is true.*/
    }

/**@class menu (for the Main Process),*/
declare module Editor {
    export class Menu {
        constructor(template: Partial<MenuTemplate>, webContents: object)


        /**
         * Build a template into menu item and add it to path
         * @param path:string string - Menu path 
         * @param template array|object - Menu template
         * 
         * @example:
         *let editorMenu = new Editor.Menu();
         *editorMenu.add( 'foo/bar', {
         *label: foobar,
         *message: 'foobar:say',
         *params: ['foobar: hello!']
         *});
         *you can also create menu without label
         *it will add menu to foo/bar where bar is the menu-item
         *let editorMenu = new Editor.Menu();
         *editorMenu.add( 'foo/bar/foobar', {
         *message: 'foobar:say',
         *params: ['foobar: hello!']
         *});
         */
        add(path: string, template: Partial<MenuTemplate>)
        /**
         * Clear all menu item in it.
         */
        clear()
        /**
         * De-reference the native menu.
         */
        dispose()
        /**
         * Build a template into menu item and insert it to path:string at specific position
         * @param path:string The menu path:string
         * @param pos number
         * @param template 
         */
        insert(path: string, pos: number, template: Partial<MenuTemplate>)
        /**
        * Remove menu item at path.    
        * @param path string - Menu path
        */
        remove(path: string)

        /**
         * Reset the menu from the template.
         * @param template 
         */
        reset(template: Partial<MenuTemplate>)

        /**
         * 
         * @param path string - Menu path
         * @param options  options object
         *                  icon NativeImage - A NativeImage
         *                  enabled boolean
         *                  visible boolean
         *                  checked boolean - NOTE: You must set your menu-item type to 'checkbox' to make it work
         *                  Set options of a menu item at path.
         */
        set(path: string, options: Partial<{ icon: NativeImage, enabled: boolean, visible: boolean, checked: boolean }>)

        /**
         * Build a template into menu item and update it to path
         * @param path string - Menu path
         * @param template array|object - Menu template 
         */
        update(path: string, template: Partial<MenuTemplate>)
        /**Indicate if show dev menu*/
        static showDev
        /**
         * Convert the menu template to process additional keyword we added for Electron. If webContents provided, the template.message will send to the target webContents.
         * @param template Menu template for initialize. The template take the options of Electron's Menu Item
         * @param param1 A WebContents object.
         */
        static convert(template: Partial<MenuTemplate>, [webContents])
        /**
         * 
         * @param name Name of the register menu
         */
        static getMenu(name: string)
        /**
         * 
         * @param name Name of the register menu
         */
        static unregister(name: string)
         /**
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
        Message: 'menu:popup'
        Message: 'menu:register'
    }
}
/**@module Package (for the Main Process) */
declare module Editor {
    declare module Package{

        /**
         * Load a package at path:string.
         
         * @param path:string string - An absolute path:string point to a package folder
         * @param callback function - Callback when finish loading
         */
        export function load(path: string, callback: Funtion)
        
        
        /**
         * Unload a package at path:string.
         * @param path:string  string - An absolute path:string point to a package folder
         * @param callback function - Callback when finish unloading
         */
        export function unload(path: string, callback: Funtion)
        
        /**
         * Reload a package at path:string.
         * @param path:string string - An absolute path:string point to a package folder
         * @param callback function - Callback when finish reloading
         */
        export function reload(path: string, callback: Funtion)
        
        
        /**
         * Find and get panel info via panelID, the panel info is the JSON object that defined in panels.{panel-name} in your package.json.
         * @param panelID string - The panel ID
         */
        export function panelInfo(panelID)
        
        /**
         * Find and get package info via path:string, the package info is the JSON object of your package.json file.
         * @param path:string string - The package path:string
         */
        export function packageInfo(path: string)
        
        
        /**
         * Return the path:string of the package by name.
         * @param name string - The package name
         */
        export function packagePath(name)
        
        
        /**
         * Add package search path:string.
         * @param path:string string|array - Path to add
         */
        export function addPath(path: string)
        
        
        /**
         * Remove package search path:string.
         * @param path:string string - Path to remove
         */
        export function removePath(path: string)
        
        
        
        /**
         * Reset path:string.
         */
        export function resetPath()
        
        
        /**
         * Find and return the package path:string via name.
         * @param name string - Package name
         */
        export function find(name)
        
        /**Return current language setting.*/
        export var lang
        
        
        /**Return package search path:string list.*/
        export var path: string
        
        
        /**Return the version of sub modules.*/
        export var versions
        
        
        Message: 'editor:package-query-info'
        
        Message: 'editor:package-query-infos'
        
        Message: 'editor:package-reload'
    }
}
/**@module Panel (for the Main Process) */
declare module Editor {
    declare module Panel {


        /**
         * Close a panel via panelID.
         * @param panelID string - The panelID.
         * @param cb function
         */
        export function close(panelID, cb)

        /**
         * Find and return an editor window that contains the panelID. 
         * @param panelID string - The panelID.
         */
        export function findWindow(panelID)

        /**
         * Open a panel via panelID and pass argv to it. The argv will be execute in panel's run function in renderer process.
         * @param panelID string - The panelID.
         * @param argv object - Argument store as key-value table, which will be used in panel's run function in renderer process.
         */
        export function open(panelID, argv)


        /**
         * Popup an exists panel via panelID.
         * @param panelID string - The panelID.
         */
        export function popup(panelID)

        /**
         * The html entry file used for standalone panel window. Default is 'editor-framework:/**static/window.html'.
         */
        export var templateUrl
        Message: 'editor:panel-close'

        Message: 'editor:panel-dock'

        Message: 'editor:panel-open'

        Message: 'editor:panel-popup'

        Message: 'editor:panel-query-info'
    }
}





/**@module Profile (for the Main Process)*/
declare module Editor {

    
    declare module Profile {
        /**
  * 
  * @param name string
  * @param type string
  * @param defaultProfile object - The default profile to use if the profile is not found. 
  */
        export function load(name, type, defaultProfile)

        /**
         * Register profile type with the path:string you provide.
         * @param type string - The type of the profile you want to register.
         * @param path:string string - The path:string for the register type.
         */
        export function register(type, path: string)

        /**
         *     Reset the registered profiles
         */
        export function reset()
        /**IPC Message*/

        Message: 'editor:load-profile'

        Message: 'editor:save-profile'
    }
}
/**@module Protocol (for the Main Process)*/
declare module Editor {
    declare module Protocol{

        /**
         * Register a protocol so that Editor.url can use it to convert an url to the filesystem path:string. The fn accept an url Object via url.parse.
         * @param protocol string - Protocol name
         * @param fn function
         * @example:
         const Path = require('path:string');
         
         let _url2path = base => {   
             return uri => {
                 if ( uri.pathname ) {
                     return Path.join( base, uri.host, uri.pathname );
                    }
                    return Path.join( base, uri.host );
                };
            };
            Editor.Protocol.register('editor-framework', _url2path(Editor.frameworkPath));
            */
           export function register(protocol: string, fn: Function)
           
        }
}
/**@class Window (for the Main Process)*/
declare module Editor {
    /**Window class for operating editor window.    */
    export class Window {
        /**
         * 
         * @param name string - The window name.
         * @param options object - The Electron's BrowserWindow options with the following additional field
         * windowType string - Can be one of the list:
            dockable: Indicate the window contains a dockable panel
            float: Indicate the window is standalone, and float on top.
            fixed-size: Indicate the window is standalone, float on top and non-resizable.
            quick: Indicate the window will never destroyed, it only hides itself when it close which make it quick to show the next time.
            save boolean - Indicate if save the window position and size.

         */
        constructor(name, options)
        /**
         * Try to adjust the window to fit the position and size we give.
         * @param x number
         * @param y number
         * @param w number
         * @param h number
         */
        adjust(x, y, w, h)

        /**
         * Close the window.
         */
        close()


        /**
         * Closes the devtools.
         */
        closeDevTools()


        /**
         * Dereference the native window.
         */
        dispose()


        /**
         * Clear all panels docked in current window.
         */
        emptyLayout()


        /**
         * Focus on the window.
         */
        focus()


        /**
         * Force close the window.
         */
        forceClose()


        /**
         * Hide the window.
         */
        hide()


        /**
         * Load page by url, and send argv in query property of the url. The renderer process will parse the argv when the page is ready and save it in Editor.argv in renderer process.
         * @param editorUrl string
         * @param argv object
         */
        load(editorUrl, argv)

        /**
         * Minimize the window.
         */
        minimize()


        /**
         * Opens the devtools.
         * @param options 
            options object
                mode string - Opens the devtools with specified dock state, can be right, bottom, undocked, detach. Defaults to last used dock state. In undocked mode it’s possible to dock back. In detach mode it’s not.        
         */
        openDevTools(options)

        /**
         * Popup a context menu.
         * @param template object - The menu template.
         * @param x number - The x position.
         * @param y number - The y position.
         */
        popupMenu(template, x, y)

        /**
         * Reset the dock layout of current window via url
         * @param url string
         */
        resetLayout(url)


        /**
         * Restore the window.
         */
        restore()


        /**
         * Show the window.
         */
        show()


        /**
         * 
         *  Send message with ...args to renderer process asynchronously. It is possible to add a callback as the last or the 2nd last argument to receive replies from the IPC receiver.
         * @param message string - The message name.
         * @param args ... - Whatever arguments the message needs.
           @param callback function - You can specify a callback function to receive IPC reply at the last or the 2nd last argument.
           @param timeout number - You can specify a timeout for the callback at the last argument. If no timeout specified, it will be 5000ms.
        
         */
        send(message, ...args)



        /**
         *If the window is focused. 
         */
        isFocused: boolean
        /**
         * If the window is loaded.
         */
        isLoaded: boolean


        /**
         *If this is a main window. 
         */
        isMainWindow

        /**
         * If the window is minimized.
         */
        isMinimized


        /**
         * Returns the id list of the panel dock on this window.
         */
        panels

        /**
         * The url of the default layout.
         */
        static defaultLayoutUrl


        /** The main window.*/
        static main


        /**The current opened windows. */
        static windows



        //Static Methods
        /**
         * Add an Editor.Window to window list.
         * @param win Editor.Window
         */
        static addWindow(win)


        /**
         * Find window by name, by BrowserWindow instance or by WebContents instance. Returns the Editor.Window.
         * @param param string|BrowserWindow|WebContents
         */
        static find(param)



        /**
         * Remove an Editor.Window from window list.
         * @param win Editor.Window
         */
        static removeWindow(win)




        //IPC Messages

        Message: 'editor:window-center'

        Message: 'editor:window-focus'

        Message: 'editor:window-inspect-at'

        Message: 'editor:window-load'

        Message: 'editor:window-open'

        Message: 'editor:window-query-layout'

        Message: 'editor:window-remove-all-panels'

        Message: 'editor:window-resize'

        Message: 'editor:window-save-layout'
    }



}
/**@class Worker (for the Main Process)*/
declare module Editor {
    export class Worker {
        /**
         * 
         * @param name name string - The worker name.
         * @param options options object

            workerType string - Can be one of the list:
                renderer: Indicate the worker is running in a hidden window
                main: Indicate the worker is running is a process
            url string - The url of renderer worker.
         */
        constructor(name, options)
        /**
         * Close the worker.
         */
        close()


        /**Dereference the native window. */
        dispose()

        /**
         * 
         * @param message string
         * @param args ... - Whatever arguments the message needs.
         */
        on(message, ...args)

        /**
         * Starts the worker.
         * @param argv object - The arguments
         * @param cb function - The callback function
         */
        start(argv, cb)

    }
}
/**@module Builder (for the Main Process)*/
declare module Editor {
    declare module Builder {

        /**
         * @param eventName string - The name of the event
         * @param callback function - The event callback
         *      options object - Callback params, the build options
                cb function - Need to call cb when the callback process finished

         */
        export function on(eventName, callback)


        /**
         * @param eventName string - The name of the event
         * @param callback function - The event callback
         * 
                options object - Callback params, the build options
                cb function - Need to call cb when the callback process finished
         */
        export function once(eventName, callback)


        /**
         * @param eventName string - The name of the event
         * @param callback function - The event callback
         */
        export function removeListener(eventName, callback)



        // Events

        Event: 'build-finished'

        //Emit when build finished

        Event: 'compile-finished'

        //Emit when compile finished

        Event: 'before-change-files'

        //Emit before editor modifies the build files (e.g, before encryption js files)
    }
}


