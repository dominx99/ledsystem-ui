<template>
  <v-container>
    <v-alert
      color="red"
      class="white--text mt-3 mb-6"
      v-show="backendError"
      v-text="backendError"
    />
    <ValidationObserver ref="observer" v-slot="{ validate, reset }">
      <ValidationProvider v-slot="{ errors }" name="Nazwa" rules="required|length:3,20">
        <v-text-field
          class="mt-2 mb-0"
          outlined
          label="Nazwa"
          :error-messages="getErrors(errors, backendErrors.name)"
          v-model="form.name"
        />
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="Slug" rules="required|length:3,20">
        <v-text-field
          class="mt-2 mb-0"
          outlined
          label="Slug"
          :error-messages="getErrors(errors, backendErrors.slug)"
          v-model="form.slug"
        />
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="Kategorie">
        <v-checkbox
          class="mt-0"
          label="Kategoria nadrzędna"
          v-model="form.parent"
        />
      </ValidationProvider>
      <ValidationProvider v-show="! form.parent" v-slot="{ errors }" name="Kategorie">
        <v-select
          label="Kategoria nadrzędna"
          item-text="name"
          item-value="id"
          :items="categories"
          :error-messages="getErrors(errors, backendErrors.parent_id)"
          v-model="form.parentId"
        />
      </ValidationProvider>
    </ValidationObserver>

    <v-btn
      color="primary"
      @click="updateCategory"
    >
      Zapisz
    </v-btn>
  </v-container>
</template>

<script>
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { mapState } from 'vuex'

  export default {
    components: {
      ValidationObserver,
      ValidationProvider,
    },
    computed: mapState({
      category: state => state.categories.activeCategory,
      backendErrors: state => state.admin.categories.errors.updateCategory,
      backendError: state => state.admin.categories.error.updateCategory,
      categories(state) {
        return state.categories.categories.filter(category => category.id !== this.category.id)
      },
    }),
    mounted() {
      if (Object.keys(this.category).length <= 0) {
        return
      }

      this.form.name = this.category.name
      this.form.slug = this.category.slug
      this.form.parent = typeof this.category.parent_id !== "string"
      this.form.parentId = typeof this.category.parent_id === "string" ? this.category.parent_id : ''
    },
    data: () => ({
      channel: null,
      form: {
        name: '',
        slug: '',
        parent: false,
        parentId: '',
      },
    }),
    methods: {
      getErrors(errors, backendErrors) {
        if (! Array.isArray(backendErrors)) {
          return errors
        }

        return [...errors, ...backendErrors]
      },
      async updateCategory() {
        let valid = await this.$refs.observer.validate()

        if (! valid) {
          return
        }

        this.subscribeCategory()
        this.bindCategoryUpdated()

        this.$store.dispatch('admin/categories/update', {
          categoryId: this.category.id,
          params: this.prepareData(),
        })
      },
      subscribeCategory() {
        this.channel = this.$pusher.subscribe(`category.${this.category.id}`)
      },
      bindCategoryUpdated() {
        this.channel.bind('category.updated', () => {
          this.$store.dispatch('categories/fetchRecursive')
          this.$store.dispatch('categories/findById', this.category.id)
          this.$store.commit('admin/categories/removeLoading', 'updateCategory')

          this.channel.unbind('category.updated')
        })
        console.log("category binded")
      },
      prepareData() {
        let params = {
          name: this.form.name,
        }

        if (this.category.slug !== this.form.slug) {
          params.slug = this.form.slug
        }

        if (! this.form.parent) {
          params.parent_id = this.form.parentId
        }

        if (this.form.parent) {
          params.parent_id = null
        }

        return params
      },
    },
  }
</script>
