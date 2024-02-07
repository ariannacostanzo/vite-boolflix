<script>
  import axios from 'axios';
  import AppHeader from './components/AppHeader.vue';
  import AppMain from './components/AppMain.vue';

  export default {
    name: 'App',
    methods: { 
      fetchData(endpoint) {
        axios.get(endpoint).then(res => {
          console.log(res.data.results)
        })
      }

    },
    components: {
      AppHeader, AppMain
    },
    created() {
      this.fetchData('https://api.themoviedb.org/3/search/movie?query=monster&api_key=7a52c80d921a51f7f218955a9737d1d2&language=it-IT')
    }
  }
</script>

<template>
  <AppHeader />
  <AppMain />
</template>

<style lang="scss">
  @import './assets/style/style.scss';
</style>