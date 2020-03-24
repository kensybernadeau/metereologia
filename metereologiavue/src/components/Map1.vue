<template>
  <v-col cols="12">
    <v-card class="pa-2 justify-center" outlined tile>
      <v-card class="justify-center pa-0">
        <v-card-title class="headline justify-center light-green lighten-1 white--text">
          <v-row>
            <v-col cols="12">
              <h3 >Map</h3>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-card-title>
        <v-card-title class="light-green lighten-5">
            <v-row align="center" >
            <v-subheader>Description</v-subheader>
            </v-row>
        </v-card-title>
        <hr />
        <v-container id="scroll-target" style="max-height: 400px" >
          <v-row  style="height: 500px"  >
            <v-col cols="12">
              <v-card >
               <div id="mapid"></div>


              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <div></div>
         <hr />
        <v-card-actions class="justify-center">
          <v-row>
            <v-col cols="4">              
                  <div class="text-center">
                    <v-btn    large color="primary" dark >
                      <h1>Var 1</h1>
                    </v-btn>
                     <v-btn    large color="primary" dark >
                      <h1>Var 1</h1>
                    </v-btn>
                     <v-btn    large color="primary" dark >
                      <h1>Var 1</h1>
                    </v-btn>
                  </div>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-col>
</template>

<script>

export default {
  data: () => ({

  }),
   mounted() {
    //   let leafletScript = document.createElement('leafletscript');
    //   leafletScript.setAttribute('src', '../leaflet-1.6.0/leaflet.js');
    //   document.head.appendChild(leafletScript);

    //   let leafletStyle = document.createElement('leafletstyle');
    //   leafletStyle.setAttribute('src', '../leaflet-1.6.0/leaflet.');
    //   document.head.appendChild(leafletStyle);

    //   let mapScript = document.createElement('leafletstyle');
    //   mapScript.setAttribute('src', '../scripts/map.js');
    //   document.head.appendChild(mapScript);

    },
    methods:{
 }
};
</script>
<script src="../scripts/map.js"></script>
<script src="../leaflet-1.6.0/leaflet.js"></script>

<style scoped>
.v-col.v-text-field {
  border: 1px solid red;
  background-color: lightcoral;
}
.invalid{
    border: 1px solid red;
    background-color: lightcoral;
}
</style>