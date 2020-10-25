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

/**
 * Assembler其实就是一个顶点数据处理类
 */
export default class CustomAssembler extends cc.Assembler {

    vertexCount = 4;
    indiceCount = 6;
    floatsPerVert = 5;


    uvOffset = 2;
    colorOffset = 4;

    _renderData: cc.RenderData = null;
    _local: any = null;

    get verticesFloats() {
        return this.vertexCount * this.floatsPerVert;
    }

    getBuffer() {
        // @ts-ignore
        return cc.renderer._handle._meshBuffer;
    }

    /** 初始化, 由cocos调用 */
    init(comp: cc.RenderComponent) {
        super.init(comp);
        this._renderData = new cc.RenderData();
        this._renderData.init(this);





    }

    initData() {
        let data = this._renderData;
        data.createQuadData(0, this.verticesFloats, this.indiceCount);
    }
    initLocal() {
        this._local = [];
        this._local.length = 4;
    }
    /** 填充color顶点属性 */
    updateColor(comp, color) {
        let uintVerts = this._renderData.uintVDatas[0];
        if(!uintVerts) return ;
        color = color != null ? color : comp.node.color._val;
        let floatsPerVert = this.floatsPerVert;
        let colorOffset = this.colorOffset;
        for(let i=colorOffset, l=uintVerts.length; i<l; i+= floatsPerVert) {
            uintVerts[i] = color;
        }
    }

    updateWorldVertsWebGL(comp: cc.RenderComponent) {
        let local = this._local;
        let verts = this._renderData.vDatas[0];

        let matrix: cc.Mat4 = null;
        comp.node.getWorldMatrix(matrix);
        let matrixm = matrix.m,
        a = matrixm[0], b = matrixm[1], c = matrixm[4], d = matrixm[5], 
        tx = matrixm[12], ty = matrixm[13];

        let vl = local[0], vr = local[2],
        vb = local[1], vt = local[3];

        // let justTranslate = a
    }

    updateWorldVerts(comp: cc.RenderComponent) {
        if(CC_NATIVERENDERER) {

        }
    }



    
}