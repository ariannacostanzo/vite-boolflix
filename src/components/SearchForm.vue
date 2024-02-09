<script>
import {store} from '../assets/data/store.js'
  export default {
    name: 'SearchForm',
    data() {
        return {
            searchedText: '',
            store
        }
    },
    emits: ['text-searched', 'term-changed'],
    props: {
        buttonLabel: String
    }
  }
</script>

<template>
  <form @submit.prevent="$emit('text-searched', searchedText)">
        <label for="select-genre">Seleziona un genere:</label>
        <select name="genres" id="select-genre">
          <option value="All">Tutti</option>
          <!-- <option v-for="store" value=""></option> -->
        </select>
          
        <input type="text" v-model.trim="searchedText" @keyup="$emit('term-changed', searchedText)">
        <button>{{ buttonLabel }}</button>
  </form>
</template>

<style lang="scss" scoped>
  form {
      display: flex;
      align-items: center;
      gap: 15px;

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