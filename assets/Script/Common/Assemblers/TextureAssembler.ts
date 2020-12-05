import TexturePlus from "../Components/TexturePlus";

const gfx = cc['gfx'];

// 顶点格式 -> 位置 UV, 颜色
let vfmtPosUvColor = new gfx.VertexFormat([
    { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_UINT8, num: 4, normalize: true },
]);
/**
 * assembler for texture
 */
export default class TextureAssembler extends cc.Assembler {
    constructor() {
        super();
        this._renderData = new cc.RenderData();
        this._renderData.init(this);

        this.initData();
        this.initLocal();
    }
    verticesCount = 4;
    indicesCount = 6;

    floatsPerVert = 5;
    uvOffset = 2;       
    colorOffset = 4;


    public allocRenderData(points: cc.Vec2[]) {
        if(!points || points.length < 3) return ;
        this.verticesCount = points.length;
        this.indicesCount = this.verticesCount + (this.verticesCount - 3) * 2;
        this.initData();
    }

    private _renderData: cc.RenderData = null;
    private _local: number[] = null;

    get verticesFloats() {
        return this.verticesCount * this.floatsPerVert;
    }

    public getVfmt() {
        return vfmtPosUvColor;
    }
    public getBuffer() {
        return cc.renderer['_handle'].getBuffer('mesh', this.getVfmt());
    }

    public initData() {
        let data = this._renderData;
        data.createQuadData(0, this.verticesFloats, this.indicesCount);
    }
    public initLocal() {
        this._local = [];
        this._local.length = 4;
    }

    /** 填充顶点的color */
    public updateColor(comp: TexturePlus, color: number) {
        let uintVerts = this._renderData.uintVDatas[0];
        if(!uintVerts) return ;
        color = color != null ? color : comp.node.color['_val'];
        let floatsPerVert = this.floatsPerVert;
        let colorOffset = this.colorOffset;
        for(let i=0; i<4; i++) {
            uintVerts[colorOffset + i * floatsPerVert] = color;
        }
    }
    /** 更新uv */
    protected updateUVs(comp: TexturePlus) {
        let uv = [0, 1, 1, 1, 0, 0, 1, 0];
        let uvOffset = this.uvOffset;
        let floatsPerVert = this.floatsPerVert;
        let verts = this._renderData.vDatas[0];
        // 填充render data中4个顶点的uv部分
        for (let i = 0; i < 4; i++) {
            let srcOffset = i * 2;
            let dstOffset = floatsPerVert * i + uvOffset;
            verts[dstOffset] = uv[srcOffset];           // 设置 u
            verts[dstOffset + 1] = uv[srcOffset + 1];   // 设置 v
        }
    }

    protected updateWorldVertsWebGL(comp: TexturePlus) {
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
            let polygon = comp.polygon;
            for(let i=0; i<polygon.length; i++) {
                verts[i * floatsPerVert] = polygon[i].x + tx;
                verts[i * floatsPerVert+1] = polygon[i].y + ty;
            }
        } else {
            // 4对xy分别乘以 [2,2]仿射矩阵，然后+平移量
            let al = a * vl, ar = a * vr,
            bl = b * vl, br = b * vr,
            cb = c * vb, ct = c * vt,
            db = d * vb, dt = d * vt;

            // left bottom
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

    protected updateWorldVertsNative(comp: TexturePlus) {
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

    protected updateWorldVerts(comp: TexturePlus) {
        if (CC_NATIVERENDERER) {
            this.updateWorldVertsNative(comp);
        } else {
            this.updateWorldVertsWebGL(comp);
        }
    }

    /** 更新顶点数据 */
    protected updateVerts(comp: TexturePlus) {
        this.updateWorldVerts(comp);
    }

    /** 更新renderdata */
    protected updateRenderData(comp: TexturePlus) {
        if (comp._vertsDirty) {
            this.updateUVs(comp);
            this.updateVerts(comp);
            comp._vertsDirty = false;
        }
    } 

    //每帧都会被调用
    fillBuffers(comp: TexturePlus, renderer) {
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

    packToDynamicAtlas(comp: TexturePlus, frame: any) {
        if (CC_TEST) return;
        
        if (!frame._original && cc.dynamicAtlasManager && frame._texture.packable) {
            let packedFrame = cc.dynamicAtlasManager.insertSpriteFrame(frame);            
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

}