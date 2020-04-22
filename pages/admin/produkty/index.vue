<template>
  <v-card>
    <v-card-title class="align-center">
      <div class="mr-5">Produkty</div>
      <v-btn
        outlined
        dark
        color="primary"
        to="/admin/produkty/nowy"
      >
        Nowy
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :loading="loading"
      v-model="selected"
      :headers="headers"
      :items="products"
      :search="search"
      item-key="id"
      show-select
    >
      <template v-slot:item.image="{ item }">
        <v-img
          width="100"
          :aspect-ratio="16/9"
          :src="imageUrl(item.images[0].micro.path)"
        />
      </template>

      <template v-slot:item.unit.price="{ item }">
        <Money :value="item.unit.price" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  import Money from './../../../components/Money/Money'

  export default {
    layout: 'admin',
    components: {
      Money,
    },
    mounted() {
      this.$store.dispatch('admin/products/fetch')
    },
    computed: {
      products() {
        return this.$store.state.admin.products.products
      },
      loading() {
        return this.$store.state.admin.products.loading.products
      },
    },
    data () {
      return {
        selected: [],
        search: '',
        headers: [
          {
            text: 'Obrazek',
            sortable: false,
            filterable: false,
            value: 'image',
          },
          {
            text: 'Nazwa produktu',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Cena', value: 'unit.price' },
        ],
      }
    },
    methods: {
      imageUrl(path) {
        return process.env.storageUrl + path
      },
    }
  }
</script>
