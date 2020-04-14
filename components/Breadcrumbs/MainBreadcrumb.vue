<template>
  <v-breadcrumbs :items="items">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          text: 'Ledsystem',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Źródła światła',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'E27',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    }),
  }
</script>
