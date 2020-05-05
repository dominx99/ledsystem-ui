<template>
  <v-container>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Kategoria</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">Parametry</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div>
            <CategoryMainCreate />

            <v-overlay
              :value="createCategoryLoading"
              opacity=".5"
              absolute
            >
              <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <CategoryParametersCreate />

          <v-overlay
            :value="createCategoryParametersLoading || activeCategoryLoading"
            opacity=".5"
            absolute
          >
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import CategoryMainCreate from './../../../components/Admin/Categories/Create/CategoryMainCreate.vue'
import CategoryParametersCreate from './../../../components/Admin/Categories/Create/CategoryParametersCreate.vue'

export default {
  layout: 'admin',
  components: {
    CategoryMainCreate,
    CategoryParametersCreate,
  },
  computed: mapState({
    step: state => state.admin.categories.steps.createCategory,
    createCategoryLoading: state => state.admin.categories.loading.createCategory,
    createCategoryParametersLoading: state => state.admin.categories.loading.updateParameters,
    activeCategoryLoading: state => state.admin.categories.loading.activeCategory,
  }),
  mounted() {
    this.$store.commit('admin/categories/setStep', { name: 'createCategory', value: 1 })

    if (this.$store.state.admin.parameters.parameters.length <= 0) {
      this.$store.dispatch('admin/parameters/fetch')
    }
    this.$store.dispatch('categories/fetch')
  },
}
</script>
