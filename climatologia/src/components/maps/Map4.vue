<template>
  <v-row no-gutters>
        <v-col cols="12"   style="background-color:#ecfffd;">
             <!-- <v-system-bar color="deep-purple darken-3"> <v-toolbar-title>Opciones</v-toolbar-title></v-system-bar>  -->
                <!-- <v-app-bar
                color=""
                dark
                dense
                >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                    <v-spacer></v-spacer>
                </v-app-bar> -->
                <v-navigation-drawer
                    v-model="drawer"
                    absolute
                    bottom
                    temporary
                    right
                    class="menu-drawer pt-0 pb-0"
                    
                >
                    <v-col cols="12"   style="background-color:#ecfffd;">
                    <!-- <v-btn @click="showMap = !showMap">
                    Toggle map
                </v-btn> -->
                                    <!-- <h3 class="fontsz">Filtros:</h3> -->
                                    <!-- <div class="form-check"  v-for="layer in layers" :key="layer.id">
                                        <label class="form-check-label" >
                                            <input class="form-check-input" type="checkbox" v-model="layer.active"  @change="layerChanged(layer.id, layer.active)" />
                                            {{ layer.name }}
                                        </label>
                                        <hr>
                                    </div> -->
                                    <v-row no-gutters>
                                        <v-col cols="12" >
                                            <hr>
                                            <h3 class="fontsz">Filtros:</h3>
                                            <!-- <v-select
                                            v-model="selectedFilters"
                                            :items="filters"
                                            chips
                                            label="Filtros"
                                            multiple
                                            outlined
                                            ></v-select> -->
                                            <!-- <v-combobox
                                            v-model="selectedFilters"
                                            :items="filters"
                                            chips
                                            open-on-clear="true"
                                            clearable
                                            label="Filtros"
                                            multiple
                                            prepend-icon="mdi-layers"
                                            solo
                                            >
                                            <template dense v-slot:selection="{ attrs, item, select, selected }">
                                                <v-chip
                                                v-bind="attrs"
                                                :input-value="selected"
                                                close
                                                x-small
                                                @click="select"
                                                @click:close="remove(item)"
                                                >
                                                <strong>{{ item }}</strong>&nbsp;
                                                <span></span>
                                                </v-chip>
                                            </template>
                                            </v-combobox> -->
                                            <v-combobox
                                                v-model="selectedFilters"
                                                :items="filters"
                                                label="Filtros"
                                                prepend-icon="mdi-layers"
                                                multiple
                                                small-chips
                                                clearable
                                                chips
                                                solo
                                            ></v-combobox>
                                            <hr>
                                        </v-col>
                                    </v-row >
                                    <v-col cols="12" class="pt-0 pb-0">
                                        <h3 class="fontsz">Fecha:</h3>
                                        <v-select
                                            v-model="selectedDateType"
                                            prepend-icon="mdi-menu"
                                            :items="['Día', 'Rango']"
                                            label="Fecha"
                                            dense
                                            solo
                                            outlined
                                        ></v-select>
                                        </v-col>

                                        <v-col v-if="selectedDateType === 'Día'" cols="12" class="pt-0 pb-0">
                                            <v-dialog
                                            ref="dialog"
                                            v-model="modal"
                                            :return-value.sync="date"
                                            persistent
                                            width="290px"
                                            style="z-index: 1000;"
                                            >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                v-model="date"
                                                label="Fecha"
                                                prepend-icon="mdi-calendar"
                                                v-on="on"
                                                outlined
                                                solo
                                                dense
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker color="#82ada9"  v-model="date" :show-current="false" scrollable min="2000-08-15" max="2019-03-20">
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                            </v-date-picker>
                                            </v-dialog>
                                            <hr>
                                        </v-col>
                                        <v-col v-else-if="selectedDateType === 'Rango'">
                                            <v-dialog
                                            ref="dialog"
                                            v-model="modal2"
                                            :return-value.sync="date"
                                            persistent
                                            width="290px"
                                            style="z-index: 1000;"
                                            >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                v-model="date"
                                                label="Fecha"
                                                prepend-icon="mdi-calendar"
                                                v-on="on"
                                                solo
                                                dense
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker color="#82ada9"  v-model="date" scrollable range min="2000-08-15" max="2019-03-20">
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                            </v-date-picker>
                                            </v-dialog>
                                            <hr>
                                    </v-col>
                                    <!-- <hr> -->
                        <v-col  class="col-12 pt-0 pb-0" >
                                        <h3 class="fontsz">Variables:</h3>
                                        
                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                    id="btn1"
                                    v-on="on"
                                    class="ma-2 btn1"
                                    :loading="loading"
                                    :disabled="loading"
                                    @click="fetchStations('prcp', (rangeDate?   date[0] :  date ), (rangeDate? date[1] :   date )), toogle('btn1',['btn2','btn3'])"
                                    >
                                        <v-icon>  mdi-weather-pouring</v-icon>
                                        <!-- Precipitación -->
                                    </v-btn>
                                </template>
                                <span>Precipitación</span>
                            </v-tooltip>
                                        
                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                    id="btn2"
                                    v-on="on"
                                    class="ma-2 btn2"
                                    :loading="loading1"
                                    :disabled="loading1"
                                    @click="fetchStations('tmax', (selectedDateType === 'Rango'?   date[0] :   date ), (rangeDate? date[1] :   date )), toogle('btn2',['btn1','btn3'])"
                                    >
                                        <v-icon>mdi-thermometer-lines</v-icon>
                                        <!-- Temperatura Máxima -->
                                    </v-btn>
                                </template>
                                <span>Temperatura Máxima</span>
                            </v-tooltip>
                                        
                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                    id="btn3"
                                    v-on="on"
                                    class="ma-2 btn3"
                                    :loading="loading2"
                                    :disabled="loading2"
                                    @click="fetchStations('tmin', (rangeDate?  date[0] :  date ), (rangeDate? date[1] :  date )), toogle('btn3',['btn1','btn2'])"
                                    >
                                        <v-icon>mdi-thermometer-lines</v-icon>
                                        <!-- Temperatura Máxima -->
                                    </v-btn>
                                </template>
                                <span>Temperatura Mínima</span>
                            </v-tooltip>
                            <hr>
                        </v-col>
                </v-col>
                </v-navigation-drawer>
                <v-col class="pa-0">
                    <v-app-bar-nav-icon class="drawer-icon" @click.stop="drawer = !drawer" color="#1976d2"></v-app-bar-nav-icon>
    <l-map
      class="map"
      ref="map"
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="z-index: 0;"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
    
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <v-container v-model="stationsList"> 
          <div v-for="(station, i) in stationsList" 
           :key="`${station.DATE}-${Math.floor(Math.random() * Math.floor(100000))}-${station.STATIONID}`">
            <l-marker
                :lat-lng="coordinates(station.LATITUDE, station.LONGITUDE)"
                :icon="iconList[i]"
            >
            <l-popup>
                <strong> Agencia: </strong>
                {{station.AGENCYID}}
                <br>
                <strong>ID de Estación: </strong>
                {{(station.STATIONID).toString()}}
                <br>
                <strong>Municipio: </strong>
                {{(station.MUNICIPALITY).toString()}}
                <br>
                <strong>Zona Climática: </strong> 
                {{(station.CLIMATEZONE).toString()}}
                <br>
            <div v-if="selectedDateType === 'Día'"> 
               <strong> {{(currentPinView === 'prcp'? 'Precipitación:' : currentPinView === 'tmax'? 'Temperatura Máxima' : 'Temperatura Mínima')}}</strong> 
               {{(station.VALUE === null ? 'NULL' : (station.VALUE).toString())}}
               {{(currentPinView === 'prcp' && station.VALUE != null? '\"' : station.VALUE != null? '°F' : '')}}
               <br> 
            </div>
            <div v-else-if="selectedDateType === 'Rango' && station.AVGVALUE != undefined">
                <strong> Precipitación Promedio: </strong>"  {{(station.AVGVALUE).toString()}}
                <br> 
                <strong>Máximo: </strong>  {{(station.MAXVALUE).toString()}}
                <br>
                <strong>Mínimo: </strong> {{(station.MINVALUE).toString()}}
                <br>
                <strong>Desviación Estándar: </strong>{{(station.STDDEVVALUE).toString()}} 
                <br>
                <strong>Error Estándar: </strong>{{(station.STDERRVALUE).toString()}}
                <br>
                <v-btn @click="setChart( 'rangeModal', 'close','line', '  Estación: ' + station.STATIONID + ',  Municipio: ' + station.MUNICIPALITY + ',  Rango de Fecha: ' + `${date[0]} ~ ${date[1]}` + 
                          ',  Máximo: ' + station.MAXVALUE + (currentPinView == 'prcp'? ' in' : ' ºF') + ',  Mínimo: ' + station.MINVALUE + (currentPinView == 'prcp'? ' in' : ' ºF') +',  Desviación Estándar: ' + station.STDERRVALUE + (currentPinView == 'prcp'? ' in' : ' ºF') + ',  Error Estándar: ' + station.STDERRVALUE + (currentPinView == 'prcp'? ' in' : ' ºF'), 'Precipitación ', station.STATIONID , (currentPinView === 'prcp'? '#191970 ' :currentPinView === 'tmax'? '#ad2121' : '#52ad21'))">
                <v-icon>{{(currentPinView === 'prcp'? 'mdi-chart-bar' : 'mdi-chart-line')}}</v-icon>
                Graficar
                </v-btn>
            </div>
           </l-popup> 
          </l-marker>
          </div>
      </v-container>
      <v-container>
          <l-polygon
          v-if="EI"
          :lat-lngs="EasternInterior.latlngs"
          :color="EasternInterior.color"
          :fillColor="EasternInterior.color"
          >
          <l-popup content="Eastern Interior" />
          </l-polygon>
      </v-container>
      <v-container>
          <l-polygon
          v-if="NC"
          :lat-lngs="NorthernCoastal.latlngs"
          :color="NorthernCoastal.color"
          :fillColor="NorthernCoastal.color"
          >
          <l-popup content="Eastern Interior" />
          </l-polygon>
      </v-container>
      <v-container>
          <l-polygon
          v-if="NS"
          :lat-lngs="NorthernSlopes.latlngs"
          :color="NorthernSlopes.color"
          :fillColor="NorthernSlopes.color"
          >
          <l-popup content="Eastern Interior" />
          </l-polygon>
      </v-container>
      <v-container>
           <l-polygon
          v-if="OI"
          :lat-lngs="OutlyingIsland.latlngs"
          :color="OutlyingIsland.color"
          :fillColor="OutlyingIsland.color"
          >
          <l-popup content="Eastern Interior" />
          </l-polygon>
      </v-container>
      <v-container>
          <l-polygon
          v-if="OI"
          :lat-lngs="OutlyingIsland1.latlngs"
          :color="OutlyingIsland1.color"
          :fillColor="OutlyingIsland1.color"
          >
          <l-popup content="Eastern Interior" />
          </l-polygon>
      </v-container>
      <v-container>
          <l-polygon
          v-if="OI"
          :lat-lngs="OutlyingIsland2.latlngs"
          :color="OutlyingIsland2.color"
          :fillColor="OutlyingIsland2.color"
          >
          <l-popup content="Eastern Interior" />
          </l-polygon>
      </v-container>
      <v-container>
          <l-polygon
          v-if="OI"
          :lat-lngs="OutlyingIsland3.latlngs"
          :color="OutlyingIsland3.color"
          :fillColor="OutlyingIsland3.color"
          >
          <l-popup content="Eastern Interior" />
          </l-polygon>
      </v-container>
      <v-container>
          <l-polygon
          v-if="OI"
          :lat-lngs="OutlyingIsland4.latlngs"
          :color="OutlyingIsland4.color"
          :fillColor="OutlyingIsland4.color"
          >
          <l-popup content="Eastern Interior" />
          </l-polygon>
      </v-container>
      <v-container>
          <l-polygon
          v-if="SC"
          :lat-lngs="SouthernCoastal.latlngs"
          :color="SouthernCoastal.color"
          :fillColor="SouthernCoastal.color"
          >
          <l-popup content="Eastern Interior" />
          </l-polygon>
      </v-container>
      <v-container>
          <l-polygon
          v-if="SS"
          :lat-lngs="SouthernSlopes.latlngs"
          :color="SouthernSlopes.color"
          :fillColor="SouthernSlopes.color"
          >
          <l-popup content="Eastern Interior" />
          </l-polygon>
      </v-container>
      <v-container>
           <l-polygon
          v-if="WI"
          :lat-lngs="WesternInterior.latlngs"
          :color="WesternInterior.color"
          :fillColor="WesternInterior.color"
          >
          <l-popup content="Eastern Interior" />
          </l-polygon>
      </v-container>

    </l-map>
    <div id="rangeModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close">&times;</span>
            <canvas id="myChart" width="400" height="150"></canvas>
        </div>
    </div>
    </v-col>
        </v-col>
        <!-- <v-img
          :src="require('../../assets/nullicon.png')"
          height="0"
        /> -->
  </v-row>
</template>

<script>

/* eslint-disable */
import { latLngBounds, latLng } from "leaflet";
import { LPolygon, LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import leaflet from 'leaflet'
import L from 'leaflet';
// import { climateZones } from '../layers/ClimateZones.js'
import { EasternInterior, NorthernCoastal, NorthernSlopes, OutlyingIsland, OutlyingIsland1, OutlyingIsland2, OutlyingIsland3, OutlyingIsland4, SouthernCoastal, SouthernSlopes, WesternInterior } from '../layers/ClimateZones2.js'
import Chart from 'chart.js'
export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LPolygon
  },
  data() {
    return {
      bounds: latLngBounds([
          [18.453116, -64.987199],
        [18.097713, -68.029587]
        
      ]),
      maxBounds: latLngBounds([
          [18.453116, -64.987199],
        [18.097713, -68.029587]
        
      ]),
      zoom: 9.2,
      center: latLng(18.135412,-66.450806),
      url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
      
      withPopup: latLng(18.135412,-66.450806),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      
       loader: null,
        loading: false,
        loading1: false,
        loading2: false,
        menu: false,
        modal: false,
        modal2: false,
        menu2: false,
        selectedDateType: 'Día',
        date: '2018-04-13',
        drawer: false,
        group: null,

        formatedDate: '',
        toogled:null,
        calculation: null,
        startdate: null,
        enddate: null,
        // range: null,
        currentPinView: null,
        pins: null,
        map: null,
        tileLayer: null,
        singleDate: true,
        rangeDate:false,
        legend: null, 
        rangeDialog: 'close',
        // layer array variable, holds all the layers that can be instantiated in a map instance 
        // layers: climateZones,
        stationsList: [],
        iconList: [],
        EasternInterior,
        NorthernCoastal,
        NorthernSlopes,
        OutlyingIsland,
        OutlyingIsland1,
        OutlyingIsland2,
        OutlyingIsland3,
        OutlyingIsland4,
        SouthernCoastal,
        SouthernSlopes,
        WesternInterior,
        EI: true,
        NC: true,
        NS: true,
        OI: true,
        SC: true,
        SS: true,
        WI: true,
        selectedFilters: ['Eastern Interior', 'Northern Coastal', 'Northern Slopes', 'Outlying Island', 'Southern Coastal', 'Southern Slopes', 'Western Interior'],
        filters: ['Eastern Interior', 'Northern Coastal', 'Northern Slopes', 'Outlying Island', 'Southern Coastal', 'Southern Slopes', 'Western Interior']
        
    };
  },
  computed: {

  },
  mounted: async function () {
    //   await this.initLayers();
    //   await this.layerChanged(this.layers[0].id, this.layers[0].active);
      this.setButtonPressed('btn1')
    //   this.updatePins(this.date, 'prcp')
        await this.fetchStations('prcp', (this.rangeDate?   this.date[0] :   this.date ), (this.rangeDate? this.date[1] :   this.date ));
      this.$nextTick(() => {
        // this.$refs.map.mapObject.ANY_LEAFLET_MAP_METHOD();
      });
  },
  watch: {
      group () {
        this.drawer = false
      },
        selectedFilters: function () {
            // for (var i=0; i < this.selectedFilters.length; i++) {
                if (this.selectedFilters.includes("Eastern Interior")) {
                    this.EI = true
                    console.log('EI true')
                } else if (!this.selectedFilters.includes("Eastern Interior")) {
                    console.log('EI false')
                    this.EI = false
                }

                if (this.selectedFilters.includes("Northern Coastal")) {
                    this.NC = true
                } else if (!this.selectedFilters.includes("Northern Coastal")) {
                    this.NC = false
                }

                if (this.selectedFilters.includes("Northern Slopes")) {
                    this.NS = true
                } else if (!this.selectedFilters.includes("Northern Slopes")) {
                    this.NS = false
                }

                if (this.selectedFilters.includes("Outlying Island")) {
                    this.OI = true
                } else if (!this.selectedFilters.includes("Outlying Island")) {
                    this.OI = false
                }

                if (this.selectedFilters.includes("Southern Coastal")) {
                    this.SC = true
                } else if (!this.selectedFilters.includes("Southern Coastal")) {
                    this.SC = false
                }

                if (this.selectedFilters.includes("Southern Slopes")) {
                    this.SS = true
                } else if (!this.selectedFilters.includes("Southern Slopes")) {
                    this.SS = false
                }

                if (this.selectedFilters.includes("Western Interior")) {
                    this.WI = true
                } else if (!this.selectedFilters.includes("Western Interior")) {
                    this.WI = false
                }


            // }
        },
        selectedDateType: function () {
            if (this.selectedDateType === 'Día') {
                this.dateType('singleDate')
                // this.date = new Date().toISOString().substr(0, 10)
                this.date = '2018-04-04'
            } else if (this.selectedDateType === 'Rango') {
                this.dateType('rangeDate')
                // this.date = [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)]
                this.date = ['2018-04-01', '2018-04-07']
            }
        },
        date: function () {
            if (this.selectedDateType === 'Rango' && this.date.length == 2) {
                // this.updatePins(this.date, 'prcp');
                this.fetchStations(this.currentPinView, (this.rangeDate?   this.date[0] :   this.date ), (this.rangeDate? this.date[1] :   this.date ));
            } else if (this.selectedDateType === 'Día') {
                // this.updatePins(this.date, 'prcp');
                this.fetchStations(this.currentPinView, (this.rangeDate?   this.date[0] :   this.date ), (this.rangeDate? this.date[1] :   this.date ));
            }
            
        },
        loader: function () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    },
  methods: {
      remove (item) {
      this.selectedFilters.splice(this.selectedFilters.indexOf(item), 1)
      this.selectedFilters = [...this.selectedFilters]
    },
      icon: function (value, agency) {
        var rgb = { r: 0, g: 0, b: 0 }
        var nullIcon
        if (this.currentPinView == 'tmin') {
            // set the rgb value of the current station element using the average value for range date  or the value  single date type with a ternary operator 
            this.getTemperaturePinColors(rgb, value);
        } else if (this.currentPinView == "tmax") {
            this.getTemperaturePinColors(rgb, value);
        } else if (this.currentPinView == "prcp") {
            this.getPrecipitationPinColors(rgb, value);
        }
        
        if (value !== null || value === undefined){
            // nullIcon = "<img style='float: left; width: 11px; height: 11px; marging-bottom:-15px; margin-left: -1px; margin-top: -1px;' src='http://climatologia.uprm.edu/img/nullicon2.svg' id='null-div-icon'/>"
            var style = (agency === 'USGS'? " height:10px; width:10px;  marging-bottom:-15px; margin-left: -3px; border-radius:50%; border: 1px solid #ca6a1b; background-color:rgb(" + rgb.r.toString() + "," + rgb.g.toString() + " ," + rgb.b.toString() + ");" : "width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 10px solid " +  "rgb(" + rgb.r.toString() + "," + rgb.g.toString() + " ," + rgb.b.toString() + ")" +";")
            return L.divIcon({ iconSize: new L.Point(20, 20), className: 'my-div-icon', iconAnchor: [0, 0], html: "<div style='"+ style +"'>"+ "</div>" })
        } 
        else if (value === null){      
        return L.divIcon({ iconSize: new L.Point(20, 20), className: 'my-div-icon', iconAnchor: [0, 0], html: "<div style=' height:10px; width:10px;  marging-bottom:-15px; margin-left: -3px; border-radius:50%; border: 1px solid #ca6a1b; background-color:rgb(" + rgb.r.toString() + "," + rgb.g.toString() + " ," + rgb.b.toString() + ");'>"+ "<img style='float: left; width: 11px; height: 11px; marging-bottom:-15px; margin-left: -1px; margin-top: -1px;' src='" +  require('../../assets/nullicon.png') +"' id='null-div-icon'/>" +"</div>" })
        }
        
    },
      coordinates: function (latitude, longitude) {
        return latLng(latitude,longitude)
    },
        initLayers:function () {
            // iterates over all layer elemts of the layers array instance variable
            this.layers.forEach((layer) => {
                // filter the elements of type feature equals polygon
                const polygonFeatures=layer.features.filter(feature => feature.type === 'polygon');
                // iterates over each polygon feature in the layer element 
                polygonFeatures.forEach((feature)=>{
                    // creates a leaflet object of the polygon of the feature using
                    // the coordinates and color as wll as binding the name to a tooltip 
                    feature.leafletObject= L.polygon(feature.coords,feature.color).bindPopup(feature.name);
                });
            });
        },
        /**
        *  add and removes layers from map based on the active param value, which is the active property of the layer element
        **/
        layerChanged:function (layerId,active) {
            const layer=this.layers.find(layer=>layer.id===layerId);
            layer.features.forEach((feature)=>{
                if (active){
                    feature.leafletObject.addTo(this.$refs.map.mapObject);
                }else{
                    feature.leafletObject.removeFrom(this.$refs.map.mapObject);
                }
            });
        },
        /**
        * get pin colors rgb values for temperature 
        * rgb: object instance consisting of key value of the rgb ({r,g,b})
        * temperature: int value of the temperature 
        **/
        getTemperaturePinColors:function (rgb,temperature) {
            if(temperature==null){
                rgb.r=255;rgb.g=255;rgb.b=255;
            }else if (temperature>=0&&temperature<40) {
                rgb.r=0;rgb.g=100;rgb.b=255;
            }else if (temperature>=40&& temperature<=70) {
                rgb.r=((temperature-40)/(70-40))*(100)+0;rgb.g=((temperature-40)/(70-40))*(255-100)+100;rgb.b=((temperature-40)/(70-40))*(255-255)+255;
            }else if (temperature>70&&temperature<=80) {
                rgb.r=((temperature-70)/(80-70))*(255-100)+100;rgb.g =((temperature-70)/(80-70))*(255-255)+255;rgb.b=((temperature-70)/(70-40))*(255-0)+0;
            }else if (temperature>80&&temperature<=90) {
                rgb.r=((temperature-80)/(90-80))*(255-255)+255;rgb.g=((temperature-80)/(90-80))*(255-0)+0;rgb.b=((temperature-80)/(90-80))*(8-0)+0;
            }else if(temperature>90&&temperature<=120){
                rgb.r=((temperature-90)/(120-90))*(255-100)+100;rgb.g = 0;rgb.b = 0;
            }
        },
        /**
        * get pin colors rgb values for precipitation 
        * rgb: object instance consisting of key value of the rgb ({r,g,b})
        * prcp: int value of the precipitation
        **/
        getPrecipitationPinColors: function (rgb, prcp) {
            if (prcp >= 0 && prcp <= 0.4) {
                rgb.r=(((255-0)*(0.4-prcp))/(0.4-0));
                rgb.g=255;
                rgb.b = 255;
            }else if (prcp>0.4&&prcp <=4.0) {
                rgb.r=0;
                rgb.g=(((255-0)*(4-prcp))/(4-0.4));
                rgb.b=255;
            }else if (prcp > 4 && prcp <= 24) {
                rgb.r=0;
                rgb.g=0;
                rgb.b=(((255-100)*(24-prcp))/(24-4)) + 100;
            }else if (prcp > 24) {
                rgb.r = 100;
                rgb.g = 0;
                rgb.b = 0;
            }else if (prcp == null) {
                rgb.r = 0;
                rgb.g = 0;
                rgb.b = 0;
                }
            },
        /**
        * set pints in the current map instance with id 'map'
        * type: string of the type of pin view ('tmax','tmin','prcp')
        **/
        setPins: async function (type, start, end) {
            //removes the current pins instnace in the map instance  
            if (this.pins != null) {
                // console.log('removing pins')
                this.$refs.map.mapObject.removeLayer(this.pins);
            }
            // set the global startdate variable instance to the start date value send in the params, selected in the date picker 
            this.startdate = start;
            // set the global startdate variable instance to the end date value send in the params, selected in the date picker 
            this.enddate = end;
            // set the global variable currentPinView with the current type of pin display on map
            this.currentPinView = type;
            // array instance to hold the new values for the pins to be add to the map
            let myPins = [];
            // response of the api call to be generated
            var response = null;
            // holds the json array of the api call response 
            var stations = null;
            
            // change api call depending on the type of view if it is single date or range date, based on the global bool variables singleDate and rangeDate 
            if (this.singleDate) {
                response = await fetch('http://climatologia.uprm.edu:8008/api?' + 'q=data&' + 'startdate=' + this.startdate + '&enddate=' + this.enddate + '&elem=' + this.currentPinView).catch(function (error) { alert (error); });
            } else if (this.rangeDate) { 
                 response = await fetch('http://climatologia.uprm.edu:8008/api?' + 'q=data&' + 'calc=all' + '&startdate=' + this.startdate + '&enddate=' + this.enddate + '&elem=' + this.currentPinView).catch(function (error) { alert (error); });
                // console.log('http://climatologia.uprm.edu:8008/api?' + 'q=data&' + 'calc=all' + '&startdate=' + this.startdate + '&enddate=' + this.enddate + '&elem=' + this.currentPinView)
            }
                stations = await response.json();
                this.stationsList = stations
            // iterate sover each element of the json array 
            for (var i = 0; i < stations.length; i++) {
                // current station element in the stations array 
                var station = stations[i];
                // rgb key value object instace for the pin representing the current station element
                var rgb = { r: 0, g: 0, b: 0 };
                // common label for each station 
                var label = '<strong>ID de Estación: </strong>' + (station.STATIONID).toString() + '<br>' 
                           + '<strong>Municipio: </strong> ' + (station.MUNICIPALITY).toString() + '<br>' + '<strong>Zona Climática: </strong>'+ (station.CLIMATEZONE).toString() + '<br>';
                var graphlabel ='  Estación: ' + station.STATIONID + ',  Municipio: ' + station.MUNICIPALITY + ',  Rango de Fecha: ' + this.formatedDate + 
                          ',  Máximo: ' + station.MAXVALUE + (type == 'prcp'? ' in' : ' ºF') + ',  Mínimo: ' + station.MINVALUE + (type == 'prcp'? ' in' : ' ºF') +',  Desviación Estándar: ' + station.STDERRVALUE + (type == 'prcp'? ' in' : ' ºF') + ',  Error Estándar: ' + station.STDERRVALUE + (type == 'prcp'? ' in' : ' ºF'); 
                // options for the type of pin view selected ('tmax', 'tmin', 'prcp')
                if (type == 'tmin') {
                    // set the rgb value of the current station element using the average value for range date  or the value  single date type with a ternary operator 
                    this.getTemperaturePinColors(rgb, (this.rangeDate? station.AVGVALUE : station.VALUE));
                    // generates the rest of the label for the pin base on the type of vie range date or single date using the ternary operator 
                    if ((this.rangeDate? station.AVGVALUE == null : station.VALUE == null)) { label = (this.rangeDate ? label + "<strong> Temperatura Mínima Promedio: </strong>" + "NULL" + "<br>" + "<strong>Máximo: </strong>" + "NULL"  + "<br>" +
                            "<strong>Mínimo: </strong>" + "NULL" + "<br>" +  "<strong>Desviación Estándar: </strong>" + "NULL" + "<br>" + "<strong>Error Estándar: </strong>" + "NULL" + "<br>"   : label + "<strong>Temperatura Mínima :</strong>" + "NULL" );}
                    else { label = (this.rangeDate?  label + "<strong> Temperatura Mínima Promedio: </strong>" + (station.AVGVALUE).toString() +  "F<br>" + "<strong>Máximo: </strong>" + (station.MAXVALUE).toString() + " F<br>" + 
                                                "<strong>Mínimo: </strong>" + (station.MINVALUE).toString() + " F<br>" + "<strong>Desviación Estándar: </strong>" + (station.STDDEVVALUE).toString() + " F<br>" + "<strong>Error Estándar: </strong>" + (station.STDERRVALUE).toString() + " F<br>" + `<div><button onclick="myFunction('line', '${ graphlabel }', 'Temperatura Mínima', '${station.STATIONID}', '#52ad21')"> Graficar </button> </div>`:  label + "<strong>Temperatura Mínima :</strong>" + (station.VALUE).toString() + " F<br>" ); }
                }
                else if (type == "tmax") {
                    this.getTemperaturePinColors(rgb, (this.rangeDate? station.AVGVALUE : station.VALUE));
                    if ((this.rangeDate? station.AVGVALUE == null : station.VALUE == null)) { label = (this.rangeDate ? label + "<strong> Temperatura Máxima  Promedio: </strong>" + "NULL" + "<br>" + "<strong>Máximo: </strong>" + "NULL" + "<br>" +
                            "<strong>Mínimo: </strong>" + "NULL" + "<br>" + "<strong>Desviación Estándar: </strong>" + "NULL" + "<br>" + "<strong>Error Estándar: </strong>" + "NULL" + "<br>"  : label + "<strong> Temperatura Máxima: </strong>" + "NULL");
                    }
                    else { 
                        label = (this.rangeDate?  label + "<strong> Temperatura Máxima  Promedio: </strong>" + (station.AVGVALUE).toString() + " F<br>" + "<strong>Máximo: </strong>" + (station.MAXVALUE).toString() + " F<br>" + 
                                                "<strong>Mínimo: </strong>" + (station.MINVALUE).toString() + " F<br>" + "<strong>Desviación Estándar: </strong>" + (station.STDDEVVALUE).toString() + " F<br>" + "<strong>Error Estándar: </strong>" + (station.STDERRVALUE).toString() + " F<br>" + `<div><button onclick="myFunction('line','${graphlabel}',' Temperatura Máxima', '${station.STATIONID }' , '#ad2121')"> Graficar </button> </div>`:  label + "<strong> Temperatura Máxima: </strong>" + (station.VALUE).toString() + " F<br>" );
                    }

                }
                else if (type == "prcp") {
                    this.getPrecipitationPinColors(rgb, (this.rangeDate? station.AVGVALUE : station.VALUE));
                    if ((this.rangeDate? station.AVGVALUE == null : station.VALUE == null)) { label = (this.rangeDate ? label + "<strong> Precipitación Promedio: </strong>" + "NULL" + "<br>" + "<strong>Máximo: </strong>" + "NULL" + "<br>" + "<strong>Mínimo: </strong>" + "NULL" + "<br>" + "<strong>Desviación Estándar: </strong>" + "NULL" + "<br>" + "<strong>Error Estándar: </strong>" + "NULL" +"<br>" 
                             : label + "<strong> Precipitación: </strong>" + "NULL");
                    }
                    else { label = (this.rangeDate? label + "<strong> Precipitación Promedio: </strong>" + (station.AVGVALUE).toString()  + "\"<br>" + "<strong>Máximo: </strong>" + (station.MAXVALUE).toString() + "\"<br>" +  "<strong>Mínimo: </strong>" + (station.MINVALUE).toString() + "\"<br>" + "<strong>Desviación Estándar: </strong>" + (station.STDDEVVALUE).toString() + "\"<br>" + "<strong>Error Estándar: </strong>" + (station.STDERRVALUE).toString() + "\"<br>" 
                    + `<div><button onclick="setChart( 'rangeModal', 'close','line', '${graphlabel}', 'Precipitación ', '${station.STATIONID }', '#191970 ')"> Graficar </button> </div>` : label + "<strong> Precipitación: </strong>" + (station.VALUE).toString() + "\"<br>"); }

                }
                // variable for null icons
                var nullIcon;
                //if the value for a pin is null generates a image to put over the pin to show null station 
                if ((this.rangeDate ? station.AVGVALUE == null : station.VALUE == null)) {
                    nullIcon = "<img style='float: left; width: 11px; height: 11px; marging-bottom:-15px; margin-left: -1px; margin-top: -1px;' src='http://climatologia.uprm.edu/img/nullicon2.svg' id='null-div-icon'/>";
                } else {
                    nullIcon = '';
                }
                var myIcon = L.divIcon({ iconSize: new L.Point(20, 20), className: 'my-div-icon', iconAnchor: [0, 0], html: "<div style=' height:10px; width:10px;  marging-bottom:-15px; margin-left: -3px; border-radius:50%; border: 1px solid #ca6a1b; background-color:rgb(" + rgb.r.toString() + "," + rgb.g.toString() + " ," + rgb.b.toString() + ");'>"+ nullIcon +"</div>" });

                var myMarker = L.marker([station.LATITUDE, station.LONGITUDE], { icon: myIcon }).bindPopup( label);

                myPins.push(myMarker);
            }
            // console.log('assinging pins')
            this.pins = L.layerGroup(myPins);
            // console.log('adding pins to map')
            this.pins.addTo(this.$refs.map.mapObject);
            return;
        },
        fetchStations: async function (type, start, end) {
            //removes the current pins instnace in the map instance
            this.iconList = []  
            if (this.pins != null) {
                // console.log('removing pins')
                this.$refs.map.mapObject.removeLayer(this.pins);
            }
            // set the global startdate variable instance to the start date value send in the params, selected in the date picker 
            this.startdate = start;
            // set the global startdate variable instance to the end date value send in the params, selected in the date picker 
            this.enddate = end;
            // set the global variable currentPinView with the current type of pin display on map
            this.currentPinView = type;
            // array instance to hold the new values for the pins to be add to the map
            let myPins = [];
            // response of the api call to be generated
            var response = null;
            // holds the json array of the api call response 
            var stations = null;
            
            // change api call depending on the type of view if it is single date or range date, based on the global bool variables singleDate and rangeDate 
            if (this.singleDate) {
                response = await fetch('http://climatologia.uprm.edu:8008/api?' + 'q=data&' + 'startdate=' + this.startdate + '&enddate=' + this.enddate + '&elem=' + this.currentPinView).catch(function (error) { alert (error); });
            } else if (this.rangeDate) { 
                 response = await fetch('http://climatologia.uprm.edu:8008/api?' + 'q=data&' + 'calc=all' + '&startdate=' + this.startdate + '&enddate=' + this.enddate + '&elem=' + this.currentPinView).catch(function (error) { alert (error); });
                // console.log('http://climatologia.uprm.edu:8008/api?' + 'q=data&' + 'calc=all' + '&startdate=' + this.startdate + '&enddate=' + this.enddate + '&elem=' + this.currentPinView)
            }
                stations = await response.json();
                this.stationsList = stations

                for (var i =0; i < this.stationsList.length; i++) {
                    this.iconList.push(this.icon((this.selectedDateType === 'Día' ? this.stationsList[i].VALUE :this.selectedDateType === 'Rango' ? this.stationsList[i].AVGVALUE : null), this.stationsList[i].AGENCYID))
                }
            return;
        },
        /**
        * update pin view with the current date format 'MM/DD/YYYY - MM/DD/YYYY' and the type of pin view ('tmax','tmin','prcp')
        * date: string  of the date format MM/DD/YYYY - MM/DD/YYYY
        **/
        updatePins: function (date, pinView) {
            // this.date = date;
            // this.currentPinView = pinView;
            // var month = date.substring(0,2);
            // var month2 = (this.rangeDate? date.substring(13, 15) : date.substring(0, 2));

            // var day = date.substring(3, 5);
            // var day2 = (this.rangeDate? date.substring(16, 18) : date.substring(3, 5));
            
            // var year = date.substring(6, 10);
            // var year2 = (this.rangeDate? date.substring(19, 23) : date.substring(6, 10));
            
            // console.log(pinView + ', ' + year + '-' + month + '-' + day + '>' + year2 + '-' + month2 + '-' + day2 )

            this.setPins(pinView, (this.rangeDate?   this.date[0] :   this.date ), (this.rangeDate? this.date[1] :   this.date ));
            // this.formatedDate = (this.rangeDate?   month + '/' + day + '/' +  year + ' <-> '  + month2 + '/' + day2 + '/' + year2 :   month   + '/' + day + '/' + year );
            this.formatedDate = (this.rangeDate?   this.date[0] + ' <-> ' +  this.date[1] :   this.date );
            // (this.rangeDate? document.getElementById('selecteddate').innerHTML = 'Rango: ' +  month + '/' + day + '/' +  year + ' <-> '  + month2 + '/' + day2 + '/' + year2 : document.getElementById('selecteddate').innerHTML =  month   + '/' + day + '/' + year );
        },
        /**
        * change a button propeties to make it look pressed
        **/
        toogle: function (id,btnlist) {
            for(var i = 0; i< btnlist.length;i++){
            document.getElementById(btnlist[i]).classList.remove('selectedbtn');
            document.getElementById(btnlist[i]).classList.add(btnlist[i]);
            }
            document.getElementById(id).classList.remove(id);
            document.getElementById(id).classList.add('selectedbtn');
        },
        /**
        * set the type of date to true 
        **/
        dateType: function(type) {
            // console.log('change: ' + type);
            if (type == 'singleDate') { 
                this.rangeDate = false
                this.singleDate = true
            }
            else if( type == 'rangeDate') { 
                this.singleDate= false
                this.rangeDate= true
            }
        },
        /**
        * close range modal
        **/
        closeRangeModal: function () {
            this.rangeModal.style.display = "none";
        },
        /**
        *
        **/
        openModal: function (modalId, spanClass) {
            var modal = document.getElementById(modalId);
            modal.style.display = 'block';
            var span = document.getElementsByClassName(spanClass)[0];
            span.onclick = function () {
              modal.style.display = 'none';
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            }
        },
        setChart: async function (modalId, spanClass, charttype, title, labelName, stationID, color) {
            //since the button is in the HTML dialog  intances are used instead of passing parameters throught a function call 
            var modal = document.getElementById(modalId);
            modal.style.display = 'block';
            var span = document.getElementsByClassName(spanClass)[0];

            var config=null;
            var stationLabels =[]
            var dataSetResponse = await fetch('http://climatologia.uprm.edu:8008/api?' + 'q=data&' + 'calc=none' + '&station='+ stationID + '&startdate='  + this.startdate + '&enddate=' + this.enddate + '&elem=' + this.currentPinView).catch(function (error) { alert (error); });
            var yLabel = (this.currentPinView === 'prcp' ? 'Precipitación (in)' : this.currentPinView === 'tmax' ? 'Temperatura Máxima (ºF)' : 'Temperatura Mínima (ºF)')
            var stationsDataSet = await dataSetResponse.json();
            // console.log(stationsDataSet);
            // var dataSet = stationsDataSet.filter(function(station) {
            //     return station.STATIONID == stationID 
            // });

            const date1 = new Date(this.startdate);
            const date2 = new Date(this.enddate);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            // console.log(diffDays + " days");
            var maxTickX = 20;

            if (diffDays/7 <= 1) {
                // XLabelTicks = diffDays;
                maxTickX = diffDays;
            } else if (diffDays/30 >= 1 && diffDays/30 <= 12) {
                // XLabelTicks = Math.ceil(diffDays / 30);
                maxTickX = Math.ceil(diffDays / 30) * 12;
            } else if (diffDays / 365 >= 1) {
                // XLabelTicks = Math.ceil(diffDays / 365) * 12
                maxTickX = Math.ceil(diffDays / 365)*12*2;
            }
            var formatedDataSet = []
            // for (i in stationsDataSet) {
            //     var temp = new Object();
            //         stationLabels.push(stationsDataSet[i].DATE.substring(0, 16));
            //         temp['y'] = stationsDataSet[i].VALUE;
            //         formatedDataSet.push(temp);
            // }
            for (var i = 0; i < stationsDataSet.length; i ++) {
                var temp = new Object();
                    stationLabels.push(stationsDataSet[i].DATE.substring(0, 16));
                    temp['y'] = stationsDataSet[i].VALUE;
                    formatedDataSet.push(temp);
            }
            switch(this.currentPinView) {
                case 'prcp':
                    config =  {
                        type: 'bar',
                        data: {
                            labels: stationLabels,
                            datasets: [{
                                label: labelName,
                                backgroundColor: color,
                                borderColor: color,
                                data: formatedDataSet,
                                // backgroundColor: "rgba(25, 25, 112, 1)"
                            }]
                        },
                        options: {
                            responsive: true,
                            title: {
                                display: true,
                                text: title,
                                fontColor: '#000',
                                fontSize: 14
                            },
                            tooltips: {
                                mode: 'index',
                                intersect: false,
                            },
                            animation: {
                                duration: 0 
                            },
                            hover: {
                                // mode: 'nearest',
                                // intersect: true
                                animationDuration: 0
                            },
                            responsiveAnimationDuration: 0,
                            scales: {
                                xAxes: [{
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Día',
                                        fontStyle: 'bold',
                                        fontColor: '#000'
                                    },
                                    ticks: {
                                        source: 'labels',
                                        autoSkip: true,
                                        autoSkipPadding: 20,
                                        maxRotation: 90,
                                        maxTicksLimit: maxTickX,
                                        // stepSize: diffDays / maxTickX,
                                        callback: function (tick, index) {
                                            // console.log(Math.ceil(diffDays / 10) % (index + 1));
                                            // return ((index + 1) % (Math.ceil(diffDays / 10)))  ? '' : index + 1;
                                             return index + 1;
                                        }
                                    }
                                }],
                                yAxes: [{ 
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: yLabel,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                        ticks: {
                                            beginAtZero: true,
                                            steps: 10,
                                            stepValue: 10,
                                            max: 100
                                        }
                                    }
                                }]
                            }
                        }
                    };
                    break;
                default: 
                config = {
                        type: 'line',
                        data: {
                            labels: stationLabels,
                            datasets: [{
                                label: labelName,
                                backgroundColor: color,
                                borderColor: color,
                                data: formatedDataSet,
                                fill: false
                            }]
                        },
                        options: {
                            responsive: true,
                            title: {
                                display: true,
                                text: title,
                                fontColor: '#000',
                                fontSize: 14
                            },
                            tooltips: {
                                mode: 'index',
                                intersect: false,
                            },
                            animation: {
                                duration: 0
                            },
                            hover: {
                                // mode: 'nearest',
                                // intersect: true
                                animationDuration: 0
                            },
                            responsiveAnimationDuration: 0,
                            scales: {
                                xAxes: [{
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Día',
                                        fontStyle: 'bold',
                                        fontColor: '#000'
                                    },
                                    ticks: {
                                        source: 'labels',
                                        autoSkip: true,
                                        autoSkipPadding: 4,
                                        maxRotation: 0,
                                        maxTicksLimit: maxTickX,
                                        stepSize: 3,
                                        callback: function (value, index) {
                                            return index + 1;
                                        }
                                    }
                                }],
                                yAxes: [{
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: yLabel,
                                        fontStyle: 'bold',
                                        fontColor: '#000',
                                        ticks: {
                                            steps: 10,
                                            stepValue: 10,
                                            max: 100
                                        }
                                    }
                                }]
                            }
                        }
                    };

            }
            
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, config);

            span.onclick = function () {
              modal.style.display = 'none';
              myChart.destroy();
            }
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                    myChart.destroy();
                }
            }

        },
        setButtonPressed: function (id) {
            this.toogled = id
            document.getElementById(id).classList.remove(id)
            document.getElementById(id).classList.add('selectedbtn')
        },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    }
  }
};
/* eslint-enable */
</script>
<style scoped>
@import 'http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css';

@media only screen and (min-width: 1024px) and (max-width: 1440px) { 
 .map{
        height: 300px;
        margin: 0;
        padding: 0;
    }
    .my-div-icon{
        background-color:#fd8424;
        border-radius:3px;
        border:2px solid #ca6a1b;
        }
    .my-div-icon{
        height:0;
        width:0;
        background-color:rgba(0,0,0,0);
        border-radius:40%;
        border-style:none
    }
    
              
    /* .input {
        width: 15vh;
     } */
    #selecteddate{
        float: right;
        position:absolute;
        z-index:1001; 
        top: 0;
        left:25%;
        font-size:5vh;
    }
    .fontsz {
        font-size: 4vh;
    } 
 }
.map{
        height: 64vh;
        margin: 0;
        padding: 0;
    }
@media only screen and (min-width: 1440px) and (max-width: 1680px) { 
    .map{
        height: 58vh;
        margin: 0;
        padding: 0;
    }
    .drawer-icon {
        border: 2px solid #a6babc;
        background-color: #ffffff;
        float: right;
        position:absolute;
        z-index:1001; 
        top: 20%;
        left:1%;
        font-size:5vh
    }
    .menu-drawer {
        width: 30% !important;
    }
    .my-div-icon{
        background-color:#fd8424;
        border-radius:3px;
        border:2px solid #ca6a1b;
        }
    .my-div-icon{
        height:0;
        width:0;
        background-color:rgba(0,0,0,0);
        border-radius:40%;
        border-style:none
    }
    
              
    /* .input {
        width: 15vh;
     } */
    #selecteddate{
        float: right;
        position:absolute;
        z-index:1001; 
        top: 0;
        left:25%;
        font-size:5vh;
    }
    .fontsz {
        font-size: 2vh;
    }
 }
@media only screen and (min-width: 1680px) and (max-width: 1920px) { 

 }
 @media only screen and (min-width: 1920px) and (max-width: 32560px) { 
    
 }
@media only screen and (min-width: 32560px)  { 

 }
 
/* @media only screen and (min-width:600px){
    html,body {
        height:100%;
    }
    .flex-fill {
        flex: 1;
    }
    .map{
        height:140%;
    }
    .my-div-icon{
        background-color:#fd8424;
        border-radius:3px;
        border:2px solid #ca6a1b
    }
    .my-div-icon{
        height:0;
        width:0;
        background-color:rgba(0,0,0,0);
        border-radius:40%;
        border-style:none;
    }
    .input {
        width: 10vw;
    }
    #selecteddate{
        float: right;
        position:absolute;
        z-index:1001; top: 0;
        top: 95%;
        left:3%;
        font-size:3vh;
    }
    .fontsz {
        font-size: 2vh;
    }
} */
/* @media only screen and (max-width:600px){
    .map{
        height: 300px;
        margin: 0;
        padding: 0;
    }
    .my-div-icon{
        background-color:#fd8424;
        border-radius:3px;
        border:2px solid #ca6a1b;
        }
    .my-div-icon{
        height:0;
        width:0;
        background-color:rgba(0,0,0,0);
        border-radius:40%;
        border-style:none
    }
              
    .input {
        width: 15vh;
     }
    #selecteddate{
        float: right;
        position:absolute;
        z-index:1001; 
        top: 0;
        left:25%;
        font-size:5vh;
    }
    .fontsz {
        font-size: 4vh;
    }  
} */
    html,body {
        height:100%;
    }
    .btn1{
        background-color: blue !important;
    }
    .btn2{
        background-color: red !important;
    }
    .btn3{
        background-color: green !important;
    }
    .selectedbtn{
        /* background-color: grey; */
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19) !important;
        border: 2px solid grey !important; /* Green */
        /* color: white; */
    }
    .unselectedbtn{
        background-color: whitesmoke;
        color: black;
    }
    /* The Modal (background) */
    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 10000; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }
    /* Modal Content */
    .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
    }
    /* The Close Button */
    .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }
    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
    .triangle-left {
        width: 0;
        height: 0;
        border-top: 23px solid transparent;
        border-bottom: 23px solid transparent;
        border-right: 23px solid red;
    }

    .inner-triangle {
        position: relative;
        top: -20px;
        left: 2px;
        width: 0;
        height: 0;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
        border-right: 20px solid blue;
    }
    /* .drawer-icon {
        background-color: #ffffff;
        float: right;
        position:absolute;
        z-index:1001; 
        top: 15%;
        left:1%;
        font-size:5vh
    } */
</style>