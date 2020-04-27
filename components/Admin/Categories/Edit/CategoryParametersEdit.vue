<template>
  <v-container>
    <v-select
      item-text="name"
      item-value="id"
      :items="allParameters"
      v-model="parameterIds"
      multiple
      chips
    />

    <v-btn
      color="primary"
      @click="updateCategoryParameters()"
    >
      Zapisz
    </v-btn>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data: () => ({
      parameterIds: [],
      channel: null,
    }),
    computed: mapState({
      allParameters: state => state.admin.parameters.parameters,
      category: state => state.categories.activeCategory,
    }),
    mounted() {
      if (Object.keys(this.category).length <= 0) {
        return
      }

      this.parameterIds = this.category.parameters.map(parameter => parameter.id)
    },
    methods: {
      updateCategoryParameters() {
        this.$store.commit('admin/categories/setLoading', 'updateParameters')
        this.subscribeCategory()
        this.bindParametersUpdated()

        this.$store.dispatch('admin/categories/updateParameters', {
          categoryId: this.category.id,
          parameterIds: this.parameterIds,
        })
      },
      subscribeCategory() {
        this.channel = this.$pusher.subscribe(`category.${this.category.id}`)
      },
      bindParametersUpdated() {
        this.channel.bind('parameters.updated', () => {
          this.$store.commit('admin/categories/removeLoading', 'updateParameters')

          this.channel.unbind('parameters.updated')
        })
      },
    }
  }
</script>
