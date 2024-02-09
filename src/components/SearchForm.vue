<script>
import {store} from '../assets/data/store.js'
  export default {
    name: 'SearchForm',
    data() {
        return {
            searchedText: '',
            store,
            genreSelected: 'All'
        }
    },
    emits: ['text-searched', 'term-changed', 'genre-selected'],
    props: {
        buttonLabel: String
    },
    methods: {
      prova() {
        console.log('funziona' + this.genreSelected)
      }
    }
  }
</script>

<template>
  <form @submit.prevent="$emit('text-searched', searchedText)" @change="$emit('genre-selected', genreSelected)">
        <label for="select-genre">Seleziona un genere:</label>
        <select name="genres" id="select-genre" v-model="genreSelected">
          <option value="All">Tutti</option>
          <option v-for="genre in store.allGenres" :value="genre.name">{{ genre.name }}</option>
        </select>
          
        <input type="text" v-model.trim="searchedText" @keyup="$emit('term-changed', searchedText)">
        <button>{{ buttonLabel }}</button>
  </form>
</template>

<style lang="scss" scoped>
  form {
      display: flex;
      align-items: center;
      gap: 30px;

      label {
        color: white;
        font-weight: bold;
      }

      select {
        padding: .4rem;
      }

      input {
        padding: .3rem;
      }

      button {
        cursor: pointer;
        padding: 8px 14px;
        font-weight: bold;
        border-radius: 5px;
        border: 0;
        background-color: #e50914;
        color: white;
      }
    }
</style>