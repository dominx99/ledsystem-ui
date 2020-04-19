<template>
  <div>
    <v-card v-if="loading">
      <v-skeleton-loader
        transition="scale-transition"
        type="card-heading"
      ></v-skeleton-loader>
      <v-skeleton-loader
        v-for="(n, i) in 5"
        :key="i"
        transition="scale-transition"
        type="list-item-avatar"
      ></v-skeleton-loader>
    </v-card>

    <v-card v-if="category.id && ! loading">
      <v-card-title v-text="category.name"></v-card-title>
    </v-card>
  </div>
</template>

<script>
  export default {
    computed: {
      category() {
        return this.$store.state.categories.activeCategory
      },
      loading() {
        return this.$store.state.categories.loading.activeCategory
      }
    },
  }
</script>
