// mapbox API key
var mapboxAccessToken = 'pk.eyJ1Ijoib3c0ZzE4IiwiYSI6ImNrd3FidTN5NjBoczQybnJ0OGx4YzI0aTkifQ.ZlJI4Z9ANiTTU5afVvX2sw';
// Define map parameters
var map = L.map('map').setView([51.495, -0.09], 10);

// mapbox theme and source
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

// read in borough data. boroughData defined in data/london_boroughs.js
var geojson = L.geoJSON(boroughData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map)


// Add info box
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// Method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Stops for Weapons and Drugs Against Deprivation (London, 2020)</h4>'+ (props ?
        '<b>' + props.name + '</b><br />' + 'Stops per 1000 people: ' + '<b>' + props.stops + '</b>'
        + '</b><br />' + 'IMD Score: ' + '<b>' + props.imd + '</b>'
        : 'Hover over a borough (or click one to zoom in)');
};

info.addTo(map);

// Create legend div and add data/legend.png
var legend = L.control({ position: 'bottomright' }); // REMEBER TO CHANGE FONT

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend')

    div.innerHTML = '<img src="./data/legend.png", width=130px />';
    div.style.transform = 'translate(-30px, -15px)rotate(-45deg)';

    return div;
};

legend.addTo(map);

function getColor(d) {
    // Map quantile combinations (nonile) to map colours
    return d == 1 ? '#F2B300' :
        d == 2 ? '#B36601' :
            d == 3 ? '#000000' :
                d == 4 ? '#F3E5B3' :
                    d == 5 ? '#B3B3B3' :
                        d == 6 ? '#366387' :
                            d == 7 ? '#F3F3F3' :
                                d == 8 ? '#B4D3E0' :
                                    d == 9 ? '#4F9DC1' :
                                        '#eee';
}

function style(feature) {
    // Default style for boroughs
    return {
        fillColor: getColor(feature.properties.nonile),
        weight: 1.5,
        opacity: 0.4,
        color: feature.properties.nonile == 3 ? 'white' : 'black',
        fillOpacity: 0.9
    };
}

function highlightFeature(e) {
    // Style change on hover
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: 'black',
        dashArray: '',
        opacity: 0.5,
        fillOpacity: 0.6
    });

    info.update(layer.feature.properties);

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    // Style change on un-hover
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    // Zoom on click
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

// Control scrolling elements of map visualisation (Empty)
gs_map = d3.graphScroll()
    .container(d3.select('.container-3'))
    .graph(d3.selectAll('.container-3 #map'))
    .eventId('uniqueIdMap')  // namespace for scroll and resize events
    .sections(d3.selectAll('.container-3 #sections > div'))
    .on('active', function (i) {
        // pass
    })