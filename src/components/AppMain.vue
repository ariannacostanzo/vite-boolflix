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
    <MainSection v-if="store.filteredMovies.length" :title="'Movies'" :elements="store.filteredMovies" />
  </section>
  <section>
    <MainSection v-if="store.filteredTvShows.length" :title="'TV Shows'" :elements="store.filteredTvShows" />
  </section>
</template>

<style lang="scss" scoped>

</style>