<script>
  import axios from 'axios';
  import AppHeader from './components/AppHeader.vue';
  import AppMain from './components/AppMain.vue';
  import {store} from './assets/data/store.js'

  const baseMovieUrl = 'https://api.themoviedb.org/3/search/movie?api_key=7a52c80d921a51f7f218955a9737d1d2&language=it-IT'
  const baseTvUrl = 'https://api.themoviedb.org/3/search/tv?api_key=7a52c80d921a51f7f218955a9737d1d2&language=it-IT'
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
        store.isLoading = true
        axios.get(endpoint).then(res => {
          
          //raccolgo i risultati all'interno di store.Container (ovvero l'array che scelgo)
          // console.log(res.data.results)
          store[container] = res.data.results.map((element) => {
            return {
              id: element.id,
              language: element.original_language,
              title: element.title ? element.title : element.original_name,
              originalTitle: element.original_title ? element.originalTitle : element.name,
              vote: element.vote_average,
              imagePath: element.poster_path,
              summary: element.overview
            }
          })
          store.isLoading = false

        }).catch(err => console.log(err))
      },
      getSearchText(item) {
        this.searchedTerm = item
        const query = `&query=${this.searchedTerm}`
        const movieEndpoint = baseMovieUrl + query
        const tvEndpoint = baseTvUrl + query
        
        this.fetchData(movieEndpoint, 'movies')
        this.fetchData(tvEndpoint, 'tvShows')
      }

    },
    components: {
      AppHeader, AppMain
    },
  }
</script>

<template>
  <AppHeader @text-searched="getSearchText"/>
  <AppMain v-if="store.movies.length" />
</template>

<style lang="scss">
  @import './assets/style/style.scss';
</style>