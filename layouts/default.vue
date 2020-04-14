<template>
  <v-app light :style="{background: $vuetify.theme.themes[theme].background}">
    <v-card
      outlined
    >
      <Navbar />
      <Search />
      <CategoriesToolbar />
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
  import Search from './../components/Navbar/Search'
  import CategoriesToolbar from './../components/Categories/CategoriesToolbar'

  export default {
    components: {
      Navbar,
      Search,
      CategoriesToolbar
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
