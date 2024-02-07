<script>
import MainSection from './MainSection.vue';
import {store} from '../assets/data/store.js'

  export default {
    name: 'AppMain',
    data() {
        return {
            store
        }
    },
    components: {MainSection},
  }
</script>

<template>
  <MainSection :title="'Movies'" :elements="store.movies" />
  <MainSection :title="'TV Shows'" :elements="store.tvShows" />
</template>

<style scoped>
  /* style here */
</style>