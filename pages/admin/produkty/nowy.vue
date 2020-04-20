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
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
        >
          Zapisz
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import ProductStep from './../../../components/Admin/Products/Create/ProductStep.vue'
  import ParametersStep from './../../../components/Admin/Products/Create/ParametersStep.vue'

  export default {
    layout: 'admin',
    components: {
      ProductStep,
      ParametersStep,
    },
    mounted() {
      this.$store.dispatch('categories/fetch')
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
    },
    data: () => ({
      step: 1,
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
      },
      async addProduct() {
        let valid = await this.$refs.observer.$children[0].validate()

        if (! valid) {
          return
        }

        console.log('form is valid')

        var channel = this.$pusher.subscribe('products');

        channel.bind('product.created', ({ productId }) => {
          console.log('bind', productId)

          this.$store.commit('admin/products/removeLoading', 'addProduct')
          this.$store.dispatch('admin/products/findById', productId)
          this.nextStep()

          this.$pusher.unbind('product.created')
        });

        console.log('add product')

        await this.$store.dispatch('admin/products/add', Object.assign({}, this.form, { price: this.realPrice }))
      },
      nextStep() {
        console.log('next step')

        this.step++
      },
    }
  }
</script>
