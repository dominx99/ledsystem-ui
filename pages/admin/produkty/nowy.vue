<template>
  <v-card>
    <v-card-title class="mb-2">Nowy produkt</v-card-title>
    <v-card-text>
      <ValidationObserver ref="observer" v-slot="{ validate, reset }">
        <form>
          <ValidationProvider v-slot="{ errors }" name="Nazwa" rules="required|min:3">
            <v-text-field
              outlined
              :error-messages="errors"
              color="primary"
              label="Nazwa"
              placeholder="Taśma led krótka"
              v-model="form.name"
              @input="handleName"
              required
            />
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="Slug" rules="required|slug|min:3">
            <v-text-field
              outlined
              :error-messages="errors"
              color="primary"
              label="Slug"
              placeholder="tasma-led-krotka"
              v-model="form.slug"
              required
            />
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="Jednostka" rules="required">
            <v-select
              outlined
              :error-messages="errors"
              color="primary"
              label="Jednostka"
              :items="unitTypes"
              v-model="form.type"
            />
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="Cena" rules="required|slug|min:3">
            <v-text-field
              outlined
              color="primary"
              label="Cena"
              :error-messages="errors"
              placeholder="50,45"
              v-model="form.price"
              v-currency
              suffix="zł"
              required
            />
          </ValidationProvider>
          <ValidationProvider v-if="false" v-slot="{ errors }" name="Mnożnik">
            <v-text-field
              outlined
              :error-messages="errors"
              type="number"
              color="primary"
              label="Mnożnik"
              placeholder="1"
              v-model.number="form.base"
              hint="Mnożnik: definiuje przez co będzie mnożona cena produktu."
            />
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="Co ile">
            <v-text-field
              outlined
              :error-messages="errors"
              type="number"
              color="primary"
              label="Co ile"
              placeholder="1"
              v-model="form.step"
              hint="Co ile: definiuje co ile użytkownik będzie mógł dodawać proktów, np taśma co 3 metry"
            />
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="Zdjęcia" rules="required|length:1">
            <v-file-input
              :error-messages="errors"
              v-model="form.images"
              color="primary"
              counter
              label="Zdjęcia"
              multiple
              placeholder="Wybierz zdjęcia dla produktu"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="primary"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="overline grey--text text--darken-3 mx-2"
                >
                  +{{ form.images.length - 2 }} Plik(i)
                </span>
              </template>
            </v-file-input>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="Kategorie" rules="required|length:1">
            <v-select
              :error-messages="errors"
              outlined
              multiple
              item-text="name"
              item-value="id"
              color="primary"
              label="Kategorie"
              :items="categories"
              v-model="form.categories"
            />
          </ValidationProvider>
        </form>
      </ValidationObserver>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary darken-1"
        @click="addProduct()"
      >
        Dodaj
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { CurrencyDirective, parseCurrency } from 'vue-currency-input'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'

  export default {
    layout: 'admin',
    directives: {
      currency: CurrencyDirective,
    },
    components: {
      ValidationObserver,
      ValidationProvider,
    },
    computed: {
      categories() {
        return this.$store.state.categories.categories
      },
      realPrice () {
        return parseCurrency(this.form.price, { valueAsInteger: true })
      },
    },
    mounted() {
      this.$store.dispatch('categories/fetch')
    },
    data: () => ({
      tempPrice: null,
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
      unitTypes: [
        {
          text: 'Sztuki',
          value: 'pieces',
        },
        {
          text: 'Metry',
          value: 'meters',
        }
      ],
    }),
    methods: {
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
      async addProduct() {
        let valid = await this.$refs.observer.validate()

        if (! valid) {
          return
        }

        this.$store.dispatch('products/add', Object.assign({}, this.form, { price: this.realPrice }))
      },
    }
  }
</script>
