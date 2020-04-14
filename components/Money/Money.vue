<template>
  <span>
    <span v-text="value / 100"></span>
    <span v-text="currency"></span>
  </span>
</template>

<script>
  export default {
    props: ['value'],
    data: () => ({
      currency: 'zł',
    })
  }
</script>
