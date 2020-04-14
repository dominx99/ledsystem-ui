<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="500"
      left
    >
      <template v-slot:activator="{ on }">
        <Money v-show="sum() > 0" class="hidden-md-and-down red--text text--red-darken-1" :value="sum()" />
        <v-btn
          v-on="on"
          icon
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Koszyk</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action class="flex flex-row justify-end">
              <Money class="mr-2 red--text text--red-darken-1" :value="sum()" />
              <v-icon>mdi-cart</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list v-if="items.length > 0" max-height="400" class="scroll">
          <v-list-item
            v-for="item in items"
            :key="item.product.id"
          >
            <v-list-item-avatar>
              <v-img :src="item.product.image_url"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <span v-text="item.product.name"></span>
              </v-list-item-title>
              <v-list-item-subtitle >
                <Money
                  :value="item.product.unit.price * item.count"
                ></Money>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action
              class="flex-row align-center"
            >
              <v-btn
                icon
                @click="decrement(item)"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <span v-text="item.count"></span>
              <v-btn
                icon
                @click="increment(item)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>

              <v-btn
                icon
                @click="remove(item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <div v-else class="pa-4">Koszyk jest pusty</div>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn outlined tile @click="clear" color="primary">Wyczyść</v-btn>
          <v-btn tile color="primary" :disabled="items.length <= 0">Do kasy</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  import Money from './../Money/Money'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      Money,
    },
    computed: {
      items() {
        return this.$store.state.cart.items
      },
    },
    methods: {
      ...mapGetters({
        sum: 'cart/sum'
      }),
      clear() {
        this.$store.dispatch('cart/clear')
      },
      remove(item) {
        this.$store.dispatch('cart/remove', item)
      },
      increment(item) {
        this.$store.dispatch('cart/increment', item)
      },
      decrement(item) {
        this.$store.dispatch('cart/decrement', item)
      },
    },
    data: () => ({
      menu: false,
    }),
  }
</script>

<style lang="scss" scoped>
  .scroll {
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
</style>
