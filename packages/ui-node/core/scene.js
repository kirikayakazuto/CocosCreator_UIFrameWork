var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
//@ts-ignore
var fs = require('fire-fs');
//cc.require()踩坑: 相对路径or绝对路径都不行，返回一个空的Object
var scene;
(function (scene) {
    var name_s = "ui-node";
    var assets_path_s = Editor.Project.path.replace(/\\/g, "/");
    function log() {
        var args_as_ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_as_[_i] = arguments[_i];
        }
        Editor.log.apply(Editor, __spreadArrays([name_s + "\uFF1A"], args_as_));
    }
    function warn() {
        var args_as_ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_as_[_i] = arguments[_i];
        }
        Editor.warn.apply(Editor, __spreadArrays([name_s + "\uFF1A"], args_as_));
    }
    function error() {
        var args_as_ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_as_[_i] = arguments[_i];
        }
        Editor.error.apply(Editor, __spreadArrays([name_s + "\uFF1A"], args_as_));
    }
    /**获取节点树路径 */
    function node_path(node_o_, top_o_, path_s_) {
        if (path_s_ === void 0) { path_s_ = ""; }
        if (top_o_) {
            if (node_o_.parent && node_o_.parent != top_o_) {
                return node_path(node_o_.parent, top_o_, "" + node_o_.name + (path_s_ ? "/" + path_s_ : ""));
            }
        }
        else if (node_o_.parent) {
            return node_path(node_o_.parent, top_o_, "" + node_o_.name + (path_s_ ? "/" + path_s_ : ""));
        }
        return "" + node_o_.name + (path_s_ ? "/" + path_s_ : "");
    }
    /**获取脚本组件路径 */
    function script_path(node_o_) {
        // ------------------准备参数
        var temp1_ss = [];
        // ------------------安检
        if (!node_o_) {
            return temp1_ss;
        }
        node_o_.getComponents(cc.Component).filter(function (v1_o) { return cc.js.getClassName(v1_o).indexOf("cc.") == -1; }).forEach(function (v1_o) {
            temp1_ss.push(Editor.remote.assetdb.uuidToFspath(v1_o.__scriptUuid));
        });
        return temp1_ss;
    }
    /**确保路径存在 */
    function guaranteed_to_exist(path_s_, delimiter_s_) {
        if (delimiter_s_ === void 0) { delimiter_s_ = "/"; }
        // ------------------准备参数
        var temp1_ss = path_s_.split(delimiter_s_);
        path_s_ = "";
        var refresh_s = "";
        for (var k1_n = 0; k1_n < temp1_ss.length - 1; ++k1_n) {
            path_s_ += "" + (path_s_ ? "/" : "") + temp1_ss[k1_n];
            if (!fs.existsSync(path_s_)) {
                // log(path_s_, "不存在");
                fs.mkdirSync(path_s_);
                if (!refresh_s) {
                    refresh_s = path_s_;
                }
            }
            else {
                // log(path_s_, "存在");
            }
        }
        return refresh_s ? refresh_s : "" + path_s_ + (path_s_ ? "/" : "") + temp1_ss[temp1_ss.length - 1];
    }
    /**获取节点信息 */
    function node_info(node_o_, root_o_) {
        if (root_o_ === void 0) { root_o_ = node_o_; }
        // 返回[["NewNode", "Canvas/New Node"], ...]
        var node_ass = [];
        var temp1_as;
        var mark_s = "_";
        node_o_.children.forEach(function (v1_o, k1_n) {
            if (v1_o.name.substr(0, mark_s.length) == mark_s) {
                node_ass.push([]);
                temp1_as = node_ass[node_ass.length - 1];
                temp1_as.push(v1_o.name.substr(mark_s.length, v1_o.name.length).replace(/\s*/g, ""));
                temp1_as.push(node_path(v1_o, root_o_));
            }
            if (v1_o.children.length) {
                node_ass.push.apply(node_ass, node_info(v1_o, root_o_));
            }
        });
        return node_ass;
    }
    /**计算导入路径 */
    function export_path(export_s_, current_s) {
        // ----------------格式转换
        export_s_ = export_s_.replace(/\\/g, "/").substr(0, export_s_.lastIndexOf("."));
        current_s = current_s.replace(/\\/g, "/");
        // ----------------准备参数
        var temp1_s = "./";
        var temp1_n, temp2_n;
        var temp1_ss = export_s_.split("/");
        var temp2_ss = current_s.split("/");
        // ----------------路径转换
        for (temp2_n = 0; temp2_n < temp1_ss.length; ++temp2_n) {
            if (temp1_ss[temp2_n] != temp2_ss[temp2_n]) {
                break;
            }
        }
        for (temp1_n = temp2_n + 1; temp1_n < temp2_ss.length; ++temp1_n) {
            temp1_s += "../";
        }
        for (temp1_n = temp2_n; temp1_n < temp1_ss.length; ++temp1_n) {
            temp1_s += temp1_ss[temp1_n] + "/";
        }
        temp1_s = temp1_s.substr(0, temp1_s.length - 1);
        return temp1_s;
    }
    function update_nodes(event_a, uuid_s_) {
        // ------------------准备参数
        var node_o = cc.engine.getInstanceById(uuid_s_);
        if (!node_o) {
            log("无法根据传递的uuid找到对应节点!");
            return;
        }
        var str1_s = "", str2_s = "";
        var temp1_s = "", temp2_s = "";
        var temp1_n, temp2_n;
        var temp1_b;
        var temp1_sss = [], temp2_sss = [], temp3_sss;
        /**脚本路径 */
        // let scr_path_ss = [node_path(node_o)];
        var scr_path_ss = script_path(node_o);
        if (!scr_path_ss.length) {
            log("当前节点没有挂载脚本组件!");
            return;
        }
        /**节点路径 */
        var path_s = scr_path_ss[0].replace(/\s*/g, "").replace(/\\/g, "/");
        ;
        /**生成路径 */
        path_s = path_s.substring(0, path_s.lastIndexOf(".")) + "_nodes.ts";
        // log("生成路径:", path_s);
        /**刷新路径 */
        var refresh_s;
        // ------------------写入文件
        var node_ass = node_info(node_o);
        // log(node_ass);
        if (!node_ass.length) {
            log("无生成节点!");
            // ------------------删除生成脚本
            if (fs.existsSync(path_s)) {
                Editor.assetdb.delete("db://" + path_s.substring(path_s.indexOf("assets"), path_s.length));
            }
            // ------------------删除组件导入
            for (var _i = 0, scr_path_ss_1 = scr_path_ss; _i < scr_path_ss_1.length; _i++) {
                temp1_s = scr_path_ss_1[_i];
                var scr_s = fs.readFileSync(temp1_s, 'utf-8');
                temp1_b = false;
                // ------------------import
                temp1_n = scr_s.indexOf("import nodes ");
                if (temp1_n != -1) {
                    temp1_b = true;
                    scr_s = temp1_n ? scr_s.slice(0, scr_s.lastIndexOf("\n", temp1_n)) + scr_s.slice(scr_s.indexOf(";", temp1_n) + 1, scr_s.length) : scr_s.slice(scr_s.indexOf(";", temp1_n) + 2, scr_s.length);
                }
                // ------------------成员
                temp1_n = scr_s.indexOf("private nodes: nodes;");
                if (temp1_n != -1) {
                    temp1_b = true;
                    scr_s = scr_s.slice(0, scr_s.lastIndexOf("\n", temp1_n)) + scr_s.slice(scr_s.indexOf(";", temp1_n) + 1, scr_s.length);
                }
                // ------------------绑定
                temp1_n = scr_s.indexOf("this.nodes = new nodes(this.node);");
                if (temp1_n != -1) {
                    temp1_b = true;
                    scr_s = scr_s.slice(0, scr_s.lastIndexOf("\n", temp1_n)) + scr_s.slice(scr_s.indexOf(";", temp1_n) + 1, scr_s.length);
                }
                // 保存
                if (temp1_b) {
                    fs.writeFileSync(temp1_s, scr_s);
                }
            }
            return;
        }
        // ------------------生成脚本数据记录
        {
            node_ass.forEach(function (v1_as) {
                // ------------------成员
                if (v1_as.length == 2) {
                    temp1_s = "this." + v1_as[0] + " = node_o_.child(\"" + v1_as[1] + "\");";
                    str1_s += str1_s ? "\n            " + temp1_s : temp1_s;
                    temp1_s = "public " + v1_as[0] + ": cc.Node;";
                    str2_s += str2_s ? "\n    " + temp1_s : temp1_s;
                }
                // 检测纯数字命名节点
                // if (!isNaN(<any>v1_as[0])) {
                //     temp1_sss.push(v1_as);
                // }
                // 检测节点名重复节点
                if (temp2_sss.findIndex(function (v2_ss) { return v2_ss[0] == v1_as[0]; }) == -1 && (temp3_sss = node_ass.filter(function (v2_ss) { return v2_ss[0] == v1_as[0]; })).length > 1) {
                    temp2_sss.push.apply(temp2_sss, temp3_sss);
                }
            });
        }
        if (temp1_sss.length || temp2_sss.length) {
            // temp1_sss.forEach(v1_s=> log("生成节点不能以数字开头!", v1_s));
            temp2_sss.forEach(function (v1_ss) { return log("生成节点名重复!", v1_ss[1]); });
            log("生成失败!");
            return;
        }
        refresh_s = guaranteed_to_exist(path_s);
        // log("刷新路径:", refresh_s);
        // ------------------生成绑定脚本
        fs.writeFileSync(path_s, "" + temp2_s + (temp2_s ? "\n" : "") + "export class nodes {\n    constructor(node_o_: cc.Node) {\n        try {\n            " + str1_s + "\n        } catch (e) {\n            cc.error(node_o_.name, \"\u8282\u70B9\u6811\u672A\u66F4\u65B0!\");\n        }\n    }\n    " + str2_s + "\n}\n\nexport default nodes;");
        refresh_s = refresh_s.replace(assets_path_s, "db:/");
        // log("更新路径:", refresh_s);
        Editor.assetdb.refresh(refresh_s, function (err_a, res_a) {
            if (err_a) {
                log("刷新资源失败", err_a, res_a);
                return;
            }
            var _loop_1 = function (v1_s) {
                fs.readFile(v1_s, 'utf-8', function (err_a, data_s) {
                    if (err_a) {
                        log("读取组件脚本失败: ", v1_s, err_a);
                        return;
                    }
                    // log("读取组件脚本: ", v1_s, data_s);
                    temp1_n = data_s.indexOf("__auto_member__");
                    temp2_n = data_s.indexOf("__auto_bind__");
                    if (temp1_n != -1 && temp2_n != -1) {
                        // ------------------导入文件
                        temp2_s = export_path(path_s, v1_s);
                        // 更新导入
                        if ((temp1_n = data_s.indexOf("import nodes ")) != -1) {
                            data_s = data_s.slice(0, temp1_n) + "import nodes from \"" + temp2_s + "\";" + data_s.slice(data_s.indexOf(";", temp1_n) + 1, data_s.length);
                        }
                        // 新增导入
                        else {
                            data_s = "import nodes from \"" + temp2_s + "\";\n" + data_s;
                        }
                        // ------------------成员变量
                        if (data_s.indexOf("private nodes:") == -1) {
                            temp1_n = data_s.indexOf("\n", data_s.indexOf("__auto_member__"));
                            data_s = data_s.slice(0, temp1_n) + "    private nodes: nodes;" + data_s.slice(temp1_n);
                        }
                        if (data_s.indexOf("this.nodes = new nodes") == -1) {
                            temp2_n = data_s.indexOf("\n", data_s.indexOf("__auto_bind__")) + 1;
                            data_s = data_s.slice(0, temp2_n) + "        this.nodes = new nodes(this.node);\n" + data_s.slice(temp2_n);
                        }
                        // log("写入组件脚本: ", data_s);
                        fs.writeFileSync(v1_s, data_s);
                        log(v1_s + " \u8282\u70B9\u7ED1\u5B9A\u5DF2\u66F4\u65B0");
                    }
                });
            };
            // ------------------添加组件
            // log("生成成功:", src_s, str1_s);
            for (var _i = 0, scr_path_ss_2 = scr_path_ss; _i < scr_path_ss_2.length; _i++) {
                var v1_s = scr_path_ss_2[_i];
                _loop_1(v1_s);
            }
        });
    }
    scene.update_nodes = update_nodes;
})(scene || (scene = {}));
module.exports = scene;
