<template>
  <v-app light :style="{background: $vuetify.theme.themes[theme].background}">
    <Drawer />
    <v-card
      class="elevation-1"
    >
      <Navbar />
      <Search />
      <CategoriesToolbar class="hidden-sm-and-down" />
    </v-card>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Navbar from './../components/Navbar/Navbar'
  import Drawer from './../components/Navbar/Drawer'
  import Search from './../components/Navbar/Search'
  import CategoriesToolbar from './../components/Categories/CategoriesToolbar'

  export default {
    components: {
      Navbar,
      Drawer,
      Search,
      CategoriesToolbar,
    },
    data: () => ({
      dialog: true,
    }),
    computed:{
      theme(){
        return (this.$vuetify.theme.dark) ? 'dark' : 'light'
      }
    }
  }
</script>
