<script>
  import axios from 'axios';
  import AppHeader from './components/AppHeader.vue';
  import AppMain from './components/AppMain.vue';
  import {store} from './assets/data/store.js'
  import {dataUrlConfig, emptyImgUrl, baseImagePath} from './assets/data/data'
  export default {
    name: 'App',
    data() {
      return {
        searchedTerm: '',
        store
      }
    },
    methods: { 
      fetchData(endpoint, collection) {
        store.isLoading = true
        axios.get(endpoint).then(res => {
          
          store[collection] = res.data.results.map((e) => {
            return {
              id: e.id,
              language: e.original_language,
              //posso farlo anche così, o questo o questo
              title: e.title || e.name,
              originalTitle: e.original_title ? e.original_title : e.original_name,
              vote: e.vote_average,
              imagePath: e.poster_path ? baseImagePath + e.poster_path : emptyImgUrl,
              overview: e.overview,
              genre: e.genre_ids
            }
          })
        }).catch(err => console.log(err)).then(() => {
          store.isLoading = false
        })
      },
      //salvo il testo scritto nei miei data, ottengo le url che mi servono e chiamo le api relative
      getSearchText(item) {
        this.searchedTerm = item
        const searchMovieEndpoint = this.getCollectionUrl('search', 'movie', this.searchedTerm)
        const searchTvEndpoint = this.getCollectionUrl('search', 'tv', this.searchedTerm)
        this.fetchData(searchMovieEndpoint, 'movies')
        this.fetchData(searchTvEndpoint, 'tvShows')
        this.fetchGenres('movie', 'movieGenres')
        this.fetchGenres('tv', 'tvGenres')
      },
      //funzione che mi serve come prova, nella realtà userei per @term-changed getSearchText
      cambioTermine(term) {
        console.log(term)
      },
      //rendo dinamica la mia url con una funzione
      getCollectionUrl(mode, collection, term) {
        const {baseUrl, apiKey, apiLanguage } = dataUrlConfig

        const url =  `${baseUrl}/${mode}/${collection}?api_key=${apiKey}&language=${apiLanguage}&query=${term}`
        return url
      },
      //storing genres of movie and tv in store
      fetchGenres(mode, collection) {
        const {baseUrl, apiKey, apiLanguage } = dataUrlConfig
        const url = `${baseUrl}/genre/${mode}/list?api_key=${apiKey}&language=${apiLanguage}`
        axios.get(url).then((res) => {
          store[collection] = res.data.genres
          console.log(store[collection])
        })
      }
    },
    components: {
      AppHeader, AppMain
    },
  }
</script>

<template>
  <!-- quale funzionamento voglio? che appena scrivo qualcosa chiamo subito la Api o che la chiamo quando finisco di scrivere?
  dopo aver stabilito questo rimuoverò o text-searched o term-changed  -->
  <AppHeader @text-searched="getSearchText" @term-changed="cambioTermine"/>

  <div class="placeholder" v-if="!store.movies.length && !store.tvShows.length">
    <p>Cerca un film o una serie TV</p>
  </div>

  <div class="container" v-if="store.movies.length || store.tvShows.length">
    <AppMain/>
  </div>
  
</template>

<style lang="scss">
  @import './assets/style/style.scss';

  .placeholder {
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
  }
  .container {
    padding: 2rem;
  }
</style>