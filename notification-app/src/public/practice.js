var mapobj; //mapオブジェクト
var pline; //map上の直線オブジェクト

var line = [];

function init() {
    let mapcenter = [34.64801074823137, 135.75705349445346];
    let mapZoom = 17;
    mapobj = L.map("mapid", {
        center : mapcenter,
        zoom : mapZoom,
        dragging : false,
        touchZoom : false,
        scrollWheelZoom : false,
        doubleClickZoom : false,
        boxZoom : false,
        tap : false,
        keyboard : false,
        closePopupOnClick : true,
        zoomControl : false
    });
    // mapobj.setView(mapcenter, mapZoom);
    L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png", {
        attribution : "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    }).addTo(mapobj);

    L.marker({lat: 34.64746793595177, lng: 135.75796544551852}).addTo(mapobj);
    L.marker({lat: 34.64801074823137, lng: 135.75796544551852}).addTo(mapobj);
    L.marker({lat: 34.64852707856505, lng: 135.75796544551852}).addTo(mapobj);
    L.marker({lat: 34.64852707856505, lng: 135.75705349445346}).addTo(mapobj);
    L.marker({lat: 34.64852707856505, lng: 135.75623810291293}).addTo(mapobj);
    L.marker({lat: 34.64801074823137, lng: 135.75623810291293}).addTo(mapobj);
    L.marker({lat: 34.64746793595177, lng: 135.75623810291293}).addTo(mapobj);
    L.marker({lat: 34.64746793595177, lng: 135.75705349445346}).addTo(mapobj);

    mapobj.on("click", onMapClick); //地図のクリックイベントでonMapClick関数を呼び出す

    //plineをpolylineオブジェクトとし空座標を入れて地図に追加．
    //bubblingMouseEvents属性をfalseに設定して，イベントがmapobjオブジェクトに連鎖するのを防ぐ
    pline = L.polyline([], {color : "blue", width : 5, bubblingMouseEvents : false}).addTo(mapobj);
    pline.on("click", onLineClick); //clickイベントでonLineClick関数を呼び出す

    line = [
        {lat: 34.64879186210419, lng: 135.75744509696963},
        {lat: 34.64826229418025, lng: 135.75744509696963},
        {lat: 34.64828435957796, lng: 135.75665116310122},
        {lat: 34.64780333257661, lng: 135.75666189193728},
        {lat: 34.64724286640332, lng: 135.75664043426517}
    ]

    for(let i = 0; i < 5; i++) {
        //L.polyline(line[i], {color : "blue", width : 5, bubblingMouseEvents : false}).addTo(mapobj);
        //pline.addLatLng(line[i]["lat"], line[i]["lng"]);
    pline.addLatLng(line[i]);
    }
};

function onMapClick(e) {
    pline.addLatLng(e.latlng); //plineにクリック地点の座標を追加
    // line.append((e.lat, e.lng));
    console.log(e.latlng);
    // let mk = L.marker(e.latlng).bindTooltip(e.latlng+"<br>クリックで削除可能").on("click", onMkClick).addTo(mapobj);
};

function onLineClick(e) {
    pline.setLatLngs([]);
};

function onMkClick(e) {
    let dots = pline.getLatLngs(e);
    dots.pop();
    pline.setLatLngs(dots);
    mapobj.removeLayer(e.target);
}

btnTest.onclick = async evt => {
    let pos = mapobj.getCenter();
    let zoom = mapobj.getZoom();

    let bd = {
        lat: pos.lat,
        lng: pos.lng,
        zoom: zoom,
        line: line
    }
    console.log(bd)
    console.log(JSON.stringify(bd));
    await fetch("/database", {
        method: "POST",
        body: JSON.stringify(bd),
        headers: {
            "Content-Type" : "application/json",
        },
    });

}