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

    // 顶点个数，矩形所以是四个
    verticesCount = 4;
    // 顶点索引， 就是三角形的顶点， 编号按照逆时针方向
    indicesCount = 6;
    // 顶点属性 x|y|u|v|color, 5个 但是目前color是null， 没有写入到vdata中, 目测是shader的问题， 交给shader处理了
    floatsPerVert = 5;
    uvOffset = 2;       // uv偏移是2
    colorOffset = 4;    // color偏移是4

    _renderData: cc.RenderData = null;
    _local: number[] = null;

    get verticesFloats() {
        // 顶点所占大小， 就是顶点个数 * 顶点大小
        return this.verticesCount * this.floatsPerVert;
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

        this.initLocal();
        this.initData();
    }

    initData() {
        let data = this._renderData;
        data.createQuadData(0, this.verticesFloats, this.indicesCount);
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
        for(let i=0; i<4; i++) {
            uintVerts[colorOffset + i * floatsPerVert] = color;
        }
    }

    protected updateUVs(comp: cc.RenderComponent) {
        // 4个顶点的uv坐标，对应左下、右下、左上、右上
        // 如果是cc.Sprite组件，这里取sprite._spriteFrame.uv;
        // 对应的是 l, b, r, b, l, t, r, t 既左下， 右下， 左上， 右上
        // b = 1 是因为cocos原点是左下角， 但是canvas是左上角
        let uv = [0, 1, 1, 1, 0, 0, 1, 0];
        let uvOffset = this.uvOffset;
        let floatsPerVert = this.floatsPerVert;
        let verts = this._renderData.vDatas[0];

        // // render data = verts = x|y|u|v|color|x|y|u|v|color|...
        // // 填充render data中4个顶点的uv部分
        for (let i = 0; i < 4; i++) {
            let srcOffset = i * 2;
            let dstOffset = floatsPerVert * i + uvOffset;
            verts[dstOffset] = uv[srcOffset];           // 设置 u
            verts[dstOffset + 1] = uv[srcOffset + 1];   // 设置 v
        }
        // 顶点是逆时针编号
        //{"vDatas":[{"0":569.5,"1":240,"2":0,"3":1,"4":null,
        // "5":764.5,"6":240,"7":1,"8":1,"9":null,
        // "10":569.5,"11":510,"12":0,"13":0,"14":null,
        // "15":764.5,"16":510,"17":1,"18":0,"19":null}],
        // "uintVDatas":[{"0":1141792768,"1":1131413504,"2":0,"3":1065353216,"4":4294967295,"5":1144987648,"6":1131413504,"7":1065353216,"8":1065353216,"9":4294967295,"10":1141792768,"11":1140785152,"12":0,"13":0,"14":4294967295,"15":1144987648,"16":1140785152,"17":1065353216,"18":0,"19":4294967295}],
        // "iDatas":[{"0":0,"1":1,"2":2,"3":1,"4":3,"5":2}],"meshCount":1,"_infos":null,"_flexBuffer":null}
    }

    updateWorldVertsWebGL(comp: cc.RenderComponent) {
        let local = this._local;
        let verts = this._renderData.vDatas[0];

        let matrix: cc.Mat4 = comp.node['_worldMatrix'];
        let matrixm = matrix.m,
        a = matrixm[0], b = matrixm[1], c = matrixm[4], d = matrixm[5], 
        tx = matrixm[12], ty = matrixm[13];

        let vl = local[0], vr = local[2],
        vb = local[1], vt = local[3];

        let justTranslate = a === 1 && b === 0 && c === 0 && d === 1;
        let index = 0;
        let floatsPerVert = this.floatsPerVert;
        if (justTranslate) {
            // left bottom
            verts[index] = vl + tx;     // 顶点位置 x = 世界坐标left + x的偏移量
            verts[index+1] = vb + ty;   // 顶点位置 y
            index += floatsPerVert;
            // right bottom
            verts[index] = vr + tx;
            verts[index+1] = vb + ty;
            index += floatsPerVert;
            // left top
            verts[index] = vl + tx;
            verts[index+1] = vt + ty;
            index += floatsPerVert;
            // right top
            verts[index] = vr + tx;
            verts[index+1] = vt + ty;
        } else {
            // 4对xy分别乘以 [2,2]仿射矩阵，然后+平移量
            let al = a * vl, ar = a * vr,
            bl = b * vl, br = b * vr,
            cb = c * vb, ct = c * vt,
            db = d * vb, dt = d * vt;

            // left bottom
            // newx = vl * a + vb * c + tx
            // newy = vl * b + vb * d + ty
            verts[index] = al + cb + tx;
            verts[index+1] = bl + db + ty;
            index += floatsPerVert;
            // right bottom
            verts[index] = ar + cb + tx;
            verts[index+1] = br + db + ty;
            index += floatsPerVert;
            // left top
            verts[index] = al + ct + tx;
            verts[index+1] = bl + dt + ty;
            index += floatsPerVert;
            // right top
            verts[index] = ar + ct + tx;
            verts[index+1] = br + dt + ty;
        }
    }

    updateWorldVertsNative(comp: cc.RenderComponent) {
        let local = this._local;
        let verts = this._renderData.vDatas[0];
        let floatsPerVert = this.floatsPerVert;
      
        let vl = local[0],
            vr = local[2],
            vb = local[1],
            vt = local[3];
      
        let index: number = 0;
        // left bottom
        verts[index] = vl;
        verts[index+1] = vb;
        index += floatsPerVert;
        // right bottom
        verts[index] = vr;
        verts[index+1] = vb;
        index += floatsPerVert;
        // left top
        verts[index] = vl;
        verts[index+1] = vt;
        index += floatsPerVert;
        // right top
        verts[index] = vr;
        verts[index+1] = vt;
    }

    updateWorldVerts(comp: cc.RenderComponent) {
        if (CC_NATIVERENDERER) {
            this.updateWorldVertsNative(comp);
        } else {
            this.updateWorldVertsWebGL(comp);
        }
    }

    fillBuffers(comp: cc.RenderComponent, renderer) {
        if (renderer.worldMatDirty) {
            this.updateWorldVerts(comp);
        }

        let renderData = this._renderData;

        // vData里包含 pos， uv， color数据， iData中包含顶点索引
        let vData = renderData.vDatas[0];
        let iData = renderData.iDatas[0];

        let buffer = this.getBuffer();
        let offsetInfo = buffer.request(this.verticesCount, this.indicesCount);

        // buffer data may be realloc, need get reference after request.

        // fill vertices
        let vertexOffset = offsetInfo.byteOffset >> 2,
            vbuf = buffer._vData;

        if (vData.length + vertexOffset > vbuf.length) {
            vbuf.set(vData.subarray(0, vbuf.length - vertexOffset), vertexOffset);
        } else {
            vbuf.set(vData, vertexOffset);
        }

        // fill indices
        let ibuf = buffer._iData,
            indiceOffset = offsetInfo.indiceOffset,
            vertexId = offsetInfo.vertexOffset;             // vertexId是已经在buffer里的顶点数，也是当前顶点序号的基数
        for (let i = 0, l = iData.length; i < l; i++) {
            ibuf[indiceOffset++] = vertexId + iData[i];
        }
    }

    packToDynamicAtlas(comp, frame) {
        if (CC_TEST) return;
        
        if (!frame._original && cc.dynamicAtlasManager && frame._texture.packable) {
            let packedFrame = cc.dynamicAtlasManager.insertSpriteFrame(frame);
            //@ts-ignore
            if (packedFrame) {
                frame._setDynamicAtlasFrame(packedFrame);
            }
        }
        let material = comp._materials[0];
        if (!material) return;
        
        if (material.getProperty('texture') !== frame._texture) {
            // texture was packed to dynamic atlas, should update uvs
            comp._vertsDirty = true;
            comp._updateMaterial();
        }
    }

    protected updateVerts(comp: cc.RenderComponent) {
        let node: cc.Node = comp.node,
            cw: number = node.width,
            ch: number = node.height,
            appx: number = node.anchorX * cw,
            appy: number = node.anchorY * ch,
            l: number,
            b: number, 
            r: number,
            t: number;

        l = - appx;
        b = - appy;
        r = cw - appx;
        t = ch - appy;

        let local = this._local;
        local[0] = l;
        local[1] = b;
        local[2] = r;
        local[3] = t;
        this.updateWorldVerts(comp);
    }

    protected updateRenderData(comp: cc.RenderComponent) {
        if (comp._vertsDirty) {
            this.updateUVs(comp);
            this.updateVerts(comp);
            comp._vertsDirty = false;
        }
    } 
    
}