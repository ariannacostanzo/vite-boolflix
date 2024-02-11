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
        store,
        genreSelected: null
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
          //pusho su storeAllGenres i generi in comune una volta e quelli non in comune
          store[collection].forEach(element => {
            if (!store.allGenres.some(existingElement => existingElement.id === element.id)) {
              store.allGenres.push(element)
            } else {
              return
            }
          });
        })
      },
      //se il genere è all vedo tutti i film e le serie, se cambio l'option filtro in base al genere
      selectedGenre(genre) {
        this.genreSelected = genre
        console.log(genre)
        if (this.genreSelected === 'All' || !this.genreSelected) {
          
          //se non metto il set time out l'array mi ritorna vuoto e non vedo nietne
          setTimeout(()=> {
            store.isLoading = true
            store.filteredMovies = store.movies;
            store.filteredTvShows = store.tvShows;
          }, 1000)
          // store.filteredMovies = store.movies;
          // store.filteredTvShows = store.tvShows;
        } else {
            store.filteredMovies = store.movies.filter((movie) => {
            return movie.genre.includes(this.genreSelected)
            })
            store.filteredTvShows = store.tvShows.filter(tvshow => {
            return tvshow.genre.includes(this.genreSelected) 
            })
        }
      }
    },
    components: {
      AppHeader, AppMain
    },
    created() {
      this.fetchGenres('movie', 'movieGenres');
      this.fetchGenres('tv', 'tvGenres');
    }
  }
</script>

<template>
  <!-- quale funzionamento voglio? che appena scrivo qualcosa chiamo subito la Api o che la chiamo quando finisco di scrivere?
  dopo aver stabilito questo rimuoverò o text-searched o term-changed  -->
  <AppHeader @text-searched="getSearchText" @term-changed="cambioTermine" @genre-selected="selectedGenre"/>

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