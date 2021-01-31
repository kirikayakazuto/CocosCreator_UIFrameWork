/**
 * @author zhangxin
 * @description creator编辑器头文件
 * 2020/9/20
 */
/**@class AssetDB */
declare module Editor {
    /**@see API for main process https://docs.cocos.com/creator/manual/zh/extension/api/asset-db/asset-db-main.html 
     * @see API for renderer process https://docs.cocos.com/creator/manual/zh/extension/api/asset-db/asset-db-renderer.html
     * @see API all https://docs.cocos.com/creator/api/zh/editor/asset-db.html
    */
    declare module remote {
        export const assetdb: assetdb
    }
    declare class assetdb {

        urlToUuid(url): string
        fspathToUuid(fspath): string
        uuidToFspath(uuid): string
        uuidToUrl(uuid): string
        fspathToUrl(fspath): string
        urlToFspath(url): string
        exists(url): string
        existsByUuid(uuid): string
        existsByPath(fspath): string
        isSubAsset(url): boolean
        isSubAssetByUuid(uuid): boolean
        isSubAssetByPath(fspath): boolean
        containsSubAssets(url): boolean
        containsSubAssetsByUuid(uuid): boolean
        containsSubAssetsByPath(path): boolean
        assetInfo(url): object
        assetInfoByUuid(uuid): object
        assetInfoByPath(fspath): object
        subAssetInfos(url): array
        subAssetInfosByUuid(uuid): array
        subAssetInfosByPath(fspath): array
        loadMeta(url): object
        loadMetaByUuid(uuid): object
        loadMetaByPath(fspath): object
        isMount(url): boolean
        isMountByPath(fspath): boolean
        isMountByUuid(uuid): boolean
        mountInfo(url): object
        mountInfoByUuid(uuid): object
        mountInfoByPath(fspath): object
        mount(path, mountPath, opts, [cb])
        attachMountPath(mountPath, [cb])
        unattachMountPath(mountPath, [cb])
        unmount(mountPath, [cb])

        static init(cb?)
        static refresh(url, cb?)
        static deepQuery(cb?)
        static queryAssets(pattern, assetTypes, cb?)
        static queryMetas(pattern, type, cb?)
        static move(srcUrl, destUrl, cb?)
        static delete(urls, cb?)
        static create(url, data, cb?)
        static saveExists(url, data, cb?)
        static import(rawfiles, url, cb?)
        static saveMeta(uuid, jsonString, cb?)
        static exchangeUuid(urlA, urlB, cb?)
        static clearImports(url, cb?)
        static register(extname, folder, metaCtor)
        static unregister(metaCtor)
        static getRelativePath(fspath): string
        static getAssetBackupPath(filePath)
        static setEventCallback(cb)
        static createOrSave(url, data, cb)
    }

}