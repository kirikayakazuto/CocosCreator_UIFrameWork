import MeshTexture from "../Components/MeshTexture";

const gfx = cc['gfx'];

// 顶点格式 -> 位置 UV, 颜色
let vfmtPosUvColor = new gfx.VertexFormat([
    { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_UINT8, num: 4, normalize: true },
]);

export default class MeshAssembler extends cc.Assembler{

    constructor() {
        super();
        this._renderData = new cc.RenderData();
        this._renderData.init(this);

        this.initData();
        this.initLocal();
    }

    private row = 0;                // 行数
    private col = 0;                // 列数
    private _realRow = 0;           // 实际行数
    private _realCol = 0;           // 实际列数
    private stepRow = 0;            // 步长
    private StepCol = 0;            // 步长
    private verticesCount = 4;
    private indicesCount = 6;


    floatsPerVert = 5;
    uvOffset = 2;       
    colorOffset = 4;

    private _renderData: cc.RenderData = null;
    private _local: number[] = null;

    get verticesFloats() {
        return this.verticesCount * this.floatsPerVert;
    }

    /** 获得三角形片段的数量 */
    public getTriangleCount() {
        return (this.row-1) * (this.col - 1) * 2;
    }

    public getTriangle(idx: number) {
        if(idx < 0 || idx >= this.getTriangleCount()) return null;
        let verts = this._renderData.vDatas[0] as Array<number>;
        let vertIdx = Math.floor(idx / this._realCol) * this._realCol * 2 + idx;
        let arr: cc.Vec2[] = [];
        if(idx % 2 == 0) {
            arr = [
                cc.v2(verts[vertIdx * this.floatsPerVert], verts[vertIdx * this.floatsPerVert+1]),
                cc.v2(verts[(vertIdx + 1) * this.floatsPerVert], verts[(vertIdx + 1) * this.floatsPerVert+1]),
                cc.v2(verts[(vertIdx + this._realCol) * this.floatsPerVert], verts[(vertIdx + this._realCol) * this.floatsPerVert+1]),
            ]
        }else {
            arr = [
                cc.v2(verts[vertIdx * this.floatsPerVert], verts[vertIdx * this.floatsPerVert+1]),
                cc.v2(verts[(vertIdx + this._realCol) * this.floatsPerVert], verts[(vertIdx + this._realCol) * this.floatsPerVert+1]),
                cc.v2(verts[(vertIdx + this._realCol-1) * this.floatsPerVert], verts[(vertIdx + this._realCol-1) * this.floatsPerVert+1]),                
            ]
        }
        return arr;
    }

    public setTriangle(idx: number, arr: cc.Vec2[], comp: any) {
        if(idx < 0 || idx >= this.getTriangleCount()) return ;
        let verts = this._renderData.vDatas[0] as Array<number>;
        let vertIdx = Math.floor(idx / this._realCol) * this._realCol * 2 + idx;
        
        if(idx % 2 == 0) {
            verts[vertIdx * this.floatsPerVert] = arr[0].x;
            verts[vertIdx * this.floatsPerVert+1] = arr[0].y;

            verts[(vertIdx + 1) * this.floatsPerVert] = arr[1].x;
            verts[(vertIdx + 1) * this.floatsPerVert+1] = arr[1].y;

            verts[(vertIdx + this._realCol) * this.floatsPerVert] = arr[2].x;
            verts[(vertIdx + this._realCol) * this.floatsPerVert+1] = arr[2].y;

        }else {
            verts[vertIdx * this.floatsPerVert] = arr[0].x;
            verts[vertIdx * this.floatsPerVert+1] = arr[0].y;

            verts[(vertIdx + this._realCol) * this.floatsPerVert] = arr[1].x;
            verts[(vertIdx + this._realCol) * this.floatsPerVert+1] = arr[1].y;

            verts[(vertIdx + this._realCol-1) * this.floatsPerVert] = arr[2].x;
            verts[(vertIdx + this._realCol-1) * this.floatsPerVert+1] = arr[2].y;
        }

        comp._vertsDirty = true;
    }

    public getRectCount() {
        return (this.row-1) * (this.col - 1);
    }
    public getRect(idx: number) {
        if(idx < 0 || idx >= this.getRectCount()) return null;
        let verts = this._renderData.vDatas[0] as Array<number>;
        let vertIdx = Math.floor(idx*2 / this._realCol) * this._realCol * 2 + (idx * 2 % this._realCol);

        let arr: cc.Vec2[] = [
            cc.v2(verts[vertIdx * this.floatsPerVert], verts[vertIdx * this.floatsPerVert+1]),
            cc.v2(verts[(vertIdx + 1) * this.floatsPerVert], verts[(vertIdx + 1) * this.floatsPerVert+1]),
            cc.v2(verts[(vertIdx + this._realCol) * this.floatsPerVert], verts[(vertIdx + this._realCol) * this.floatsPerVert+1]),
            cc.v2(verts[(vertIdx + this._realCol+1) * this.floatsPerVert], verts[(vertIdx + this._realCol+1) * this.floatsPerVert+1]),                
        ];
        return arr;
    }
    public setRect(idx: number, arr: cc.Vec2[]) {
        if(idx < 0 || idx >= this.getRectCount()) return ;
        let verts = this._renderData.vDatas[0] as Array<number>;
        let vertIdx = Math.floor((idx * 2) / this._realCol) * this._realCol * 2 + (idx * 2 % this._realCol);
        
        verts[vertIdx * this.floatsPerVert] = arr[0].x;
        verts[vertIdx * this.floatsPerVert+1] = arr[0].y;

        verts[(vertIdx + 1) * this.floatsPerVert] = arr[1].x;
        verts[(vertIdx + 1) * this.floatsPerVert+1] = arr[1].y;

        verts[(vertIdx + this._realCol) * this.floatsPerVert] = arr[2].x;
        verts[(vertIdx + this._realCol) * this.floatsPerVert+1] = arr[2].y;

        verts[(vertIdx + this._realCol+1) * this.floatsPerVert] = arr[3].x;
        verts[(vertIdx + this._realCol+1) * this.floatsPerVert+1] = arr[3].y;
    }

    public resetData(comp: MeshTexture) {
        if(!comp.texture) return ;
        let width = comp.texture.width;
        let height = comp.texture.height;
        let step = comp.step;
        this.row = Math.floor(height / step) + 1;
        this.col = Math.floor(width / step) + 1;
        this.stepRow = height / (this.row-1);
        this.StepCol = width / (this.col - 1);

        this._realRow = 2 + (this.row - 2) * 2;
        this._realCol = 2 + (this.col - 2) * 2;

        cc.log(this.row, this.col);

        this.verticesCount = this._realRow * this._realCol;
        this.indicesCount = (this.row-1) * (this.col - 1) * 6;
        this._renderData['clear']();
        this.initData();
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

        let indices = this._renderData.iDatas[0];
        let indexOffset = 0;
        for (let r = 0; r < this.row-1; ++r) {
            for (let c = 0; c < this.col-1; ++c) {
                let start = r * 2 * this._realCol + c * 2;
                indices[indexOffset++] = start;
                indices[indexOffset++] = start + 1;
                indices[indexOffset++] = start + this._realCol;
                indices[indexOffset++] = start + 1;
                indices[indexOffset++] = start + this._realCol+1;
                indices[indexOffset++] = start + this._realCol;
            }
        }
    }
    public initLocal() {
        this._local = [];
        this._local.length = 4;
    }

    /** 填充顶点的color */
    public updateColor(comp: cc.RenderComponent, color: number) {
        let uintVerts = this._renderData.uintVDatas[0];
        if(!uintVerts) return ;
        color = color != null ? color : comp.node.color['_val'];
        let floatsPerVert = this.floatsPerVert;
        let colorOffset = this.colorOffset;
        for(let i=0; i<this.verticesCount; i++) {
            uintVerts[colorOffset + i * floatsPerVert] = color;
        }
    }
    /** 更新uv */
    protected updateUVs(comp: cc.RenderComponent) {
        let uvOffset = this.uvOffset;
        let floatsPerVert = this.floatsPerVert;
        let verts = this._renderData.vDatas[0];
        let vid = 0;

        let _setUv = (uv_x: number, uv_y: number, vid: number) => {
            let voffset = vid * floatsPerVert;
            verts[voffset + uvOffset] = uv_x;
            verts[voffset + uvOffset + 1] = uv_y;
        }
        let _fillOneRow = (uv_y: number) => {
            for(let col=0; col<this.col; col++) {
                let uv_x = col/(this.col-1);
                _setUv(uv_x, uv_y, vid++);
                if(col !== 0 && col !== this.col-1) {
                    _setUv(uv_x, uv_y, vid++);
                }
            }
        }
        for(let row=0; row<this.row; row++) {
            let uv_y = 1-row/(this.row-1);
            _fillOneRow(uv_y);
            if(row !== 0 && row !== this.row-1) {
                _fillOneRow(uv_y);
            }
        }
        
    }

    protected updateWorldVertsWebGL(comp: cc.RenderComponent) {
        let local = this._local;
        let verts = this._renderData.vDatas[0];

        let matrix: cc.Mat4 = comp.node['_worldMatrix'];
        let matrixm = matrix.m,
        a = matrixm[0], b = matrixm[1], c = matrixm[4], d = matrixm[5], 
        tx = matrixm[12], ty = matrixm[13];

        let vl = local[0], vr = local[2],                                                                                    
        vb = local[1], vt = local[3];

        let justTranslate = a === 1 && b === 0 && c === 0 && d === 1;
        let floatsPerVert = this.floatsPerVert;
        let vertIdx = 0;
        
        let _setVert = (localColX: number, localRowY: number, vertIdx: number) => {
            let worldIndex = floatsPerVert * vertIdx;
            verts[worldIndex] = localColX + tx;
            verts[worldIndex + 1] = localRowY + ty;
        }

        let _setVert2 = (localColX: number, localRowY: number, vertIdx: number) => {
            let worldIndex = vertIdx * floatsPerVert;
            verts[worldIndex] = localColX * a + localRowY * c + tx;
            verts[worldIndex + 1] = localColX * b + localRowY * d + ty;
        }

        let _fillOneRow = (localRowY: number, setVert: Function) => {
            for(let col=0; col<this.col; col++) {
                let localColX = (col == this.col-1) ? vr : (vl + col * this.StepCol);
                setVert(localColX, localRowY, vertIdx ++);
                if(col !== 0 && col !== this.col-1) {
                    // 插入一列
                    setVert(localColX, localRowY, vertIdx ++);
                }
            }
        }

        if(justTranslate) {
            for(let row=0; row<this.row; row++) {
                let localRowY = (row == this.row-1) ? vt : (vb + row * this.stepRow);
                _fillOneRow(localRowY, _setVert);
                if(row !== 0 && row !== this.row-1) {
                    // 插入一行
                    _fillOneRow(localRowY, _setVert);
                }
            }
        }else {
            for(let row=0; row<this.row; row++) {
                let localRowY = (row == this.row-1) ? vt : (vb + row * this.stepRow);
                _fillOneRow(localRowY, _setVert2);
                if(row !== 0 && row !== this.row-1) {
                    // 插入一行
                    _fillOneRow(localRowY, _setVert2);
                }
            }
        }
    }

    protected updateWorldVertsNative(comp: cc.RenderComponent) {
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

    protected updateWorldVerts(comp: cc.RenderComponent) {
        if (CC_NATIVERENDERER) {
            this.updateWorldVertsNative(comp);
        } else {
            this.updateWorldVertsWebGL(comp);
        }
    }

    /** 更新顶点数据 */
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

    /** 更新renderdata */
    protected updateRenderData(comp: MeshTexture) {
        if (comp._vertsDirty) {
            this.resetData(comp);
            this.updateUVs(comp);
            this.updateVerts(comp);
            comp._vertsDirty = false;
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
            vertexId = offsetInfo.vertexOffset;
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
    
}   