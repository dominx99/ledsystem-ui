<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" step="1">Produkt</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="step > 2" step="2">Parametry</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Główny obrazek</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div>
          <ProductStep ref="observer" :form="form" />

          <v-btn
            color="primary"
            @click="addProduct()"
          >
            Zapisz
          </v-btn>

          <v-overlay
            :value="addProductLoading"
            opacity=".5"
            absolute
          >
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>
        </div>
      </v-stepper-content>

      <v-stepper-content step="2">
        <ParametersStep />

        <v-layout>
        <v-btn
          color="primary"
          @click="assignProductParameters()"
        >
          Zapisz
        </v-btn>
        <v-btn
          dark
          class="ml-auto"
          color="secondary"
          @click="addNewParameter"
        >
          <span>Dodaj Parametr</span>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        </v-layout>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-overlay
          :value="loading.setImage"
          opacity=".5"
          absolute
        >
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

        <SelectMainImageStep class="mb-5" />

        <v-btn
          color="primary"
          @click="saveMainImage"
        >
          Wybierz i zapisz
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import ProductStep from './../../../components/Admin/Products/Create/ProductStep.vue'
  import ParametersStep from './../../../components/Admin/Products/Create/ParametersStep.vue'
  import SelectMainImageStep from './../../../components/Admin/Products/Create/SelectMainImageStep.vue'

  export default {
    layout: 'admin',
    components: {
      ProductStep,
      ParametersStep,
      SelectMainImageStep,
    },
    mounted() {
      this.$store.dispatch('categories/fetch')

      this.channel = this.$pusher.subscribe('products');
    },
    computed: {
      realPrice() {
        return this.$parseCurrency(this.form.price)
      },
      product() {
        return this.$store.state.admin.products.product
      },
      addProductLoading() {
        return this.$store.state.admin.products.loading.addProduct
      },
      parameters() {
        return this.$store.state.admin.parameters.newProduct.existingParameters
      },
      newParameters() {
        return this.$store.state.admin.parameters.newProduct.newParameters
      },
      activeImage() {
        return this.$store.state.admin.products.activeImage
      },
    },
    data: () => ({
      step: 1,
      channel: null,
      loading: {
        setImage: false,
      },
      form: {
        name: '',
        slug: '',
        price: '',
        base: '',
        step: '',
        type: 'pieces',
        images: [],
        categories: [],
      },
    }),
    methods: {
      saveMainImage() {
        let channel = this.$pusher.subscribe(`product.${this.product.id}`)

        channel.bind('image.updated', () => {
          this.loading.setImage = false

          channel.unbind('image.updated')

          this.$router.push({ name: 'admin-produkty' })
          this.$store.dispatch('admin/products/fetch')
        })

        this.loading.setImage = true

        this.$store.dispatch('admin/products/setMainImage', {
          productId: this.product.id,
          imageId: this.activeImage.id
        })
      },
      addNewParameter() {
        this.$store.commit('admin/parameters/addNewParameter', { name: '', values: [] })
      },
      async assignProductParameters() {
        let parameters = this.parameters.filter(p => p.parameter_value_ids.length > 0)
        let newParameters = this.newParameters.filter(p => p.name !== '' && p.values.length > 0)

        this.$store.dispatch('admin/products/assignParameters', {
          productId: this.product.id,
          parameters: parameters,
          newParameters: newParameters,
        })

        this.openSelectImageStep()
      },
      async addProduct() {
        let valid = await this.$refs.observer.$children[0].validate()

        if (! valid) {
          return
        }

        console.log('form is valid')

        this.channel.bind('product.created', ({ productId }) => {
          console.log('bind', productId)

          this.$store.commit('admin/products/removeLoading', 'addProduct')
          this.$store.dispatch('admin/products/findById', productId)
          this.openParametersStep()

          this.channel.unbind('product.created')
        })

        console.log('add product')

        await this.$store.dispatch('admin/products/add', Object.assign({}, this.form, { price: this.realPrice }))
      },
      openParametersStep() {
        this.step = 2
      },
      openSelectImageStep() {
        this.step = 3
      },
    }
  }
</script>
