<script>
import MainSection from './MainSection.vue';
import { store } from '../assets/data/store.js'

export default {
  name: 'AppMain',
  data() {
    return {
      store
    }
  },
  components: { MainSection },
}
</script>

<template>
  <section>
    <MainSection v-if="store.movies.length" :title="'Movies'" :elements="store.movies" />
  </section>
  <section>
    <MainSection v-if="store.tvShows.length" :title="'TV Shows'" :elements="store.tvShows" />
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-bottom: 3rem;
}
</style>