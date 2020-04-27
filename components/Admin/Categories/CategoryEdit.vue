<template>
  <div>
   <v-card v-if="loadingCategory">
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

    <v-card v-if="category.id && ! loadingCategory">
      <v-card-title v-text="category.name"></v-card-title>
      <v-tabs
        v-model="tab"
      >
        <v-tab>Kategoria</v-tab>
        <v-tab>Parametry</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-overlay
            :value="loadingUpdateCategory"
            opacity=".5"
            absolute
          >
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>

          <CategoryMainEdit />
        </v-tab-item>

        <v-tab-item>
          <v-overlay
            :value="loadingUpdateParameters"
            opacity=".5"
            absolute
          >
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>

          <CategoryParametersEdit />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import CategoryMainEdit from './Edit/CategoryMainEdit.vue'
  import CategoryParametersEdit from './Edit/CategoryParametersEdit.vue'

  export default {
    components: {
      CategoryMainEdit,
      CategoryParametersEdit,
    },
    data: () => ({
      tab: 0,
    }),
    computed: mapState({
      category: state => state.categories.activeCategory,
      loadingCategory: state => state.categories.loading.activeCategory,
      loadingUpdateCategory: state => state.admin.categories.loading.updateCategory,
      loadingUpdateParameters: state => state.admin.categories.loading.updateParameters,
    }),
    mounted() {
      this.$store.dispatch('categories/fetch')
    },
  }
</script>
