var mapSelectObj; //地図選択のmapオブジェクト
var nodeSelectObj;

var msBasic_Map; //地図の種類を列挙した配列オブジェクト
var nsBasic_Map; //地図の種類を列挙した配列オブジェクト
var baseMap; // 地図切り替えメニューのオブジェクト

let mapDefaultCenter = [34.6476991, 135.7589965];
let mapDefaultZoom = 18;

function init(){
    mapSelectObj = L.map("map-select", {
        center : mapDefaultCenter,
        zoom : mapDefaultZoom,
        dragging : true,
        touchZoom : false,
        scrollWheelZoom : false,
        doubleClickZoom : true,
        boxZoom : false,
        tap : false,
        keyboard : true,
        closePopupOnClick : false,
        zoomControl : true
    });

    nodeSelectObj = L.map("map-nodes-select", {
        center : mapDefaultCenter,
        zoom : mapDefaultZoom,
        dragging : true,
        touchZoom : false,
        scrollWheelZoom : false,
        doubleClickZoom : true,
        boxZoom : false,
        tap : false,
        keyboard : true,
        closePopupOnClick : false,
        zoomControl : true
    })
    // L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png", {
    //     minZoom : 5,
    //     maxZoom : 18,
    //     attribution : "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    // }).addTo(mapSelectObj);

    msBasic_Map = mapListSet(msBasic_Map);
    nsBasic_Map = mapListSet(nsBasic_Map);

    mapSelectObj.addLayer(msBasic_Map[0]);
    nodeSelectObj.addLayer(nsBasic_Map[0]);

    L.control.layers(baseMap).addTo(mapSelectObj);
    L.control.layers(baseMap).addTo(nodeSelectObj);

}

function btnMapSelect(){
    let pos  = mapSelectObj.getCenter();
    let zoom = mapSelectObj.getZoom();

    document.getElementById("fixed-map-center-text").innerHTML = "(" + pos.lat + ", " + pos.lng + ") : " + zoom;
    
    save2JSON({
        lat : pos.lat,
        lng : pos.lng,
        zoom : zoom,
    });

    // nodeSelectObj.
}
function btnNodesSelect(){

}

// function getFarmData(){
//     farmData = "../../database/output.json";

// }

function save2JSON(jsn){
    outDir = "../../database/";
    outfile = "output.json";
    var fs = require('fs');
    let data = JSON.stringify({FarmData: jsn}, null, ' ');
    fs.writeFileSync(outDir + outfile, data);
}

function mapListSet(Basic_Map){
    Basic_Map = new Array();
    Basic_Map[ 0 ] = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom : 5,
        maxZoom : 22,
        maxNativeZoom : 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        continuousWorld: false
    });
    Basic_Map[ 1 ] = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
        minZoom : 5,
        maxZoom : 22,
        maxNativeZoom : 18,
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    });
    Basic_Map[ 2 ] = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
        minZoom : 5,
        maxZoom : 22,
        maxNativeZoom : 18,
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    });
    Basic_Map[ 3 ] = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
        minZoom : 5,
        maxZoom : 22,
        maxNativeZoom : 18,
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    });
    // Basic_Map[ 4 ] = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png', {
    //     minZoom : 5,
    //     maxZoom : 18,
    //     attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    // });
    // Basic_Map[ 5 ] = L.tileLayer('http://{s}.tile.stamen.com/{variant}/{z}/{x}/{y}.png', {
    //     minZoom : 5,
    //     maxZoom : 18,
    //     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ',
    //     variant: 'toner-background'
    // });
    // Basic_Map[ 6 ] = L.tileLayer('http://{s}.tile.stamen.com/{variant}/{z}/{x}/{y}.png', {
    //     minZoom : 5,
    //     maxZoom : 18,
    //     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ',
    //     variant: 'toner-lite'
    // });
    // Basic_Map[ 7 ] = L.tileLayer('http://{s}.tile.stamen.com/{variant}/{z}/{x}/{y}.png', {
    //     minZoom: 1,
    //     maxZoom: 16,
    //     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ',
    //     variant: 'watercolor'
    // });
    // Basic_Map[ 8 ] = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    //     minZoom : 5,
    //     maxZoom : 18,
    //     attribution: 'Tiles &copy; <a href="http://www.esrij.com/"> Esri Japan </a>'
    // });
    // Basic_Map[ 9 ] = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
    //     maxZoom: 13,
    //     attribution: 'Tiles by <a href="http://www.esrij.com/"> Esri Japan </a>'
    // });
    baseMap = {
        "OpenStreetMap": Basic_Map[ 0 ],
        "国土地理院 標準地図": Basic_Map[ 1 ],
        "国土地理院 淡色地図": Basic_Map[ 2 ],
        "国土地理院 写真": Basic_Map[ 3 ],
        // "国土地理院 白地図": Basic_Map[ 4 ],
        // "Stamen Toner-Background": Basic_Map[ 5 ],
        // "Stamen Toner-Lite": Basic_Map[ 6 ],
        // "Stamen Watercolor": Basic_Map[ 7 ],
        // "Esri World Topo Map": Basic_Map[ 8 ],
        // "Esri Ocean Base Map": Basic_Map[ 9 ],
    };
    return Basic_Map;
}
