<script>
import SearchForm from './SearchForm.vue';
  export default {
    name: 'AppHeader',
    components: {SearchForm},
    emits: ['text-searched', 'term-changed'],
    

  }
</script>

<template>
    <header>
        <h1>Boolflix</h1>
        <SearchForm @text-searched="$emit('text-searched', $event)" :button-label="'Cerca'" @term-changed="$emit('term-changed', $event)"/>
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