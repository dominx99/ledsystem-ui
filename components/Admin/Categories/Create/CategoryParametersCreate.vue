<template>
  <v-container>
    <v-select
      item-text="name"
      item-value="id"
      :items="allParameters"
      v-model="parameterIds"
      multiple
      chips
      placeholder="Barwa, Moc, Akcesoria"
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
  }),
  computed: mapState({
    allParameters: state => state.admin.parameters.parameters,
    category: state => state.admin.categories.activeCategory,
  }),
  methods: {
    updateCategoryParameters() {
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
        this.$router.push({ name: 'admin-kategorie' })

        this.channel.unbind('parameters.updated')
      })
    },
  }
}
</script>
