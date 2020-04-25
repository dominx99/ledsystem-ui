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
        <v-tab>Parametry</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-overlay
            :value="loading.updateParameters"
            opacity=".5"
            absolute
          >
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>

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
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      tab: 0,
      parameterIds: [],
      channel: null,
      loading: {
        updateParameters: false,
      },
    }),
    watch: {
      category(category) {
        if (Object.keys(category).length <= 0) {
          return
        }

        this.parameterIds = category.parameters.map(parameter => parameter.id)
      }
    },
    computed: {
      allParameters() {
        return this.$store.state.admin.parameters.parameters
      },
      category() {
        return this.$store.state.categories.activeCategory
      },
      loadingCategory() {
        return this.$store.state.categories.loading.activeCategory
      },
    },
    methods: {
      subscribeCategory() {
        this.channel = this.$pusher.subscribe(`category.${this.category.id}`)
      },
      bindParametersUpdated() {
        this.channel.bind('parameters.updated', () => {
          this.loading.updateParameters = false

          this.channel.unbind('parameters.updated')
        })
      },
      updateCategoryParameters() {
        this.loading.updateParameters = true
        this.subscribeCategory()
        this.bindParametersUpdated()

        this.$store.dispatch('admin/categories/updateParameters', {
          categoryId: this.category.id,
          parameterIds: this.parameterIds,
        })
      },
    }
  }
</script>
