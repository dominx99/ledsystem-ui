<template>
  <v-carousel
    cycle
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'http://ledsystem-test.cba.pl/img/A/A1.jpg',
          },
          {
            src: 'http://ledsystem-test.cba.pl/img/A/A3.jpg',
          },
          {
            src: 'http://ledsystem-test.cba.pl/img/R/U8.jpg',
          },
          {
            src: 'http://ledsystem-test.cba.pl/img/R/T2.jpg',
          },
        ],
      }
    },
  }
</script>
