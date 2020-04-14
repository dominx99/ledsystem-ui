<template>
  <div>
    <div v-if="loading">
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
    </div>
    <v-card
      v-else-if="categories.length > 0"
      class="mx-auto"
      tile
    >
      <v-list shaped>
        <v-subheader>Kategorie</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in categories"
            :key="i"
            @click="redirect(item.slug)"
          >
            <v-list-item-icon v-if="item.icon">
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
  export default {
    computed: {
      categories() {
        return this.$store.state.categories.activeCategories
      },
      loading() {
        return this.$store.state.categories.loading.activeCategories
      }
    },
    methods: {
      redirect(slug) {
        console.log('push', slug)
        this.$router.push(slug)
      }
    }
  }
</script>
