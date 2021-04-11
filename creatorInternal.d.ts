declare interface Object {
	assign(obj1: Object, obj2: Object): Object;
}

declare function require(name: string): any;

/** 对creator.d.ts的补充, 后续从2.2.2版本中挖出来
*/
declare namespace cc {

	declare class RenderFlow {
		static FLAG_DONOTHING: number;
		static FLAG_BREAK_FLOW: number;
		static FLAG_LOCAL_TRANSFORM: number;
		static FLAG_WORLD_TRANSFORM: number;
		static FLAG_TRANSFORM: number;
		static FLAG_UPDATE_RENDER_DATA: number;
		static FLAG_OPACITY: number;
		static FLAG_COLOR: number;
		static FLAG_OPACITY_COLOR: number;
		static FLAG_RENDER: number;
		static FLAG_CHILDREN: number;
		static FLAG_POST_RENDER: number;
		static FLAG_FINAL: number;

		static flows: any;

		_doNothing(): void;
		_localTransform(): void;
		_worldTransform(): void;
		_opacity(): void;
		_color(): void;
		_updateRenderData(): void;
		_render(): void;
		_children(): void;
		_postRender(): void;
	}

	declare interface renderer {
		// _handle: any;		// 无效
	}

	/** 
	 * 对creator.d.ts的补充
	*/
	export class Assembler {
		public init(comp: cc.RenderComponent);
	}

	export class RenderData {
		createFlexData(index, verticesFloats, indicesCount, vfmt);

		vertices: any[];

		dataLength: number;
	}

	declare interface Game {
		_renderContext: WebGLRenderingContext;
	}

	declare interface Camera {
		position: cc.Vec2;
		render(): void;
	}

	declare interface Node {
		_renderFlag: number;
		_activeInHierarchy: boolean;
	}

	declare interface Sprite {
		_spriteFrame: cc.SpriteFrame;
	}

	declare interface Material {
		setProperty(name: string, value: any);
		getProperty(name: string): any;
		getHash(): string;
		// static getInstantiatedMaterial(material: Material, comp: RenderComponent): Material;	// 无效
	}

	/** 对creator.d.ts的补充
	creator.d.ts已经导出RenderComponent，此处追加一些方法和成员
	engine\cocos2d\core\components\CCRenderComponent.js
	*/
	declare interface RenderComponent {
		/**
		@param dirty dirty
		*/
		setVertsDirty(): void;

		disableRender(): void;

		_getDefaultMaterial(): cc.Material;

		markForRender(shouldRender: boolean): void;

		_activateMaterial(force: boolean = true): void;

		_updateColor(): void;

		_vertsDirty: boolean;

		_assembler: cc.Assembler;

		_materials: cc.Material[];
	}	

	declare interface RenderData {
		init(assembler: cc.Assembler);
		createQuadData(index, verticesFloats, indicesCount);

		vDatas;
		uintVDatas;
		iDatas;
		meshCount: number;
		_infos;
		_flexBuffer;
		clear(): void;
	}

	declare interface PhysicsManager {
		_world: b2.World;
	}
}
