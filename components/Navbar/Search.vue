<template>
  <v-container v-show="search">
    <v-text-field
      id="search"
      rounded
      flat
      outlined
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
      class="mx-10"
      @blur="hideSearch"
      autofocus
    />
  </v-container>
</template>

<script>
  export default {
    computed: {
      search() {
        return this.$store.state.navbar.switches.search
      }
    },
    methods: {
      hideSearch() {
        this.$store.commit('navbar/updateSearchSwitch', false)
      }
    }
  }
</script>
