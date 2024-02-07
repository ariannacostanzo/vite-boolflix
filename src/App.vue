<script>
  import axios from 'axios';
  import AppHeader from './components/AppHeader.vue';
  import AppMain from './components/AppMain.vue';

  const baseUrl = 'https://api.themoviedb.org/3/search/movie?api_key=7a52c80d921a51f7f218955a9737d1d2&language=it-IT'

  export default {
    name: 'App',
    methods: { 
      fetchData(endpoint) {
        axios.get(endpoint).then(res => {
          console.log(res.data.results)
        })
      },
      readHeader(item) {
        console.log(item)
      }

    },
    components: {
      AppHeader, AppMain
    },
    created() {
      this.fetchData(baseUrl + `&query=pippo`)
    }
  }
</script>

<template>
  <AppHeader @text-searched="readHeader"/>
  <AppMain />
</template>

<style lang="scss">
  @import './assets/style/style.scss';
</style>