<script>
    
import SectionCards from './SectionCards.vue'
import SectionTitle from './SectionTitle.vue'

  export default {
    name: 'MainSection',
    components: {SectionCards, SectionTitle},
    props: {title:String, elements: Array}
  }
</script>

<template>
  <SectionTitle :title="title"/>
  <SectionCards :elements="elements"/>
</template>

<style scoped>
  /* style here */
</style>