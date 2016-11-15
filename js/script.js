var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

var manhattan = [40.748818,-73.874817];
var brooklyn = [40.637925,-73.948288];
var bronx = [40.841606, -73.874817];
var queens = [40.701464,-73.788300];
var statenisland = [40.576413,-74.104156];
 

var myZoom = 11;
var map3 = L.map('map3', {
  tap: false
}).setView( [40.729308,-73.871040], myZoom);
    map3.addLayer(layer)

var panOptions = {
    animate: true,
    duration: 2
  }

      $(".myButton").click(function() {
      if($(this).attr('id') == 'one' ) {
        map3.panTo(manhattan, panOptions, myZoom);
      } 
      
      else if 
      ($(this).attr('id') == 'two' ) {
        $(this).css('background-color','#fff');
        map3.panTo(brooklyn, panOptions, myZoom);
      } 

      else if 
      ($(this).attr('id') == 'three' ) {
        $(this).css('background-color','#fff');
        map3.panTo(bronx, panOptions);
      } 

      else if 
      ($(this).attr('id') == 'four' ) {
        $(this).css('background-color','#fff');
        map3.panTo(queens, panOptions);
      } 

      else {
        $(this).css('background-color','#fff');
        map3.panTo(statenisland, panOptions);
      }
    });


var geojson;

  //this function takes a value and returns a color based on which bucket the value falls between
  function getColor(risk) {
      return risk > 50 ? '#dc0023' :
             risk > 42  ? '#F97932' :
             risk > 32  ? '#DDB04B' :
             risk > 25  ? '#a6d96a' :
             // risk = 'No Data' ? '#dddddd' :
                        '#72BF21';
  }

  // var legend = L.control({position: 'bottomright'});
  // legend.onAdd = function (map) {
  //     var div = L.DomUtil.create('div', 'info legend'),
  //         grades = [0, 25, 35, 45, 50],
  //         labels = [];
  //     // loop through our density intervals and generate a label with a colored square for each interval
  //     for (var i = 0; i < grades.length; i++) {
  //         div.innerHTML +=
  //             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
  //             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '%' + '<br>' : '+');
  //     }
  //     return div;
  // };
  // legend.addTo(map3);

  // function changeType(){
  //   var type = $('#dropDown :selected').val();
  //   // console.log("type" + type); 
  //   if(mapColorType != type) {
  //     mapColorType = type;
  //       $.getJSON('data/risk.geojson', function(state_data) {
  //         console.log(state_data);
  //         geojson = L.geoJson(state_data,{
  //           style: style, 
  //           onEachFeature: onEachFeature
  //         }).addTo(map3);
  //       });
  //   }
  // }

var bizType = "afield_5";

  $("#aAccommodation").click(function(){
  bizType = 'aAccommodation';
  geojson.setStyle(style);
  });

  $("#aAdministrative").click(function(){
  bizType = 'aAdministrative';
  geojson.setStyle(style);
  });

  $("#aAgriculture").click(function(){
  bizType = 'aAgriculture';
  geojson.setStyle(style);
  });

  $("#aArts").click(function(){
  bizType = 'aArts';
  geojson.setStyle(style);
  });

  $("#aConstruction").click(function(){
  bizType = 'aConstruction';
  geojson.setStyle(style);
  });

  $("#aEducational").click(function(){
  bizType = 'aEducational';
  geojson.setStyle(style);
  });

  $("#aFinance").click(function(){
  bizType = 'aFinance';
  geojson.setStyle(style);
  });

  $("#aHealth").click(function(){
  bizType = 'aHealth';
  geojson.setStyle(style);
  });

  $("#aInformation").click(function(){
  bizType = 'aInformation';
  geojson.setStyle(style);
  });

  $("#aManagement").click(function(){
  bizType = 'aManagement';
  geojson.setStyle(style);
  });

  $("#aManufacturing").click(function(){
  bizType = 'aManufacturing';
  geojson.setStyle(style);
  });

  $("#aMining").click(function(){
  bizType = 'aMining';
  geojson.setStyle(style);
  });

  $("#aIndustries").click(function(){
  bizType = 'aIndustries';
  geojson.setStyle(style);
  });

  $("#aOther").click(function(){
  bizType = 'aOther';
  geojson.setStyle(style);
  });

  $("#aProfessional").click(function(){
  bizType = 'aProfessional';
  geojson.setStyle(style);
  });

  $("#aReal").click(function(){
  bizType = 'aReal';
  geojson.setStyle(style);
  });

  $("#aRetail").click(function(){
  bizType = 'aRetail';
  geojson.setStyle(style);
  });

  $("#aTransportation").click(function(){
  bizType = 'aTransportation';
  geojson.setStyle(style);
  });

  $("#aUtilities").click(function(){
  bizType = 'aUtilities';
  geojson.setStyle(style);
  });

  $("#aWholesale").click(function(){
  bizType = 'aWholesale';
  geojson.setStyle(style);
  });

  $("#afield_5").click(function(){
  bizType = 'afield_5';
  geojson.setStyle(style);
  });


  $(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
  });

  function style(feature) {
    // console.log(feature.properties[bizType]);
    return {
        fillColor: getColor(feature.properties[bizType]),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '0',
        fillOpacity: 0.8
    };
  }

  function mouseoverFunction(e) {
    var layer = e.target;
    var feature = layer.feature;

    layer.setStyle({
        weight: 5,
        opacity: 1,
        color: '#fff',
        dashArray: '',
        fillOpacity: 0.8
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

  var round = parseFloat(layer.feature.properties[bizType]);
  var round2 = Math.round(round)

    $('#side').html('<h3><span class="glyphicon glyphicon-circle-arrow-up" aria-hidden="true"></span> Business in ' + '<b>' + layer.feature.properties.aNeighborhood + '</b>' + ' have a ' + '<b>'+ round2 + '% ' + '</b>' + ' risk factor of opening a storefront based on recent closures and demographics changes.'); 
    }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  function onEachFeature(feature, layer) {
    // var cattype = $('#dropDown :selected').val();
    //console.log(feature.properties[cattype])  
    layer.on({
        mouseover: mouseoverFunction,
        mouseout: resetHighlight
        //click: zoomToFeature
    });
  }
  
  $.getJSON('data/riskmeasure.geojson', function(state_data) {
    console.log(state_data);
    geojson = L.geoJson(state_data,{
      style: style, 
      onEachFeature: onEachFeature
    }).addTo(map3);
  });


