<script>
  export default {
    name: 'SearchForm',
    data() {
        return {
            searchedText: ''
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
        <input type="text" v-model.trim="searchedText" @keyup="$emit('term-changed', searchedText)">
        <button>{{ buttonLabel }}</button>
  </form>
</template>

<style lang="scss" scoped>
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
</style>