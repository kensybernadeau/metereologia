<template>
<nav>
  <v-app-bar
      text
      app
      color = "green darken-4"
    >
    <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase grey--text">
            <h1 >Metereologia</h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>   
    </v-app-bar >
    <v-navigation-drawer app v-model="drawer" >
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="title">
              
            </v-list-item-title>
            <v-list-item-subtitle>
               
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
            dense
            nav
        >
            <v-list-item
            v-for="link in items"
            :key="link.title"
            link
            router :to="link.route"
            >
            <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ link.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
       
</nav>
</template>
<script>
export default {
    data () {
      return {
        drawer: false,
        items: [
          { title: 'Home', icon: 'mdi-home',route: '/'},
          { title: 'Map', icon: 'mdi-map',route: '/map1' },
         
        ],
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        right: true,
        miniVariant: false,
        expandOnHover: false,
        background: false,
      }
    },
    computed: {
      bg () {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      },
    },
  }
</script>