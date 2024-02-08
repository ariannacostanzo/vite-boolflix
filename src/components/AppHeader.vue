<script>
  export default {
    name: 'AppHeader',
    data() {
        return {
            searchedText: ''
        }
    },
    emits: ['text-searched']
  }
</script>

<template>
    <header>
        <h1>Boolflix</h1>
        <!-- da dividere e rendere dumb -->
        <!-- fare su input un keyup con emit termchange che passa fino ad app
        mi faccio un metodo che mi tiene aggiornato il data titlefilter che metto nell'app
        in modo che ce l'ho in tempo reale -->
        <form @submit.prevent="$emit('text-searched', searchedText)">
            <input type="text" v-model.trim="searchedText">
            <button>Cerca</button>
        </form>
    </header>
</template>

<style lang="scss" scoped>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    background-color: black;
    color: #e50914;
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    form {
      display: flex;
      align-items: center;
      gap: 15px;

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

  }
</style>