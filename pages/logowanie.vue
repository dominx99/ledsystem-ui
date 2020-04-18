<template>
  <v-card
    class="my-5 pa-6 elevation-1 mx-auto"
    max-width="500"
  >
    <div class="display-1 pb-3">
      Logowanie
    </div>
    <v-alert
      v-if="error !== ''"
      color="red"
      class="white--text mt-3 mb-6"
      v-text="error"
      dense
    ></v-alert>
    <div>
      <v-text-field
        outlined
        label="Email"
        required
        class="mt-4"
        v-model="form.email"
      ></v-text-field>
      <v-text-field
        outlined
        label="Password"
        type="password"
        required
        v-model="form.password"
      ></v-text-field>
    </div>
    <div>
      <v-btn
        @click.stop="login()"
        color="cyan darken-1"
        class="white--text"
        :loading="loading"
        large
        block
      >
        Zaloguj się
      </v-btn>
    </div>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      form: {
        email: '',
        password: '',
      },
    }),
    computed: {
      loading() {
        return this.$store.state.auth.loading.login
      },
      error() {
        return this.$store.state.auth.errors.login
      },
    },
    async mounted() {
      await this.$store.dispatch('categories/fetchParent')
      this.$store.commit('categories/setActiveCategories', this.$store.state.categories.parentCategories)
    },
    methods: {
      login() {
        this.$store.dispatch('auth/login', this.form)
      },
    }
  }
</script>
