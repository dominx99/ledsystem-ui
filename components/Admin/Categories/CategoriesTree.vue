<template>
  <div>
    <v-card v-if="loading">
      <v-skeleton-loader
        v-for="(n, i) in 5"
        :key="i"
        transition="scale-transition"
        type="list-item"
      ></v-skeleton-loader>
    </v-card>

    <v-card v-else>
      <v-card-title>
        <span>Kategorie</span>
        <v-btn
          outlined
          color="primary"
          class="ml-auto"
          to="/admin/kategorie/nowa"
        >
          Nowa
        </v-btn>
      </v-card-title>
      <v-treeview
        :active.sync="active"
        :items="categories"
        :open.sync="open"
        activatable
        transition
      >
        <template v-slot:prepend="{ item, active }">
          <v-icon>mdi-account</v-icon>
        </template>
      </v-treeview>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      active: [],
      open: [],
    }),
    computed: {
      categories() {
        return this.$store.state.categories.categoriesTree
      },
      loading() {
        return this.$store.state.categories.loading.categoriesTree
      },
      selected() {
        return this.active[0]
      },
    },
    watch: {
      selected(value) {
        if (typeof value === "undefined") {
          return
        }

        this.$store.dispatch('categories/findById', value)
      }
    },
  }
</script>
