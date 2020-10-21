import { createContext } from "vm";

const renderEngine = cc.renderer.renderEngine;
const gfx = cc['gfx'];

// 传递位置 以及 UV
let vfmtPosUv = new gfx.VertexFormat([
    {name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2},
    {name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2}
]);

// 传递位置 UV, 颜色
let vfmtPosUvColor = new gfx.VertexFormat([
    { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_UINT8, num: 4, normalize: true },
]);

export class CustomAssembler {
    // 创建渲染数据
    createData(comp: any) {
        let renderData = comp.requestRenderData();
        renderData.dataLength = 4;
        renderData.vertexCount = 4;
        renderData.indiceCount = 6;
        return renderData;
    }
    // 更新渲染数据
    updateRenderData(comp: any) {
        let renderData = comp._renderData;
        if(renderData) this.updateVerts(comp);
    }
    // 填充数据
    fillBuffers(comp: cc.Component) {

    }

    updateVerts(comp: cc.RenderComponent) {
        let renderData = comp['_renderData'],
        node = comp.node,
        data = renderData._data,
        cw = node.width, ch = node.height,
        appx = node.anchorX * cw, appy = node.anchorY * ch,
        vl: number, vb: number, vr: number, vt: number;


        let uv = comp["uv"];

        let matrix = node['_worldMatrix'],
        a = matrix.m00, b = matrix.m01, c = matrix.m04, d = matrix.m05,
        tx = matrix.m12, ty = matrix.m13;

        vl = -appx;
        vb = -appy;
        vr = cw - appx;
        vt = ch - appy;

        let al = a * vl,
            ar = a * vr,
            bl = b * vl,
            br = b * vr,
            cb = c * vb,
            ct = c * vt,
            db = d * vb,
            dt = d * vt;
    }
}


   