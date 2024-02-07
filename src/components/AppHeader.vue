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
            <input type="text" v-model="searchedText">
            <button>Cerca</button>
        </form>
    </header>
</template>

<style lang="scss" scoped>
  header {
    display: flex;
    align-items: center;

  }
</style>