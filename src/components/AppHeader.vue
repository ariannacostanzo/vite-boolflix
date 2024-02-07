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
            <button>Search</button>
        </form>
    </header>
</template>

<style lang="scss" scoped>
  header {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    margin-bottom: 2rem;

  }
</style>