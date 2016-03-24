  // var basemapUrl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
  // var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

  var manhattan = [40.748818,-73.983650];
  var brooklyn = [40.624376,-73.952065];
  var bronx = [40.841606, -73.874817];
  var queens = [40.731389, -73.859024];
  var statenisland = [40.581106, -74.148788];
  var top5arr = [];
  var bottom5arr = [];

  var myZoom = 12;
  //now the fun stuff:  leaflet!
  var map3 = L.map('map3').setView( [40.743615, -73.925285], 11);
    map3.addLayer(layer)

   // //Let's add a marker
  // var marker = L.marker([40.768058,-73.981891]).addTo(map);
  // marker.bindPopup("<b>Hello world!</b><br>I am a popup.")
  //Now let's use our custom-made array to make many markers


  // $(".dropBox").select(function() {
  //     if($(this).attr('id') == 'afs' ) {
  //      map3.panTo(manhattan, panOptions);
// With JQuery
$('#ex1').slider({
  formatter: function(value) {
    return 'Value: ' + value;
  }
});



  var panOptions = {
    animate: true,
    duration: 2
  }

      $(".myButton").click(function() {
      if($(this).attr('id') == 'one' ) {
        $(this).css('background-color','#000000');
        map3.panTo(manhattan, panOptions);
      } 
      
      else if 
      ($(this).attr('id') == 'two' ) {
        $(this).css('background-color','#000000');
        map3.panTo(brooklyn, panOptions);
      } 

      else if 
      ($(this).attr('id') == 'three' ) {
        $(this).css('background-color','#000000');
        map3.panTo(bronx, panOptions);
      } 

      else if 
      ($(this).attr('id') == 'four' ) {
        $(this).css('background-color','#000000');
        map3.panTo(queens, panOptions);
      } 

      else {
        $(this).css('background-color','#000000');
        map3.panTo(statenisland, panOptions);
      }
    });


  //CartoDB Basemap
  // L.tileLayer(basemapUrl,{
  //   attribution: attribution
  // }).addTo(map3);


  var geojson;

  //this function takes a value and returns a color based on which bucket the value falls between
  function getColor(risk) {
      return risk > 50 ? '#dc0023' :
             risk > 45  ? '#F97932' :
             risk > 35  ? '#DDB04B' :
             risk > 25  ? '#a6d96a' :
             // risk = 'No Data' ? '#dddddd' :
                        '#72BF21';
  }

  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 25, 35, 45, 50],
          labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '%' + '<br>' : '+');
      }
      return div;
  };

  legend.addTo(map3);

  var mapColorType = "aUtilities";
  //this function returns a style object, but dynamically sets fillColor based on the data
  function style(feature) {
    // console.log(feature.properties[mapColorType]);
    return {
        fillColor: getColor(feature.properties[mapColorType]),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '0',
        fillOpacity: 0.6
    };
  }

  function changeType(){
    var type = $('#dropDown :selected').val();
    // console.log("type" + type); 
    if(mapColorType != type) {
      mapColorType = type;
       
    }
  }
  //this function is set to run when a user mouses over any polygon
  function mouseoverFunction(e) {
    var layer = e.target;
    var feature = layer.feature;

    layer.setStyle({
        weight: 5,
        opacity: 1,
        color: '#fff',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    //update the text in the infowindow with whatever was in the data
    console.log(feature);

    //console.log(layer.feature.properties.rbLocation); 
    $('#infoWindow').html(layer.feature.properties.aNeighborhood + '<br>' + '<h3>'+ layer.feature.properties[mapColorType] + '%' + '<br>' + '</h3>' + '<br>'  + 'Zipcode: ' + '<br>' + '<h3>' +layer.feature.properties.VALUE1 + '</h3>'); 

  

  }

  //this runs on mouseout
  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  //this is executed once for each feature in the data, and adds listeners
  function onEachFeature(feature, layer) {
    var cattype = $('#dropDown :selected').val();
    top5arr.push(feature.properties[mapColorType]);
    //console.log(feature.properties[cattype])  
    layer.on({
        mouseover: mouseoverFunction,
        mouseout: resetHighlight
        //click: zoomToFeature
    });
  }

  //all of the helper functions are defined and ready to go, so let's get some data and render it!

  //be sure to specify style and onEachFeature options when calling L.geoJson().
  $.getJSON('data/risk.geojson', function(state_data) {
    console.log(state_data);
    geojson = L.geoJson(state_data,{
      style: style, 
      onEachFeature: onEachFeature
    }).addTo(map3);
  });


