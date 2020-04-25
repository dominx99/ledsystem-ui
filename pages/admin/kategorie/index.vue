<template>
  <v-container>
    <v-row>
      <v-col md="6" cols="12">
        <CategoriesTree />
      </v-col>
      <v-col md="6" cols="12">
        <CategoryEdit />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import CategoriesTree from './../../../components/Admin/Categories/CategoriesTree.vue'
  import CategoryEdit from './../../../components/Admin/Categories/CategoryEdit.vue'

  export default {
    layout: 'admin',
    components: {
      CategoriesTree,
      CategoryEdit,
    },
    mounted() {
      this.$store.dispatch('categories/fetchRecursive')
      if (this.$store.state.admin.parameters.parameters.length <= 0) {
        this.$store.dispatch('admin/parameters/fetch')
      }
    },
  }
</script>
