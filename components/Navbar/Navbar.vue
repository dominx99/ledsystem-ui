<template>
  <div>
    <v-toolbar
      flat
      height="100"
    >
      <v-container>
        <v-layout row align-center>
          <v-app-bar-nav-icon class="hidden-md-and-up"></v-app-bar-nav-icon>

          <v-spacer></v-spacer>

          <v-toolbar-title
            class="headline text-uppercase navbar-title"
            style="letter-spacing: 5px !important"
          >
            Ledsystem
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <Cart />

          <v-btn @click="showSearch" icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-layout>
      </v-container>
    </v-toolbar>
  </div>
</template>

<script>
import Cart from './../Cart/Cart'

export default {
  components: {
    Cart,
  },
  methods: {
    showSearch() {
      this.$store.commit('navbar/updateSearchSwitch', true)

      document.querySelector("#search").focus()
    },
  }
}
</script>

<style lang="scss" scoped>
  @media (min-width: map-get($grid-breakpoints, 'md')) {
    .navbar-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
