<template>
  <v-card>
    <v-card-title class="mb-2">Nowy produkt</v-card-title>
    <v-card-text>
      <v-text-field
        outlined
        color="primary"
        label="Nazwa"
        placeholder="Taśma led krótka"
        v-model="form.name"
      />
      <v-select
        outlined
        color="primary"
        label="Jednostka"
        :items="unitTypes"
        v-model="form.type"
      />
      <v-text-field
        outlined
        color="primary"
        label="Cena"
        placeholder="4050"
        v-model.lazy="form.price"
        suffix="zł"
      />
      <v-text-field
        outlined
        type="number"
        color="primary"
        label="Mnożnik"
        placeholder="1"
        v-model.number="form.base"
        hint="Mnożnik: definiuje przez co będzie mnożona cena produktu."
      />
      <v-text-field
        outlined
        type="number"
        color="primary"
        label="Co ile"
        placeholder="1"
        v-model="form.step"
        hint="Co ile: definiuje co ile użytkownik będzie mógł dodawać proktów, np taśma co 3 metry"
      />

      <v-file-input
        v-model="form.images"
        color="primary"
        counter
        label="File input"
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

      <v-select
        outlined
        multiple
        item-text="name"
        item-value="id"
        color="primary"
        label="Kategorie"
        :items="categories"
        v-model="form.categories"
      />
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
  export default {
    layout: 'admin',
    computed: {
      categories() {
        return this.$store.state.categories.categories
      },
    },
    mounted() {
      this.$store.dispatch('categories/fetch')
    },
    data: () => ({
      money: {
        decimal: ',',
        thousands: '.',
        suffix: ' zł',
        precision: 2,
        masked: false,
      },
      tempPrice: null,
      form: {
        name: '',
        price: '',
        base: 1,
        step: 1,
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
      addProduct() {
        this.$store.dispatch('products/add', this.form)
      },
    }
  }
</script>
