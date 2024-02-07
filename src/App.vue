<script>
  import axios from 'axios';
  import AppHeader from './components/AppHeader.vue';
  import AppMain from './components/AppMain.vue';
  import {store} from './assets/data/store.js'

  const baseUrl = 'https://api.themoviedb.org/3/search/movie?api_key=7a52c80d921a51f7f218955a9737d1d2&language=it-IT'

  export default {
    name: 'App',
    data() {
      return {
        searchedTerm: '',
        store
      }
    },
    methods: { 
      fetchData(endpoint, container) {
        axios.get(endpoint).then(res => {
          //raccolgo i risultati all'interno di store.Container (ovvero l'array che scelgo)
          // console.log(res.data.results)
          store[container] = res.data.results.map((element) => {
            return {
              id: element.id,
              language: element.original_language,
              title: element.title,
              originalTitle: element.original_title,
              vote: element.vote_average,
              imagePath: element.poster_path,
              summary: element.overview
            }
          })
          console.log(store.movies)


        }).catch(err => console.log(err))
      },
      getSearchText(item) {
        this.searchedTerm = item
        const endpoint = baseUrl + `&query=${this.searchedTerm}`
        this.fetchData(endpoint, 'movies')
      }

    },
    components: {
      AppHeader, AppMain
    },
  }
</script>

<template>
  <AppHeader @text-searched="getSearchText"/>
  <AppMain />
</template>

<style lang="scss">
  @import './assets/style/style.scss';
</style>