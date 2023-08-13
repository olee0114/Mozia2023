// let wtopo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
//   attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
// });

let map = L.map('map', {
    minZoom: 15,
    maxZoom: 19
});

var imageUrl = 'assets/rasters/islandimage.png',
    imageBounds = [[37.86188992,12.46104057], [37.87174639,12.47492509]];
L.imageOverlay(imageUrl, imageBounds).addTo(map);

$.getJSON("/assets/mozia.geojson", function(data){

  function onEachFeature (feature, thing) {
    thing.bindPopup('<div style="background-color: #f4eedc">'+'<div style="text-align: center; color: #030c8a; font-size: 9px"><b>'+ 
      feature.properties["Name"] + '</b></div>' + '<div style="color: #030c8a; font-size: 8px">'+
      feature.properties["Description"]+'</div></div>', {
        maxWidth: 250
      })
  }

  let scavi = L.geoJson(data, {

  pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius:20,
        color: '#c95410',
           });
    },
    onEachFeature: onEachFeature
    
  });

   scavi.addTo(map);

});

map.setView([37.867254,12.468143], setInitialMapZoom());


// let baseMaps = {
//     "Physical": wphys,
//     "Boundaries/Places": wtopo
// };

// let layerControl = L.control.layers(baseMaps).addTo(map);

function PointActions (feature, layer) {

  //   return new L.popup(latlng, {
  //   .setContent('Name'+'<br></br>'+'Description'), 
  //   .openOn(map)
  // });

};

// let tip = document.getElementsByClassName('leaflet-popup-tip').style.background-color = "#f4eedc"


var width = document.documentElement.clientWidth;

window.addEventListener('resize', function(event){
    // get the width of the screen after the resize event

    // tablets are between 768 and 922 pixels wide
    // phones are less than 768 pixels wide
    if (width < 768) {
        // set the zoom level to 15
        map.setZoom(14);
    } else if (width >= [768] && width < [922]) {

   mapZoom = [15];

}
    else {
        // set the zoom level to 16
        map.setZoom(16);
    }



});

function setInitialMapZoom() {

  let viewportWidth = window.innerWidth;

  let mapZoom;

  if (viewportWidth < [768]) {

   mapZoom = [14];

}  else if (viewportWidth >= [768] && viewportWidth < [922]) {

   mapZoom = [15];

}  else {

   mapZoom = [16];

}

return mapZoom;

}


