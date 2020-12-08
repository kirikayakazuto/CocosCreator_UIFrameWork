/**
 * Author: fengwc
 * geoJson数据处理模块(需要引入turf.js)
 * 输入输出数据均为标准geoJson格式
 */
const turf = window['turf'];
export class GeoUtil {
/**
     * 合并多边形
     */
    static unionPolygon(polygons) {
        var polygon = polygons[0];
        for (var i = 0; i < polygons.length; i++){
            polygon = turf.union(polygon,polygons[i]);
        };
        return polygon;
    }
    /**
     * 线分割面
     * 面类型只能是polygon 但可以是环
     * 注:线与多边形必须有两个交点
     */
    static polygonClipByLine(polygon, clipLine) {
        if(polygon.geometry.type === 'Polygon'){
            var polyLine = turf.polygonToLine(polygon)
            if(polyLine.geometry.type === 'LineString'){ // 切割普通多边形
                return this._singlePolygonClip(polyLine, clipLine);
            }else if (polyLine.geometry.type === 'MultiLineString'){ //切割环
                return this._multiPolygonClip(polyLine, clipLine);
            }
        }else if(polygon.geometry.type === 'MultiPolygon'){
            // 若输入的多边形类型为Multipolygon则拆分成多个Polygon
            var polygons = this.multiPolygon2polygons(polygon)
            var clipPolygon = null;
            var clipPolygonIndex = -1
            // 获取MultiPolygon中与切割线相交的多边形（有且只能有一个多边形相交2个交点）
            polygons.forEach(function(polygon, index){
                var polyLine = turf.polygonToLine(polygon)
                if(turf.lineIntersect(polyLine, clipLine).features.length === 2){
                    if(!clipPolygon){
                        clipPolygon = polygon
                        clipPolygonIndex = index
                    }else{
                        throw {state : '裁剪失败',message : 'MultiPolygon只能有一个多边形与切割线存在交点'};
                    }                   
                }
            })
            if(clipPolygonIndex !== -1){
                polygons.splice(clipPolygonIndex,1)
                return turf.featureCollection(polygons.concat(this.polygonClipByLine(clipPolygon,clipLine).features));
            }else{
                throw {state : '裁剪失败',message : 'MultiPolygon与切割线无交点'};
            }
            
        }else{
            throw {state : '裁剪失败',message : '输入的多边形类型为错误'};
        }        
    }
    
    static _singlePolygonClip(polyLine, clipLine) {
        // 获得裁切点
        var intersects = turf.lineIntersect(polyLine, clipLine);
        if (intersects.features.length !== 2){
            throw {state : '裁剪失败',message : '切割线与多边形交点应该为2个,当前交点个数为'+intersects.features.length};
        }
        // 检查切割线与多边形的位置关系 （切割线的起点和终点不能落在多边形内部）
        var clipLineLength = clipLine.geometry.coordinates.length;
        var clipLineStartPoint = turf.point(clipLine.geometry.coordinates[0])
        var clipLineEndPoint = turf.point(clipLine.geometry.coordinates[clipLineLength-1])
        var polygon = turf.polygon([polyLine.geometry.coordinates])
        if(turf.booleanPointInPolygon(clipLineStartPoint, polygon) || turf.booleanPointInPolygon(clipLineEndPoint, polygon)){
            throw {state : '裁剪失败',message : '切割线起点或终点不能在 裁剪多边形内部'};
        }
        // 通过裁切点 分割多边形（只能获得多边形的一部分）
        var slicedPolyLine = turf.lineSlice(intersects.features[0], intersects.features[1], polyLine);
        // 裁剪线分割 保留多边形内部部分
        var slicedClipLine = turf.lineSlice(intersects.features[0], intersects.features[1], clipLine);
        // 重新拼接多边形 存在 对接的问题 所以先进行判断 如何对接裁剪的多边形和裁剪线
        var resultPolyline1 = this.connectLine(slicedPolyLine, slicedClipLine)
        // 闭合线 来构造多边形
        resultPolyline1.geometry.coordinates.push(resultPolyline1.geometry.coordinates[0])
        var resultPolygon1 = turf.lineToPolygon(resultPolyline1);
        // 构造切割的另一面多边形
        var firstPointOnLine = this.isOnLine(turf.point(polyLine.geometry.coordinates[0]),slicedPolyLine);
        var pointList = [];
        if(firstPointOnLine){
            for (var i = 0; i < polyLine.geometry.coordinates.length; i++){
                var coordinate = polyLine.geometry.coordinates[i];
                if(!this.isOnLine(turf.point(coordinate), slicedPolyLine)){
                    pointList.push(coordinate)
                }
            };
        }else{
            var skipNum = 0; // 记录前面被跳过的点的个数
            var isStartPush = false; 
            for (var i = 0; i < polyLine.geometry.coordinates.length; i++){
                var coordinate = polyLine.geometry.coordinates[i];
                if(!this.isOnLine(turf.point(coordinate), slicedPolyLine)){
                    if(isStartPush){
                        pointList.push(coordinate)
                    }else{
                        skipNum++
                    }
                    
                }else{
                    isStartPush = true;
                }
            };
            // 将前面跳过的点补充到 点数组中
            for (var i = 0; i < skipNum; i++){
                pointList.push(polyLine.geometry.coordinates[i])
            }
        }
        var slicedPolyLine_2 = turf.lineString(pointList);
        var resultPolyline2 = this.connectLine(slicedPolyLine_2, slicedClipLine)
        // 闭合线 来构造多边形
        resultPolyline2.geometry.coordinates.push(resultPolyline2.geometry.coordinates[0])
        var resultPolygon2 = turf.lineToPolygon(resultPolyline2);
        // 返回面要素集
        return turf.featureCollection([
            resultPolygon1,
            resultPolygon2
        ]);

    }

    static _multiPolygonClip(polyLine, clipLine) {
        // 将环 多边形分割成 内部逆时针多边形+外部多边形
        var outPolyline,insidePolylineList = [];
        for(var i=0; i < polyLine.geometry.coordinates.length; i++){
            var splitPolyline = turf.lineString(polyLine.geometry.coordinates[i]);
            if(turf.booleanClockwise(splitPolyline)){
                if(outPolyline){
                    throw {state : '裁剪失败',message : '出现了两个外部多边形无法处理'};
                }else{
                    outPolyline = splitPolyline
                }
            }else{
                var intersects = turf.lineIntersect(splitPolyline, clipLine);
                if(intersects.features.length > 0){
                    throw {state : '裁剪失败',message : '切割线不能与内环有交点'};
                }
                insidePolylineList.push(splitPolyline)
            }
        }
        var resultCollection = this._singlePolygonClip(outPolyline, clipLine)
        
        for(var i=0; i < resultCollection.features.length; i++){
            for(var j = 0; j < insidePolylineList.length; j++){
                var startPoint = turf.point(insidePolylineList[j].geometry.coordinates[0]);
                if(turf.booleanPointInPolygon(startPoint, resultCollection.features[i])){
                    resultCollection.features[i] = turf.mask(resultCollection.features[i], turf.lineToPolygon(insidePolylineList[j]));
                }
            }
        }
        return resultCollection
    }

    /**
     * 连接两条线
     * 方法会将两条线段最近的一段直接连接
     */
    static connectLine(line1, line2) {
        var line2_length = line2.geometry.coordinates.length;
        var line1_startPoint = line1.geometry.coordinates[0]
        var line2_startPoint = line2.geometry.coordinates[0]
        var line2_endPoint = line2.geometry.coordinates[line2_length-1]
        var pointList = [];
        // 获取line1 所有点坐标
        for (var i = 0; i < line1.geometry.coordinates.length; i++){
            var coordinate = line1.geometry.coordinates[i];
            pointList.push(coordinate)
        };

        // 判断两条线的 起点是否接近，如果接近 逆转line2线 进行连接
        if(turf.distance(line1_startPoint, line2_startPoint) < turf.distance(line1_startPoint, line2_endPoint)){
            line2.geometry.coordinates = line2.geometry.coordinates.reverse();
        }
        for (var i = 0; i < line2.geometry.coordinates.length; i++){
            var coordinate = line2.geometry.coordinates[i];
            pointList.push(coordinate)
        };
        return turf.lineString(pointList);
    }

    /**
     * 判断点是否在线里面
     * 注：线组成的坐标对比
     */
    static isOnLine(point, line) {
        for (var i = 0; i < line.geometry.coordinates.length; i++){
            var coordinate = line.geometry.coordinates[i];
            if(point.geometry.coordinates[0] === coordinate[0] && point.geometry.coordinates[1] === coordinate[1]){
                return true;
            }
        };
        return false;
    }

    /**
     * 获得两条线交点
     */
    static getIntersectPoints(line1, line2) {
        return turf.lineIntersect(line1, line2);
    }
    /**
     * multiPolygon转polygons,不涉及属性
     */
    static multiPolygon2polygons(multiPolygon) {
        if(multiPolygon.geometry.type !== 'MultiPolygon'){
            return
        }
        var polygons = [];
        multiPolygon.geometry.coordinates.forEach((item)=>{
            var polygon = {
                type:'Feature',
                properties: {},
                geometry: {
                    type:'Polygon',
                    coordinates:[]
                }
            };
            polygon.geometry.coordinates = item;
            polygons.push(polygon)
        });
        return polygons;
    }
     /**
     * polygons转multiPolygon,不涉及属性，只输出属性为{}
     * 考虑polygons中就存在多面的情况
     */
    static polygons2MultiPolygon(geoJson) {
        var newGeoJson = {
            type: "FeatureCollection",
            features: [{geometry: {coordinates: [], type: "MultiPolygon"}, type: "Feature", properties: {}}]
        };
        geoJson.features.forEach((item) => {
            if(item.geometry.type==="Polygon"){
                newGeoJson.features[0].geometry.coordinates.push(item.geometry.coordinates);
            }else{
                item.geometry.coordinates.forEach((item)=>{
                    newGeoJson.features[0].geometry.coordinates.push(item);
                })
            }
        })
        return newGeoJson;
    }
}