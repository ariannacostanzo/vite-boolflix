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

    form {
      display: flex;
      align-items: center;
      gap: 30px;

      input {
        padding: .3rem;
      }

      button {
        cursor: pointer;
        padding: 5px 10px;
        font-weight: bold;
        border-radius: 5px;
        border: 0;
      }
    }

  }
</style>