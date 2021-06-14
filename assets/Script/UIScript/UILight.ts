import TexturePlus from "../Common/Components/TexturePlus";
import Light from "../Common/Light/Light";
import LightUtils from "../Common/Light/LightUtils";
import Obstacle from "../Common/Light/Obstacle";
import { UIScreen } from "../UIFrame/UIForm";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UILight extends UIScreen {

    static prefabPath = "Forms/Windows/UILight";

    
    @property(Obstacle)
    private obstacle: Obstacle = null;
    @property(Light)
    private light: Light = null;
    

    // onLoad () {}

    start () {
        let viewSize = cc.view.getVisibleSize();
        this.obstacle.addPolygon('', [
            cc.v2(0, 0), cc.v2(viewSize.width, 0), cc.v2(viewSize.width, viewSize.height), cc.v2(0, viewSize.height)
        ]);

        let ndObstacle = this.obstacle.node;
        for(let i=0; i<ndObstacle.childrenCount; i++) {
            let node = ndObstacle.children[i];
            let com = node.getComponent(TexturePlus);
            if(!com) continue;
            
            let points = com.polygon.concat([]);
            points = points.map(e => e.add(node.getPosition()));

            this.obstacle.addPolygon(com.node.uuid, points);
        }
    }


    private draw() {
        let polygons = this.obstacle.getPolygons(this.light.getBound());
        let intersections = LightUtils.getIntersections(this.light.node.getPosition(), polygons);
        this.light.draw(intersections);
    }

    update (dt: number) {
        this.draw();
    }
}
