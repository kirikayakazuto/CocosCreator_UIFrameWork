
/**
 * @author zhangxin
 * @description creator编辑器头文件
 * 2020/9/4
 */
/**@module Editor (share) */
declare module Editor{

    /**
     * Convenience method returns corresponding value for given keyName or keyCode.
     * @param key number|string - Can be number(key-code) or string(key-name)
     */
    export function KeyCode (key)
    
    
    
    /**Indicates whether executes in OSX. */
    export let isDarwin
    
    /**Indicates whether executes in electron. */
    export let isElectron
    
    
    /**Indicates whether executes in editor's main process. */
    export let isMainProcess
    
    
    /**Indicates whether executes in native environment (compare to web-browser). */
    export let isNative
    
    
    /**Indicates whether executes in node.js application. */
    export let isNode
    
    
    /**Indicates whether executes in common web browser. */
    export let isPureWeb
    
    
    /**Indicates whether executes in editor's core process (electron's browser context). */
    export let isRendererProcess
    
    
    /**Check if running in retina display. */
    export let isRetina
    
    
    /**Indicates whether executes in Windows. */
    export let isWin32
    

}
/**@module Easing (share) */
declare module Editor{
    declare module Easing{
        export function linear (k)
        export function quadIn (k)
        export function quadOut (k)
        export function quadInOut (k)
        export function quadOutIn (k)
        export function cubicIn (k)
        export function cubicOut (k)
        export function cubicInOut (k)
        export function cubicOutIn (k)
        export function quartIn (k)
        export function quartOut (k)
        export function quartInOut (k)
        export function quartOutIn (k)
        export function quintIn (k)
        export function quintOut (k)
        export function quintInOut (k)
        export function quintOutIn (k)
        export function sineIn (k)
        export function sineOut (k)
        export function sineInOut (k)
        export function sineOutIn (k)
        export function expoIn (k)
        export function expoOut (k)
        export function expoInOut (k)
        export function expoOutIn (k)
        export function circIn (k)
        export function circOut (k)
        export function circInOut (k)
        export function circOutIn (k)
        export function elasticIn (k)
        export function elasticOut (k)
        export function elasticInOut (k)
        export function elasticOutIn (k)
        export function backIn (k)
        export function backOut (k)
        export function backInOut (k)
        export function backOutIn (k)
        export function bounceIn (k)
        export function bounceOut (k)
        export function bounceInOut (k)
        export function bounceOutIn (k)
        export function fade (k)
        
    }
}
/**@module IpcListener (share) */
declare module Editor{
    declare class IpcListener
    {
        constructor()
        {
            
        }
        /**
         * Register IPC message and respond it with the callback function.
         * @param message string
         * @param callback function
         */
        on (message, callback)
        
        
        
        /**
         * Register IPC message and respond it once with the callback function.
         * @param message string
         * @param callback function
         */
        once (message, callback)
        
        
        
        /**
         * Clear all registered IPC messages in the listener.
         */       
        clear ()
        
    }
}

/**@module JS (share)Extending JavaScript to better handle property and class inheritance. */
declare module Editor{
    declare module JS{
        /**
         * Copy all properties not defined in obj from arguments[1...n] to it.
         * @param obj object
         * @param ...args object
         */
        export function addon (obj, ...args)
        
        /**
         * Copy all properties from arguments[1...n] to obj, return the mixed result.
         * @param obj object
         * @param ...args object
         */
        export function assign (obj, ...args)
        
        /**
         * Copy all properties from arguments[1...n] to obj except the specific ones.
         * @param obj object
         * @param src object
         * @param except array
         */
        export function assignExcept (obj, src, except)
        
        /**
         * Removes all enumerable properties from object.
         * @param obj object
         */
        export function clear (obj)
        
        
        /**
         * Copy property by name from source to target.
         * @param name string
         * @param source object
         * @param target object
         */
        export function copyprop (name, source, target)
        
        /**
         * Derive the class from the supplied base class.
         * @param cls function
         * @param base function
         */
        export function extend (cls, base)
        
        /**
         * Extract properties by propNames from obj, return the extracted result.
         * @param obj object
         * @param propNames array(string)
         */
        export function extract (obj, propNames)
        
     
        
        /**
         * Get property by path.
         * @param obj object
         * @param path string
         */
        export function getPropertyByPath (obj, path)
        
        
        
    }
}
/**@module Math (share)*/
declare module Editor{
    declare module Math{
        /**
         * 
         * @param degree number
         */
        export function deg2rad (degree:number)
        
        
        /**
         * Radius to degree.
         * @param radius number
         */
        export function rad2deg (radius:number)
        
        
        /**
         * Let radius in -pi to pi.
         * @param radius number
         */
        export function rad180 (radius:number)
        
        /**
         * Let radius in 0 to 2pi.
         * @param radius number
         */
        export function rad360 (radius:number)
        
        
        /**
         * Let degree in -180 to 180.
         * @param degree number
         */
        export function deg180 (degree:number)
        
        
        /**
         * Let degree in 0 to 360.
         * @param degree number
         */
        export function deg360 (degree:number)
        
        
        /**
         * Returns a random floating-point number between min (inclusive) and max (exclusive).
         * @param min number
         * @param max number
         */
        export function randomRange (min:number, max:number)
        
        /**
         *  Returns a random integer between min (inclusive) and max (exclusive).
         * @param min number
         * @param max 
         */
        export function randomRangeInt (min:number, max:number)
        
        
       
        /**
         * Clamps a value between a minimum float and maximum float value.
         * @param val number
         * @param min number
         * @param max number
         */
        export function clamp (val:number, min:number, max:number)
        
        
        
        
        /**
         * Clamps a value between 0 and 1.
         * @param val number
         */
        export function clamp01 (val:number)
        
        
        /**
         * 
         * @param out rect
         * @param p0 vec2
         * @param p1 vec2
         * @param p2 vec2
         * @param p3 vec2
         */
        export function calculateMaxRect (out:cc.Rect, p0:cc.Vec2, p1:cc.Vec2, p2:cc.Vec2, p3:cc.Vec2)
        
        
        
        
        /**
         * 
         * @param from number
         * @param to number
         * @param ratio number
         */
        export function lerp (from:number, to:number, ratio:number)
        
        
        /**
         * Get number of decimals for decimal part.
         * @param val number
         */
        export function numOfDecimals (val:number)
        
        
        /**
         * Get number of decimals for fractional part.
         * @param val number
         */
        export function numOfDecimalsF (val:number)
        
        
        /**
         * 
         * @param val number
         * @param precision number
         */
        export function toPrecision (val:number, precision:number)
        
        /**
         * 
         * @param c0 number
         * @param c1 number
         * @param c2 number
         * @param c3 number
         * @param t number
         */
        export function bezier (c0:number, c1:number, c2:number, c3:number, t:number)
        
        /**
         * 
         * @param c0 number
         * @param c1 number
         * @param c2 number
         * @param c3 number
         * @param x number
         */
        export function solveCubicBezier (c0:number, c1:number, c2:number, c3:number, x:number)
      
        export const EPSILON:number
        export const MACHINE_EPSILON:number
        export const TWO_PI:number
        export const HALF_PI:number
        export const D2R:number
        export const R2D:number
    }
}
/**@module Selection (share)*/
declare module Editor{
    declare module Selection{
        /**
         * 
         * @param type string
         */
        export function register (type)
        
        export function reset ()
        /**
         * Returns a export function ConfirmableSelectionHelper instance.
         */
        export function local ()
        
        /**Confirms all current selecting objects, no matter which type they are. This operation may trigger deactivated and activated events. */
        export function confirm ()
        
        /**Cancels all current selecting objects, no matter which type they are. This operation may trigger selected and unselected events. */
        export function cancel ()
        /**
         * Check if selection is confirmed.
         * @param type string
         */
        export function confirmed (type)
        
        /**
         * Select item with its id.
         * @param type string
         * @param id string
         * @param unselectOthers boolean
         * @param confirm boolean
         */
        export function select (type, id, unselectOthers?, confirm?)
        
        /**
         * Unselect item with its id.
         * @param type string
         * @param id string
         * @param confirm boolean
         */
        export function unselect (type, id, confirm?)
        
        /**
         * Hover item with its id. If id is null, it means hover out.
         * @param type string
         * @param id string
         */
        export function hover (type, id)
        
        
        
        /**
         * 
         * @param type string
         * @param id string
         */
        export function setContext (type, id)
        
        /**
         * 
         * @param type string
         * @param srcID string
         * @param destID string
         */
        export function patch (type, srcID, destID)
        /**
         * 
         * @param type string
         */
        export function clear (type)
             /**
         * 
         * @param type string
         */
        export function hovering (type)
             /**
         * 
         * @param type string
         */
        export function contexts (type)
             /**
         * 
         * @param type string
         */
        export function curActivate (type)
             /**
         * 
         * @param type string
         */
        export function curGlobalActivate (type)
             /**
         * 
         * @param type string
         */
        export function curSelection (type)
        /**
         * 
         * @param items array(string)
         * @param mode string - 'top-level', 'deep' and 'name'
         * @param func function
         */
        export function filter (items:string[], mode:'ttop-level'|'deep'|'name', func)
        
        
        
        
    }
}
/**@module Undo (share) */
declare module Editor{
    declare module Undo{
        export function undo ()
        export function redo ()
        /**
         * 
         * @param id string
         * @param info object
         */
        export function add (id, info)
        
        
        export function commit ()
        export function cancel ()
        /**
         * 
         * @param index number
         */
        export function collapseTo (index)
        
        export function save ()
        export function clear ()
        export function reset ()
        export function dirty ()
        /**
         * 
         * @param desc string
         */
        export function setCurrentDescription (desc)
        
        /**
         * 
         * @param id string
         * @param cmd Editor.Undo.Command
         */
        export function register (id, cmd:Command)
        
        export class Command{
            undo ()
            redo ()
            dirty ()
        }
    }
}
/**@module Utils (share) */
declare module Editor{
    declare module Utils{
        /**
         * 
         * @param text string
         * @param width number
         * @param ch string - The character used to pad
         */
        export function padLeft (text, width, ch)
        
        
        /**
         * 
        Implementation of toFixed() that treats floats more like decimals
        
        Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present problems for accounting- and finance-related software.
        
         * @param value number
         * @param precision number
         * @param optionals number
         */
        export function toFixed (value, precision, optionals)
        
        
        /**
         * 
         * @param frame number
         * @param frameRate number
         */
        export function formatFrame (frame, frameRate)
        
        /**
         * 
         * @param curScale number
         * @param delta number
         */
        export function smoothScale (curScale, delta)
        
        /**
         * 
         * @param err Error
        
         */
        export function wrapError (err)
        /**
         * 
         * @param items array 
         * @param func function 
         */
        export function arrayCmpFilter (items, func)
        
        /**
         * 
         * @param srcWidth number
         * @param srcHeight number
         * @param destWidth number
         * @param destHeight number
         */
        export function fitSize (srcWidth, srcHeight, destWidth, destHeight)
       
        /**
         * Convert bytes to a human readable string: 1337 → 1.34 kB. Reference: https://github.com/sindresorhus/pretty-bytes
         * @param num number
         */
        export function prettyBytes (num)
      
        
        /**
         * run execFile with args.
         * @param execFile string
         * @param ...args ...
         */
        export function run (execFile, ...args)
        
        
        
        
    }
}
/**@module i18n (share)*/
declare module Editor{
    declare module i18n{
        /**
         * Convert an i18n text i18n:{id} to string {id}
         * @param text string
         */
        export function format (text)
        
        
        /**
         * Convert an i18n path i18n:{id1}/i18n:{id2} to string {id1}/{id2}.
         * @param path string
         */
        export function formatPath (path)
        
        
        /**
         * Mapping an i18n id to translated text.
         * @param key string
         * @param option object
         */
        export function t (key, option)
        
        /**
         * Extends the phrases.
         * @param phrases 
         */
        export function extend (phrases)
        
        
        /**
         * Replaces the phrases.
         * @param phrases object
         */
        export function replace (phrases)
        
        
        /**
         * Removes phrases.
         * @param phrases object
         */
        export function unset (phrases)
        
        
        /**
         * Clear all phrases.
         */
        export function clear ()
        
        /**
         * Get the polyglot instance.
         */
        export let polyglot
        
        
    }
}
