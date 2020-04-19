<template>
  <v-navigation-drawer
    v-model="drawer"
    v-show="$vuetify.breakpoint.mdAndDown"
    absolute
  >
    <div
      class="pa-5 headline text-uppercase text-center"
      style="letter-spacing: 5px !important"
    >
      Ledsystem
    </div>
    <CategoriesList />
    <v-list dense>
      <v-list-item
        @click="toggleTheme()"
      >
        <v-list-item-action>
          <v-icon>mdi-brightness-6</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Ciemny tryb
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list dense>
      <v-list-item
        to="/logowanie"
        link
      >
        <v-list-item-action>
          <v-icon>mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Zaloguj
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import CategoriesList from './../Categories/CategoriesList'

  export default {
    components: {
      CategoriesList,
    },
    computed: {
      drawer: {
        get() {
          return this.$store.state.navbar.drawer
        },
        set(value) {
          this.$store.commit("navbar/updateDrawer", value)
        }
      }
    },
    methods: {
      toggleTheme() {
        this.$vuetify.theme.dark = ! this.$vuetify.theme.dark
      },
    },
 }
</script>
