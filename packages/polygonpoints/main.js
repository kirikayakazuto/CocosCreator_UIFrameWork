
// api: https://docs.cocos.com/creator/manual/zh/extension/api/editor-framework/renderer/gizmo.html
class PointsPolygonGizmo extends Editor.Gizmo {
    init() {
      // 初始化一些参数
    }

    selectedIdx = -1;
    timeout = -1;
  
    onCreateMoveCallbacks() {
      // 创建 gizmo 操作回调
  
      // 申明一些局部变量
      let start_vertex;        // 按下鼠标时记录的位置
      let pressx, pressy;     // 按下鼠标时记录的鼠标位置
  
      return {
        /**
         * 在 gizmo 上按下鼠标时触发
         * @param x 按下点的 x 坐标
         * @param y 按下点的 y 坐标
         * @param event mousedown dom event
         */
        start: (x, y, event, i, type) => {
            if(type == "line") {
                let target = this.target;
                let nextPoint = i == target.polygon.length-1 ? target.polygon[0] : target.polygon[i+1];
                let p = cc.v2((target.polygon[i].x + nextPoint.x)/2, (target.polygon[i].y + nextPoint.y)/2);
                target.polygon.splice(i+1, 0, p);
                return ;
            }
            if(this.selectedIdx === i) {
                if(this.target.polygon.length <= 3) return ;
                this.target.polygon.splice(i, 1);
                this.target.polygon = this.target.polygon;
                return ;
            }
            this.selectedIdx = i;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.selectedIdx = -1;
            }, 500);
            start_vertex = null;
            pressx = x;
            pressy = y;
        },
  
        /**
         * 在 gizmo 上按下鼠标移动时触发
         * @param dx 鼠标移动的 x 位移
         * @param dy 鼠标移动的 y 位移
         * @param event mousedown dom event
         */
        update: (dx, dy, event, i, type) => {
            if(type == "line") return ;
          // 获取 gizmo 依附的组件
          let target = this.target;
          if (!start_vertex) {
            start_vertex = target.polygon[i].clone();
          }
          target.polygon[i].x = start_vertex.x + dx / this._view.scale;
          target.polygon[i].y = start_vertex.y + dy / this._view.scale;
          target.polygon = target.polygon;
          // this.adjustValue(target);
        },
  
        /**
         * 在 gizmo 抬起鼠标时触发
         * @param event mousedown dom event
         */
        end: (updated, event) => {
        }
      };
    }
  
    onCreateRoot() {
      // 创建 svg 根节点的回调，可以在这里创建你的 svg 工具
      // this._root 可以获取到 Editor.Gizmo 创建的 svg 根节点
      
  
      // 创建一个 svg 工具
      // group 函数文档 : http://documentup.com/wout/svg.js#groups
      this._tool = this._root.group();
      let target = this.target;
      const circles = [];
      const lines = [];
      // 接下来要定义绘画函数
      this._tool.plot = (points, position) => {
        // 移动到节点位置
        this._tool.move(position.x, position.y);
        // 清除原来的点
        circles.forEach(v => v.radius(0));
        lines.forEach(v => v.plot(0, 0, 0, 0));
        
        for(let i=0; i<points.length; i++) {
          let v = points[i];
          v = Editor.GizmosUtils.snapPixelWihVec2(v.mul(this._view.scale));
          let line = lines[i]
          if(!line) {
            line = lines[i] = this._tool.line()
            .stroke({ color: 'rgba(0,80,255,0.8)' });

            this.registerMoveSvg(line, [i, "line"]);
          }
          let nextPoint = i== points.length-1 ? points[0] : points[i+1];
          nextPoint = Editor.GizmosUtils.snapPixelWihVec2(nextPoint.mul(this._view.scale))
          line.plot(v.x, -v.y, nextPoint.x, -nextPoint.y).stroke({ width: 4 * this._view.scale });
        }

        for(let i=0; i<points.length; i++) {
            let v = points[i];
            v = Editor.GizmosUtils.snapPixelWihVec2(v.mul(this._view.scale));

            let circle = circles[i];
            // 初始化
            if(!circle) {
                circle = circles[i] = this._tool.circle()
                .fill({ color: 'rgba(0,128,255,0.9)' })
                .style('pointer-events', 'fill')
                .style('cursor', 'move');
                // 注册点击事件
                this.registerMoveSvg(circle, [i, "circle"], { cursor: 'pointer' });
            }
            circle.center(v.x, -v.y).radius(6 * this._view.scale);
        }

      };
    }
  
    onUpdate() {
      // 更新 svg 工具
  
      // 获取 gizmo 依附的组件
      let target = this.target;
  
      // 获取 gizmo 依附的节点
      let node = this.node;
  
      // // 获取节点世界坐标
      let position = node.convertToWorldSpaceAR(cc.v2(0, 0));
  
      // 转换世界坐标到 svg view 上
      // svg view 的坐标体系和节点坐标体系不太一样，这里使用内置函数来转换坐标
      position = this.worldToPixel(position);
  
      // 对齐坐标，防止 svg 因为精度问题产生抖动
      position = Editor.GizmosUtils.snapPixelWihVec2(position);
  
      // 移动 svg 工具到坐标
      this._tool.plot(target.polygon, position);
    }

    visible () {
      if(this.target.editing !== undefined) return this.target.editing;
      return this.target._type === cc.MaskPlus.Type.Polygon;
    }
  }
  
module.exports = PointsPolygonGizmo;
  