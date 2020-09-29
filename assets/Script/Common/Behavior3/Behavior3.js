window.b3 = {};

(function() {
  "use strict";
  
  b3.VERSION   = '0.2.0';
  
  // Returning status
  b3.SUCCESS   = 1;
  b3.FAILURE   = 2;
  b3.RUNNING   = 3;
  b3.ERROR     = 4;
  
  // Node categories
  b3.COMPOSITE = 'composite';
  b3.DECORATOR = 'decorator';
  b3.ACTION    = 'action';
  b3.CONDITION = 'condition';
})();
/**
 * List of internal and helper functions in Behavior3JS.
 * 
 * @module functions
**/

(function() {
  "use strict";
  
  /**
   * This function is used to create unique IDs for trees and nodes.
   * 
   * (consult http://www.ietf.org/rfc/rfc4122.txt).
   *
   * @class createUUID
   * @constructor
   * @return {String} A unique ID.
  **/
  b3.createUUID = function() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    // bits 12-15 of the time_hi_and_version field to 0010
    s[14] = "4";

    // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  };

  /**
   * Class is a meta-factory function to create classes in JavaScript. It is a
   * shortcut for the CreateJS syntax style. By default, the class created by 
   * this function have an initialize function (the constructor). Optionally, 
   * you can specify the inheritance by passing another class as parameter.
   * 
   * By default, all classes created using this function, may receive only a
   * dictionary parameter as argument. This pattern is commonly used by jQuery 
   * and its plugins.
   *
   * Since 0.2.0, Class also receives a `properties` parameter, a dictionary
   * which will be used to fill the new class prototype.
   *
   * Usage
   * -----
   *
   *     // Creating a simple class
   *     var BaseClass = b3.Class();
   *
   *     var ChildClass = b3.Class(BaseClass, {
   *       // constructor
   *       initialize: function(params) {
   *       
   *         // call super initialize
   *         BaseClass.initialize.call(this, params);
   *         ...
   *       }
   *     });
   *
   * @class Class
   * @constructor
   * @param {Object} baseClass The super class.
   * @param {Object} properties A dictionary with attributes and methods.
   * @return {Object} A new class.
  **/
  b3.Class = function(baseClass, properties) {
    // create a new class
    var cls = function(params) {
      this.initialize(params || {});
    };
    
    // if base class is provided, inherit
    if (baseClass) {
      cls.prototype = Object.create(baseClass.prototype);
      cls.prototype.constructor = cls;
    }
    
    // create initialize if does not exist on baseClass
    if (!cls.prototype.initialize) {
      cls.prototype.initialize = function() {};
    }

    // copy properties
    if (properties) {
      for (var key in properties) {
        cls.prototype[key] = properties[key];
      }
    }

    return cls;
  };
})();

(function() {
  "use strict";

  /**
   * The BehaviorTree class, as the name implies, represents the Behavior Tree 
   * structure.
   * 
   * There are two ways to construct a Behavior Tree: by manually setting the 
   * root node, or by loading it from a data structure (which can be loaded 
   * from a JSON). Both methods are shown in the examples below and better 
   * explained in the user guide.
   *
   * The tick method must be called periodically, in order to send the tick 
   * signal to all nodes in the tree, starting from the root. The method 
   * `BehaviorTree.tick` receives a target object and a blackboard as 
   * parameters. The target object can be anything: a game agent, a system, a 
   * DOM object, etc. This target is not used by any piece of Behavior3JS, 
   * i.e., the target object will only be used by custom nodes.
   * 
   * The blackboard is obligatory and must be an instance of `Blackboard`. This
   * requirement is necessary due to the fact that neither `BehaviorTree` or 
   * any node will store the execution variables in its own object (e.g., the 
   * BT does not store the target, information about opened nodes or number of 
   * times the tree was called). But because of this, you only need a single 
   * tree instance to control multiple (maybe hundreds) objects.
   * 
   * Manual construction of a Behavior Tree
   * --------------------------------------
   * 
   *     var tree = new b3.BehaviorTree();
   *  
   *     tree.root = new b3.Sequence({children:[
   *       new b3.Priority({children:[
   *         new MyCustomNode(),
   *         new MyCustomNode()
   *       ]}),
   *       ...
   *     ]});
   *     
   * 
   * Loading a Behavior Tree from data structure
   * -------------------------------------------
   * 
   *     var tree = new b3.BehaviorTree();
   *
   *     tree.load({
   *       'title'       : 'Behavior Tree title'
   *       'description' : 'My description'
   *       'root'        : 'node-id-1'
   *       'nodes'       : {
   *         'node-id-1' : {
   *           'name'        : 'Priority', // this is the node type
   *           'title'       : 'Root Node', 
   *           'description' : 'Description', 
   *           'children'    : ['node-id-2', 'node-id-3'], 
   *         },
   *         ...
   *       }
   *     })
   *     
   *
   * @module b3
   * @class BehaviorTree
  **/
  b3.BehaviorTree = b3.Class(null, {

    /**
     * The tree id, must be unique. By default, created with `b3.createUUID`.
     * @property {String} id
     * @readOnly
    **/
    id: null,

    /**
     * The tree title.
     * @property {String} title
     * @readonly
    **/
    title: null,
    
    /**
     * Description of the tree.
     * @property {String} description
     * @readonly
    **/
    description: null,

    /**
     * A dictionary with (key-value) properties. Useful to define custom 
     * variables in the visual editor.
     *
     * @property {Object} properties
     * @readonly
    **/
    properties: null,

    /**
     * The reference to the root node. Must be an instance of `b3.BaseNode`.
     * @property {BaseNode} root
    **/
    root: null,

    /**
     * The reference to the debug instance.
     * @property {Object} debug
    **/
    debug: null,

    /**
     * Initialization method.
     * @method initialize
     * @constructor
    **/
    initialize: function() {
      this.id          = b3.createUUID();
      this.title       = 'The behavior tree';
      this.description = 'Default description';
      this.properties  = {};
      this.root        = null;
      this.debug       = null;
    },

    /**
     * This method loads a Behavior Tree from a data structure, populating this
     * object with the provided data. Notice that, the data structure must 
     * follow the format specified by Behavior3JS. Consult the guide to know 
     * more about this format.
     *
     * You probably want to use custom nodes in your BTs, thus, you need to 
     * provide the `names` object, in which this method can find the nodes by 
     * `names[NODE_NAME]`. This variable can be a namespace or a dictionary, 
     * as long as this method can find the node by its name, for example:
     *
     *     //json
     *     ...
     *     'node1': {
     *       'name': MyCustomNode,
     *       'title': ...
     *     }
     *     ...
     *     
     *     //code
     *     var bt = new b3.BehaviorTree();
     *     bt.load(data, {'MyCustomNode':MyCustomNode})
     *     
     * 
     * @method load
     * @param {Object} data The data structure representing a Behavior Tree.
     * @param {Object} [names] A namespace or dict containing custom nodes.
    **/
    load: function(data, names) {
      names = names || {};

      this.title       = data.title || this.title;
      this.description = data.description || this.description;
      this.properties  = data.properties || this.properties;

      var nodes = {};
      var id, spec, node;
      // Create the node list (without connection between them)
      for (id in data.nodes) {
        spec = data.nodes[id];
        var Cls;

        if (spec.name in names) {
          // Look for the name in custom nodes
          Cls = names[spec.name];
        } else if (spec.name in b3) {
          // Look for the name in default nodes
          Cls = b3[spec.name];
        } else {
          // Invalid node name
          throw new EvalError('BehaviorTree.load: Invalid node name + "'+
                               spec.name+'".');
        }

        node = new Cls(spec.properties);
        node.id = spec.id || node.id;
        node.title = spec.title || node.title;
        node.description = spec.description || node.description;
        node.properties = spec.properties || node.properties;

        nodes[id] = node;
      }
   
      // Connect the nodes
      for (id in data.nodes) {
        spec = data.nodes[id];
        node = nodes[id];

        if (node.category === b3.COMPOSITE && spec.children) {
          for (var i=0; i<spec.children.length; i++) {
            var cid = spec.children[i];
            node.children.push(nodes[cid]);
          }
        } else if (node.category === b3.DECORATOR && spec.child) {
          node.child = nodes[spec.child];
        }
      }

      this.root = nodes[data.root];
    },

    /**
     * This method dump the current BT into a data structure.
     *
     * Note: This method does not record the current node parameters. Thus, 
     * it may not be compatible with load for now.
     * 
     * @method dump
     * @return {Object} A data object representing this tree.
    **/
    dump: function() {
      var data = {};
      var customNames = [];

      data.title        = this.title;
      data.description  = this.description;
      data.root         = (this.root)? this.root.id:null;
      data.properties   = this.properties;
      data.nodes        = {};
      data.custom_nodes = [];

      if (!this.root) return data;

      var stack = [this.root];
      while (stack.length > 0) {
        var node = stack.pop();

        var spec = {};
        spec.id = node.id;
        spec.name = node.name;
        spec.title = node.title;
        spec.description = node.description;
        spec.properties = node.properties;
        spec.parameters = node.parameters;

        // verify custom node
        var proto = (node.constructor && node.constructor.prototype);
        var nodeName = (proto && proto.name) || node.name;
        if (!b3[nodeName] && customNames.indexOf(nodeName) < 0) {
          var subdata = {};
          subdata.name = nodeName;
          subdata.title = (proto && proto.title) || node.title;
          subdata.category = node.category;

          customNames.push(nodeName);
          data.custom_nodes.push(subdata);
        }
        
        // store children/child
        if (node.category === b3.COMPOSITE && node.children) {
          var children = [];
          for (var i=node.children.length-1; i>=0; i--) {
              children.push(node.children[i].id);
              stack.push(node.children[i]);
          }
          spec.children = children;
        } else if (node.category === b3.DECORATOR && node.child) {
          stack.push(node.child);
          spec.child = node.child.id;
        }

        data.nodes[node.id] = spec;
      }

      return data;
    },

    /**
     * Propagates the tick signal through the tree, starting from the root.
     * 
     * This method receives a target object of any type (Object, Array, 
     * DOMElement, whatever) and a `Blackboard` instance. The target object has
     * no use at all for all Behavior3JS components, but surely is important 
     * for custom nodes. The blackboard instance is used by the tree and nodes 
     * to store execution variables (e.g., last node running) and is obligatory
     * to be a `Blackboard` instance (or an object with the same interface).
     * 
     * Internally, this method creates a Tick object, which will store the 
     * target and the blackboard objects.
     * 
     * Note: BehaviorTree stores a list of open nodes from last tick, if these 
     * nodes weren't called after the current tick, this method will close them
     * automatically.
     * 
     * @method tick
     * @param {Object} target A target object.
     * @param {Blackboard} blackboard An instance of blackboard object.
     * @return {Constant} The tick signal state.
    **/
    tick: function(target, blackboard) {
      if (!blackboard) {
        throw 'The blackboard parameter is obligatory and must be an ' +
              'instance of b3.Blackboard';
      }

      /* CREATE A TICK OBJECT */
      var tick = new b3.Tick();
      tick.debug      = this.debug;
      tick.target     = target;
      tick.blackboard = blackboard;
      tick.tree       = this;

      /* TICK NODE */
      var state = this.root._execute(tick);

      /* CLOSE NODES FROM LAST TICK, IF NEEDED */
      var lastOpenNodes = blackboard.get('openNodes', this.id);
      var currOpenNodes = tick._openNodes.slice(0);

      // does not close if it is still open in this tick
      var start = 0;
      var i;
      for (i=0; i<Math.min(lastOpenNodes.length, currOpenNodes.length); i++) {
        start = i+1;
        if (lastOpenNodes[i] !== currOpenNodes[i]) {
          break;
        } 
      }

      // close the nodes
      for (i=lastOpenNodes.length-1; i>=start; i--) {
        lastOpenNodes[i]._close(tick);
      }

      /* POPULATE BLACKBOARD */
      blackboard.set('openNodes', currOpenNodes, this.id);
      blackboard.set('nodeCount', tick._nodeCount, this.id);

      return state;
    }
  });

})();
(function() {
  "use strict";

  /**
   * A new Tick object is instantiated every tick by BehaviorTree. It is passed
   * as parameter to the nodes through the tree during the traversal.
   * 
   * The role of the Tick class is to store the instances of tree, debug, 
   * target and blackboard. So, all nodes can access these informations.
   * 
   * For internal uses, the Tick also is useful to store the open node after 
   * the tick signal, in order to let `BehaviorTree` to keep track and close 
   * them when necessary.
   *
   * This class also makes a bridge between nodes and the debug, passing the 
   * node state to the debug if the last is provided.
   *
   * @module b3
   * @class Tick
  **/
  b3.Tick = b3.Class(null, {

    /**
     * The tree reference.
     * @property {b3.BehaviorTree} tree
     * @readOnly
    **/
    tree: null,

    /**
     * The debug reference.
     * @property {Object} debug
     * @readOnly
     */
    debug: null,

    /**
     * The target object reference.
     * @property {Object} target
     * @readOnly
    **/
    target: null,
    
    /**
     * The blackboard reference.
     * @property {b3.Blackboard} blackboard
     * @readOnly
    **/
    blackboard: null,

    /**
     * The list of open nodes. Update during the tree traversal.
     * @property {Array} _openNodes
     * @protected
     * @readOnly
    **/
    _openNodes: [],
    
    /**
     * The number of nodes entered during the tick. Update during the tree 
     * traversal.
     * 
     * @property {Integer} _nodeCount
     * @protected
     * @readOnly
    **/
    _nodeCount: 0,

    /**
     * Initialization method.
     * @method initialize
     * @constructor
    **/
    initialize: function() {
      // set by BehaviorTree
      this.tree       = null;
      this.debug      = null;
      this.target     = null;
      this.blackboard = null;

      // updated during the tick signal
      this._openNodes  = [];
      this._nodeCount  = 0;
    },

    /**
     * Called when entering a node (called by BaseNode).
     * @method _enterNode
     * @param {Object} node The node that called this method.
     * @protected
    **/
    _enterNode: function(node) {
      this._nodeCount++;
      this._openNodes.push(node);

      // TODO: call debug here
    },

    /**
     * Callback when opening a node (called by BaseNode).
     * @method _openNode
     * @param {Object} node The node that called this method.
     * @protected
    **/
    _openNode: function(node) {
      // TODO: call debug here
    },

    /**
     * Callback when ticking a node (called by BaseNode).
     * @method _tickNode
     * @param {Object} node The node that called this method.
     * @protected
    **/
    _tickNode: function(node) {
      // TODO: call debug here
    },

    /**
     * Callback when closing a node (called by BaseNode).
     * @method _closeNode
     * @param {Object} node The node that called this method.
     * @protected
    **/
    _closeNode: function(node) {
      // TODO: call debug here
      this._openNodes.pop();
    },

    /**
     * Callback when exiting a node (called by BaseNode).
     * @method _exitNode
     * @param {Object} node The node that called this method.
     * @protected
    **/
    _exitNode: function(node) {
      // TODO: call debug here
    }
  });
})();
(function() {
  "use strict";

  /**
   * The Blackboard is the memory structure required by `BehaviorTree` and its 
   * nodes. It only have 2 public methods: `set` and `get`. These methods works
   * in 3 different contexts: global, per tree, and per node per tree.
   * 
   * Suppose you have two different trees controlling a single object with a 
   * single blackboard, then:
   *
   * - In the global context, all nodes will access the stored information. 
   * - In per tree context, only nodes sharing the same tree share the stored 
   *   information.
   * - In per node per tree context, the information stored in the blackboard 
   *   can only be accessed by the same node that wrote the data.
   *   
   * The context is selected indirectly by the parameters provided to these 
   * methods, for example:
   * 
   *     // getting/setting variable in global context
   *     blackboard.set('testKey', 'value');
   *     var value = blackboard.get('testKey');
   *     
   *     // getting/setting variable in per tree context
   *     blackboard.set('testKey', 'value', tree.id);
   *     var value = blackboard.get('testKey', tree.id);
   *     
   *     // getting/setting variable in per node per tree context
   *     blackboard.set('testKey', 'value', tree.id, node.id);
   *     var value = blackboard.get('testKey', tree.id, node.id);
   * 
   * Note: Internally, the blackboard store these memories in different 
   * objects, being the global on `_baseMemory`, the per tree on `_treeMemory` 
   * and the per node per tree dynamically create inside the per tree memory 
   * (it is accessed via `_treeMemory[id].nodeMemory`). Avoid to use these 
   * variables manually, use `get` and `set` instead.
   *  
   * @module b3
   * @class Blackboard
  **/
  b3.Blackboard = b3.Class(null, {
    
    /**
     * Initialization method.
     * @method initialize
     * @constructor
    **/
    initialize: function() {
      this._baseMemory = {};
      this._treeMemory = {};
    },

    /**
     * Internal method to retrieve the tree context memory. If the memory does
     * not exist, this method creates it.
     *
     * @method _getTreeMemory
     * @param {string} treeScope The id of the tree in scope.
     * @return {Object} The tree memory.
     * @protected
    **/
    _getTreeMemory: function(treeScope) {
      if (!this._treeMemory[treeScope]) {
        this._treeMemory[treeScope] = {
          'nodeMemory'     : {},
          'openNodes'      : [],
          'traversalDepth' : 0,
          'traversalCycle' : 0,
        };
      }
      return this._treeMemory[treeScope];
    },

    /**
     * Internal method to retrieve the node context memory, given the tree 
     * memory. If the memory does not exist, this method creates is.
     *
     * @method _getNodeMemory
     * @param {String} treeMemory the tree memory.
     * @param {String} nodeScope The id of the node in scope.
     * @return {Object} The node memory.
     * @protected
    **/
    _getNodeMemory: function(treeMemory, nodeScope) {
      var memory = treeMemory.nodeMemory;
      if (!memory[nodeScope]) {
        memory[nodeScope] = {};
      }

      return memory[nodeScope];
    },

    /**
     * Internal method to retrieve the context memory. If treeScope and 
     * nodeScope are provided, this method returns the per node per tree 
     * memory. If only the treeScope is provided, it returns the per tree 
     * memory. If no parameter is provided, it returns the global memory. 
     * Notice that, if only nodeScope is provided, this method will still 
     * return the global memory.
     *
     * @method _getMemory
     * @param {String} treeScope The id of the tree scope.
     * @param {String} nodeScope The id of the node scope.
     * @return {Object} A memory object.
     * @protected
    **/
    _getMemory: function(treeScope, nodeScope) {
      var memory = this._baseMemory;

      if (treeScope) {
        memory = this._getTreeMemory(treeScope);

        if (nodeScope) {
          memory = this._getNodeMemory(memory, nodeScope);
        }
      }

      return memory;
    },

    /**
     * Stores a value in the blackboard. If treeScope and nodeScope are 
     * provided, this method will save the value into the per node per tree 
     * memory. If only the treeScope is provided, it will save the value into 
     * the per tree memory. If no parameter is provided, this method will save 
     * the value into the global memory. Notice that, if only nodeScope is 
     * provided (but treeScope not), this method will still save the value into
     * the global memory.
     *
     * @method set
     * @param {String} key The key to be stored.
     * @param {String} value The value to be stored.
     * @param {String} treeScope The tree id if accessing the tree or node 
     *                           memory.
     * @param {String} nodeScope The node id if accessing the node memory.
    **/
    set: function(key, value, treeScope, nodeScope) {
      var memory = this._getMemory(treeScope, nodeScope);
      memory[key] = value;
    },

    /**
     * Retrieves a value in the blackboard. If treeScope and nodeScope are
     * provided, this method will retrieve the value from the per node per tree
     * memory. If only the treeScope is provided, it will retrieve the value
     * from the per tree memory. If no parameter is provided, this method will
     * retrieve from the global memory. If only nodeScope is provided (but
     * treeScope not), this method will still try to retrieve from the global
     * memory.
     *
     * @method get
     * @param {String} key The key to be retrieved.
     * @param {String} treeScope The tree id if accessing the tree or node 
     *                           memory.
     * @param {String} nodeScope The node id if accessing the node memory.
     * @return {Object} The value stored or undefined.
    **/
    get: function(key, treeScope, nodeScope) {
      var memory = this._getMemory(treeScope, nodeScope);
      return memory[key];
    }
  });

})();
(function() {
  "use strict";

  /**
   * The BaseNode class is used as super class to all nodes in BehaviorJS. It 
   * comprises all common variables and methods that a node must have to 
   * execute.
   *
   * **IMPORTANT:** Do not inherit from this class, use `b3.Composite`, 
   * `b3.Decorator`, `b3.Action` or `b3.Condition`, instead.
   *
   * The attributes are specially designed to serialization of the node in a 
   * JSON format. In special, the `parameters` attribute can be set into the 
   * visual editor (thus, in the JSON file), and it will be used as parameter 
   * on the node initialization at `BehaviorTree.load`.
   * 
   * BaseNode also provide 5 callback methods, which the node implementations 
   * can override. They are `enter`, `open`, `tick`, `close` and `exit`. See 
   * their documentation to know more. These callbacks are called inside the 
   * `_execute` method, which is called in the tree traversal.
   * 
   * @module b3
   * @class BaseNode
  **/
  b3.BaseNode = b3.Class(null, {

    /**
     * Node ID.
     * @property {string} id
     * @readonly
    **/
    id: null,

    /**
     * Node name. Must be a unique identifier, preferable the same name of the 
     * class. You have to set the node name in the prototype.
     *
     * @property {String} name
     * @readonly
    **/
    name: null,

    /**
     * Node category. Must be `b3.COMPOSITE`, `b3.DECORATOR`, `b3.ACTION` or 
     * `b3.CONDITION`. This is defined automatically be inheriting the 
     * correspondent class.
     *
     * @property {CONSTANT} category
     * @readonly
    **/
    category: null,

    /**
     * Node title.
     * @property {String} title
     * @optional
     * @readonly
    **/
    title: null,

    /**
     * Node description.
     * @property {String} description
     * @optional
     * @readonly
    **/
    description: null,

    /**
     * A dictionary (key, value) describing the node parameters. Useful for 
     * defining parameter values in the visual editor. Note: this is only 
     * useful for nodes when loading trees from JSON files.
     *
     * **Deprecated since 0.2.0. This is too similar to the properties 
     * attribute, thus, this attribute is deprecated in favor to 
     * `properties`.**
     *
     * @property {Object} parameters
     * @deprecated since 0.2.0.
     * @readonly
    **/
    parameters: null,

    /**
     * A dictionary (key, value) describing the node properties. Useful for 
     * defining custom variables inside the visual editor.
     *
     * @property properties
     * @type {Object}
     * @readonly
    **/
    properties: null,

    /**
     * Initialization method.
     * @method initialize
     * @constructor
    **/
    initialize: function(params) {
      this.id          = b3.createUUID();
      this.title       = this.title || this.name;
      this.description = '';
      this.parameters  = {};
      this.properties  = {};
    },

    /**
     * This is the main method to propagate the tick signal to this node. This 
     * method calls all callbacks: `enter`, `open`, `tick`, `close`, and 
     * `exit`. It only opens a node if it is not already open. In the same 
     * way, this method only close a node if the node  returned a status 
     * different of `b3.RUNNING`.
     *
     * @method _execute
     * @param {Tick} tick A tick instance.
     * @return {Constant} The tick state.
     * @protected
    **/
    _execute: function(tick) {
      // ENTER 
      this._enter(tick);

      // OPEN 
      if (!tick.blackboard.get('isOpen', tick.tree.id, this.id)) {
          this._open(tick);
      }

      // TICK 
      var status = this._tick(tick);

      // CLOSE 
      if (status !== b3.RUNNING) {
          this._close(tick);
      }

      // EXIT 
      this._exit(tick);

      return status;
    },

    /**
     * Wrapper for enter method.
     * @method _enter
     * @param {Tick} tick A tick instance.
     * @protected
    **/
    _enter: function(tick) {
      tick._enterNode(this);
      this.enter(tick);
    },

    /**
     * Wrapper for open method.
     * @method _open
     * @param {Tick} tick A tick instance.
     * @protected
    **/
    _open: function(tick) {
      tick._openNode(this);
      tick.blackboard.set('isOpen', true, tick.tree.id, this.id);
      this.open(tick);
    },

    /**
     * Wrapper for tick method.
     * @method _tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
     * @protected
    **/
    _tick: function(tick) {
      tick._tickNode(this);
      return this.tick(tick);
    },

    /**
     * Wrapper for close method.
     * @method _close
     * @param {Tick} tick A tick instance.
     * @protected
    **/
    _close: function(tick) {
      tick._closeNode(this);
      tick.blackboard.set('isOpen', false, tick.tree.id, this.id);
      this.close(tick);
    },

    /**
     * Wrapper for exit method.
     * @method _exit
     * @param {Tick} tick A tick instance.
     * @protected
    **/
    _exit: function(tick) {
      tick._exitNode(this);
      this.exit(tick);
    },

    /**
     * Enter method, override this to use. It is called every time a node is 
     * asked to execute, before the tick itself.
     *
     * @method enter
     * @param {Tick} tick A tick instance.
    **/
    enter: function(tick) {},

    /**
     * Open method, override this to use. It is called only before the tick 
     * callback and only if the not isn't closed.
     *
     * Note: a node will be closed if it returned `b3.RUNNING` in the tick.
     *
     * @method open
     * @param {Tick} tick A tick instance.
    **/
    open: function(tick) {},

    /**
     * Tick method, override this to use. This method must contain the real 
     * execution of node (perform a task, call children, etc.). It is called
     * every time a node is asked to execute.
     *
     * @method tick
     * @param {Tick} tick A tick instance.
    **/
    tick: function(tick) {},

    /**
     * Close method, override this to use. This method is called after the tick
     * callback, and only if the tick return a state different from 
     * `b3.RUNNING`.
     *
     * @method close
     * @param {Tick} tick A tick instance.
    **/
    close: function(tick) {},

    /**
     * Exit method, override this to use. Called every time in the end of the 
     * execution.
     *
     * @method exit
     * @param {Tick} tick A tick instance.
    **/
    exit: function(tick) {},
  });

})();
(function() {
  "use strict";

  /**
   * Action is the base class for all action nodes. Thus, if you want to create
   * new custom action nodes, you need to inherit from this class. For example,
   * take a look at the Runner action:
   * 
   *     var Runner = b3.Class(b3.Action, {
   *       name: 'Runner',
   *
   *       tick: function(tick) {
   *         return b3.RUNNING;
   *       }
   *     });
   *
   * @module b3
   * @class Action
   * @extends BaseNode
  **/
  b3.Action = b3.Class(b3.BaseNode, {
    
    /**
     * Node category. Default to `b3.ACTION`.
     * @property {String} category
     * @readonly
    **/
    category: b3.ACTION,

    /**
     * Initialization method.
     * @method initialize
     * @constructor
    **/
    initialize: function(params) {
      b3.BaseNode.prototype.initialize.call(this);
    }
  });

})();
(function() {
  "use strict";

  /**
   * Composite is the base class for all composite nodes. Thus, if you want to 
   * create new custom composite nodes, you need to inherit from this class. 
   * 
   * When creating composite nodes, you will need to propagate the tick signal 
   * to the children nodes manually. To do that, override the `tick` method and
   * call the `_execute` method on all nodes. For instance, take a look at how 
   * the Sequence node inherit this class and how it call its children:
   *
   *     // Inherit from Composite, using the util function Class.
   *     var Sequence = b3.Class(b3.Composite, {
   *     
   *       // Remember to set the name of the node. 
   *       name: 'Sequence',
   *
   *       // Override the tick function
   *       tick: function(tick) {
   *       
   *         // Iterates over the children
   *         for (var i=0; i<this.children.length; i++) {
   *
   *           // Propagate the tick
   *           var status = this.children[i]._execute(tick);
   * 
   *           if (status !== b3.SUCCESS) {
   *               return status;
   *           }
   *         }
   *
   *         return b3.SUCCESS;
   *       }
   *     });
   * 
   * @module b3
   * @class Composite
   * @extends BaseNode
  **/
  b3.Composite = b3.Class(b3.BaseNode, {
    
    /**
     * Node category. Default to `b3.COMPOSITE`.
     *
     * @property category
     * @type {String}
     * @readonly
    **/
    category: b3.COMPOSITE,

    /**
     * Initialization method.
     *
     * @method initialize
     * @constructor
    **/
    initialize: function(params) {
      b3.BaseNode.prototype.initialize.call(this);
      this.children = (params.children || []).slice(0);
    }
  });
  
})();
(function() {
  "use strict";

  /**
   * Condition is the base class for all condition nodes. Thus, if you want to 
   * create new custom condition nodes, you need to inherit from this class. 
   *
   * @class Condition
   * @extends BaseNode
  **/
  b3.Condition = b3.Class(b3.BaseNode, {
    
    /**
     * Node category. Default to `b3.CONDITION`.
     * @property {String} category
     * @readonly
    **/
    category: b3.CONDITION,

    /**
     * Initialization method.
     * @method initialize
     * @constructor
    **/
    initialize: function(params) {
      b3.BaseNode.prototype.initialize.call(this);
    }

  });

})();
(function() {
  "use strict";

  /**
   * Decorator is the base class for all decorator nodes. Thus, if you want to 
   * create new custom decorator nodes, you need to inherit from this class. 
   * 
   * When creating decorator nodes, you will need to propagate the tick signal
   * to the child node manually, just like the composite nodes. To do that, 
   * override the `tick` method and call the `_execute` method on the child 
   * node. For instance, take a look at how the Inverter node inherit this 
   * class and how it call its children:
   * 
   *     // Inherit from Decorator, using the util function Class.
   *     var Inverter = b3.Class(b3.Decorator, {
   *       name: 'Inverter',
   *
   *       tick: function(tick) {
   *         if (!this.child) {
   *           return b3.ERROR;
   *         }
   *     
   *         // Propagate the tick
   *         var status = this.child._execute(tick);
   *     
   *         if (status == b3.SUCCESS) {
   *           status = b3.FAILURE;
   *         } else if (status == b3.FAILURE) {
   *           status = b3.SUCCESS;
   *         }
   *     
   *         return status;
   *       }
   *     });
   *
   * @module b3
   * @class Decorator
   * @extends BaseNode
  **/
  b3.Decorator = b3.Class(b3.BaseNode, {

    /**
     * Node category. Default to b3.DECORATOR.
     * @property {String} category
     * @readonly
    **/
    category: b3.DECORATOR,

    /**
     * Initialization method.
     * @method initialize
     * @constructor
    **/
    initialize: function(params) {
      b3.BaseNode.prototype.initialize.call(this);
      this.child = params.child || null;
    }
  });

})();
(function() {
  "use strict";

  /**
   * MemPriority is similar to Priority node, but when a child returns a 
   * `RUNNING` state, its index is recorded and in the next tick the, 
   * MemPriority calls the child recorded directly, without calling previous 
   * children again.
   *
   * @module b3
   * @class MemPriority
   * @extends Composite
  **/
  b3.MemPriority = b3.Class(b3.Composite, {

    /**
     * Node name. Default to `MemPriority`.
     * @property {String} name
     * @readonly
    **/
    name: 'MemPriority',

    /**
     * Open method.
     * @method open
     * @param {b3.Tick} tick A tick instance.
    **/
    open: function(tick) {
      tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
    },

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} A state constant.
    **/
    tick: function(tick) {
      var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
      for (var i=child; i<this.children.length; i++) {
        var status = this.children[i]._execute(tick);

        if (status !== b3.FAILURE) {
          if (status === b3.RUNNING) {
            tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
          }
          
          return status;
        }
      }

      return b3.FAILURE;
    }
  });

})();
(function() {
  "use strict";

  /**
   * MemSequence is similar to Sequence node, but when a child returns a 
   * `RUNNING` state, its index is recorded and in the next tick the 
   * MemPriority call the child recorded directly, without calling previous 
   * children again.
   *
   * @module b3
   * @class MemPriority
   * @extends Composite
  **/
  b3.MemSequence = b3.Class(b3.Composite, {

    /**
     * Node name. Default to `MemSequence`.
     * @property {String} name
     * @readonly
    **/
    name: 'MemSequence',

    /**
     * Open method.
     * @method open
     * @param {b3.Tick} tick A tick instance.
    **/
    open: function(tick) {
      tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
    },

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} A state constant.
    **/
    tick: function(tick) {
      var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
      for (var i=child; i<this.children.length; i++) {
        var status = this.children[i]._execute(tick);

        if (status !== b3.SUCCESS) {
          if (status === b3.RUNNING) {
            tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
          }
          return status;
        }
      }

      return b3.SUCCESS;
    }
  });

})();
(function() {
  "use strict";

  /**
   * Priority ticks its children sequentially until one of them returns 
   * `SUCCESS`, `RUNNING` or `ERROR`. If all children return the failure state,
   * the priority also returns `FAILURE`.
   *
   * @module b3
   * @class Priority
   * @extends Composite
  **/
  b3.Priority = b3.Class(b3.Composite, {

    /**
     * Node name. Default to `Priority`.
     * @property {String} name
     * @readonly
    **/
    name: 'Priority',

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
    **/
    tick: function(tick) {
      for (var i=0; i<this.children.length; i++) {
        var status = this.children[i]._execute(tick);

        if (status !== b3.FAILURE) {
          return status;
        }
      }

      return b3.FAILURE;
    }
  });

})();
(function() {
  "use strict";

  /**
   * The Sequence node ticks its children sequentially until one of them 
   * returns `FAILURE`, `RUNNING` or `ERROR`. If all children return the 
   * success state, the sequence also returns `SUCCESS`.
   *
   * @module b3
   * @class Sequence
   * @extends Composite
  **/
  b3.Sequence = b3.Class(b3.Composite, {

    /**
     * Node name. Default to `Sequence`.
     * @property {String} name
     * @readonly
    **/
    name: 'Sequence',

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} A state constant.
    **/
    tick: function(tick) {
      for (var i=0; i<this.children.length; i++) {
        var status = this.children[i]._execute(tick);

        if (status !== b3.SUCCESS) {
          return status;
        }
      }

      return b3.SUCCESS;
    }
  });
  
})();
(function() {
  "use strict";

  /**
   * The Inverter decorator inverts the result of the child, returning `SUCCESS`
   * for `FAILURE` and `FAILURE` for `SUCCESS`.
   *
   * @module b3
   * @class Inverter
   * @extends Decorator
  **/
  b3.Inverter = b3.Class(b3.Decorator, {

    /**
     * Node name. Default to `Inverter`.
     * @property {String} name
     * @readonly
    **/
    name: 'Inverter',

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
    **/
    tick: function(tick) {
      if (!this.child) {
        return b3.ERROR;
      }

      var status = this.child._execute(tick);

      if (status == b3.SUCCESS) {
        status = b3.FAILURE;
      } else if (status == b3.FAILURE) {
        status = b3.SUCCESS;
      }

      return status;
    }
  });

})();
(function() {
  "use strict";

  /**
   * This decorator limit the number of times its child can be called. After a
   * certain number of times, the Limiter decorator returns `FAILURE` without 
   * executing the child.
   *
   * @module b3
   * @class Limiter
   * @extends Decorator
  **/
  b3.Limiter = b3.Class(b3.Decorator, {

    /**
     * Node name. Default to `Limiter`.
     * @property {String} name
     * @readonly
    **/
    name: 'Limiter',

    /**
     * Node title. Default to `Limit X Activations`. Used in Editor.
     * @property {String} title
     * @readonly
    **/
    title: 'Limit <maxLoop> Activations',

    /**
     * Node parameters.
     * @property {String} parameters
     * @readonly
    **/
    parameters: {'maxLoop': 1},
    
    /**
     * Initialization method. 
     *
     * Settings parameters:
     *
     * - **maxLoop** (*Integer*) Maximum number of repetitions.
     * - **child** (*BaseNode*) The child node.
     *
     * @method initialize
     * @param {Object} params Object with parameters.
     * @constructor
    **/
    initialize: function(params) {
      b3.Decorator.prototype.initialize.call(this, params);

      if (!params.maxLoop) {
        throw "maxLoop parameter in Limiter decorator is an obligatory " +
              "parameter";
      }

      this.maxLoop = params.maxLoop;
    },

    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
    **/
    open: function(tick) {
      tick.blackboard.set('i', 0, tick.tree.id, this.id);
    },

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
    **/
    tick: function(tick) {
      if (!this.child) {
        return b3.ERROR;
      }

      var i = tick.blackboard.get('i', tick.tree.id, this.id);

      if (i < this.maxLoop) {
        var status = this.child._execute(tick);

        if (status == b3.SUCCESS || status == b3.FAILURE)
            tick.blackboard.set('i', i+1, tick.tree.id, this.id);
          
        return status;
      }

      return b3.FAILURE;        
    }
  });

})();
(function() {
  "use strict";

  /**
   * The MaxTime decorator limits the maximum time the node child can execute. 
   * Notice that it does not interrupt the execution itself (i.e., the child 
   * must be non-preemptive), it only interrupts the node after a `RUNNING` 
   * status.
   *
   * @module b3
   * @class MaxTime
   * @extends Decorator
  **/
  b3.MaxTime = b3.Class(b3.Decorator, {

    /**
     * Node name. Default to `MaxTime`.
     * @property {String} name
     * @readonly
    **/
    name: 'MaxTime',

    /**
     * Node title. Default to `Max XXms`. Used in Editor.
     * @property {String} title
     * @readonly
    **/
    title: 'Max <maxTime>ms',

    /**
     * Node parameters.
     * @property {String} parameters
     * @readonly
    **/
    parameters: {'maxTime': 0},

    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **maxTime** (*Integer*) Maximum time a child can execute.
     * - **child** (*BaseNode*) The child node.
     *
     * @method initialize
     * @param {Object} params Object with parameters.
     * @constructor
    **/
    initialize: function(params) {
      b3.Decorator.prototype.initialize.call(this, params);

      if (!params.maxTime) {
        throw "maxTime parameter in MaxTime decorator is an obligatory " +
              "parameter";
      }

      this.maxTime = params.maxTime;
    },

    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
    **/
    open: function(tick) {
      var startTime = (new Date()).getTime();
      tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
    },
    
    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
    **/
    tick: function(tick) {
      if (!this.child) {
        return b3.ERROR;
      }
      
      var currTime = (new Date()).getTime();
      var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);
      
      var status = this.child._execute(tick);
      if (currTime - startTime > this.maxTime) {
        return b3.FAILURE;
      }
      
      return status;
    }
  });

})();
(function() {
  "use strict";

  /**
   * RepeatUntilFailure is a decorator that repeats the tick signal until the 
   * node child returns `FAILURE`, `RUNNING` or `ERROR`. Optionally, a maximum 
   * number of repetitions can be defined.
   *
   * @module b3
   * @class RepeatUntilFailure
   * @extends Decorator
  **/
  b3.RepeatUntilFailure = b3.Class(b3.Decorator, {

    /**
     * Node name. Default to `RepeatUntilFailure`.
     * @property {String} name
     * @readonly
    **/
    name: 'RepeatUntilFailure',

    /**
     * Node title. Default to `Repeat Until Failure`.
     * @property {String} title
     * @readonly
    **/
    title: 'Repeat Until Failure',

    /**
     * Node parameters.
     * @property {String} parameters
     * @readonly
    **/
    parameters: {'maxLoop': -1},

    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **maxLoop** (*Integer*) Maximum number of repetitions. Default to -1 
     *                           (infinite).
     * - **child** (*BaseNode*) The child node.
     *
     * @method initialize
     * @param {Object} params Object with parameters.
     * @constructor
    **/
    initialize: function(params) {
      b3.Decorator.prototype.initialize.call(this, params);
      this.maxLoop = params.maxLoop || -1;
    },

    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
    **/
    open: function(tick) {
      tick.blackboard.set('i', 0, tick.tree.id, this.id);
    },

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
    **/
    tick: function(tick) {
      if (!this.child) {
        return b3.ERROR;
      }

      var i = tick.blackboard.get('i', tick.tree.id, this.id);
      var status = b3.ERROR;

      while (this.maxLoop < 0 || i < this.maxLoop) {
        status = this.child._execute(tick);

        if (status == b3.SUCCESS) {
          i++;
        } else {
          break;
        }
      }

      i = tick.blackboard.set('i', i, tick.tree.id, this.id);
      return status;
    }
  });

})();
(function() {
  "use strict";

  /**
   * RepeatUntilSuccess is a decorator that repeats the tick signal until the 
   * node child returns `SUCCESS`, `RUNNING` or `ERROR`. Optionally, a maximum 
   * number of repetitions can be defined.
   *
   * @module b3
   * @class RepeatUntilSuccess
   * @extends Decorator
  **/
  b3.RepeatUntilSuccess = b3.Class(b3.Decorator, {

    /**
     * Node name. Default to `RepeatUntilSuccess`.
     * @property {String} name
     * @readonly
    **/
    name: 'RepeatUntilSuccess',

    /**
     * Node title. Default to `Repeat Until Success`.
     * @property {String} title
     * @readonly
    **/
    title: 'Repeat Until Success',
    
    /**
     * Node parameters.
     * @property {String} parameters
     * @readonly
    **/
    parameters: {'maxLoop': -1},
    
    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **maxLoop** (*Integer*) Maximum number of repetitions. Default to -1 
     *                           (infinite).
     * - **child** (*BaseNode*) The child node.
     *
     * @method initialize
     * @param {Object} params Object with parameters.
     * @constructor
    **/
    initialize: function(params) {
      b3.Decorator.prototype.initialize.call(this, params);
      this.maxLoop = params.maxLoop || -1;
    },

    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
    **/
    open: function(tick) {
      tick.blackboard.set('i', 0, tick.tree.id, this.id);
    },

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
    **/
    tick: function(tick) {
      if (!this.child) {
        return b3.ERROR;
      }

      var i = tick.blackboard.get('i', tick.tree.id, this.id);
      var status = b3.ERROR;

      while (this.maxLoop < 0 || i < this.maxLoop) {
        status = this.child._execute(tick);

        if (status == b3.FAILURE) {
          i++;
        } else {
          break;
        }
      }

      i = tick.blackboard.set('i', i, tick.tree.id, this.id);
      return status;
    }
  });

})();
(function() {
  "use strict";

  /**
   * Repeater is a decorator that repeats the tick signal until the child node 
   * return `RUNNING` or `ERROR`. Optionally, a maximum number of repetitions 
   * can be defined.
   *
   * @module b3
   * @class Repeater
   * @extends Decorator
  **/
  b3.Repeater = b3.Class(b3.Decorator, {

    /**
     * Node name. Default to `Repeater`.
     * @property {String} name
     * @readonly
    **/
    name: 'Repeater',

    /**
     * Node title. Default to `Repeat XXx`. Used in Editor.
     * @property {String} title
     * @readonly
    **/
    title: 'Repeat <maxLoop>x',

    /**
     * Node parameters.
     * @property {String} parameters
     * @readonly
    **/
    parameters: {'maxLoop': -1},

    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **maxLoop** (*Integer*) Maximum number of repetitions. Default to -1 
     *                           (infinite).
     * - **child** (*BaseNode*) The child node.
     * 
     * @method initialize
     * @param {Object} params Object with parameters.
     * @constructor
    **/
    initialize: function(params) {
      b3.Decorator.prototype.initialize.call(this, params);
      this.maxLoop = params.maxLoop || -1;
    },

    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
    **/
    open: function(tick) {
      tick.blackboard.set('i', 0, tick.tree.id, this.id);
    },

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
    **/
    tick: function(tick) {
      if (!this.child) {
          return b3.ERROR;
      }

      var i = tick.blackboard.get('i', tick.tree.id, this.id);
      var status = b3.SUCCESS;

      while (this.maxLoop < 0 || i < this.maxLoop) {
        status = this.child._execute(tick);

        if (status == b3.SUCCESS || status == b3.FAILURE) {
            i++;
        } else {
          break;
        }
      }

      tick.blackboard.set('i', i, tick.tree.id, this.id);
      return status;
    }
  });

})();

(function() {
  "use strict";

  /**
   * This action node returns `ERROR` always.
   *
   * @module b3
   * @class Error
   * @extends Action
  **/
  b3.Error = b3.Class(b3.Action, {

    /**
     * Node name. Default to `Error`.
     * @property {String} name
     * @readonly
    **/
    name: 'Error',

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `b3.ERROR`.
    **/
    tick: function(tick) {
      return b3.ERROR;
    }
  });
  
})();
(function() {
  "use strict";

  /**
   * This action node returns `FAILURE` always.
   *
   * @module b3
   * @class Failer
   * @extends Action
  **/
  b3.Failer = b3.Class(b3.Action, {
    
    /**
     * Node name. Default to `Failer`.
     * @property {String} name
     * @readonly
    **/
    name: 'Failer',

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `b3.FAILURE`.
    **/
    tick: function(tick) {
      return b3.FAILURE;
    },
  });
  
})();
(function() {
  "use strict";

  /**
   * This action node returns RUNNING always.
   *
   * @module b3
   * @class Runner
   * @extends Action
  **/
  b3.Runner = b3.Class(b3.Action, {

    /**
     * Node name. Default to `Runner`.
     * @property {String} name
     * @readonly
    **/
    name: 'Runner',

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `b3.RUNNING`.
    **/
    tick: function(tick) {
      return b3.RUNNING;
    }
  });
  
})();
(function() {
  "use strict";

  /**
   * This action node returns `SUCCESS` always.
   *
   * @module b3
   * @class Succeeder
   * @extends Action
  **/
  b3.Succeeder = b3.Class(b3.Action, {

    /**
     * Node name. Default to `Succeeder`.
     * @property {String} name
     * @readonly
    **/
    name: 'Succeeder',

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `b3.SUCCESS`.
    **/
    tick: function(tick) {
      return b3.SUCCESS;
    }
  });

})();
(function() {
  "use strict";

  /**
   * Wait a few seconds.
   *
   * @module b3
   * @class Wait
   * @extends Action
  **/
  b3.Wait = b3.Class(b3.Action, {

    /**
     * Node name. Default to `Wait`.
     * @property {String} name
     * @readonly
    **/
    name: 'Wait',

    /**
     * Node title. Default to `Wait XXms`. Used in Editor.
     * @property {String} title
     * @readonly
    **/
    title: 'Wait <milliseconds>ms',

    /**
     * Node parameters.
     * @property {String} parameters
     * @readonly
    **/
    parameters: {'milliseconds': 0},

    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **milliseconds** (*Integer*) Maximum time, in milliseconds, a child
     *                                can execute.
     *
     * @method initialize
     * @param {Object} settings Object with parameters.
     * @constructor
    **/
    initialize: function(settings) {
      settings = settings || {};

      b3.Action.prototype.initialize.call(this);
      this.endTime = settings.milliseconds || 0;
    },

    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
    **/
    open: function(tick) {
      var startTime = (new Date()).getTime();
      tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
    },

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
    **/
    tick: function(tick) {
      var currTime = (new Date()).getTime();
      var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);
      
      if (currTime - startTime > this.endTime) {
        return b3.SUCCESS;
      }
      
      return b3.RUNNING;
    }
  });

})();