<template>
  <div>
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
          @input="handleName"
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
      @click="createCategory"
    >
      Zapisz
    </v-btn>
  </div>
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
      backendErrors: state => state.admin.categories.errors.createCategory,
      backendError: state => state.admin.categories.error.createCategory,
      categories: state => state.categories.categories,
    }),
    data: () => ({
      channel: null,
      form: {
        name: '',
        slug: '',
        parent: true,
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
      async createCategory() {
        let valid = await this.$refs.observer.validate()

        if (! valid) {
          return
        }

        this.subscribeCategory()
        this.bindCategoryCreated()

        this.$store.dispatch('admin/categories/create', this.prepareData())
      },
      subscribeCategory() {
        this.channel = this.$pusher.subscribe(`categories`)
      },
      bindCategoryCreated() {
        this.channel.bind('category.created', data => {
          this.$store.commit('admin/categories/removeLoading', 'createCategory')
          this.$store.commit('admin/categories/nextStep', 'createCategory')
          this.$store.dispatch('admin/categories/findById', data.categoryId)

          this.channel.unbind('category.created')
        })
      },
      prepareData() {
        let params = {
          name: this.form.name,
          slug: this.form.slug,
        }

        if (! this.form.parent) {
          params.parent_id = this.form.parentId
        }

        if (this.form.parent) {
          params.parent_id = null
        }

        return params
      },
      slugify(text) {
        return text
          .toString()
          .toLowerCase()
          .normalize('NFD')
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
      },
      handleName() {
        this.form.slug = this.slugify(this.form.name)
      },
    },
  }
</script>
