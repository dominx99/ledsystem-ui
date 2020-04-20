<template>
  <div>
    <v-card
      class="mb-12 d-flex justify-center align-center"
      color="grey darken-1"
      height="200px"
      v-if="productLoading || categoriesParametersLoading"
    >
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-card>

    <div v-else>
      <v-row v-for="(parameter, i) in parameters" :key="i">
        <v-col cols="6">
          <v-text-field
            outlined
            type="text"
            color="primary"
            label="Nazwa"
            :value="parameter.name"
            disabled
          />
        </v-col>
        <v-col cols="6">
          <v-select
            outlined
            multiple
            color="primary"
            chips
            small-chips
            deletable-chips
            label="Wartość"
            item-text="value"
            item-value="id"
            :items="parameter.values"
            @input="e => handleParameterValues(i, e)"
          />
        </v-col>
      </v-row>
    </div>

    <div>
      <v-row v-for="(parameter, i) in newParameters" :key="i">
        <v-col cols="12" md="6">
          <v-text-field
            outlined
            type="text"
            color="primary"
            label="Nazwa"
            @blur="removeNewParameter(i)"
            @input="e => handleNewParameterName(i, e)"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-combobox
            :delimiters="[',']"
            outlined
            label="Wartość"
            small-chips
            deletable-chips
            multiple
            @blur="removeNewParameter(i)"
            @input="e => handleNewParameterValues(i, e)"
          >
          </v-combobox>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      product() {
        return this.$store.state.admin.products.product
      },
      productLoading() {
        return this.$store.state.admin.products.loading.product
      },
      categoriesParameters() {
        return this.$store.state.admin.parameters.productCategoriesParameters
      },
      categoriesParametersLoading() {
        return this.$store.state.admin.parameters.loading.productCategoriesParameters
      },
      parameters() {
        return this.$store.state.admin.parameters.newProduct.existingParameters
      },
      newParameters() {
        return this.$store.state.admin.parameters.newProduct.newParameters
      }
    },
    watch: {
      async productLoading(value) {
        if (value === false) {
          await this.$store.dispatch('admin/parameters/fetchByCategoryIds', this.product.categories.map(category => category.id))

          this.$store.commit('admin/parameters/setNewProductExistingParameters', this.categoriesParameters.map(parameter => {
            return {
              name: parameter.name,
              values: parameter.default_values,
              parameter_name_id: parameter.id,
              parameter_value_ids: [],
            }
          }))
        }
      },
    },
    methods: {
      handleParameterValues(index, values) {
        this.$store.commit('admin/parameters/updateParameterValues', { index, values })
      },
      handleNewParameterName(index, name) {
        this.$store.commit('admin/parameters/updateNewParameterName', { index, name })
      },
      handleNewParameterValues(index, values) {
        this.$store.commit('admin/parameters/updateNewParameterValues', { index, values })
      },
      removeNewParameter(i) {
        if (this.newParameters[i].name !== '' || this.newParameters[i].values.length > 0) {
          return
        }

        this.$store.commit('admin/parameters/removeNewParameter', i)
      }
    },
  }
</script>
