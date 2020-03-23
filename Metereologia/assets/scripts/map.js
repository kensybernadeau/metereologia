


//  var climateZones;

let climateZones= new L.FeatureGroup();
  let sst,eit,sct,wit,nct,nst,oi1t,oi2t,oi3t,oi4t,oi5t;
  console.log("here");
   async function getdata(callback) {

                          var ss = await fetch('http://climatologia.uprm.edu/assets/coordinates/southernslopes.txt')
                              .then(response => response.text())
                              .then((data)=> sst=data)                        
                              .catch(error => console.error(error));

                         var ei  = await fetch('http://climatologia.uprm.edu/assets/coordinates/easternInterior.txt')
                             .then(response => response.text())
                             .then((data)=> eit=data)
                             .catch(error => console.error(error));
                         var sc  = await fetch('http://climatologia.uprm.edu/assets/coordinates/southerncoastal.txt')
                             .then(response => response.text())
                             .then((data)=> sct=data)
                             .catch(error => console.error(error));
                         var wi  = await fetch('http://climatologia.uprm.edu/assets/coordinates/westerninterior.txt')
                             .then(response => response.text())
                             .then((data)=> wit=data)
                             .catch(error => console.error(error));
                         var nc  = await fetch('http://climatologia.uprm.edu/assets/coordinates/northcoastal.txt')
                             .then(response => response.text())
                             .then((data)=> nct=data)
                             .catch(error => console.error(error));
                         var ns  = await fetch('http://climatologia.uprm.edu/assets/coordinates/northenslopes.txt')
                             .then(response => response.text())
                             .then((data)=> nst=data)
                             .catch(error => console.error(error));
                         var oi1  = await fetch('http://climatologia.uprm.edu/assets/coordinates/outlyingislandvieques.txt')
                             .then(response => response.text())
                             .then((data)=> oi1t=data)
                             .catch(error => console.error(error));
                         var oi2  = await fetch('http://climatologia.uprm.edu/assets/coordinates/outlyingislandvieques2.txt')
                             .then(response => response.text())
                             .then((data)=> oi2t=data)
                             .catch(error => console.error(error));
                         var oi3  = await fetch('http://climatologia.uprm.edu/assets/coordinates/outlyingislandvieques3.txt')
                             .then(response => response.text())
                             .then((data)=> oi3t=data)
                             .catch(error => console.error(error));
                         var oi4  = await fetch('http://climatologia.uprm.edu/assets/coordinates/outlyingislandculebra.txt')
                             .then(response => response.text())
                             .then((data)=> oi4t=data)
                             .catch(error => console.error(error));
                         var oi5  = await fetch('http://climatologia.uprm.edu/assets/coordinates/outlyingislandmona.txt')
                             .then(response => response.text())
                             .then((data)=> oi5t=data)
                             .catch(error => console.error(error));


                       climateZones.addLayer(L.polygon(eval(sst), {color: '#ff5500'}).bindTooltip("Southern Slopes"));
                       climateZones.addLayer(L.polygon(eval(eit), {color: '#009600'}).bindTooltip("Eastern Interior"));
                       climateZones.addLayer(L.polygon(eval(sct),{color: '#e60000'}).bindTooltip("Southern Coastal"));
                       climateZones.addLayer(L.polygon(eval(wit), {color: '#ffff00'}).bindTooltip("Western Interior"));
                       climateZones.addLayer(L.polygon(eval(nct), {color: '#8400a8'}).bindTooltip("North Coastal"));
                       climateZones.addLayer(L.polygon(eval(nst),{color: '#005ce6'}).bindTooltip("Northen Slopes"));
                       climateZones.addLayer(L.polygon(eval(oi1t),{color: '#ff7f7f'}).bindTooltip("Outlying Islands"));
                       climateZones.addLayer(L.polygon(eval(oi2t),{color: '#ff7f7f'}));
                       climateZones.addLayer(L.polygon(eval(oi3t),{color: '#ff7f7f'}));
                       climateZones.addLayer(L.polygon(eval(oi4t),{color: '#ff7f7f'}).bindTooltip("Outlying Islands"));
                       climateZones.addLayer(L.polygon(eval(oi5t),{color: '#ff7f7f'}).bindTooltip("Outlaying ISlands"));
                       
                       console.log(climateZones);
                       callback(climateZones);
                      }
                  getdata(climateZones);



     var streets = 	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                              		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                              		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                              	   id: 'mapbox/streets-v11'
                                    });

     var puertoRicoMap = L.map('mapid', {
         center: [18.135412, -66.450806],
         zoom: 9.2,
         layers: [streets,climateZones]
         });

     var baseMaps = {
           "Streets" : streets
         };
     var overlayMaps = {
            "Zonas Climaticas": climateZones
         }
    L.control.layers(baseMaps, overlayMaps).addTo(puertoRicoMap);

      function getTemperaturePinColors(rgb, temperature){
                  //temp between 80-85 farenheit
                //  rgb.r = ((temperature-80)/80)
  console.log("color temp " + temperature);
                     if(temperature == null){
                console.log("null" );
                  rgb.r = 255;
                  rgb.g = 255;
                  rgb.b = 255;

                }
                  else if(temperature>=0 && temperature<40){
                      console.log("0-40" );
                  rgb.r =  0;
                  rgb.g = 100;
                  rgb.b = 255;
                     }
                else if (temperature>=40 && temperature<=70){
                console.log("40-70" );
                  rgb.r = ((temperature-40)/(70-40))*(100) + 0;
                  rgb.g = ((temperature-40)/(70-40))*(255-100) + 100;
                  rgb.b =  ((temperature-40)/(70-40))*(255-255) + 255;

                }
                else if (temperature>70 && temperature<=80){
                console.log("70-80" );
                  rgb.r = ((temperature-70)/(80-70))*(255-100) + 100;
                  rgb.g = ((temperature-70)/(80-70))*(255-255) + 255;
                  rgb.b =  ((temperature-70)/(70-40))*(255-0) + 0;

                }
                else if (temperature>80 && temperature<=90){
                console.log("80-90" );
                  rgb.r = ((temperature-80)/(90-80))*(255-255) + 255;
                  rgb.g = ((temperature-80)/(90-80))*(255-0) + 0;
                  rgb.b =  ((temperature-80)/(90-80))*(8-0) + 0;

                }
                else if (temperature>90 && temperature<=120) {
                console.log("90-120" );
                  rgb.r = ((temperature-90)/(120-90))*(255-100) + 100;
                  rgb.g = 0;
                  rgb.b =  0;

                }
                
                console.log(rgb);

              }
              
      function getPrecipitationPinColors(rgb, precipitation){
          console.log("precipitation color");
         if (precipitation>=0 && precipitation<=0.4){
          rgb.r = (((255-0)*(0.4 - precipitation))/(0.4 -0));
          rgb.g = 255;
          rgb.b = 255;
         

        }
        else if (precipitation>0.4 && precipitation<=4.0){
          rgb.r = 0;
          rgb.g =  (((255-0)*(4 - precipitation))/(4-0.4));
          rgb.b =  255;

        }
        else if (precipitation>4 && precipitation<=24){
          rgb.r = 0;
          rgb.g = 0;
          rgb.b =  (((255-100)*(24-precipitation))/(24-4)) + 100;

        }
        else if (precipitation>24) {
          rgb.r =  100;
          rgb.g = 0;
          rgb.b =  0;

        }
        else if(precipitation == null){
          rgb.r = 0;
          rgb.g = 0;
          rgb.b = 0;
        }
       
      }
      async function getPins(type) {
                           let myPins = [];
                           const response = await fetch('http://climatologia.uprm.edu:8008');
                           const stations = await response.json();


                            for(var i = 0; i < stations.length; i++) {
                            var station = stations[i];


                            var rgb = {r:0,g:0,b:0};
                            var label= station.MUNICIPALITY;
                            var label1;
                            if(type == "minTemp"){
                                getTemperaturePinColors(rgb,station.TMIN);
                                if(station.TMIN == null){label1= " <br>min. Temperature: NULL</br>";}
                                else {label1 = "<br>" + "min. Temperature:"+ (station.TMIN).toString() + "</br>";}
                                console.log("mintemp");
                                }
                            else if (type == "maxTemp"){
                                      getTemperaturePinColors(rgb,station.TMAX);
                                      if(station.TMAX == null){label1= "<br>min. Temperature: NULL</br>";}
                                      else {label1 = "<br>" +"min. Temperature:" +(station.TMAX).toString() + "</br>";}
                                      console.log("maxtemp");
                                    }
                            else if(type  == "precipitation"){
                                     getPrecipitationPinColors(rgb,station.PRCP);
                                    if(station.PRCP == null){label1= "<br>Precipitation: NULL</br>";}
                                    else {label1 = "<br>" +"Precipitation: " +(station.PRCP).toString() + "</br>";}
                                    console.log("prcp");
                                  }



                                  var myIcon = L.divIcon({iconSize: new L.Point(20, 20), className: 'my-div-icon' , iconAnchor:[0,0], html: "<div style=' height:10px; width:10px;  marging-bottom:-15px; margin-left: -3px; border-radius:50%; background-color:rgb("+rgb.r.toString()+","+ rgb.g.toString() +" ," + rgb.b.toString() + ");'></div>" });
    
                                  var myMarker = L.marker([station.LATITUDE, station.LONGITUDE], {icon: myIcon}).bindPopup(label + label1);

                                      myPins.push(myMarker);
                        }
                          return L.layerGroup(myPins);
        }

      var myCurrentPins = getPins("precipitation");

      document.querySelector('.button1').addEventListener('click',
        async function(){
         puertoRicoMap.removeLayer(myCurrentPins);
          myCurrentPins = await getPins("precipitation");
          myCurrentPins.addTo(puertoRicoMap);
        });
      document.querySelector('.button2').addEventListener('click',
          async function(){
           puertoRicoMap.removeLayer(myCurrentPins);
            myCurrentPins = await getPins("maxTemp");
            myCurrentPins.addTo(puertoRicoMap);
          });
      document.querySelector('.button3').addEventListener('click',
          async function(){
           puertoRicoMap.removeLayer(myCurrentPins);
            myCurrentPins = await getPins("minTemp");
            myCurrentPins.addTo(puertoRicoMap);
          });



      //     L.Control.Watermark = L.Control.extend({
      //     onAdd: function(puertoRicoMap) {
      //         var img = L.DomUtil.create('img');
      //
      //         img.src = 'assets/img/zonasclimaticasleyenda.png';
      //         img.style.width = '200px';
      //
      //         return img;
      //     },
      //
      //     onRemove: function(puertoRicoMap) {
      //         // Nothing to do here
      //     }
      // });
      //
      // L.control.watermark = function(opts) {
      //     return new L.Control.Watermark(opts);
      // }
      //
      // L.control.watermark({ position: 'bottomleft' }).addTo(puertoRicoMap);



         	// var popup = L.popup();
          //
         	// function onMapClick(e) {
         	// 	popup
         	// 		.setLatLng(e.latlng)
         	// 		.setContent("You clicked the map at " + e.latlng.toString())
         	// 		.openOn(puertoRicoMap);
         	// }
          //
         	// puertoRicoMap.on('click', onMapClick);
