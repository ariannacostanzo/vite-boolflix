<script>
    
import SectionCards from './SectionCards.vue'
import SectionTitle from './SectionTitle.vue'
  export default {
    name: 'MainSection',
    components: {SectionCards, SectionTitle}
  }
</script>

<template>
  <SectionTitle/>
  <SectionCards/>
</template>

<style scoped>
  /* style here */
</style>