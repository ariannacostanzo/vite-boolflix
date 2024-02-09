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
              overview: e.overview
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
        // console.log(searchMovieEndpoint)
        // console.log(searchTvEndpoint)
        this.fetchData(searchMovieEndpoint, 'movies')
        this.fetchData(searchTvEndpoint, 'tvShows')
        this.fetchActors('movie', 'movieActors')
        this.fetchActors('tv', 'tvShowsActors')
      },
      //funzione che mi serve come prova, nella realtà userei per @term-changed getSearchText
      cambioTermine(term) {
        // console.log('funziona', term)
        this.fetchActors('movie', store.movieActors)
      },
      //rendo dinamica la mia url con una funzione
      getCollectionUrl(mode, collection, term) {
        const {baseUrl, apiKey, apiLanguage } = dataUrlConfig

        const url =  `${baseUrl}/${mode}/${collection}?api_key=${apiKey}&language=${apiLanguage}&query=${term}`
        return url
      },
      fetchActors(mode, collection) {
        const actorsEndpoint = this.getActorsUrl(mode, 597)
        axios.get(actorsEndpoint).then(res => {
          
          const firstFiveActors = res.data.cast.slice(0,5);
          store[collection] = firstFiveActors
          
          // console.log(store.movieActors)
          // console.log(store.tvShowsActors)
        }).catch(err => console.log(err))
      },
      getActorsUrl(collection, movieId) {
        const {baseUrl, apiKey} = dataUrlConfig
        const url =  `${baseUrl}/${collection}/${movieId}/credits?api_key=${apiKey}`
        return url
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

  <!-- fare un dumb component di questo? -->
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

<!-- risolvere qualsiasi restructuring, aggiungere bandiere per le lingue
  se non si trova niente, dire che non è stato trovato niente, fare la chiamata per gli attori
 fare il loader,-->