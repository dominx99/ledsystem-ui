<template>
  <div>
    <div v-if="loading">
      <v-layout row align-center justify-center>
        <v-skeleton-loader
          v-for="(n, i) in 5"
          :key="i"
          transition="scale-transition"
          type="list-item"
          width="150"
        ></v-skeleton-loader>
      </v-layout>
    </div>

    <div class="evelation-4" v-else>
      <v-flex>
        <v-container>
          <v-layout row align-center justify-center>
            <v-btn
              v-for="(category, index) in categories"
              :key="index"
              class="mr-4 my-2 font-weight-bold"
              color="primary"
              dark
              outlined
              @click="moveToCategory(category)"
            >
              <v-icon v-text="category.icon" class="mr-1"></v-icon>
              <span v-text="category.name"></span>
            </v-btn>
          </v-layout>
        </v-container>
      </v-flex>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.state.categories.parentCategories
    },
    loading() {
      return this.$store.state.categories.loading.parentCategories
    },
  },
  methods: {
    moveToCategory(category) {
      this.$router.push({ name: 'category', params: { category: category.slug } })
    }
  }
}
</script>
